import React, { useState } from "react"

export const ProfileContext = React.createContext()

export const UserProfileProvider = (props) => {
    const [profiles, setProfiles] = useState([])
    const [singleProfile, setProfile] = useState([])
    const [rareSingleProfile, setRareSingleProfile] = useState({"user": {}})

    const getAllProfiles = () => {
        return fetch(`http://localhost:8000/profile`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("rareUser_id")}`
            }})
            .then(res => res.json())
            .then(setProfiles)
    }

    const getSingleProfile = (profile) => {
        return fetch(`http://localhost:8000/profile/${profile}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("rareUser_id")}`
            }})
            .then(res => res.json())
            .then(setProfile)
    }
    
    const getSingleRareProfile = (profile) => {
        return fetch(`http://localhost:8000/rareprofile/${profile}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("rareUser_id")}`
            }})
            .then(res => res.json())
            .then(setRareSingleProfile)
    }

    return (
        <ProfileContext.Provider value={{
            getAllProfiles, profiles, singleProfile, getSingleProfile, getSingleRareProfile, rareSingleProfile
        }}>
            {props.children}
        </ProfileContext.Provider>
    )
}