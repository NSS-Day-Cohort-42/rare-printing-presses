import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { PostContext } from "./PostProvider"
import { CategoryContext } from "../categories/CategoriesProvider"
import { PostTagContext, postTags } from "../tags/PostTagProvider"
import { TagContext } from "../tags/TagProvider"
// import {users} from "../auth/AuthProvider"
import "./PostDetail.css"
import { makeStyles } from '@material-ui/core/styles';
import { ReactionContext } from "../reactions/ReactionProvider"
// import { PostTagContext } from "../tags/PostTagProvider"

export const PostDetails = (props) => {
    const { singlePost, getSinglePost, deletePost } = useContext(PostContext)
    const { categories, getAllCategories } = useContext(CategoryContext)
    const { tags, getTags } = useContext(TagContext)
    const { reactions, getAllReactions, newPostReaction, newReaction } = useContext(ReactionContext)
    const [countObject, setCountObject] = useState({})
    const { postTags, getAllPostTags } = useContext(PostTagContext)

    var pathArray = window.location.pathname.split('/')
    let postNumber = parseInt(pathArray[2])



    useEffect(() => {

        getSinglePost(postNumber)
            .then(getAllCategories)
            .then(getAllPostTags)
            .then(getAllReactions)


    }, [])

    useEffect(() => {
        let object = {}
        singlePost.reactions.forEach(react => {
            if (object.hasOwnProperty(`${react.id}`)) {
                object[`${react.id}`]++
            } else {
                object[`${react.id}`] = 1
            }
        })
        setCountObject(object)
    }, [singlePost, newReaction])



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

    const singlePostUser = singlePost.rare_user
    const singlePostPubDate = singlePost.publication_date || ""
    const splitPubDate = singlePostPubDate.split('-')
    const correctPubDate = `${splitPubDate[1]}/${splitPubDate[2]}/${splitPubDate[0]} `
    // console.log(singlePost.publication_date)
    const classes = useStyles()
    const category = categories.find(c => c.id === singlePost.category_id) || {}
    if (singlePost.IsAuthor) {

        return (
            <>
                <div>
                    <article className="postDetailsContainer">
                        <article className="postDetails">
                            <div>{singlePost.date}</div>
                            <section className="postContent">
                                <div className="postDetailsTitle">{singlePost.title}</div>
                                <div className="postDetailsContent">{singlePost.content}</div>
                                <div className="postDetailsPubDate">{correctPubDate}</div>
                                <div className="postDetailsPubDate">{
                                    postTags.map(t => {
                                        return <p key={t.tag.label}>{t.tag.label}</p>
                                    })}</div>
                                <div className="postReactions">
                                {
                                        reactions.map(r => {
                                            return (<button className="reaction" key={r.label}>
                                                {
                                                    countObject.hasOwnProperty(r.id) ? countObject[`${r.id}`] : null
                                                }
                                                <img className="reaction_img" src={r.image_url} />{r.label}</button>)
                                        })
                                    }
                                </div>
                            </section>
                            <section className="contentTags">
                                <Link className="category-list-link" to={{ pathname: "/categories" }}> {category.label}</Link>
                            </section>
                            <button onClick={() => {
                                props.history.push(`/posts/${singlePost.id}`)
                                window.location.reload()
                            }}>
                                Edit
                            </button>

                        </article>
                    </article>
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <div>
                    <article className="postDetailsContainer">
                        <article className="postDetails">
                            <div>{singlePost.date}</div>
                            <section className="postContent">
                                <div className="postDetailsTitle">{singlePost.title}</div>
                                <div className="postDetailsContent">{singlePost.content}</div>
                                <div className="PostDetailsAuthor">Author: {singlePost.rare_user.user.first_name} {singlePost.rare_user.user.last_name}</div>
                                <div className="postDetailsPubDate">{correctPubDate}</div>
                                <div className="postDetailsPubDate">{
                                    postTags.map(t => {
                                        return <p key={t.tag.label}>{t.tag.label}</p>
                                    })}</div>
                                <div className="postReactions">
                                    {
                                        reactions.map(r => {
                                            return (<button className="reaction" key={r.label} onClick={()=>{
                                                newPostReaction({"post_id": singlePost.id, "reaction_id": r.id})
                                            }}>
                                                {
                                                    countObject.hasOwnProperty(r.id) ? countObject[`${r.id}`] : null
                                                }
                                                <img className="reaction_img" src={r.image_url} /></button>)
                                        })
                                    }
                                </div>
                                <button className="btn btn-primary" onClick={() => props.history.push(`/managetags/${postNumber}`)}>Manage Tags</button>
                            </section>
                            <section className="contentTags">
                                <Link className="category-list-link" to={{ pathname: "/categories" }}> {category.label}</Link>
                            </section>
                            <button onClick={() => props.history.push(`/posts/${singlePost.id}/viewcomments`)}>View Comments</button>
                            <button onClick={() => props.history.push(`/createcomment/${singlePost.id}`)}>Add Comment</button>
                        </article>
                    </article>
                </div>
            </>
        )
    }
}

export default PostDetails