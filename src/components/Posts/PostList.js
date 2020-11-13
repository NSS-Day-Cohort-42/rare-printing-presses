import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { PostContext } from "./PostProvider" 
import "./Post.css"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

export const PostList = (props) => {
    const { posts, getAllPosts } = useContext(PostContext)


    useEffect(() => {
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

    const classes = useStyles()

    return (
        <>
            <article className="createArticle">
                <Button variant="outlined" color="primary" className="createPostButton" onClick={() => props.history.push("/Post/create")}>Create Post</Button>
            </article>

            <article className="postsContainer">
                {
                    posts.map(post => {
                        
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
                                    </div>
                                    </section>
                    })
                }
            </article>
        </>
    )
}

export default PostList