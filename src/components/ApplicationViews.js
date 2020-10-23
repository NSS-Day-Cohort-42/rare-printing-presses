import React from "react"
import { Route } from "react-router-dom"
import { NavBar } from "./nav/NavBar"

export const ApplicationViews = () => {
    return <>








        <Route path="/logout" render={
            (props) => {
                localStorage.removeItem("user_id")
                props.history.push("/login")
                }
        } />
    </>
}
