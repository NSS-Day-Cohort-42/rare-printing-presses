import React, { useContext, useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import { PostContext } from "./PostProvider" 
import {CategoryContext} from "../categories/CategoriesProvider"
import "./Post.css"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export const PostList = (props) => {
    const { posts, getAllPosts, getPostsByCategoryId, deletePost } = useContext(PostContext)
    const { categories, getAllCategories} = useContext(CategoryContext)


    useEffect(() => {
        getAllPosts()
            .then(getAllCategories)
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

    const classes = useStyles()
    const categoryRef = useRef("")

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

    const filterPosts = (value) => {
        if (value ==="0") {
            getAllPosts()
        } else {
            getPostsByCategoryId(value)
        }

    }

    const userPosts = posts.filter(p => p.IsAuthor === true)

    return (
        <>
            <article className="createArticle">
                <Button variant="outlined" color="primary" className="createPostButton" onClick={() => props.history.push("/posts/create")}>Create Post</Button>
            </article>
            <section className="filteredPosts">
                <label htmlFor="category_id">Filter By Category</label>
                    <select name="category_id" ref={categoryRef} className="form-control" 
                    onChange={event => {
                        event.preventDefault()
                        filterPosts(categoryRef.current.value)
                    }}>
                        <option value="0">Select a Category</option>
                        {categories.map(c => (
                            <option key={c.id} value={c.id}>
                                {c.label}
                            </option>
                        ))}
                    </select>
            </section>

            <article className="postsContainer">
                {
                    userPosts.map(post => {
                        // const category = categories.find(c => c.id === post.category_id) || {}
                        
                        return <section key={post.id} className="posts">
                                    <div className="post-info">
                                        <div className="PostAuthor">Author: {post.rare_user.user.first_name} {post.rare_user.user.last_name}</div>
                                        <div className="PostTitle"><Link to={{pathname:`/posts/${post.id}`}}>{post.title}</Link></div>
                                        <div className="PostCategory"><Link className="category-list-link" to={{pathname:"/categories"}}> {post.category.label}</Link></div>
                                    </div>
                                    <div className="post-icons">
                                        <Button className="postDetailsButton" 
                                                onClick={() => {
                                                        props.history.push(`/posts/edit/${post.id}`)
                                                }}>
                                                <EditIcon style={{ fontSize: 20 }} className={classes.primary} /> 
                                        </Button>
                                        <Button className="btn postDetails__delete_btn" onClick={() => delete_prompt(post.id)}><DeleteIcon style={{ fontSize: 20 }} className={classes.primary} /> </Button>
                                    </div>
                                    </section>
                    })
                }
            </article>
        </>
    )
}

export default PostList