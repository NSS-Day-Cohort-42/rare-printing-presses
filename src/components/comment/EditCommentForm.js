import React, { useContext, useRef, useEffect } from "react"
import { Route, Link } from "react-router-dom"
import "./Comment.css"
import { CommentContext } from "./CommentProvider"
import { PostContext } from "../Posts/PostProvider" 

export const EditCommentForm = (props) => {
    const { comments, addComment, getComment, deleteComment, updateComment, setComments} = useContext(CommentContext)
    const {posts, getSinglePost} = useContext(PostContext)
    const subject = useRef()
    console.log(subject)
    const comment = useRef()
    let editMode = false

    useEffect(() => {
        getComment()
    }, [])

    const add_new_comment = () => {
        addComment({
            user_id: 1,
            post_id: 1,
            subject: subject.current.value,
            content: comment.current.value
        })
}

    return (
        <main style={{ textAlign: "center" }}>

            <form className="comments-form">
                <h1>Add a Comment</h1>
                <fieldset>
                    <input ref={subject} type="text" name="firstName" className="form-control" value={subject} required autoFocus />
                </fieldset>
                <fieldset>
                    <textarea ref={comment} name="bio" className="form-control" placeholder="Comment" />
                </fieldset>
                <fieldset style={{
                    textAlign: "center"
                }}>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault() // Prevent browser from submitting the form
                    add_new_comment()
                }}
                className="btn btn-primary">
                Submit
            </button>
            <button className="btn btn-primary" onClick={() => props.history.push(`/posts/`)}>Cancel</button>
                </fieldset>
            </form>
        </main>
    )
}