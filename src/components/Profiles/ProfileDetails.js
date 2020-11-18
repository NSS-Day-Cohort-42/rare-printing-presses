import React, { useContext, useEffect, useState } from "react"
import { ProfileContext } from "../Profiles/ProfileProvider"
import "./Profile.css"



export const ProfileDetails = (props) => {
    const { getSingleRareProfile, rareSingleProfile } = useContext(ProfileContext)
    const [ imageUrl, setImageUrl ] = useState("")

    var pathArray = window.location.pathname.split('/')
    let profileNumber = parseInt(pathArray[2])

    useEffect(() => {
        getSingleRareProfile(profileNumber)
    }, [])

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }
    
    const createProfileImageJSON = (event) => {
        debugger
        getBase64(event.target.files[0], (base64ImageString) => {
            // console.log("Base64 of file is", base64ImageString);
            setImageUrl(base64ImageString)
        });
    }

    const currentUser = localStorage.getItem("rareUser_number")

    const postImage = () => { 
            return fetch(`http://localhost:8000/rareprofile/${currentUser}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem("rareUser_id")}`
                },
    })
}

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
                    <input type="file" id="profile_image" onChange={(evt) => {
                            createProfileImageJSON(evt)
                        }} />
                    <input type="hidden" name="profile_image" value={rareSingleProfile.profile_image_url} />
                        <button onClick={(evt) => {
                            postImage()
                        }}>Upload</button>
                </div>
            </section>

        </article>
        </>
    )


}