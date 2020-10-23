import React, {useState} from "react"

export const CommentContext = React.createContext()

export const CommentProvider = (props) => {
    const [comments, setComments] = useState([])

    const getComment = () => {
        return fetch("http://localhost:8088/comments")
            .then(res => res.json())
            .then(setComments)
    }

    const addComment = comment => {
        return fetch("http://localhost:8088/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
    })
}

return (
    <CommentContext.Provider value={{
        addComment, getComment, comments, setComments
    }}>
        {props.children}
        </CommentContext.Provider>
)
}