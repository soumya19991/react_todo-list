import React, { useEffect, useState } from 'react'
import "./style.css"

const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist")
  if (lists) {
    return JSON.parse(lists);
  } else {
    return []
  }
}

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [item, setItem] = useState(getLocalData());
  const [isEditeIem, setIsEditeItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  //  add item
  const addItem = () => {
    if (!inputData) {
      alert("plz fill data")
    } else if (inputData && toggleButton) {
      setItem(
        item.map((curEle) => {
          if (curEle.id === isEditeIem) {
            return { ...curEle, name: inputData }
          }
          return curEle;
        })
      )
      setInputData("")
      setIsEditeItem(null)
      setToggleButton(false)
    }
    else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,

      }
      setItem([...item, myNewInputData])
      setInputData("")
    }
  }
  //  how to editeItem 
  const editeItem = (index) => {
    const item_tode_edited = item.find((curEle) => {
      return curEle.id === index;
    })
    setInputData(item_tode_edited.name)
    setIsEditeItem(index)
    setToggleButton(true)
  }

  //  how to delete item 

  const deleteItems = (index) => {
    const updateItem = item.filter((curEle) => {
      return curEle.id !== index

    })
    setItem(updateItem)
  }
  //  removwe all element 
  const removeAll = () => {
    setItem([])
  }
  //  adding localStorage 
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(item))
  }, [item ])
  return (
    <>
      <div className='main-div'>
        <div className='child-div'>
          <figure>
            <img src="./images/todo.svg" alt="todo_logo" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className='addItems'>
            <input type="text" placeholder='✍ Add Item' className='form-control'
              value={inputData}
              onChange={(event) => setInputData(event.target.value)}

            />
            {toggleButton ? (<i className="fa fa-edit add-btn" onClick={addItem}></i>) : (<i className="fa fa-plus add-btn" onClick={addItem}></i>)}
            {/* <i className="fa fa-plus add-btn" onClick={addItem}></i> */}
          </div>
          {/* SHOW OUR ITEM */}

          <div className='showItems'>
            {item.map((curEle) => {
              return (
                <div className='eachItem' key={curEle.id}>
                  <h3>{curEle.name}</h3>
                  <div className='todo-btn'>
                    {/* <i className="fa fa-plus add-btn"></i> */}
                    <i className="far fa-edit add-btn" onClick={() => editeItem(curEle.id)}></i>
                    <i className="far fa-trash-alt add-btn" onClick={() => deleteItems(curEle.id)}></i>

                  </div>
                </div>
              )

            })}

          </div>

          {/* REMOVE ALL ITEM */}
          <div className='showItems'>



            <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}> <span>CHECK LIST</span></button>
          </div>
        </div>
      </div>

    </>
  )
}

export default Todo
