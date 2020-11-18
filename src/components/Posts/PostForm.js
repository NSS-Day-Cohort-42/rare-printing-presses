import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import { TagContext } from "../tags/TagProvider"
import { CategoryContext } from "../categories/CategoriesProvider"
import "./Post.css"
import Button from '@material-ui/core/Button';
import { DateTime } from "luxon"

export const PostForm = (props) => {
    const { posts, getAllPosts, createPost, editPost } = useContext(PostContext)
    const { tags, getTags } = useContext(TagContext)
    const { categories, getAllCategories } = useContext(CategoryContext)
    const [postState, setPost] = useState({})

    const editMode = props.match.params.hasOwnProperty("postId")
    
    // console.log(editMode, "editmode")

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
        getPostInEditMode()
    }, [])
    
    const edit_prompt = (id) => {
        var retVal = window.confirm("Are you sure you want to save edits?");
        if( retVal == true ) {
            constructNewPost()
            props.history.push("/posts")
            return true;
        } else {
            return false;
        }
    }

    const constructNewPost = () => {
        const categoryId = parseInt(postState.category_id)
        const now = DateTime.local()
        if (editMode) {
            editPost({
                id: postState.id,
                title: postState.title,
                content: postState.content,
                date: now.toISODate(),
                category_id: categoryId,
                image_url: postState.image_url,
                approved: false
            })

                .then(() => props.history.push("/posts"))
        } else {
            createPost({
                title: postState.title,
                content: postState.content,
                date: now.toISODate(),
                category_id: categoryId,
                image_url: "",
                approved: false
            })
                .then(() => props.history.push("/posts"))
        }
    }
    const startDate = new Date()
// form needs image url option
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
                        placeholder="Content"
                        defaultValue={postState.content}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="image_url"></label>
                    <input type="text" name="image_url" required className="form-control"
                        placeholder="Image Url (Optional)"
                        defaultValue={postState.image_url}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="category_id">Category</label>
                    <select name="category_id" className="form-control" 
                    value={postState.category_id} onChange={handleControlledInputChange}>
                        <option value="0">Select a category</option>
                        {categories.map(c => (
                            <option key={c.id} value={c.id}>
                                {c.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <section>
                <Button className="savePostButton" variant="contained" type="submit"
                    onClick={evt => {
                        evt.preventDefault() 
                        if(editMode) {
                            edit_prompt(postState.id)
                        } else {
                            constructNewPost()
                        }
                    }}
                    className="btn btn-primary">
                    Save Post
                </Button>
            </section>
        </form>
    )
}