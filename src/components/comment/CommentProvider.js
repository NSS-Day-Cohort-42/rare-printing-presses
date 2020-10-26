import React, {useState} from "react"

export const CommentContext = React.createContext()

export const CommentProvider = (props) => {
    const [comments, setComments] = useState([])

    const getComment = () => {
        return fetch("http://localhost:8088/comments")
            .then(res => res.json())
            .then(setComments)
    }

    const getSingleComment = (id) => {
        return fetch(`http://localhost:8088/comments/${id}`)
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
    .then(getComment)
}

    const deleteComment = (commentId) => {
        return fetch(`http://localhost:8088/comments/${commentId}`, {
            method: "DELETE"
        })
            .then(getComment)
    }

    const updateComment = comment => {
        return fetch(`http://localhost:8088/comments/${comment.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        })
            .then(getComment)
    }

return (
    <CommentContext.Provider value={{
        addComment, getComment, comments, setComments, deleteComment, getSingleComment, updateComment
    }}>
        {props.children}
        </CommentContext.Provider>
)
}