import React, { useContext, useEffect, useState, useRef } from "react"
import { PostContext } from "./PostProvider"
import { TagContext } from "../tags/TagProvider"
import { CategoryContext } from "../categories/CategoriesProvider"
import "./Post.css"
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

export const PostForm = (props) => {
    const { posts, getAllPosts, post, getSinglePost, createPost, deletePost, editPost } = useContext(PostContext)
    const { tags, getTags } = useContext(TagContext)
    const { categories, getAllCategories } = useContext(CategoryContext)
    const [postState, setPost] = useState({})
    const [tagState, setTags] = useState({})
    const [categoryState, setCategory] = useState({})

    const editMode = props.match.params.hasOwnProperty("postId")

    const handleControlledInputChange = (event) => {

        const newPost = Object.assign({}, postState)
        newPost[event.target.name] = event.target.value
        setPost(newPost)
    }

    const getPostInEditMode = () => {
        if (editMode) {
            const postId = parseInt(props.match.params.postId)
            const selectedPost = posts.find(post => post.id === postId) || {}
            setPost(selectedPost)
        }
    }

    useEffect(() => {
        getAllPosts()
        getAllCategories()
        getTags()
    }, [])

    useEffect(() => {
        getPostInEditMode()
    }, [posts])

    const constructNewPost = () => {

        if (editMode) {
            editPost({
                id: postState.id,
                title: postState.title,
                content: postState.content,
                date: postState.date,
                category_id: postState.catergory_id,
                user_id: parseInt(localStorage.getItem("user_id")),
            })
                .then(() => props.history.push("/posts"))
        } else {
            createPost({
                title: postState.title,
                content: postState.content,
                date: postState.date,
                category_id: postState.catergory_id,
                user_id: parseInt(localStorage.getItem("user_id")),
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
                        defaultValue={postState.title}
                        onChange={handleControlledInputChange} 
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content"></label>
                    <input type="text" name="content" required className="form-control"
                        placeholder="content"
                        defaultValue={postState.content}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date"></label>
                    <input type="date" name="date" required className="form-control"
                        placeholder="Date"
                        defaultValue={postState.date}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select defaultValue="" name="category" required className="form-control" >
                        <option value="1">Select an tag</option>
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
                        <option value="1">Select an tag</option>
                        {tagState.map(t => (
                            <option key={t.id} value={t.id}>
                                {t.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <section>
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