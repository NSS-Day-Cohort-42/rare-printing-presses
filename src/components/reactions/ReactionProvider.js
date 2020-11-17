import React, { useState, useContext } from "react"
import { PostContext } from "../Posts/PostProvider"
export const ReactionContext = React.createContext()

export const ReactionProvider = (props) => {
    const [reactions, setReactions] = useState([])
    const [newReaction, setNewReaction] = useState([])
    const {getSinglePost} = useContext(PostContext)
    

    const getAllReactions = () => {
        return fetch(`http://localhost:8000/reactions`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("rareUser_id")}`
            }
        })
            .then(res => res.json())
            .then(setReactions)
    }

    const deleteReaction = (reactionId) => {
        return fetch(`http://localhost:8000/reactions/${reactionId}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("rareUser_id")}`
        }
     })
            .then(getAllReactions)
    }

    const createReaction = reaction => {
        return fetch("http://localhost:8000/reactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rareUser_id")}`
            },
            body: JSON.stringify(reaction)
        })
            .then(getAllReactions)
    }

    const newPostReaction = (pr) =>{
        return fetch("http://localhost:8000/postreactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rareUser_id")}`
            },
            body: JSON.stringify(pr)
        })
        .then(()=>
        getSinglePost(pr.post_id))
    }

    
    

    return (
        <ReactionContext.Provider value={{
            reactions, setReactions, getAllReactions, deleteReaction, createReaction, newPostReaction, newReaction
        }}>
            {props.children}
        </ReactionContext.Provider>
    )
}

export default ReactionProvider