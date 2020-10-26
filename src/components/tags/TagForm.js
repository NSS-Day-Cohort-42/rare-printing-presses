import React, { useContext, useRef } from "react"
import { TagContext } from "./TagProvider"
import "./tags.css"


export const TagForm = (props) => {

    const {addTag} = useContext(TagContext)
    const label = useRef()




    return(
        <form className="tagForm">
            <h2 className="tagForm__title">Create New Tag</h2>
            <fieldset>
                <div className="tag-form">
                    
                    <input ref={label}type="text" name="label" required autoFocus className="tag-input"
                        placeholder="Enter Tag Label"
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    addTag({"label": label.current.value})
                    props.history.push("/tags")
                }}
                className="new-tag-submit">
                Add
            </button>
        </form>
    )

}