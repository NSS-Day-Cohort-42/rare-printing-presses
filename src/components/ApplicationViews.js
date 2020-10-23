import React from "react"
import { Route } from "react-router-dom"
import PostsProvider from "./Posts/PostProvider"
import PostList from "./Posts/PostList"
import { NavBar } from "./nav/NavBar"
import { CategoryForm } from "./categories/CategoryForm"
import { CategoriesProvider } from "./categories/CategoriesProvider";

export const ApplicationViews = () => {
    return <>
            <PostsProvider>
                <Route exact path="/posts" render={(props) => {
                    return <> 
                        <PostList history={props.history} />
                    </>
                }} />    
            </PostsProvider>

            <CategoriesProvider>
                <Route exact path="/category" render={(props) => {
                    return <> 
                        <CategoryForm history={props.history} />
                    </>
                }} />    
            </CategoriesProvider>







        <Route path="/logout" render={
            (props) => {
                localStorage.removeItem("user_id")
                props.history.push("/login")
                }
        } />
    </>
}
