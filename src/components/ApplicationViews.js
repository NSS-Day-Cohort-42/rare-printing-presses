import React from "react"
import { Route } from "react-router-dom"
import PostsProvider from "./Posts/PostProvider"
import PostList from "./Posts/PostList"
import { NavBar } from "./nav/NavBar"

export const ApplicationViews = () => {
    return <>
            <PostsProvider>

                <Route exact path="/posts" render={(props) => {
                    return <> 
                        <PostList history={props.history} />
                    </>
                }} />    
            </PostsProvider>







        <Route path="/logout" render={
            (props) => {
                localStorage.removeItem("user_id")
                props.history.push("/login")
                }
        } />
    </>
}
