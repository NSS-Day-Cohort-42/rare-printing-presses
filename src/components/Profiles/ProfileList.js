import React, { useContext, useEffect, useState, useRef } from "react"
import { ProfileContext } from "./ProfileProvider"
import { Link } from "react-router-dom"
import "./Profile.css"


export const ProfileList = (props) => {
    const { getAllProfiles, profiles, getSingleProfile, singleProfile, updateActive, makeAdmin } = useContext(ProfileContext)
    const b1 = "Admin"

    let userNumber = localStorage.getItem("rareUser_number")

    const add_admin_prompt = (id) => {
        var retVal = window.confirm("Are you sure you want to make this person an admin?");
        if (retVal == true) {
            makeAdmin(id)
            props.history.push("/userprofiles")
            return true;
        } else {
            return false;
        }
    }

    const adminProfiles = profiles.filter(profile => {
        return profile.user.is_staff === true
    }) || {}

    console.log(adminProfiles.length, "adminpros")


    const remove_admin_prompt = (id) => {
        var retVal = window.confirm("Are you sure you want to remove this admin?");
        if( retVal == true ) {
            if(adminProfiles.length > 1) {
                makeAdmin(id)
                props.history.push("/userprofiles")
                return true;
            } else {
                return window.alert("Please make someone else an admin before you deactivate this user's profile.");
            }
        } else {
            return false;
        }
    }
    const deactivate_profile_prompt = (id) => {
        var retVal = window.confirm("Are you sure you want to deactivate this user's account?");
            if( retVal == true ) {
                if(id != userNumber) {
                    updateActive(id)
                    props.history.push("/userprofiles")
                    return true;
            } else {
                return window.alert("Please make someone else an admin before you deactivate this user's profile.");
            }
        } else {
            return false;
        }
    }

    const reactivate_profile_prompt = (id) => {
        var retVal = window.confirm("Are you sure you want to reactivate this user's account?");
        if (retVal == true) {
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
    }, [])
    

    let userNumber = localStorage.getItem("rareUser_number")
    if (singleProfile.is_staff) {
        return (
            <>
                <article className="profileContainer">
                    <h1 className="heading">Users</h1>

                    {
                        profiles.map(p => {
                            return <section key={p.id} className="profile">
                                <div className="profile-info">
                                    <div className="profileFullName"><Link to={{ pathname: `/rareprofile/${p.user.id}` }}>{p.user.first_name} {p.user.last_name}</Link></div>
                                    <div className="profile_Is_Staff">{p.IsAdmin}</div>
                                    {
                                        (p.active === true) ?
                                            <button className="deactivate-btn" onClick={() => deactivate_profile_prompt(p.id)}>Deactivate User</button>
                                            : null
                                    }
                                    {
                                        (p.user.is_staff === true) ?
                                            <button className="remove-admin-btn"onClick={() => remove_admin_prompt(p.id)}>Remove Admin</button>
                                            : <button className="make-admin-btn" onClick={() => add_admin_prompt(p.id)}>Make Admin</button>
                                    }
                                </div>
                            </section>
                        })
                    }
                    <button className="view-deativate-btn" onClick={() => {
                        props.history.push("/userprofiles/deactivated")
                    }}>View Deactivated</button>
                </article>
            </>
        )
    } else {
        return (
            <article className="profileContainer">
                <h1 className="heading">Users</h1>
                {
                    profiles.map(p => {
                        return <section key={p.id} className="profile">
                            <div className="profile-info">
                                <div className="profileUsername">{p.user.username}</div>
                                <div className="profileFullName"><Link to={{ pathname: `/rareprofile/${p.user.id}` }}>{p.user.first_name} {p.user.last_name}</Link></div>
                                <div className="profile_Is_Staff">{p.IsAdmin}</div>
                            </div>
                        </section>

                    })
                }
            </article>
        )

    }


}


{/* <div className="profile_Is_Staff">{p.user.is_staff}<button>Make Admin</button></div> */ }
{/* <div className="profile_Is_Staff">{p.user.is_staff}<button>Deactivate Account</button></div> */ }