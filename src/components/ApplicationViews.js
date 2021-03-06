import React from "react"
import { Route } from "react-router-dom"
import { TagForm } from "./tags/TagForm"
import { TagList } from "./tags/TagList"
import { TagAddList } from "./tags/TagAddList"
import { TagProvider } from "./tags/TagProvider"
import PostsDetails, { PostDetails } from "./Posts/PostDetail"
import PostsProvider from "./Posts/PostProvider"
import PostList from "./Posts/PostList"
import UserPostList from "./Posts/UserPostList"
import { Comment } from "./comment/Comment"
import { EditCommentForm } from "./comment/EditCommentForm"
import { CommentForm } from "./comment/CommentForm"
import { CommentProvider } from "./comment/CommentProvider"
import { NavBar } from "./nav/NavBar"
import { CategoriesProvider } from "./categories/CategoriesProvider";
import { CategoriesList } from "./categories/CategoriesList"
import { PostForm } from "./Posts/PostForm"
import { PostTagProvider } from "./tags/PostTagProvider"
import { CategoryEdit } from "./categories/CategoryEdit"
import { SubscriptionProvider } from "./subscriptions/SubscriptionProvider"
import { SubscriptionList } from "./subscriptions/SubsriptionList"
import { ProfileList } from "./Profiles/ProfileList"
import { DeactivatedList } from "./Profiles/DeactivatedList"
import { UserProfileProvider } from "./Profiles/ProfileProvider"
import { ReactionProvider } from "./reactions/ReactionProvider"
import { ReactionForm } from "./reactions/ReactionForm"
import { ProfileDetails } from "./Profiles/ProfileDetails"

export const ApplicationViews = () => {
    return <>
                <PostsProvider>
                    <PostTagProvider>
                        <ReactionProvider>
                            <CommentProvider>
                                <CategoriesProvider>
                                    <TagProvider>
                                        <SubscriptionProvider>
                                            <UserProfileProvider>
                                                <Route exact path="/categories" render={(props) => {
                                                    return <> 
                                                        <CategoriesList history={props.history} />
                                                    </>
                                                }} />    
                                                <Route exact path="/categories/edit/:categoryId(\d+)" render={(props) => {
                                                    return <> 
                                                        <CategoryEdit {...props} />
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
                                                <Route exact path="/subscriptions" render={(props) => {
                                                    return <>
                                                        <SubscriptionList history={props.history} />
                                                    </>
                                                }} />
                                                <Route exact path="/posts/:sampleId(\d+)" render={(props) => {
                                                        return <> 
                                                            <PostDetails {...props}/>
                                                        </>
                                                    }} />    
                                                <Route exact path="/posts/:sampleId(\d+)/viewcomments" render={(props) => {
                                                    return <> 
                                                        <Comment {...props}/>
                                                    </>
                                                }} />    
                                                <Route exact path="/createcomment/:sampleId(\d+)" render={(props) => {
                                                    return <> 
                                                        <CommentForm {...props}/>
                                                    </>
                                                }} />
                                                <Route path="/posts/create" render ={(props) => {
                                                    return <PostForm {...props}/>
                                                }}>
                                                </Route>
                                                <Route path="/create/reaction" render ={(props) => {
                                                    return <ReactionForm {...props}/>
                                                }}>
                                                </Route>
                                                <Route path="/posts/edit/:postId(\d+)" render ={(props) => {
                                                    return <PostForm {...props} /> 
                                                    }}></Route>
                                            </UserProfileProvider>
                                        </SubscriptionProvider>     
                                    </TagProvider>
                                </CategoriesProvider>
                            </CommentProvider>
                        </ReactionProvider>
                    </PostTagProvider>
                </PostsProvider>

            <TagProvider>
                <PostTagProvider>
                    <Route exact path="/tag">
                        <TagList />
                    </Route>
                    <Route exact path="/managetags/:tagId(\d+)" render={
                        props => <TagAddList {...props}/>
                        }>
                    </Route>
                    <Route exact path="/createtag" render={
                        props => <TagForm {...props} />
                    }>
                    </Route>
                    <Route path="/edittag/:tagId(\d+)" render={
                        props => <TagForm {...props} />
                    }>
                    </Route>
                </PostTagProvider>
            </TagProvider>

            <UserProfileProvider>
                <Route exact path="/userprofiles" render ={(props) => {
                                return <ProfileList {...props}/>
                            }}>
                </Route>
                <Route path="/userprofiles/deactivated" render ={(props) => {
                                return <DeactivatedList {...props}/>
                            }}>
                </Route>
                <Route path="/rareprofile/:user_id(\d+)" render ={(props) => {
                                return <ProfileDetails {...props}/>
                            }}>
                </Route>
            </UserProfileProvider>

        <Route path="/logout" render={
            (props) => {
                localStorage.removeItem("rareUser_id")
                props.history.push("/login")
            }
        } />
    </>
}