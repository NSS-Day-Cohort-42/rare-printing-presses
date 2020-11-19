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
        
        getBase64(event.target.files[0], (base64ImageString) => {
            // console.log("Base64  of file is", base64ImageString);
            setImageUrl(base64ImageString)
        });
    }

    const currentUser = parseInt(localStorage.getItem("rareUser_number"))

    const postImage = (imgstring) => { 
            return fetch(`http://localhost:8000/rareprofile/${currentUser}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem("rareUser_id")}`
                },
                body: JSON.stringify(imgstring)
    })
}
    return (
        <>
        <article className="profileContainer">
            <section key={rareSingleProfile.id} className="profiles">
                <div className="profile-info">
                    <div className="profile-left">
                    <div className="profileFullName">{rareSingleProfile.user.first_name} {rareSingleProfile.user.last_name}</div>
                    <img src={rareSingleProfile.profile_image_url}></img>
                    </div>
                    <div className="profile-right">
                    <div className="profileUsername">{rareSingleProfile.user.username}</div>
                    <div className="profile_Is_Staff">{rareSingleProfile.user.is_staff}</div>
                    <div className="profile_Is_Staff">{rareSingleProfile.created_on}</div>
                    
                    {
                        (rareSingleProfile.user.is_staff === true) ? <div className="profile_Is_Staff">Admin</div> 
                        : <div className="profile_Is_Staff">Author</div>
                    
                    

                    }
                    {
                        
                        (rareSingleProfile.id === currentUser) 
                        ? 
                        <div className="uploadButtons">
                        <input type="file" id="profile_image_url" onChange={(evt) => {createProfileImageJSON(evt)}} />
                        <input type="hidden" name="profile_image_url" value={rareSingleProfile.id} />
                        <button onClick={(evt) => {postImage({'profile_image_url':imageUrl, "profile_id": rareSingleProfile.id})}}>Upload</button>
                        </div>
                        : null
                    }
                    </div>
                </div>
            </section>

        </article>
        </>
    )


}