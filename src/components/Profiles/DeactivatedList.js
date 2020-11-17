import React, { useContext, useEffect, useState, useRef } from "react"
import { ProfileContext } from "./ProfileProvider" 
import "./Profile.css"

export const DeactivatedList = (props) => {
    const { getAllProfiles, profiles, getSingleProfile, singleProfile, updateActive, makeAdmin} = useContext(ProfileContext)

    useEffect(() => {
        getAllProfiles()
        getSingleProfile(userNumber)
    }, [])

    let userNumber = localStorage.getItem("rareUser_number")

    const filteredProfiles = profiles.filter(p => {
        return p.active === false
    }) || {}

    console.log(filteredProfiles)

    if (singleProfile.is_staff){
        return (
        <article className="profileContainer">
            {
                filteredProfiles.map(p => {
                    return <section key={p.id} className="profiles">
                                <div className="profile-info">
                                    <div className="profileUsername">{p.user.username}</div>
                                    <div className="profileFullName">{p.user.first_name} {p.user.last_name}</div>
                                    <div className="profile_Is_Staff">{p.IsAdmin}</div>
                                </div>
                                <button onClick={() => {
                            props.history.push("/userprofiles")
                            }}>Back</button>
                            </section>
                })
            }
        </article>
        )} else {
            return <div>No Users Are Currently Deactivated</div>
        }
}