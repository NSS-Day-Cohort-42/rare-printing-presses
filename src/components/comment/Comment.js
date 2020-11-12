import React, { useContext, useRef, useEffect, useState } from "react"
import { Route, Link } from "react-router-dom"
import "./Comment.css"
import { CommentContext } from "./CommentProvider"
import { PostContext } from "../Posts/PostProvider"

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

    const add_new_comment = () => {
        addComment({
            post_id: postNumber,
            subject: subject.current.value,
            content: comment.current.value
        })
}

    const delete_prompt = (id) => {
            var retVal = window.confirm("Are you sure you want to delete your comment?");
            if( retVal == true ) {
                deleteComment(id)
            return true;
            } else {
            return false;
            }
        }
    return (
        <main style={{ textAlign: "center" }}>

            <form className="comments-form">
                <h1 className="h3 mb-3 font-weight-normal">Comments:</h1>{
                thisPost.map(comment => {
                    if (comment.IsAuthor){
                    return <>
                    <section className="commentContainer">
                        <section key={comment.id} className="comments">
                        <h3>{comment.subject}</h3>
                        <div>{comment.content}</div>
                        <button onClick={() => {
                            props.history.push(`/comments/${comment.id}`)
                            window.location.reload()}}>Edit</button>
                        <button onClick={() => delete_prompt(comment.id)}>Delete</button>
                        </section>
                    </section>
                    </>
                }
                
                else {
                    return <> 
                    <section key={comment.id} className="comments">
                    <h3>{comment.subject}</h3>
                    <div>{comment.content}</div>
                    </section>
                    </>
                }
                })}
                <div>
                </div>
                <h2>Add a Comment</h2>
                    <fieldset>
                        <input ref={subject} type="text" name="firstName" className="form-control" placeholder="Comment Subject" />
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