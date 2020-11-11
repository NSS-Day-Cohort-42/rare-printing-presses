import React, { useState } from "react"

export const CategoryContext = React.createContext()

export const CategoriesProvider = (props) => {
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState([])

    const getAllCategories = () => {
        return fetch(`http://localhost:8000/categories`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("rareUser_id")}`
            }
        })
            .then(res => res.json())
            .then(setCategories)
    }

    const deleteCategory = (categoryId) => {
        return fetch(`http://localhost:8000/categories/${categoryId}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("rareUser_id")}`
        }
     })
            .then(getAllCategories)
    }

    const addCategory = category => {
        return fetch("http://localhost:8000/categories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rareUser_id")}`
            },
            body: JSON.stringify(category)
        })
            .then(getAllCategories)
    }

    return (
        <CategoryContext.Provider value={{
            categories, getAllCategories, category, deleteCategory, addCategory
        }}>
            {props.children}
        </CategoryContext.Provider>
    )
}

export default CategoriesProvider