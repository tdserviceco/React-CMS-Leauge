import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  useHistory,
  useLocation
} from "react-router-dom";
function CreateListLastStep(props) {

  let history = useHistory();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();
  let storageItems = localStorage.getItem('items') === null ? 0 : JSON.parse(localStorage.getItem('items'))

  const lastestID = query.get("id");
  const
    [items, updateItems] = useState(storageItems),
    [disabledButton, updateDisabledButton] = useState(true),
    [name, updateName] = useState('');

  const newField = () => {
    // console.log('newField')
    if (items.length > 0) {
      let newItems = [...items, { item: '' }]
      localStorage.setItem('items', JSON.stringify(newItems))
      updateItems((prevState) => ([...prevState, {
        item: ''
      }]))
    }
    // console.log("NewField Item:", items)
  }

  const removeField = () => {
    // console.log('removeField')
    if (items.length <= 1) {
      updateDisabledButton(true)
      return;
    }
    for (let i = 0; i < items.length; i++) {
      items.splice(items.length - 1, 1);
      break;
    }
    localStorage.setItem('items', JSON.stringify(items));
    // console.log("localstorage:", JSON.parse(localStorage.getItem('items')))
    updateItems(JSON.parse(localStorage.getItem('items')))
    // console.log('Removed item', items)
  }

  const addItemToField = (e) => {
    items[e.target.dataset.id][e.target.className] = e.target.value;
    localStorage.setItem('items', JSON.stringify(items))
    // updateItems(items);
  }

  const fields = () => {
    if (items === 0) {
      return;
    }
    else {
      return items.map((val, idx) => {
        let itemID = `itemfield-${idx + 1}`;
        return (
          <label htmlFor={itemID} className='itemfield' key={idx}>
            <span>Item: </span>
            <input name={itemID} data-id={idx} placeholder={`Item-${idx + 1}`} onChange={addItemToField} id={itemID} className='item' />
          </label>
        )
      })
    }
  }

  const sendToDB = (e) => {
    e.preventDefault()
    let data = {
      listID: Number(lastestID),
      item: {
        items
      }
    }
    axios.post('http://localhost:8080/create/items', data).then(res => {
      alert(`List saved!`)
    }).catch(error => console.error(error));
    updateItems([{ item: '' }])
    localStorage.clear();
    history.push(`/list/${lastestID}/${name}`)
  }

  useEffect(async () => {
    // console.log("items-useEffect", items)
    if (items === 0) {
      updateItems([{ item: '' }]);
      updateDisabledButton(true);
    }
    else {
      updateDisabledButton(false)
    }
    return await axios.get('http://localhost:8080/get/list/' + lastestID).then(res => {
      updateName(res.data[0].name)
    }).catch(error => console.error(error));;
  }, [items])

  return (
    <section className="create-list">
      <form onSubmit={sendToDB}>
        <label htmlFor="title">
          <span>Title: </span>
          <input name="title" id="title" placeholder="Name for todo-list" value={name} onChange={(e) => updateName(e.target.value)} />
        </label>
        <div className='itemfields'>
          {fields()}
        </div>
        <button type="button" className="btn create-field" onClick={newField}>+</button>
        <button type="button" className="btn remove-field" disabled={disabledButton} onClick={removeField}>-</button>
        <input type="submit" value="Save" />
      </form>
    </section>
  );
}


export default CreateListLastStep;