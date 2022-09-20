import { getAuth, signOut, updateProfile } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dbService } from "../fbase";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { async } from "@firebase/util";

const Profile = ( { refreshUser,userObj } ) => {
    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const auth = getAuth();
    const onLogOutClick = () => {
        signOut(auth);
        navigate("/", { replace: true });
    };

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await updateProfile(userObj, { 
                displayName: newDisplayName 
            });
            // refreshUser();
        }
    }

    const getMyNweets = async () => {
        const q = query(
            collection(dbService, "nweets"),
            where("creatorId", "==", userObj.uid)
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            });
    };

    useEffect(() => {
        getMyNweets();
    }, []);
    
    return (
        <>
        <form onSubmit={ onSubmit }>
            <input 
                onChange={onChange}
                type="text" 
                placeholder="Dislay name"
                value={newDisplayName}
                />
            <input type="submit" value="Update Profile" />
        </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
);
};

export default Profile;