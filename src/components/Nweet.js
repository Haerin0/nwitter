import React, { useState } from "react";
import { dbService } from "../fbase";
import { doc, deleteDoc, updateDoc }from"firebase/firestore";

const Nweet = ({ nweetObj,isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet,setNewNweet] = useState(nweetObj.text)
    const onDeleteClick = async () => {
        const ok = window.confirm("are you sure u want to delete this nweet?");
        //리터럴
        const NweetTextRef =doc(dbService, "nweets", `${nweetObj.id}`);
        if (ok) {
            // delete 부분
            await deleteDoc(NweetTextRef ); 
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);

    const onSubmit = async (event) => {
        event.preventDefault();
        await updateDoc(doc(dbService, `nweets/${nweetObj.id}`), {
            text: newNweet,
            });
        setEditing(false);
    }

    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewNweet(value);
    };
   return (
    <div>
       {editing ? (
        <>
            {isOwner && (
            <>
            <form onSubmit = {onSubmit}>
                <input 
                    type="text"
                    placeholder="Edit your nweet" 
                    defaultValue={newNweet} 
                    required 
                    onChange={onChange}
                />
                <input type="submit" value="update nweet"></input>
            </form>
            <button onClick={toggleEditing} >Cancel</button>
            </>)
            }
            </>
            ) : (
                <>
                    <h4>{nweetObj.text}</h4>  
                    {nweetObj.attachmentUrl && (
                    <img src={nweetObj.attachmentUrl} width="50px" height="50px" />
                    )}  
                    {isOwner && (
                    <>
                        <button onClick={onDeleteClick}>Delete Nweet</button>
                        <button onClick={toggleEditing}>Edit Nweet</button>
                    </>
                )}
                </>
            )}
    </div>
    );
};

export default Nweet;