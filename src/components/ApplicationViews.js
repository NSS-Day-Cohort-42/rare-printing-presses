import React from "react"
import { Route } from "react-router-dom"
import { TagForm } from "./tags/TagForm"
import { TagList } from "./tags/TagList"
import { TagProvider } from "./tags/TagProvider"

export const ApplicationViews = () => {
    return <>
    <TagProvider>
        <Route exact path="/tag">
            <TagList/>
        </Route>
        <Route exact path="/createtag" render={
            props=> <TagForm {...props}/>
        }>
        </Route>
    </TagProvider>







        <Route path="/logout" render={
            (props) => {
                localStorage.removeItem("user_id")
                props.history.push("/login")
                }
        } />
    </>
}
