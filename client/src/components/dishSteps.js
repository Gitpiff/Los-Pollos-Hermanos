import React from "react"

function dishSteps(props) {
  const { dish, isChef, isEdit, deleteItem, addItem, textChange } = props

  function deleteStepButton(index) {
    return (
      (isChef && isEdit) ? <button name="steps" id={index} onClick={(e) => deleteItem(e)}>X</button> : null)
  }

  function addStepButton() {
    return (
      (isChef && isEdit) ? <button name="steps" onClick={(e) => addItem(e)}>Add Step</button> : null)
  }

  // KEEPS CARET AT END OF TEXT IN TEXTAREA WHEN TYPING
  function moveCaretAtEnd(e) {
    var temp_value = e.target.value
    e.target.value = ''
    e.target.value = temp_value
  }


  return (
    <section>
      <h2>Steps</h2>
      {dish.steps ?
        dish.steps.map((item, index) => {
          return (
            <div key={`${item}${index}`} className="steps-container">
              <div>
                <h3 className="steps-number">{`${index + 1}.`}</h3>
                <input type="checkbox" />
                <textarea
                  autoFocus                 // FORCES CARET TO REMAIN AFTER RENDER
                  onFocus={moveCaretAtEnd}  // FORCES CARET AT END OF TEXTAREA VALUE
                  id={index}
                  name="steps"
                  type="text"
                  index={index}
                  value={item}
                  disabled={!isEdit}
                  onChange={(e) => textChange(e)} />
                {deleteStepButton(index)}
              </div>
            </div>
          )
        }) : null}
      <div className="steps-add">
        {addStepButton()}
      </div>
    </section>
  )
}

export default dishSteps