import React, { useContext, useRef } from "react"
import { TagContext } from "./TagProvider"
import "./tags.css"


export const TagForm = (props) => {

    const { tags, addTag, editTag } = useContext(TagContext)
    const label = useRef()
    var tagRouteNo = window.location.pathname.split("/")
    if (window.location.pathname.includes("/edittag")) {
        return (
            <>
                <div className="tag_container">
                    <h2 className="heading">Edit Tag</h2>
                    <form className="tagForm">
                        <fieldset>
                            <div className="tag-form">

                                <input ref={label} type="text" name="label" required autoFocus className="tag-input"
                                    value={localStorage.getItem("currentLabel")}
                                />
                            </div>
                        </fieldset>
                        <button type="submit"
                            onClick={evt => {
                                evt.preventDefault()
                                editTag(tagRouteNo[2], { "label": label.current.value })
                                props.history.push("/tag")
                            }}
                            className="new-tag-submit">
                            Submit New Name
                </button>
                        <button type="submit"
                            onClick={evt => {
                                evt.preventDefault()
                                props.history.push("/tag")
                            }}
                            className="new-tag-submit">
                            Cancel
                </button>
                    </form>
                </div>
            </>
        )
    }
    else {
        return (
            <div className="tag_container">
                <h2 className="heading">Create New Tag</h2>
                <form className="tagForm">
                    <fieldset>
                        <div className="tag-form">

                            <input ref={label} type="text" name="label" required autoFocus className="tag-input"
                                placeholder="Enter Tag Label"
                            />
                        </div>
                    </fieldset>
                    <button type="submit"
                        onClick={evt => {
                            evt.preventDefault()
                            addTag({ "label": label.current.value })
                            props.history.push("/tag")
                        }}
                        className="new-tag-submit">
                        Add
            </button>
                </form>
            </div>
        )

    }
}