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
                if(p.user.is_staff){

                    return <section key={p.id} className="profiles">
                            <div className="profile-info">
                                <div className="profileUsername">{p.user.username}</div>
                                <div className="profileFullName">{p.user.first_name} {p.user.last_name}</div>
                                <div className="profile_Is_Staff">{p.user.is_staff}<button>Make Admin</button></div>
                                <div className="profile_Is_Staff">{p.user.is_staff}<button>Deactivate Account</button></div>
                            </div>
                        </section>
                } else {
                    return <section key={p.id} className="profiles">
                                <div className="profile-info">
                                    <div className="profileUsername">{p.user.username}</div>
                                    <div className="profileFullName">{p.user.first_name} {p.user.last_name}</div>
                                </div>
                            </section>
                }
            })
        }
    </article>
    )

}