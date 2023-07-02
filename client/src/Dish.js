import React, { useState } from "react"
import { Link } from "react-router-dom"
import DishSummary from "./components/DishSummary"
import DishIngredients from "./components/dishIngredients"
import DishSteps from "./components/dishSteps"
// const { v4: uuidv4 } = require('uuid')

function Dish(props) {
  const { dish, isChef, isEdit, setIsEdit, deleteDish, addDish, isBlankDish, setIsBlankDish, updateDish, setActionMessage } = props

  const [updatedDish, setUpdatedDish] = useState(dish)
  const { _id } = updatedDish

  function handleChange(e) {
    const { name, value } = e.target
    setUpdatedDish(prevInput => ({ ...prevInput, [name]: value }))
  }

  // USED FOR TEXT & TEXTAREA INPUTS CHANGES
  const textChange = (e) => {
    const { id, name, value } = e.target
    const newArray = updatedDish[`${name}`].map((item, index) => {
      if (id == index) {
        return value
      }
      return item
    })
    setUpdatedDish(prevInput => ({ ...prevInput, [name]: newArray }))
  }

  // DELETE STEP & INGREDIENT BUTTONS
  function deleteItem(e) {
    const { id, name } = e.target
    const newArray = updatedDish[`${name}`].filter((item, index) => {
      if (id != index) {
        return item
      }
    })
    setUpdatedDish(prevInput => ({ ...prevInput, [name]: newArray }))
  }

  // ADD STEP & INGREDIENT BUTTONS
  function addItem(e) {
    const { name } = e.target
    if (updatedDish[name] === undefined) {
      return setUpdatedDish(prevInput => ({ ...prevInput, [name]: [""] }))
    } else {
      setUpdatedDish(prevInput => ({ ...prevInput, [name]: [...prevInput[name], [""]] }))
    }
  }

  // BUTTONS AT TOP & BOTTOM OF DISH EDIT PAGES
  function chefEditButtons() {
    const buttonText = () => {
      return isEdit ? "Save" : "Edit"       // CHANGES EDIT BUTTON TEXT
    }
    // WHEN ADDING NEW DISH BUTTONS
    if (isChef && isEdit && isBlankDish === true) {
      return (
        <div id="new-dish-save">
          <Link to="/menu/search">
            <button onClick={() => {
              return (
                setIsEdit(),                  // RESETS isEdit() bool
                setIsBlankDish(),             // RESETS isBlankDish() bool
                delete updatedDish[0],        // DELETES BLANK DISH
                // updatedDish._id = uuidv4(),   REMOVE: CREATES ID (MONGOOSE WILL DO THIS)
                setActionMessage("add"),        // MAKES "DISH ADDED" MESSAGE
                addDish(updatedDish))         // NEW DISH OBJECT
            }}>{buttonText()}</button>
          </Link>
        </div>)
      // EDIT DISH "SAVE" BUTTON
    } else if (isChef && isEdit) {
      return (
        <div className="dish-button-container">
          <Link to="/menu/search">
            <div>
              <button onClick={() => {
                return (
                  deleteDish(_id),            // PASSES DISH ID TO DELETE DISH
                  setActionMessage("delete"))   // MAKES "DISH DELETED" MESSAGE
              }}>DELETE</button>
            </div>
          </Link>
          <Link to="/menu/search">
            <button onClick={() => {
              return (
                setIsEdit(),                   // RESETS isEdit() bool
                updateDish(_id, updatedDish),  // PASSES DISH ID & OBJ TO UPDATE
                setActionMessage("edit"))        // MAKES "DISH EDITED" MESSAGE
            }}>{buttonText()}</button>

          </Link>
        </div>)
      // EDIT DISH "EDIT" BUTTON
    } else if (isChef) {
      return (
        <div className="button-container">
          <button onClick={() => setIsEdit()}>{buttonText()}</button>
        </div>)
    } else {
      // COOK PAGES
      return null
    }
  }

  return (
    <div className="dish">
      {chefEditButtons()}
      <DishSummary
        dish={updatedDish}
        isChef={isChef}
        isEdit={isEdit}
        handleChange={(e) => handleChange(e)} />
      <DishIngredients
        dish={updatedDish}
        isChef={isChef}
        isEdit={isEdit}
        deleteItem={(e) => deleteItem(e)}
        addItem={(e) => addItem(e)}
        textChange={(e) => textChange(e)} />
      <DishSteps
        dish={updatedDish}
        isChef={isChef}
        isEdit={isEdit}
        deleteItem={(e) => deleteItem(e)}
        addItem={(e) => addItem(e)}
        textChange={(e) => textChange(e)} />
      {chefEditButtons()}
    </div>
  )
}

export default Dish