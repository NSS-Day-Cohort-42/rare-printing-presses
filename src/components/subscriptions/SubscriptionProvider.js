import React, { useState } from "react"

export const SubscriptionContext = React.createContext()

export const SubscriptionProvider = (props) => {
    const [subscriptions, setSubscriptions] = useState([])

    const getAllSubscriptions = () => {
        return fetch(`http://localhost:8000/subscriptions`), {
            headers: {
                "Authorization": 
            }
        }
    }
}