import React, { useState } from "react"

export const CategoryContext = React.createContext()

export const CategoriesProvider = (props) => {
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState([])

    const getAllCategories = () => {
        return fetch(`http://localhategory:8088/categories`)
            .then(res => res.json())
            .then(setCategories)
    }

    const getSingleCategory = (category) => {
        return fetch(`http://localhategory:8088/categories/${category}`)
            .then(res => res.json())
            .then(setCategory)
    }

    const addCategory = category => {
        return fetch("http://localhost:8088/categories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category)
        })
            .then(getAllCategories)
    }

    return (
        <CategoryContext.Provider value={{
            categories, getAllCategories, category, getSingleCategory, addCategory
        }}>
            {props.children}
        </CategoryContext.Provider>
    )
}

export default CategoriesProvider