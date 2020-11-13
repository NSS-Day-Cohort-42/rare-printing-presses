import React, { useContext, useRef, useEffect } from "react"
import { PostContext } from "../Posts/PostProvider" 
import { DateTime } from "luxon"

export const EditPostForm = (props) => {
    const {posts, getSinglePost} = useContext(PostContext)
    const subject = useRef()
    const comment = useRef()
    let newComment = {}
    let pathArray = window.location.pathname.split('/')
    let commentNumber = pathArray[2]

    useEffect(() => {
        getSingleComment(commentNumber).then(
        console.log(comments))
    }, [])

    const now = DateTime.local()

    return (
        <main style={{ textAlign: "center" }}>

            <form className="comments-form">
                <h1>Add a Comment</h1>
                <fieldset>
                    <input ref={subject} type="text" name="firstName" className="form-control" defaultValue={comments.subject} required autoFocus />
                </fieldset>
                <fieldset>
                    <textarea ref={comment} name="bio" className="form-control" defaultValue={comments.content} placeholder="Comment" />
                </fieldset>
                <fieldset style={{
                    textAlign: "center"
                }}>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault() // Prevent browser from submitting the form
                    newComment = {
                        id: parseInt(commentNumber),
                        post_id: comments.post.id,
                        subject: subject.current.value,
                        content: comment.current.value,
                        created_on: now.toISODate()
                    }
                    updateComment(newComment).then(() =>
                    props.history.push(`/posts/${comments.post.id}`))
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