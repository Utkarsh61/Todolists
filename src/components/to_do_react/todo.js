import React, { useState , useEffect }  from 'react'
import "./style.css";

// get the localStorage data back

const getLocalData=()=>
{
  const lists = localStorage.getItem("mytodolist");

  if(lists) {
    return JSON.parse(lists);
  }else {
    return [];
  }
}

const Todo = () => {

    const [inputdata,setInputdata]=useState("");
    const [items,setItems]=useState(getLocalData());
    const [isEditItem, setIsEditItem]=useState("");
    const [toggleButton,setToggleButton]=useState(false);

   //add the items function

   const addItem=()=>{
    if(!inputdata)
    {
      alert('plz fill the data');
    }else if(inputdata && toggleButton){
      setItems(
        items.map((curEle)=>{
          if(curEle.id===isEditItem){
            return {...curEle, name :inputdata};
          }
          return curEle;
        })
      )
      setInputdata([]);
      setIsEditItem(null);
      setToggleButton(false);
    }
    else {
      const myNewInputData={
        id : new Date().getTime().toString(),
        name: inputdata,
      }
      setItems([...items,myNewInputData]);
      setInputdata("");
    }
   };

   //edit the items

   const editItem=(index)=>{
    const item_todo_edited = items.find((curEle)=>{
      return curEle.id === index;
    })

    setInputdata(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
   }


    //how to delete item section

    const deleteItem=(index)=>{
      const updatedItems=items.filter((curEle)=>{
        return curEle.id !== index;
      })
      setItems(updatedItems);
    };
     
    //remove all the elements

    const removeAll = () => {
      setItems([]);
    }

    // adding local storage

    useEffect(()=>{
      localStorage.setItem("mytodolist",JSON.stringify(items));

    },[items]);

  return (
    <>
    <div className='main-div'>
        <div className='child-div'>
            <figure>
                <img src="./images/todo.svg" alt="todologo"/>
                <figcaption>Add Your List Here</figcaption>
            </figure>
            <div className='addItems'>
              <input 
                type="text"
                placeholder="✍️ Add Item"
                className='form-control'
                value={inputdata}
                onChange={(event)=>setInputdata(event.target.value)}
              />
              {toggleButton ? (
                <i class="far fa-edit add-btn" onClick={addItem}></i>
              ) : (
                <i class="fa fa-plus-circle add-btn" onClick={addItem}></i>
              )}
              
              <div>
                  {/* show our items */}

                    <div className='showItem'>
                      {items.map((curEle)=>{
                        return (
                          <div className='eachItem' key={curEle.id}>
                              <h3>{curEle.name}</h3>
                              <div className='todo-btn'>
                                <i class="far fa-edit add-btn" 
                                onClick={()=>editItem(curEle.id)}></i>
                                <i class="far fa-trash-alt add-btn" 
                                onClick={()=>deleteItem(curEle.id)}></i>
                              </div>
                          </div>
                           );
                      })}
                    </div>
              </div>
              {/* {Remove All button} */}
              <div className='showItems'>
                <button className='btn effect04' data-sm-link-text="Remove All"
                onClick={removeAll}>
                  <span>Check List</span>
                </button>
              </div>

            </div>
        </div>

    </div>
      
    </>
  )
}

export default Todo
