import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider" 
import "./Post.css"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

export const PostList = (props) => {
    const { posts, getAllPosts } = useContext(PostContext)

    useEffect(() => {
        getAllPosts()
    }, [])

    const useStyles = makeStyles((theme) => ({
            root: {
            '& > *': {
                margin: theme.spacing(1),
                color: "#EB5757",  
                position: "fixed",
                display: "flex",
                bottom: 0,
                background: "white",
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
            
            <article>
                <div><h2 className="Posts">Posts</h2></div>
            </article>

            <article className="postsContainer">
                {
                    posts.map(post => {
                            return <section key={post.id} className="posts">
                                        <div className="PostAuthor">Author: {post.id} </div>
                                        <div className="PostTitle">Title: {post.title} </div>
                                        <div className="PostContent">Content: {post.content}</div>
                                        <div className="PostCategory">Category: {post.category_id}</div>
                                    
                                    </section>
                            
                    })
                }
            </article>
            <section className={classes.root}>
                <Button className="addPostButton" onClick={() => props.history.push("/Post/create")}>
                </Button>
            </section>
        </>
    )
}

export default PostList