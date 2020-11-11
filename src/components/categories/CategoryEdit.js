import React, { useContext, useEffect, useState } from "react"
import { CategoryContext } from "./CategoriesProvider" 

export const CategoryEdit = (props)=>{
    const { categories, updateCategory, getAllCategories } = useContext(CategoryContext)
    const [category, setCategory] = useState({})

    useEffect(() => {
        getAllCategories()
        getCategoryInEditMode()
    }, [])

    
    


    const handleControlledInputChange = (event) => {
        const newCategory = Object.assign({}, category)
        newCategory[event.target.name] = event.target.value  
        setCategory(newCategory)                                
    }

    const getCategoryInEditMode = () =>{
        const categoryId = parseInt(props.match.params.categoryId)
        const foundCategory = categories.find(c => c.id = categoryId)
        setCategory(foundCategory)
    }

    const update = () =>{
        updateCategory({
            id: category.id,
            label : category.label
        }).then(props.history.push("/categories"))
        
    }
    return(
        <form className="catEditForm">
            <h2 className="updateCategory__title">Update Category</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="label"> </label>
                    <input type="text" name="label" required autoFocus className="form-control"
                        placeholder= {category.label}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    update()
                    
                }}
                className="update-cat-btn">
                Save Changes
            </button>
        </form>
    )
}

