import React, { useContext, useEffect } from "react"
import { DateTime } from "luxon"
import { Link } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles'

import { SubscriptionContext } from "./SubscriptionProvider"

import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import {HumanDate} from '../utils/HumanDate'

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

    const classes = useStyles(

    return (
        <>
            <article className="subscriptionsContainer">
                {
                    subscriptions.map(subscription => {
                        
                    })
                }
            </article>
    )
    )
}