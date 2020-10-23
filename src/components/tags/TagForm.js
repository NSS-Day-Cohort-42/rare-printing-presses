import React, { useContext, useRef } from "react"
import { TagContext } from "./TagProvider"
import "./tags.css"


export const TagForm = (props) => {

    const {addTag} = useContext(TagContext)
    const label = useRef()




    return(
        <form className="tagForm">
            <h2 className="animalForm__title">Create New Tag</h2>
            <fieldset>
                <div className="tag-form">
                    <label htmlFor="label">Tag Label: </label>
                    <input ref={label}type="text" name="label" required autoFocus className="tag-input"
                        placeholder="Tag"
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    addTag({"label": label.current.value})
                    props.history.push("/")
                }}
                className="new-tag-submit">
                Add
            </button>
        </form>
    )

}