import { dbService } from "fbase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";


const Home = () => {
    const [nweet, setNweet] = useState("");

    const getNweets = async () => {
        const dbNweets = await getDocs(collection(dbService, "nweets"));
        dbNweets.forEach((document) => console.log(document.data()));
    };

    useEffect(() => {
        getNweets();
    },[]);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
        const docRef = await addDoc(collection(dbService, "nweets"), {
        nweet,
        createdAt: Date.now(),
        });
        console.log("Document written with ID: ", docRef.id);
        } catch (error) {
        console.error("Error adding document: ", error);
        }
        setNweet("");
    };

const onChange = ({ target: { value } }) => {
setNweet(value);
};
return (
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
        );
    };

export default Home;