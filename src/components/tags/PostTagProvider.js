import React, {useEffect, useState} from "react"

export const PostTagContext = React.createContext()

export const PostTagProvider = (props) => {

    const [postTags, setPostTags] = useState([])

    const getPostTags = (post_id) => {
        return fetch(`http://localhost:8088/posts?post_id=${post_id}`)
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
            postTags, getPostTags
        }}>
            {props.children}
        </PostTagContext.Provider>
    )
}