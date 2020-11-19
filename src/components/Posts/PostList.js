import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { PostContext } from "./PostProvider" 
import { ProfileContext } from "../Profiles/ProfileProvider" 
import "./Post.css"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {HumanDate} from '../utils/HumanDate'
import { DateTime } from "luxon"

export const PostList = (props) => {
    const { posts, getAllPosts, deletePost, updatePostApproval } = useContext(PostContext)
    const { getSingleProfile, singleProfile } = useContext(ProfileContext)

    
    const currentUser = localStorage.getItem("rareUser_number")

    useEffect(() => {
        getSingleProfile(currentUser)
        getAllPosts()
    }, [])

    const useStyles = makeStyles((thbe) => ({
            root: {
            '& > *': {
                margin: thbe.spacing(1),
                color: "#EB5757",  
                position: "fixed",
                display: "flex",
                bottom: 0,
                background: "black",
                margin: 0
            },
        },
        primary: {
            '& > *': {
                color: "black"
            },
        },
    }));

    const delete_prompt = (id) => {
        var retVal = window.confirm("This action will permanently delete the post. Are you sure?");
        if( retVal == true ) {
            deletePost(id)
            props.history.push("/posts")
            return true;
        } else {
            return false;
        }
    }

    const approve_post_prompt = (id) => {
        var retVal = window.confirm("Are you sure you want to approve this user's post?");
        if( retVal == true ) {
            updatePostApproval(id)
            props.history.push("/posts")
            return true;
        } else {
            return false;
        }
    }

    const unapprove_post_prompt = (id) => {
        var retVal = window.confirm("Are you sure you want to unapprove this user's post?");
        if( retVal == true ) {
            updatePostApproval(id)
            props.history.push("/posts")
            return true;
        } else {
            return false;
        }
    }

    
    const classes = useStyles()
    
    return (
        <>
            <article className="createArticle">
                <Button variant="outlined" color="primary" className="createPostButton" onClick={() => props.history.push("/posts/create")}>Create Post</Button>
            </article>

            <article className="postsContainer">
                {
                    posts.map(post => {
                        if(singleProfile.is_staff){
                                    return <section key={post.id} className="posts">
                                        <div className="post-info">
                                                    <div className="PostTitle"><Link to={{pathname:`/posts/${post.id}`}}>{post.title}</Link></div>
                                                    <div className="PostCategory"><Link className="category-list-link" to={{pathname:"/categories"}}> {post.category.label}</Link></div>
                                                    <div className="image"><img src={post.image_url}></img></div>
                                                    <div className="PostAuthor">Author: {post.rare_user.user.first_name} {post.rare_user.user.last_name}</div>
                                                </div>
        
                                                <div className="post-icons">
                                                    <Button className="postDetailsButton" 
                                                            onClick={() => {
                                                                    props.history.push(`/posts/edit/${post.id}`)
                                                            }}>
                                                            <EditIcon style={{ fontSize: 40 }} className={classes.primary} /> 
                                                    </Button>
                                                    <button className="btn postDetails__delete_btn" onClick={() => delete_prompt(post.id)}><DeleteIcon style={{ fontSize: 40 }} className={classes.primary} /></button>
                                                </div>
                                                {
                                                        (post.approved === false) ?                         
                                                            <button className={post.id} onClick={() => approve_post_prompt(post.id)}>Approve</button>
                                                        : <button className={post.id} onClick={() => unapprove_post_prompt(post.id)}>Unapprove</button>
                                                }   
                                            </section>
                        } else {
                            if(post.approved){
                                if(post.IsAuthor){
                                    return <section key={post.id} className="posts">
                                        <div className="post-info">
                                                    <div className="PostTitle"><Link to={{pathname:`/posts/${post.id}`}}>{post.title}</Link></div>
                                                    <div className="PostCategory"><Link className="category-list-link" to={{pathname:"/categories"}}> {post.category.label}</Link></div>
                                                    <div className="image"><img src={post.image_url}></img></div>
                                                    <div className="PostAuthor">{post.rare_user.user.first_name} {post.rare_user.user.last_name}</div>
                                                </div>
        
                                                <div className="post-icons">
                                                    <Button className="postDetailsButton" 
                                                            onClick={() => {
                                                                    props.history.push(`/posts/edit/${post.id}`)
                                                            }}>
                                                            <EditIcon style={{ fontSize: 40 }} className={classes.primary} /> 
                                                    </Button>
                                                    <Button className="postDetailsButton" onClick={() => delete_prompt(post.id)}><DeleteIcon style={{ fontSize: 40 }} className={classes.primary} /></Button>
                                                </div>
                                                {
                                                    (singleProfile.is_staff)?
                                                        (post.approved === false) ?                         
                                                            <button className={post.id} onClick={() => approve_post_prompt(post.id)}>Approve</button>
                                                        : <button className={post.id} onClick={() => unapprove_post_prompt(post.id)}>Unapprove</button>
                                                    : <div></div>
                                                }   
                                            </section>
                                } else {
                                    return <section key={post.id} className="posts">
                                            <div className="post-info">
                                                <div className="PostTitle"><Link to={{pathname:`/posts/${post.id}`}}>{post.title}</Link></div>
                                                <div className="PostCategory"><Link className="category-list-link" to={{pathname:"/categories"}}> {post.category.label}</Link></div>
                                                <div className="image"><img src={post.image_url}></img></div>
                                                <div className="PostAuthor">Author: {post.rare_user.user.first_name} {post.rare_user.user.last_name}</div>
                                            </div>
                                            <div className="post-icons"></div>
                                            
                                            {
                                                (singleProfile.is_staff)?
                                                    (post.approved === false) ?                         
                                                        <button className={post.id} onClick={() => approve_post_prompt(post.id)}>Approve</button>
                                                    : <button className={post.id} onClick={() => unapprove_post_prompt(post.id)}>Unapprove</button>
                                                : <div></div>
                                            }
                                        </section>
                                }
                        }
                        }
                    }
                    )
                    .reverse()
                }

            </article>
        </>
    )
}

export default PostList