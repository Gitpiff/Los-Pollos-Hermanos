import React from "react"
import wideLogo from "./images/modLogo.png"
import { Link } from "react-router-dom"

export default function Nav(props) {
  const { setIsEdit, setActionMessage } = props

  return (
    <nav>
      <div>
        <Link
          to={"/menu/search"}>
          <button>Search</button>
        </Link>
      </div>
      <Link
        to={"/"}
        onClick={() => {
          return (
            setIsEdit(false),             // RESETS isEdit() Bool
            setActionMessage(null))       // RESETS ACTION MESSAGE()
        }}>
        <img src={wideLogo} className="header" alt="Los Pollo Logo"></img>
      </Link>
      <div>
        <Link
          to={"/"}
          onClick={() => {
            return (
              setIsEdit(false),           // RESETS isEdit() Bool
              setActionMessage(null))     // RESETS ACTION MESSAGE()
          }}>
          <button>User</button>
        </Link>
      </div>
    </nav>
  )
}