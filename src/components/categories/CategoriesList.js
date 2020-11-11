import React, { useContext, useEffect, useState } from "react"
import { CategoryContext } from "./CategoriesProvider" 
import "./Categories.css"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Category } from "@material-ui/icons";

export const CategoriesList = (props) => {
    const { categories, getAllCategories, addCategory, deleteCategory  } = useContext(CategoryContext)
    const [category, setCategory] = useState({})

    useEffect(() => {
        getAllCategories()
    }, [])

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newCategory = Object.assign({}, category)
        newCategory[event.target.name] = event.target.value
        setCategory(newCategory)
    }

    const constructNewCategory = () => {
        addCategory({
            label: category.label,
        })
            .then(() => props.history.push("/categories"))
    }

    const useStyles = makeStyles((theme) => ({
            root: {
            '& > *': {
                margin: theme.spacing(1),
                color: "#EB5757",  
                position: "fixed",
                display: "flex",
                bottom: 0,
                background: "white",
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
        <div className="categoryPage_container">
        <section className="CategoryList">
            <article>
                <div><h2 className="categoryPageTitle">ALL CATEGORIES</h2>
                </div>
                
            </article>

            <article className="categoriesContainer">
                {
                    categories.map(c => {
                        return <section key={c.id} className="categories">
                                    <div className="categoryLabel"> {c.label} </div>
                                    <button className="cat-del-btn" onClick={evt=>{
                                    evt.preventDefault()
                                    deleteCategory(c.id)}}
                                    >X</button>
                                 </section>                         
                    })
                }
            </article>
        </section>
        <form className="categoryForm">
            <h2 className="categoryForm__title">CREATE A CATEGORY</h2>
            <fieldset className="categoryForm__fieldset">
                <div className="form-group">
                    <input type="text" name="label" required autoFocus className="form-control"
                        proptype="varchar"
                        placeholder="Category name"
                        defaultValue={category.label}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <Button className="savePostButton" variant="contained" type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewCategory()  
                    
                }}
                className="btn btn-primary btn-add_category">
                Save
            </Button>
        </form>
        </div>
        </>
    )
}

export default CategoriesList