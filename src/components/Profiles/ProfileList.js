import React, { useContext, useEffect, useState, useRef } from "react"
import { ProfileContext } from "./ProfileProvider" 
import "./Profile.css"


export const ProfileList = (props) => {
    const { getAllProfiles, profiles, getSingleProfile, singleProfile, updateActive, makeAdmin} = useContext(ProfileContext)
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
    }, [])

    let userNumber = localStorage.getItem("rareUser_number")
    const boo1 = "Admin"
    const boo2 = "Author"
    if (singleProfile.is_staff){
        return (

        <article className="profileContainer">
            {
                profiles.map(p => {
                    return <section key={p.id} className="profiles">
                                <div className="profile-info">
                                    <div className="profileUsername">{p.user.username}</div>
                                    <div className="profileFullName">{p.user.first_name} {p.user.last_name}</div>
                                    <div className="profile_Is_Staff">{p.IsAdmin}</div>
                                    {
                                        (p.active === true) ?                         
                                        <button className={p.id} onClick={() => deactivate_profile_prompt(p.id)}>Deactivate User</button>
                                        : <button className={p.id} onClick={() => reactivate_profile_prompt(p.id)}>Activate User</button>
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
        </article>
        )} else{
            return (
                <article className="profileContainer">
                {
                    profiles.map(p => {
                        return <section key={p.id} className="profiles">
                                    <div className="profile-info">
                                        <div className="profileUsername">{p.user.username}</div>
                                        <div className="profileFullName">{p.user.first_name} {p.user.last_name}</div>
                                        <div className="profile_Is_Staff">{p.IsAdmin}</div>
                                    </div>
                                </section>
    
                    })
                }
            </article>
            )

        }
    

}


{/* <div className="profile_Is_Staff">{p.user.is_staff}<button>Make Admin</button></div> */}
{/* <div className="profile_Is_Staff">{p.user.is_staff}<button>Deactivate Account</button></div> */}