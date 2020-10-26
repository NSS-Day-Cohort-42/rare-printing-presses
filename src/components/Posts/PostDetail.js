import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { PostContext } from "./PostProvider" 
import {CategoryContext} from "../categories/CategoriesProvider"
import {users} from "../auth/AuthProvider"
import "./Post.css"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export const PostDetails = (props) => {
    const { singlePost, getSinglePost, deletePost } = useContext(PostContext)
    const { categories, getAllCategories} = useContext(CategoryContext)
    var pathArray = window.location.pathname.split('/')
    let postNumber = parseInt(pathArray[2])

    useEffect(() => {
        getSinglePost(postNumber)
            .then(getAllCategories)
            console.log(singlePost)
    }, [])

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
            <article className="postsContainer">
                    <div>{singlePost.title}</div>
                    <div>{singlePost.content}</div>
                    <button onClick={() => delete_prompt(singlePost.id)}>Delete</button>
            </article>
        </>
    )
}

export default PostDetails