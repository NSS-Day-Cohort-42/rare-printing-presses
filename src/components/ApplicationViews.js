import React from "react"
import { Route } from "react-router-dom"
import { TagForm } from "./tags/TagForm"
import { TagList } from "./tags/TagList"
import { TagProvider } from "./tags/TagProvider"
import PostsDetails, { PostDetails } from "./Posts/PostDetail"
import PostsProvider from "./Posts/PostProvider"
import PostList from "./Posts/PostList"
import UserPostList from "./Posts/UserPostList"
import { Comment } from "./comment/Comment"
import { EditCommentForm } from "./comment/EditCommentForm"
import { CommentProvider } from "./comment/CommentProvider"
import { NavBar } from "./nav/NavBar"
import { CategoriesProvider } from "./categories/CategoriesProvider";
import { CategoriesList } from "./categories/CategoriesList"
import { PostForm } from "./Posts/PostForm"
// import { ProfileProvider} from "./auth/AuthProvider"
import { PostTagProvider } from "./tags/PostTagProvider"

export const ApplicationViews = () => {
    return <>
            {/* <ProfileProvider> */}
            <PostsProvider>
                <CommentProvider>
                    <CategoriesProvider>
                        <TagProvider>
                            <Route path="/categories" render={(props) => {
                            return <> 
                                <CategoriesList history={props.history} />
                            </>
                            }} />    
                            <Route exact path="/posts" render={(props) => {
                                return <> 
                                    <PostList history={props.history} />
                                </>
                            }} /> 
                            <Route exact path="/userposts" render={(props) => {
                                return <>
                                    <UserPostList history={props.history} />
                                </>
                            }} /> 
                            <Route exact path="/comments/:sampleId(\d+)" render={(props) => {
                                return <>
                                    <EditCommentForm {...props}/>
                                </>
                            }} />     
                        </TagProvider>
                    </CategoriesProvider>
                </CommentProvider>
            </PostsProvider>
            {/* </ProfileProvider> */}
            {/* <ProfileProvider> */}
        <PostTagProvider>
            <PostsProvider>
                <CommentProvider>
                    <CategoriesProvider>
                        <TagProvider>
                            <Route exact path="/posts/:sampleId(\d+)" render={(props) => {
                                return <> 
                                    <PostDetails {...props}/>
                                    <Comment {...props}/>
                                </>
                            }} />    
                        </TagProvider>
                    </CategoriesProvider>
                </CommentProvider>
            </PostsProvider>
        </PostTagProvider>
        {/* </ProfileProvider> */}
            <TagProvider>
                <Route exact path="/tag">
                    <TagList />
                </Route>
                <Route exact path="/createtag" render={
                    props => <TagForm {...props} />
                }>
                </Route>
                <Route path="/edittag/:tagId(\d+)" render={
                    props => <TagForm {...props} />
                }>
                </Route>
            </TagProvider>
            
            <PostsProvider>
                <CategoriesProvider>
                    <TagProvider>
                        <Route path="/Post/create" render ={(props) => {
                            return <PostForm {...props}/>
                        }}>
                        </Route>
                        <Route path="/posts/edit/:postId(\d+)" render ={(props) => {
                            return <PostForm {...props} /> 
                            }}>
                        </Route>
                    </TagProvider>
                </CategoriesProvider>
            </PostsProvider>

        <Route path="/logout" render={
            (props) => {
                localStorage.removeItem("rareUser_id")
                props.history.push("/login")
            }
        } />
    </>
}