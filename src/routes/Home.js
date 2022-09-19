import { dbService } from "fbase";
import { addDoc, collection, getDocs, query,orderBy,onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Nweet from "../components/Nweet";


const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    
    useEffect(() => {
        const q = query(
            collection(dbService, "nweets"),
            orderBy("createdAt", "desc")
        );
        onSnapshot(q, (snapshot) => {
        const nweetArr = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
            setNweets(nweetArr);
        });
        }, []);
    
    const onSubmit = async (event) => {
        event.preventDefault();
    try { const docRef = await addDoc(collection(dbService, "nweets"), {
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
    });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
        setNweet("");
    };
    const onChange = (event) => {
    const {
        target: { value },
    } = event;
        setNweet(value);
    };

return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="Whats on your mind?"
                    maxLength={120}
                />
                <input type="submit" value="Nweet"/>
            </form>
            <div>
                {nweets.map((nweet) => (
                    <Nweet 
                    key={nweet.id} 
                    nweetObj={nweet} 
                    isOwner={nweet.creatorId === userObj.uid} 
                    />
                ))}
            </div>
            </>
        );
    };

export default Home;