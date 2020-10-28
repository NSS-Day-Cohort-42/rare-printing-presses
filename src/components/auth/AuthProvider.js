import React, { useState } from "react"

export const ProfileContext = React.createContext()


export const ProfileProvider = (props) => {
    const [profile, setProfile] = useState([])

    const getProfile = () => {
        return fetch(`http://localhost:8088/users`)
            .then(res => res.json())
            .then(setProfile)
    }


    return (
        <ProfileContext.Provider value={{
            profile, getProfile
        }}>
            {props.children}
        </ProfileContext.Provider>
    )
}


