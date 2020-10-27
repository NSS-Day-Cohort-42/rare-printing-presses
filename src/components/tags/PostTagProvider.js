import React, {useEffect, useState} from "react"

export const PostTagContext = React.createContext()

export const PostTagProvider = (props) => {

    const [postTags, setPostTags] = useState([])

    const getPostTags = () => {
        return fetch("http://localhost:8088/posttags")
        .then(res => res.json())
        .then(setPostTags)
    } 
    
    useEffect(() => {
        getPostTags()
    }, [])

    useEffect(() => {

    }, [postTags])

    return (
        <PostTagContext.Provider value={{
            PostTags, getPostTags
        }}>
            {props.children}
        </PostTagContext.Provider>
    )
}