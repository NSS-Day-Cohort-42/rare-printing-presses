import React, { useState } from "react"

export const PostContext = React.createContext()

export const PostsProvider = (props) => {
    const [posts, setPosts] = useState([])
    const [singlePost, setPost] = useState({rare_user: {user: {}},
    reactions: []})

    const getAllPosts = () => {
        return fetch(`http://localhost:8000/posts`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("rareUser_id")}`
            }})
            .then(res => res.json())
            .then(setPosts)
    }

   const getSinglePost = (post) => {
        return fetch(`http://localhost:8000/posts/${post}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("rareUser_id")}`
            }})
            .then(res => res.json())
            .then(setPost)
    }

    const createPost = post => {
        return fetch("http://localhost:8000/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rareUser_id")}`
            },
            body: JSON.stringify(post)
        })
            .then(getAllPosts)
    }

    const deletePost = (postId) => {
        return fetch(`http://localhost:8000/posts/${postId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rareUser_id")}`
            },
        })
            .then(getAllPosts)
    }

    const editPost = post => {
        return fetch(`http://localhost:8000/posts/${post.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rareUser_id")}`
            },
            body: JSON.stringify(post)
        })
            .then(getAllPosts)
    }

    const getPostTags = post_id => {
        return fetch(`http://localhost:8000/posts?category_id=${post_id}`)
            .then(res => res.json())
            .then(setPost);
    }

    const updatePostApproval = post => {
        return fetch(`http://localhost:8000/approvepost/${post}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rareUser_id")}`
            },
            body: JSON.stringify(post)
        })
            .then(getAllPosts)
    }

    return (
        <PostContext.Provider value={{
            posts, getAllPosts, singlePost, getSinglePost,
            createPost, editPost, deletePost, getPostTags, updatePostApproval
        }}>
            {props.children}
        </PostContext.Provider>
    )
}

export default PostsProvider