import React, { useContext, useRef, useEffect, useState } from "react"
import { Route, Link } from "react-router-dom"
import "./Comment.css"
import { CommentContext } from "./CommentProvider"
import { PostContext } from "../Posts/PostProvider"
import { ProfileContext } from "../Profiles/ProfileProvider"
import { DateTime } from "luxon"
import { HumanDate } from "../utils/HumanDate"


export const Comment = (props) => {
    const { comments, addComment, getComment, deleteComment, getSingleComment, updateComment, setComments} = useContext(CommentContext)
    const { getAllPosts, singlePost } = useContext(PostContext)
    const { getSingleProfile, singleProfile} = useContext(ProfileContext)
    const [post, setPost] = useState([])
    const subject = useRef()
    const comment = useRef()
    var pathArray = window.location.pathname.split('/')
    let postNumber = parseInt(pathArray[2])
    const thisPost = comments.filter(comment => comment.post.id === postNumber)
    let userNumber = localStorage.getItem("rareUser_number")

    useEffect(() => {
        getComment()
        getAllPosts()
        getSingleProfile(userNumber)
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
const delete_prompt = (id) => {
    var retVal = window.confirm("Are you sure you want to delete your comment?");
    if( retVal == true ) {
        deleteComment(id)
        return true;
    } else {
        return false;
    }
}

// const dateTest = Date.parse(comment[0].created_on)
// console.log(dateTest)

    return (
        <main style={{ textAlign: "center" }}>

            <form className="comments-form">
                <div><Link to={{pathname:`/posts`}}>Go Back</Link></div>
                <h1 className="h3 mb-3 font-weight-normal">Comments:</h1>{
                    thisPost.map(comment => {
                        if(singleProfile.is_staff){
                            return <>
                                <section className="commentContainer">
                                    <section key={comment.id} className="comments">
                                    <h3>{comment.subject}</h3>
                                    <div>{comment.content}</div>
                                    <div>{comment.created_on}</div>
                                    <div>{comment.author.user.first_name} {comment.author.user.last_name}</div>
                                    <button onClick={() => {
                                        props.history.push(`/comments/${comment.id}`)
                                        }}>Edit</button>
                                    <button onClick={() => delete_prompt(comment.id)}>Delete</button>
                                    </section>
                                </section>
                                </>
                        }
                        if (comment.IsAuthor){
                            return <>
                            <section className="commentContainer">
                                <section key={comment.id} className="comments">
                                <h3>{comment.subject}</h3>
                                <div>{comment.content}</div>
                                <div>{comment.created_on}</div>
                                <div>{comment.author.user.first_name} {comment.author.user.last_name}</div>
                                <button onClick={() => {
                                    props.history.push(`/comments/${comment.id}`)
                                    }}>Edit</button>
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
                            <div>{comment.created_on}</div>
                            </section>
                            </>
                        }
                    }
                    )   
                .reverse()
    }
            </form>
        </main>
    )
}