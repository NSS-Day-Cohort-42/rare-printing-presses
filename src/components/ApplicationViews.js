import React from "react"
import { Route } from "react-router-dom"
import PostsProvider from "./Posts/PostProvider"
import PostList from "./Posts/PostList"
import { Comment } from "./comment/Comment"
import { CommentProvider } from "./comment/CommentProvider"
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

            <CommentProvider>
            <Route exact path="/posts/:sampleId(\d+)" render={(props) => {
                        return <> 
                    <Comment {...props}/>
                        </>
                    }} />    
                </CommentProvider>

        <Route path="/logout" render={
            (props) => {
                localStorage.removeItem("user_id")
                props.history.push("/login")
                }
        } />
    </>
}