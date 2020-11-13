import React, { useContext } from "react"
import { Link } from "react-router-dom"
import {TagContext} from "./TagProvider"
import {PostTagContext} from "./PostTagProvider"
import "./tags.css"

export const TagAddList = (props) =>{
    const {tags} = useContext(TagContext)
    const {addPostTag, removePostTag, postTags} = useContext(PostTagContext)
    var pathArray = window.location.pathname.split('/')
    let postNumber = parseInt(pathArray[2])

    const CreatePostTag = (id) =>{
        addPostTag({
            post_id: postNumber,
            tag_id: parseInt(id)
        })
    }
const removePt = (currentTag) => {
    var tagToBeRemoved = postTags.find(pt => pt.tag.id === currentTag) 
    console.log(tagToBeRemoved)
    removePostTag(tagToBeRemoved.id)
}
return (
    <div className="tag_container">
        <h1 className = "heading">ALL TAGS</h1>
        <div className="tags_container">
            {
                tags.map(tag=>{
                    if (postTags.find(pt => pt.tag.label === tag.label)){
                    return(<>
                    <div>{tag.label}</div>
                    <div><button onClick={() => removePt(tag.id)} className="new_tag_btn">Remove Tag</button></div>
                    <div className="new_tag_btn_container">
                    </div>
                    </>)}
                    else{
                    return(<>
                        <div>{tag.label}</div>
                        <div><button onClick={() => CreatePostTag(tag.id)} className="new_tag_btn">Add Tag</button></div>
                        <div className="new_tag_btn_container">
                        </div>
                        </>)}                    
                })
            }
            <button className="btn btn-primary" onClick={() => props.history.push(`/posts/${postNumber}`)}>Done</button>
        </div>
    </div>
)
;
}