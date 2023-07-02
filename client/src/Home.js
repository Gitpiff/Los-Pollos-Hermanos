import React from "react"
import { Link } from "react-router-dom"
import ChefLogo from "./components/images/chef.png"
import CookLogo from "./components/images/cook.png"

function Home(props) {
  const { setIsChef } = props

  return (
    <div className="home">
      <Link
        to="/menu/search"
        onClick={() => setIsChef(false)}>
        <img src={CookLogo} alt="cook button logo" ></img>
      </Link>
      <Link
        to="/menu/search"
        onClick={() => setIsChef(true)}>
        <img src={ChefLogo} alt="chef button logo" ></img>
      </Link>
    </div>
  )
}

export default Home