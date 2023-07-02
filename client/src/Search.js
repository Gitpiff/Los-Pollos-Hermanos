import React, { useEffect, useState } from "react"
import DishSummary from "./components/DishSummary"
import { Link } from "react-router-dom"

function Search(props) {
  const { dishes, isChef, clickedDish, setIsEdit, setIsBlankDish, actionMessage, setActionMessage } = props

  const [searchInput, setSearchInput] = useState("")
  const [filteredDishes, setFilteredDishes] = useState(dishes)

  useEffect(() => {
    setFilteredDishes(dishes)
  }, [dishes])

  function welcomeMessage() {
    return (isChef ?
      <h1>Welcome Chef!</h1> :
      <h1>Welcome Cook!</h1>)
  }

  function displayActionMessage() {
    if (actionMessage === "add") {
      return (<h2>Dish Added!</h2>)
    } else if (actionMessage === "delete") {
      return (<h2>Dish Deleted!</h2>)
    } else if (actionMessage === "edit") {
      return (<h2>Dish Edited!</h2>)
    } else {
      return null
    }
  }

  function listDishes() {
    return (filteredDishes ? <>
      {filteredDishes.map(dish =>
        <Link
          to="/menu/dish"
          key={dish._id}
          onClick={() => { return (clickedDish(dish._id), setActionMessage(null)) }}>
          <DishSummary dish={dish} />
        </Link>)}
    </> : null)
  }

  // SEARCH BAR FILTER FUNCTION 
  const filter = (e) => {
    const keyword = e.target.value
    if (keyword !== "") {
      const results = dishes.filter(dish => {
        return dish.name.toLowerCase().includes(keyword.toLowerCase())
      })
      setFilteredDishes(results)
    } else {
      setFilteredDishes(dishes)
    }
    setSearchInput(keyword)
  }

  // ADD BUTTON LEADS TO BLANK FORM
  function chefAddButton() {
    return (isChef ?
      <Link to="/menu/dishform">
        <button onClick={() => {
          return (
            setIsEdit(true),      // INPUT ENABLE ON NEW DISH PAGE
            setIsBlankDish(),     // REMOVES DELETE BUTTON ON NEW DISH PAGE
            setActionMessage(null)) // RESETS ACTION MESSAGE 
        }}
        >ADD DISH</button>
      </Link>
      : null)
  }

  return (
    <div className="search">
      {welcomeMessage()}
      {displayActionMessage()}
      <form className="search-bar">
        <input
          type="search"
          placeholder="Search dish title..."
          value={searchInput}
          onChange={(e) => filter(e)}>
        </input>
      </form>
      {listDishes()}
      {chefAddButton()}
    </div>
  )
}

export default Search