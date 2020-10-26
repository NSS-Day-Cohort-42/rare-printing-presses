import React from "react"
import { Route } from "react-router-dom"
import { TagForm } from "./tags/TagForm"
import { TagList } from "./tags/TagList"
import { TagProvider } from "./tags/TagProvider"
import PostsProvider from "./Posts/PostProvider"
import PostList from "./Posts/PostList"
import { Comment } from "./comment/Comment"
import { EditCommentForm } from "./comment/EditCommentForm"
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

            <PostsProvider>
            <CommentProvider>
            <Route exact path="/comments/:sampleId(\d+)" render={(props) => {
                        return <>
                    <EditCommentForm {...props}/>
                        </>
                    }} />    
                </CommentProvider>
                </PostsProvider>
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