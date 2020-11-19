import React, { useContext, useEffect, useState, useRef } from "react"
import { ProfileContext } from "./ProfileProvider"
import { SubscriptionContext } from "../subscriptions/SubscriptionProvider"
import { Link } from "react-router-dom"
import "./Profile.css"


export const ProfileList = (props) => {
    const { getAllProfiles, profiles, getSingleProfile, singleProfile, updateActive, makeAdmin} = useContext(ProfileContext)
    const { getAllSubscriptions, followAuthor, unsubscribe, subscriptions } = useContext(SubscriptionContext)
    const b1 = "Admin"

    const add_admin_prompt = (id) => {
        var retVal = window.confirm("Are you sure you want to make this person an admin?");
        if( retVal == true ) {
            makeAdmin(id)
            props.history.push("/userprofiles")
            return true;
        } else {
            return false;
        }
    }

    const remove_admin_prompt = (id) => {
        var retVal = window.confirm("Are you sure you want to remove this admin?");
        let thisUser = getSingleProfile(id)
        if( retVal == true ) {
            makeAdmin(id)
            props.history.push("/userprofiles")
            return true;
        } else {
            return false;
        }
    }

    const deactivate_profile_prompt = (id) => {
        var retVal = window.confirm("Are you sure you want to deactivate this user's account?");
        if( retVal == true ) {
            updateActive(id)
            props.history.push("/userprofiles")
            return true;
        } else {
            return false;
        }
    }

    const reactivate_profile_prompt = (id) => {
        var retVal = window.confirm("Are you sure you want to reactivate this user's account?");
        if( retVal == true ) {
            updateActive(id)
            props.history.push("/userprofiles")
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {
        getAllProfiles()
        getSingleProfile(userNumber)
        getAllSubscriptions()
    }, [])

    let userNumber = localStorage.getItem("rareUser_number")
    if (singleProfile.is_staff){
        console.log(singleProfile)
        return (

        <article className="profileContainer">
            {
                profiles.map(p => {
                    return <section key={p.id} className="profiles">
                                <div className="profile-info">
                                    <div className="profileUsername">{p.user.username}</div>
                                    <div className="profileFullName"><Link to={{pathname:`/rareprofile/${p.user.id}`}}>{p.user.first_name} {p.user.last_name}</Link></div>
                                    <div className="profile_Is_Staff">{p.IsAdmin}</div>
                                    {
                                        (p.active === true) ?                       
                                        <button className={p.id} onClick={() => deactivate_profile_prompt(p.id)}>Deactivate User</button>
                                        : <div></div>
                                    }
                                    {
                                        (p.user.is_staff === true) ?                         
                                        <button className={p.id} onClick={() => remove_admin_prompt(p.id)}>Remove Admin</button>
                                        : <button className={p.id} onClick={() => add_admin_prompt(p.id)}>Make Admin</button>
                                    }
                                </div>
                            </section>
                })
            }
        
            <button onClick={() => {
            props.history.push("/userprofiles/deactivated")
            }}>View Deactivated</button>
            <div className="subscriptionButtons">
                { subscriptions.map(s => {
                    return s.subscribed
                        ? <button className="btn btn-3"
                            onClick={() => unsubscribe(subscriptions.id)}
                            >Unsubscribe</button>
                        : <button className="btn btn-2"
                            onClick={() => followAuthor(subscriptions.id)}
                            >Subscribe</button>
                            })}
            </div>
        </article>
        
        )} else{
            return (
                <article className="profileContainer">
                {
                    profiles.map(p => {
                        return <section key={p.id} className="profiles">
                                    <div className="profile-info">
                                        <div className="profileUsername">{p.user.username}</div>
                                        <div className="profileFullName"><Link to={{pathname:`/rareprofile/${p.user.id}`}}>{p.user.first_name} {p.user.last_name}</Link></div>
                                        <div className="profile_Is_Staff">{p.IsAdmin}</div>
                                    </div>
                                </section>
    
                    })
                }
                <div className="subscriptionButtons">
                { subscriptions.map(s => {
                    return s.subscribed
                        ? <button className="btn btn-3"
                            onClick={() => unsubscribe(subscriptions.id)}
                            >Unsubscribe</button>
                        : <button className="btn btn-2"
                            onClick={() => followAuthor(subscriptions.id)}
                            >Subscribe</button>
                            })}
            </div>
            </article>
            )
        }
    }