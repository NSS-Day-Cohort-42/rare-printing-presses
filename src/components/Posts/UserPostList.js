import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { PostContext } from "./PostProvider" 
import {CategoryContext} from "../categories/CategoriesProvider"
import {users} from "../auth/AuthProvider"
import "./Post.css"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export const UserPostList = (props) => {
    const { posts, getAllPosts } = useContext(PostContext)
    const { categories, getAllCategories} = useContext(CategoryContext)
    let yourPosts = posts.filter(post => post.user_id === parseInt(localStorage.getItem("user_id")))
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
                        <article className="createArticle">
                <Button variant="outlined" color="primary" className="createPostButton" onClick={() => props.history.push("/Post/create")}>Create Post</Button>
            </article>
            

            <article className="postsContainer">
                {
                    yourPosts.map(post => {
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
        </>
    )
}

export default UserPostList