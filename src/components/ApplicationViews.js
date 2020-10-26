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
import { CategoryForm } from "./categories/CategoryForm"
import { CategoriesProvider } from "./categories/CategoriesProvider";
import { CategoriesList } from "./categories/CategoriesList"
import { PostForm } from "./Posts/PostForm"

export const ApplicationViews = () => {
    return <>
            <CategoriesProvider>
                <Route exact path="/addCategory" render={(props) => {
                    return <> 
                        <CategoryForm history={props.history} />
                    </>
                }} />    
                <Route exact path="/categories" render={(props) => {
                    return <> 
                        <CategoriesList history={props.history} />
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
                    <Route exact path="/comments/:sampleId(\d+)" render={(props) => {
                        return <>
                            <EditCommentForm {...props}/>
                        </>
                    }} />     
                </CommentProvider>
            </PostsProvider>

            <CommentProvider>
            <Route exact path="/posts/:sampleId(\d+)" render={(props) => {
                        return <> 
                    <Comment {...props}/>
                        </>
                    }} />    
                </CommentProvider>


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