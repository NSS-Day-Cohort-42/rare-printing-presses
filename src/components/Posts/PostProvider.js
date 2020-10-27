import React, { useState } from "react"

export const PostContext = React.createContext()

export const PostsProvider = (props) => {
    const [posts, setPosts] = useState([])
    const [singlePost, setPost] = useState([])

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

    const createPost = post => {
        return fetch("http://localhost:8088/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })
            .then(getAllPosts)
    }

    const deletePost = (postId) => {
        console.log("delete method")
        return fetch(`http://localhost:8088/posts/${postId}`, {
            method: "DELETE"
        })
            .then(getAllPosts)
    }

    const editPost = post => {
        return fetch(`http://localhost:8088/posts/${post.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })
            .then(getAllPosts)
    }

    const getPostsByCategoryId = category_id => {
        return fetch(`http://localhost:8088/posts?category_id=${category_id}`)
            .then(res => res.json())
            .then(setPosts);
    };

    return (
        <PostContext.Provider value={{
            posts, getAllPosts, singlePost, getSinglePost,
            createPost, editPost, deletePost, getPostsByCategoryId
        }}>
            {props.children}
        </PostContext.Provider>
    )
}

export default PostsProvider