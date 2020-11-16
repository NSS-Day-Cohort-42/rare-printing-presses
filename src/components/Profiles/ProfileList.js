import React, { useContext, useEffect, useState, useRef } from "react"
import { ProfileContext } from "./ProfileProvider" 
import "./Profile.css"


export const ProfileList = (props) => {
    const { getAllProfiles, profiles, getSingleProfile, singleProfile } = useContext(ProfileContext)
    const b1 = "Admin"

    useEffect(() => {
        getAllProfiles()
        getSingleProfile()
    }, [])

    const boo1 = "Admin"
    const boo2 = "Author"
    return (
        <article className="profileContainer">
            {
                profiles.map(p => {
                    return <section key={p.id} className="profiles">
                                <div className="profile-info">
                                    <div className="profileUsername">{p.user.username}</div>
                                    <div className="profileFullName">{p.user.first_name} {p.user.last_name}</div>
                                    {
                                        (p.user.is_staff === true) ? <div className="profile_Is_Staff">Admin</div> 
                                        : <div className="profile_Is_Staff">Author</div>
                                    }
                                </div>
                            </section>
                })
            }
        </article>
        )
    

}


{/* <div className="profile_Is_Staff">{p.user.is_staff}<button>Make Admin</button></div> */}
{/* <div className="profile_Is_Staff">{p.user.is_staff}<button>Deactivate Account</button></div> */}