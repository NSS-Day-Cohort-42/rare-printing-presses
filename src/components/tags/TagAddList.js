import React, { useContext } from "react"
import { Link } from "react-router-dom"
import {TagContext} from "./TagProvider"
import {PostTagContext} from "./PostTagProvider"
import "./tags.css"

export const TagAddList = () =>{
    const {tags} = useContext(TagContext)
    const {addPostTag, removePostTag} = useContext(PostTagContext)

    const CreatePostTag = (id) =>{
        var pathArray = window.location.pathname.split('/')
        let postNumber = parseInt(pathArray[2])
        addPostTag({
            post_id: postNumber,
            tag_id: parseInt(id)
        })
    }

return (
    <div className="tag_container">
        <h1 className = "heading">ALL TAGS</h1>
        <div className="tags_container">
            {
                tags.map(tag=>{
                    return(<>
                    <div><button onClick={() => CreatePostTag(tag.id)} className="new_tag_btn">{tag.label}</button></div>
                    <div className="new_tag_btn_container">
            </div>
                    </>)
                })
            }
        </div>
    </div>
)
;
}