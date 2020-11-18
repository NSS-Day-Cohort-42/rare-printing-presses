import { Button } from "@material-ui/core"
import React, { useContext, useState } from "react"
import { ReactionContext } from "./ReactionProvider"











export const ReactionForm = (props) =>{

    const {createReaction} = useContext(ReactionContext)
    const [reaction, setReaction] = useState({})



    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newReaction = Object.assign({}, reaction)
        newReaction[event.target.name] = event.target.value
        setReaction(newReaction)
    }

    const constructNewReaction = () => {
        createReaction({
            label: reaction.label,
            image_url: reaction.url
        })
            .then(() => props.history.push("/posts"))
    }





    return(
        <form className="reactionForm">
            <h2 className="reactionForm__title">CREATE A NEW USER REACTION</h2>
            <fieldset className="reactionForm__fieldset">
                <div className="form-group">
                    <input type="text" name="label" required autoFocus className="form-control"
                        proptype="varchar"
                        placeholder="Reaction Name"
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset className="reactionForm__fieldset">
                <div className="form-group">
                    <input type="text" name="url" required autoFocus className="form-control"
                        proptype="varchar"
                        placeholder="Enter Reaction Image Url"
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <Button className="saveReactionButton" variant="contained" type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewReaction()  
                    
                }}
                className="btn btn-primary btn-add_category">
                Save
            </Button>
        </form>
    )










}


