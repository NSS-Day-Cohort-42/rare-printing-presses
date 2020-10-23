import React from "react"
import { Route } from "react-router-dom"
import PostsProvider from "./Posts/PostProvider"
import PostList from "./Posts/PostList"
import { Comment } from "./comment/Comment"
import { CommentProvider } from "./comment/CommentProvider"
import { NavBar } from "./nav/NavBar"
import { CategoryForm } from "./categories/CategoryForm"
import { CategoriesProvider } from "./categories/CategoriesProvider";

export const ApplicationViews = () => {
    return <>
            <CategoriesProvider>
                <Route exact path="/category" render={(props) => {
                    return <> 
                        <CategoryForm history={props.history} />
                    </>
                }} />    
            </CategoriesProvider>
            
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

        <Route path="/logout" render={
            (props) => {
                localStorage.removeItem("user_id")
                props.history.push("/login")
                }
        } />
    </>
}