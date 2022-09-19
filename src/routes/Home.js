import { dbService } from "fbase";
import { addDoc, collection, getDocs, query,orderBy,onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Nweet from "../components/Nweet";
import { storageService } from "../fbase";
import {v4 as uuuidv4} from "uuid"
import { ref, uploadString } from "@firebase/storage";


const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment,setAttachment] = useState();
    
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

        const fileRef = ref(storageService, `${userObj.uid}/${uuuidv4()}`);
        const response = await uploadString(fileRef, attachment, "data_url");
        console.log(response);
        // try { const docRef = await addDoc(collection(dbService, "nweets"), {
        //     text: nweet,
        //     createdAt: Date.now(),
        //     creatorId: userObj.uid,
        // });
        // } catch (e) {
        //     console.error("Error adding document: ", e);
        // }
        //     setNweet("");
         };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
            setNweet(value);
    };

    const onFileChange = (event) => {
        const { target : { files },
        } = event ;
        const theFile = files[0]
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {currentTarget: { result },
        } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };

    const onClearAttachmentClick = () => setAttachment(null)
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
                <input type="file" accept="image/*" onChange={onFileChange}/>
                <input type="submit" value="Nweet"/>
                {attachment && 
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachmentClick}>Clear Photo</button>
                    </div>}
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