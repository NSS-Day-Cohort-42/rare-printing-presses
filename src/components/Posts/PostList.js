import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { PostContext } from "./PostProvider" 
import {CategoryContext} from "../categories/CategoriesProvider"
import {users} from "../auth/AuthProvider"
import "./Post.css"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export const PostList = (props) => {
    const { posts, getAllPosts } = useContext(PostContext)
    const { categories, getAllCategories} = useContext(CategoryContext)

    useEffect(() => {
        getAllPosts()
            .then(getAllCategories)
    }, [])

    const useStyles = makeStyles((theme) => ({
            root: {
            '& > *': {
                margin: theme.spacing(1),
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

    const classes = useStyles()

    return (
        <>
            {/* <article className="welcomeMessage">
                <section key={currentUser.id} className="user">
                    <div><h1 className="welcomeTitle">Hey, {currentUser.firstName}</h1></div>
                </section>
            </article> */}
            

            <article className="postsContainer">
                {
                    posts.map(post => {
                        const category = categories.find(c => c.id === post.category_id) || {}
                        // const userName = users.find(c => c.id === post.category_id) || {}
                        return <section key={post.id} className="posts">
                                        <div className="PostAuthor">Author: {post.user_id} </div>
                                        <div className="PostTitle">Title: {post.title} </div>
                                        <div className="PostCategory">Category:<Link className="category-list-link" to={{pathname:"/categories"}}> {category.label}</Link></div>
                                        <button className="postDetailsButton">
                                            <ArrowForwardIosIcon className={classes.primary} onClick={() => props.history.push(`/posts/${post.id}`)} />
                                        </button>
                                    </section>
                            
                    })
                }
            </article>
            <button className="addPostButton" onClick={() => props.history.push("/Post/create")}>Create Post</button>
        </>
    )
}

export default PostList