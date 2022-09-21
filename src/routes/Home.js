import { dbService } from "fbase";
import { addDoc, collection, getDocs, query,orderBy,onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Nweet from "../components/Nweet";

import NweetFactory from "../components/NweetFactory";


const Home = ({ userObj }) => {
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

        
    return (
        <>
            
            <div>
                <NweetFactory userObj={userObj} />
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