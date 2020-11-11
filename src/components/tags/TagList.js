import React, { useContext } from "react"
import { Link } from "react-router-dom"
import {TagContext} from "./TagProvider"
import "./tags.css"

export const TagList = () =>{
    const {tags, removeTag} = useContext(TagContext)
    
    

return (
    <div className="tag_container">
        <h1 className = "heading">ALL TAGS</h1>
        <div className="tags_container">
            {
                tags.map(tag=>{
                    return(<>
                    <div>{tag.label}</div>
                    <button className="new_tag_btn" onClick={() => removeTag(tag.id)}>Delete</button>
                    <div className="new_tag_btn_container"> <Link to={`/edittag/${tag.id}`}>
                    <button onClick={() => localStorage.setItem("currentLabel", tag.label)} className="new_tag_btn">Edit Tag</button>
            </Link></div>
                    </>)
                })
            }
        </div>
        
        <div className="new_tag_btn_container"> <Link to={"/createtag"}>
        <button className="new_tag_btn">New Tag</button> 
            </Link></div>

    </div>
)
;
}