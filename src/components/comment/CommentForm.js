import React, { useContext, useRef, useEffect, useState } from "react"
import { Route, Link } from "react-router-dom"
import "./Comment.css"
import { CommentContext } from "./CommentProvider"
import { PostContext } from "../Posts/PostProvider"
import { DateTime } from "luxon"


export const Comment = (props) => {
    const { comments, addComment, getComment, deleteComment, getSingleComment, updateComment, setComments} = useContext(CommentContext)
    const { getAllPosts, singlePost } = useContext(PostContext)
    const [post, setPost] = useState([])
    const subject = useRef()
    const comment = useRef()
    var pathArray = window.location.pathname.split('/')
    let postNumber = parseInt(pathArray[2])
    const thisPost = comments.filter(comment => comment.post.id === postNumber)

    useEffect(() => {
        getComment()
        getAllPosts()
    }, [])
    
    const now = DateTime.local()
    const add_new_comment = () => {
        addComment({
            post_id: postNumber,
            subject: subject.current.value,
            content: comment.current.value,
            created_on: now.toISODate()
        })
    }
}
