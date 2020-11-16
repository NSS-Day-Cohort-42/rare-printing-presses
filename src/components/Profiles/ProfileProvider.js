import React, { useState } from "react"

export const ProfileContext = React.createContext()

export const ProfileProvider = (props) => {
    const [profile, setProfile] = useState([])

    const getAllProfiles = () => {
        return fetch(`http://localhost:8000/profile`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("rareUser_id")}`
            }})
            .then(res => res.json())
            .then(setProfile)
    }

    const getSingleProfile = (profile) => {
        return fetch(`http://localhost:8000/profile/${profile}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("rareUser_id")}`
            }})
            .then(res => res.json())
            .then(setProfile)
    }

    return (
        <ProfileContext.Provider value={{
            getAllProfiles, profile, getSingleProfile
        }}>
            {props.children}
        </ProfileContext.Provider>
    )
}