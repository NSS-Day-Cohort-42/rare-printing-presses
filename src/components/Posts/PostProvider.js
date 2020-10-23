import React, { useState } from "react"

export const PostContext = React.createContext()

export const PostsProvider = (props) => {
    const [posts, setPosts] = useState([])
    const [post, setPost] = useState([])

    const getAllPosts = () => {
        return fetch(`http://localhost:8088/posts`)
            .then(res => res.json())
            .then(setPosts)
    }

    const getSinglePost = (post) => {
        return fetch(`http://localhost:8088/posts/${post}`)
            .then(res => res.json())
            .then(setPost)
    }

    return (
        <PostContext.Provider value={{
            posts, getAllPosts, post, getSinglePost
        }}>
            {props.children}
        </PostContext.Provider>
    )
}

export default PostsProvider