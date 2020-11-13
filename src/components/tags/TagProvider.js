import React, {useEffect, useState} from "react"

export const TagContext = React.createContext()

export const TagProvider = (props) => {

    const [tags, setTags] = useState([])

    const getTags = () => {
        return fetch("http://localhost:8000/tags", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rareUser_id")}`
            }
        })
        .then(res => res.json())
        .then(setTags)
    }

    const addTag = (tag) =>{
        return fetch("http://localhost:8000/tags", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rareUser_id")}`
            },
            body: JSON.stringify(tag)
        })
        .then(getTags)
    }

    const removeTag = (tag) =>{
        return fetch(`http://localhost:8000/tags/${tag}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rareUser_id")}`
            },
        })
        .then(getTags)
    
    }

    const editTag = (tag, payload) => {
        return fetch(`http://localhost:8000/tags/${tag}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rareUser_id")}`
            },
            body: JSON.stringify(payload)
        })
            .then(getTags)
    }

    useEffect(() => {
        getTags()
    }, [])

    useEffect(() => {

    }, [tags])

    return (
        <TagContext.Provider value={{
            tags, getTags, addTag, removeTag, editTag
        }}>
            {props.children}
        </TagContext.Provider>
    )
}
