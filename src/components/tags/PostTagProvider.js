import React, {useEffect, useState} from "react"

export const PostTagContext = React.createContext()

export const PostTagProvider = (props) => {

    const [postTags, setPostTags] = useState([])

    const getAllPostTags = () => {
        return fetch(`http://localhost:8000/posttags`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("rareUser_id")}`
            }})
            .then(res => res.json())
            .then(setPostTags)
    }

    const addPostTag = (postTag) =>{
        return fetch(`http://localhost:8000/posttags`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rareUser_id")}`
            },
            body: JSON.stringify(postTag)
        })
        .then(getAllPostTags)
    
    }

    const removePostTag = (postTag) =>{
        return fetch(`http://localhost:8000/posttags/${postTag}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rareUser_id")}`
            }
        })
        .then(getAllPostTags)
    }

    useEffect(() => {
        getAllPostTags()
    }, [])

    

    return (
        <PostTagContext.Provider value={{
            postTags, getAllPostTags, addPostTag, removePostTag
        }}>
            {props.children}
        </PostTagContext.Provider>
    )
}