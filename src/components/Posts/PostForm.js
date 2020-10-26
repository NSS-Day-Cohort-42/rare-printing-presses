import React, { useContext, useEffect, useState, useRef } from "react"
import { PostContext } from "./PostProvider"
import "./Post.css"
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

export const PostForm = (props) => {
    const { posts, getAllPosts, post, getSinglePost, createPost, deletePost, editPost } = useContext(ShowContext)
    const [post, setPost] = useState({})

    const editMode = props.match.params.hasOwnProperty("postId")

    const handleControlledInputChange = (event) => {

        const newPost = Object.assign({}, post)
        newPost[event.target.name] = event.target.value
        setShow(newPost)
    }

    const getPostInEditMode = () => {
        if (editMode) {
            const postId = parseInt(props.match.params.postId)
            const selectedPost = posts.find(post => post.id === postId) || {}
            setShow(selectedPost)
        }
    }

    useEffect(() => {
        getAllPosts()
    }, [])

    useEffect(() => {
        getPostInEditMode()
    }, [posts])

    const constructNewPost = () => {

        if (editMode) {
            editPost({
                id: post.id,
                title: post.title,
                content: post.content,
                date: post.date,
                category_id: post.catergory_id,
                userId: parseInt(localStorage.getItem("user_id")),
            })
                .then(() => props.history.push("/posts"))
        } else {
            addShow({
                title: post.title,
                content: post.content,
                date: post.date,
                category_id: post.catergory_id,
                userId: parseInt(localStorage.getItem("user_id")),
            })
                .then(() => props.history.push("/posts"))
        }
    }

    return (
        <form className="postForm">
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title"></label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        placeholder="Title"
                        defaultValue={post.title}
                        onChange={handleControlledInputChange} 
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content"></label>
                    <input type="text" name="content" required className="form-control"
                        placeholder="content"
                        defaultValue={post.content}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date"></label>
                    <input type="date" name="date" required className="form-control"
                        placeholder="Date"
                        defaultValue={post.date}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select defaultValue="" name="category" required className="form-control" >
                        <option value="0">Select an tag</option>
                        {category.map(c => (
                            <option key={c.id} value={c.id}>
                                {c.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="tag">Category</label>
                    <select defaultValue="" name="tag" required className="form-control" >
                        <option value="0">Select an tag</option>
                        {tag.map(t => (
                            <option key={t.id} value={t.id}>
                                {t.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <section className={classes.buttonStyle}>
                <Button className="savePostButton" variant="contained" type="submit"
                    onClick={evt => {
                        evt.preventDefault() 
                        constructNewPost()
                    }}
                    className="btn btn-primary">
                    Save Post
                </Button>
            </section>
        </form>
    )
}