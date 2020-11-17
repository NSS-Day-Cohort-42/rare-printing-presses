import React, { useContext, useEffect } from "react"
import { ProfileContext } from "../Profiles/ProfileProvider"
import "./Profile.css"



export const ProfileDetails = (props) => {
    const { getSingleRareProfile, rareSingleProfile } = useContext(ProfileContext)

    var pathArray = window.location.pathname.split('/')
    let profileNumber = parseInt(pathArray[2])

    useEffect(() => {
        getSingleRareProfile(profileNumber)
    }, [])

    console.log(rareSingleProfile)

    return (
        <>
        <article className="profileContainer">
            <section key={rareSingleProfile.id} className="profiles">
                <div className="profile-info">
                    <div className="profileFullName">{rareSingleProfile.user.first_name} {rareSingleProfile.user.last_name}</div>
                    <div className="profileImg">{rareSingleProfile.profile_image_url}Image</div>
                    <div className="profileUsername">{rareSingleProfile.user.username}</div>
                    <div className="profile_Is_Staff">{rareSingleProfile.user.is_staff}</div>
                    <div className="profile_Is_Staff">{rareSingleProfile.created_on}</div>
                    {
                        (rareSingleProfile.user.is_staff === true) ? <div className="profile_Is_Staff">Admin</div> 
                        : <div className="profile_Is_Staff">Author</div>
                    }
                </div>
            </section>

        </article>
        </>
    )


}