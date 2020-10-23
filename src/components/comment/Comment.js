import React, { useContext, useRef, useEffect } from "react"
import { Route, Link } from "react-router-dom"
import "./Comment.css"
import { CommentContext } from "./CommentProvider"

export const Comment = (props) => {
    const { addComment } = useContext(CommentContext)
    const subject = useRef()
    const comment = useRef()

    const add_new_comment = () => {
        addComment({
            user_id: 1,
            post_id: 1,
            subject: subject.current.value,
            content: comment.current.value
        })
        .then(() => props.history.push("/"))
}

    return (
        <main style={{ textAlign: "center" }}>

            <form className="form--login">
                <h1 className="h3 mb-3 font-weight-normal">Comments:</h1>
                <fieldset>
                    <input ref={subject} type="text" name="firstName" className="form-control" placeholder="Comment Subject" required autoFocus />
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
                Submit Comment
            </button>
                </fieldset>
            </form>
        </main>
    )
}