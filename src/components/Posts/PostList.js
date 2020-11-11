import React, { useContext, useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import { PostContext } from "./PostProvider" 
import {CategoryContext} from "../categories/CategoriesProvider"
import "./Post.css"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import EditIcon from '@material-ui/icons/Edit';
// import { ProfileContext, profile } from "../auth/AuthProvider"

export const PostList = (props) => {
    const { posts, getAllPosts, getPostsByCategoryId } = useContext(PostContext)
    const { categories, getAllCategories} = useContext(CategoryContext)
    // const { profile, getProfile } = useContext(ProfileContext)


    useEffect(() => {
        getAllPosts()
        // getProfile()
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

    const filterPosts = (value) => {
        if (value ==="0") {
            getAllPosts()
        } else {
            getPostsByCategoryId(value)
        }

    }
    return (
        <>
            <article className="createArticle">
                <Button variant="outlined" color="primary" className="createPostButton" onClick={() => props.history.push("/Post/create")}>Create Post</Button>
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
                    posts.map(post => {
                        const category = categories.find(c => c.id === post.category_id) || {}
                        // const userName = profile.find(c => c.id === post.user_id) || {}
                        return <section key={post.id} className="posts">
                                    <div className="post-info">
                                        {/* <div className="PostAuthor">{userName.name} </div> */}
                                        <div className="PostTitle">{post.title}</div>
                                        <div className="PostCategory"><Link className="category-list-link" to={{pathname:"/categories"}}> {category.label}</Link></div>
                                    </div>
                                    <div className="post-icons">
                                        <button className="postDetailsButton">
                                            <ArrowForwardIosIcon className={classes.primary} onClick={() => props.history.push(`/posts/${post.id}`)} />
                                        </button>
                                        <Button className="postDetailsButton" 
                                                onClick={() => {
                                                        props.history.push(`/posts/edit/${post.id}`)
                                                }}>
                                                <EditIcon style={{ fontSize: 20 }} className={classes.primary} /> 
                                        </Button>
                                    </div>
                                    </section>
                            
                    })
                }
            </article>
        </>
    )
}

export default PostList