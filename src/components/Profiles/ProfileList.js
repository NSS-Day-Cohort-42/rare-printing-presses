import React, { useContext, useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import { ProfileContext } from "./ProfileProvider" 
import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
// import EditIcon from '@material-ui/icons/Edit';

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