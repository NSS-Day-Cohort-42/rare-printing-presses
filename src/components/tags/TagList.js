import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { TagContext } from "./TagProvider"
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import "./tags.css"
import "../Posts/Post.css"

export const TagList = () => {
    const { tags, removeTag } = useContext(TagContext)

    const delete_prompt = (id) => {
        var retVal = window.confirm("Are you sure you want to delete your comment?");
        if (retVal == true) {
            removeTag(id)
            return true;
        } else {
            return false;
        }
    }

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
            color: "black",
        
        },
    },
}));

const classes = useStyles()

    return (
        <div className="tag_container">
            <h1 className="heading">ALL TAGS</h1>
            <div className="tags_container">
                {
                    tags.map(tag => {
                        return (<>
                            <div className="tagContainer">
                               
                                <button className="tag-edit-del-btn" onClick={() => delete_prompt(tag.id)}><DeleteIcon/></button>
                                <div> <Link to={`/edittag/${tag.id}`}>
                                    <button onClick={() => localStorage.setItem("currentLabel", tag.label)} className="tag-edit-del-btn"><EditIcon/></button>
                                </Link></div>
                                <div className="tagLabel">{tag.label}</div>
                            </div>
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