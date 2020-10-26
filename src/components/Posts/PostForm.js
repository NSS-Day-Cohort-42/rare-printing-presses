import React, { useContext, useEffect, useState, useRef } from "react"
import { PostContext } from "./PostProvider"
import "./Post.css"
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

export const PostForm = (props) => {
    const { posts, getAllPosts, post, getSinglePost, createPost, deletePost, editPost } = useContext(ShowContext)
    const [post, setPost] = useState({})

    const editMode = props.match.params.hasOwnProperty("postId")

    const handleControlledInputChange = (event) => {

        const newPost = Object.assign({}, post)
        newPost[event.target.name] = event.target.value
        setShow(newPost)
    }

    const getPostInEditMode = () => {
        if (editMode) {
            const postId = parseInt(props.match.params.postId)
            const selectedPost = posts.find(post => post.id === postId) || {}
            setShow(selectedPost)
        }
    }
}