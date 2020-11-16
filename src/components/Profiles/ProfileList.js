import React, { useContext, useEffect, useState, useRef } from "react"
import { ProfileContext } from "./ProfileProvider" 
import "./Profile.css"


export const ProfileList = (props) => {
    const { getAllProfiles, profile, getSingleProfile } = useContext(ProfileContext)


    useEffect(() => {
        getAllProfiles()
    }, [])

    return (
        <article className="profileContainer">
        {
            profile.map(p => {
                
                return <section key={p.id} className="profiles">
                            <div className="profile-info">
                                <div className="profileUsername">{p.user.username}</div>
                                <div className="profileFullName">{p.user.first_name} {p.user.last_name}</div>
                                <div className="profileUsertype">{p.usertype}</div>
                            </div>
                        </section>
            })
        }
    </article>
    )

}