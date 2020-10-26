import React from "react"
import { Route } from "react-router-dom"
import { TagForm } from "./tags/TagForm"
import { TagList } from "./tags/TagList"
import { TagProvider } from "./tags/TagProvider"
import PostsProvider from "./Posts/PostProvider"
import PostList from "./Posts/PostList"
import { Comment } from "./comment/Comment"
import { CommentProvider } from "./comment/CommentProvider"
import { NavBar } from "./nav/NavBar"

export const ApplicationViews = () => {
    return <>
        <TagProvider>
            <Route exact path="/tag">
                <TagList />
            </Route>
            <Route exact path="/createtag" render={
                props => <TagForm {...props} />
            }>
            </Route>
        </TagProvider>




        <PostsProvider>
            <CommentProvider>
                <Route exact path="/posts" render={(props) => {
                    return <>
                        <PostList history={props.history} />
                        <Comment {...props} />
                    </>
                }} />
            </CommentProvider>
        </PostsProvider>

        <Route path="/logout" render={
            (props) => {
                localStorage.removeItem("user_id")
                props.history.push("/login")
            }
        } />
    </>
}