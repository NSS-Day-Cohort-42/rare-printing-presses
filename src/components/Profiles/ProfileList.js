import React, { useContext, useEffect, useState, useRef } from "react"
import { ProfileContext } from "./ProfileProvider" 
import { Link } from "react-router-dom"
import "./Profile.css"


export const ProfileList = (props) => {
    const { getAllProfiles, profiles, getSingleProfile, singleProfile } = useContext(ProfileContext)


    useEffect(() => {
        getAllProfiles()
        getSingleProfile(userNumber)
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
                                    <button>Deactivate User</button>
                                    {
                                        (p.user.is_staff === true) ? <div className="profile_Is_Staff">Admin</div> 
                                        : <div className="profile_Is_Staff">Author</div>
                                    }
                                </div>
                            </section>
                })
            }
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
            </article>
            )

        }
    

}


{/* <div className="profile_Is_Staff">{p.user.is_staff}<button>Make Admin</button></div> */}
{/* <div className="profile_Is_Staff">{p.user.is_staff}<button>Deactivate Account</button></div> */}