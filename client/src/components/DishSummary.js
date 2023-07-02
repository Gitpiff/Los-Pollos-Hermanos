import React from "react"

function DishSummary(props) {
  const { dish, isChef, isEdit, handleChange } = props

  function imageUrlInput() {
    return (isChef && isEdit ?
      <textarea
        name="image"
        placeholder="Image URL"
        value={dish.image}
        onChange={(e) => handleChange(e)}
        disabled={false}
        className="summary-img-url"
      ></textarea> : null)
  }

  return (
    <section className="dish-summary">
      <div className="dish-summary-image">
        <img
          onError={({ currentTarget }) => { // FILLES IN IMAGE IF LINK ERROR
            currentTarget.onerror = null;
            currentTarget.src = "https://68.media.tumblr.com/5559ed717d6892b811f37c3ef7f54b4d/tumblr_ol33ucmRpG1vfmhilo1_500.png"
          }}
          src={dish.image}
          alt={dish.item}
        ></img>
      </div>
      <div className="dish-summary-text">
        {imageUrlInput()}
        <input
          disabled={!isEdit}
          type="text"
          name="name"
          placeholder="Name"
          value={dish.name || ""}     // PREVENTS REACT CONTROL VALUE ERROR 
          onChange={(e) => handleChange(e)}
          className="summary-h1"
        ></input>
        <textarea
          disabled={!isEdit}
          name="summary"
          placeholder="Summary"
          value={dish.summary}
          onChange={(e) => handleChange(e)}
          className="summary-p"
        ></textarea>
      </div>
    </section>
  )
}

export default DishSummary