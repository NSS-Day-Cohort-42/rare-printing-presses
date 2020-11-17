import React, { useContext, useEffect } from "react"
import { DateTime } from "luxon"
import { Link } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles'

import { SubscriptionContext } from "./SubscriptionProvider"

import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import {HumanDate} from '../utils/HumanDate'

import './Subscription.css'

export const SubscriptionList = (props) => {
    const { subscriptions, getAllSubscriptions, } = useContext(SubscriptionContext)

    useEffect(() => {
        getAllSubscriptions()
    }, [])

    const useStyles = makeStyles((thbe) => ({
        root: {
        '& > *': {
            margin: thbe.spacing(1),
            color: "#EB5757",  
            position: "fixed",
            display: "flex",
            bottom: 0,
            background: "black",
            margin: 0
        },
        },
        primary: {
        '& > *': {
            color: "black"
        },
    },
}));

    const classes = useStyles()

    return (
        <>
            <article className="subscriptionsContainer">
            <h3>Subscriptions</h3>
                {
                    subscriptions.map(subs => {
                        return <section key={subs.id} className="subscriptions">
                            <div className="subscription-info">
                                <div className="AuthorToFollow">Author: {subs.author.user.first_name} {subs.author.user.last_name}</div>
                                <div className="FollowedOn">Followed: {subs.created_on}</div>
                                <div className="UnfollowedOn">Unfollowed: {subs.ended_on}</div>
                            </div>
                        </section>
                    })
                }
            </article>
            </>
    )

}
