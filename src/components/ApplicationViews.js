import React from "react"
import { Route } from "react-router-dom"
import PostsProvider from "./Posts/PostProvider"
import PostList from "./Posts/PostList"
import { Comment } from "./comment/Comment"
import { CommentProvider } from "./comment/CommentProvider"
import { NavBar } from "./nav/NavBar"
import { CategoryForm } from "./categories/CategoryForm"
import { CategoriesProvider } from "./categories/CategoriesProvider";
import { CategoriesList } from "./categories/CategoriesList"

export const ApplicationViews = () => {
    return <>
            <CategoriesProvider>
                <Route exact path="/addCategory" render={(props) => {
                    return <> 
                        <CategoryForm history={props.history} />
                    </>
                }} />       
            </CategoriesProvider>
            
            <PostsProvider>
                <CommentProvider>
                    <CategoriesProvider>
                        <Route exact path="/posts" render={(props) => {
                            return <> 
                                <PostList history={props.history} />
                                <Comment {...props}/>
                            </>
                        }} />
                        <Route path="/categories" render={(props) => {
                    return <> 
                        <CategoriesList history={props.history} />
                    </>
                }} />    
                    </CategoriesProvider>
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