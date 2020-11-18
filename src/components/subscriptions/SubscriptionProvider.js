import React, { useState } from "react"

export const SubscriptionContext = React.createContext()

export const SubscriptionProvider = (props) => {
    const [subscriptions, setSubscriptions] = useState([])

    const getAllSubscriptions = () => {
        return fetch(`http://localhost:8000/subscriptions`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rareUser_id")}`

            }
        })
        .then(res => res.json())
        .then(setSubscriptions)
    }

    const unsubscribe = followerId => {
        return fetch(`http://localhost:8000/subscriptions/${followerId}/follow`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rareUser_id")}`
        }
    })
            .then(response => response.json())
            .then(getAllSubscriptions)
    }

    const followAuthor = followerId => {
        return fetch(`http://localhost:8000/subscriptions/${followerId}/follow`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rareUser_id")}`
        }
    })
        .then(response => response.json())
}

    return (
        <SubscriptionContext.Provider value={{
            subscriptions, getAllSubscriptions, followAuthor, unsubscribe
        }}>
            {props.children}
        </SubscriptionContext.Provider>
    )
}