import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { Comment } from "./comment/Comment"
import { CommentProvider } from "./comment/CommentProvider"

export const Rare = (props) => (
    <>
        <Route render={(props) => {
            if (localStorage.getItem("user_id")) {
                return <>
                    <NavBar />
                    <ApplicationViews />

                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />
        <Route path="/login" render={() => {
            if (localStorage.getItem("user_id")) {
                return <Redirect to="/" />
            } else {
                return <Login />
            }
        }} />
        <Route path="/register" render={props => <Register {...props} />} />
    </>
)
