import React from "react"
import { Route } from "react-router-dom"
import PostsProvider from "./Posts/PostProvider"
import PostList from "./Posts/PostList"
import { Comment } from "./comment/Comment"
import { CommentProvider } from "./comment/CommentProvider"
import { NavBar } from "./nav/NavBar"
import { PostForm } from "./Posts/PostForm"

export const ApplicationViews = () => {
    return <>
            <PostsProvider>
                <CommentProvider>
                    <Route exact path="/posts" render={(props) => {
                        return <> 
                            <PostList history={props.history} />
                    <Comment {...props}/>
                        </>
                    }} />    
                </CommentProvider>
            </PostsProvider>

            <PostsProvider>
                <Route path="/Post/create" render ={(props) => {
                            return <PostForm {...props}/>
                        }}>
                </Route>
                <Route path="/Post/edit/:postId(\d+)" render ={(props) => {
                        return <PostForm {...props}/>
                    }}>
                </Route>
            </PostsProvider>

        <Route path="/logout" render={
            (props) => {
                localStorage.removeItem("user_id")
                props.history.push("/login")
                }
        } />
    </>
}