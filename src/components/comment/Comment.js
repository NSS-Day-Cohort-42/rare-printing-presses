import React, { useContext, useRef, useEffect } from "react"
import { Route, Link } from "react-router-dom"
import "./Comment.css"
import { CommentContext } from "./CommentProvider"

export const Comment = (props) => {
    const { comments, addComment, getComment, deleteComment, updateComment, setComments} = useContext(CommentContext)
    const subject = useRef()
    const comment = useRef()
    let editMode = false

    useEffect(() => {
        getComment()
        console.log(editMode)
    }, [])

    // const getCommentInEditMode = () => {
    //     if (editMode) {
    //         const commentId = parseInt(props.match.params.id)
    //         const comment = comments.find(a => a.id === commentId) || {}
    //         setComments(selectedComment)
    //     }
    // }

    const add_new_comment = () => {
        addComment({
            user_id: 1,
            post_id: 1,
            subject: subject.current.value,
            content: comment.current.value
        })
        .then(() => props.history.push("/"))
}

const switch_to_edit = () => {
    editMode = true
}

    return (
        <main style={{ textAlign: "center" }}>

            <form className="comments-form">
                <h1 className="h3 mb-3 font-weight-normal">Comments:</h1>{
                comments.map(comment => {
                    return <> 
                    <section key={comment.id} className="comments">
                    <h3>{comment.subject}</h3>
                    <div>{comment.content}</div>
                    <button onClick={() => switch_to_edit()}>Edit</button>
                    <button onClick={() => deleteComment(comment.id)}>Delete</button>
                    </section>
                    </>
                })}
                <div>
                </div>
                <h1>Add a Comment</h1>
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
                Submit
            </button>
                </fieldset>
            </form>
        </main>
    )
}