import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Header from './Header';
function DisplayList(props) {
  const
    [items, updateItems] = useState([{}]),
    [title, updateTitle] = useState(''),
    [checked, updateCheck] = useState(false);

  const { id } = useParams();
  useEffect(async () => {
    await axios.get(`http://localhost:8080/get/fullList/${id}`).then(res => {
      updateTitle(res.data[0].name);
      updateItems(JSON.parse(res.data[0].item));
    })

  }, []);

  const history = useHistory();

  // const controllCheck = (e) => {
  //   console.log(e.target.value)

  //   if (!checked) {
  //     updateCheck(true)
  //   }
  //   else {
  //     updateCheck(false)
  //   }

  // }

  const mapValues = () => {
    return items.map((items, key) => {
      return (
        <div key={key} className="item-check">
          <label className={checked ? 'check-line' : ''} htmlFor={`item-${key}`}>{items.item}</label>
          <input id={`item-${key}`} type="checkbox" /**onChange={controllCheck}*/ name="checkmark" />
        </div>
      )
    })
  }

  const removeList = () => {
    console.log(id)
    let data = { data: { id: id } }
    axios.delete('http://localhost:8080/delete/list', data).then(
      alert("list deleted!")
    )
    history.push('/');
  }

  return (
    <>
      <Header />
      <div className="items">
        <h1 className="title">{title}</h1>
        {mapValues()}
        <button onClick={removeList} className="btn remove-list">Delete list</button>
      </div>
    </>
  );
}

export default DisplayList;