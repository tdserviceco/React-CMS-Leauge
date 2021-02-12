import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Header from '../components/Header';
function CreateSeason(props) {

  useEffect(() => {
    document.title = 'Create a new season for a game'
  }, [])

  const
    [title, updateTitle] = useState(''),
    [names, updateNames] = useState([{ name: '' }]),
    [listOfGames, updateListOfGames] = useState([]);


  const sendToDB = (e) => {
    e.preventDefault();
    let post = {
      'title': title,
      'players': names
    }

    const url = 'http://localhost:8080/create/season';
    Axios.post(url, post).then(res => {
      alert(res.data);
    })
  }

  const newField = () => {
    updateNames((prevState) => ([...prevState, {
      name: ''
    }]))
  }

  const addNames = (e) => {
    names[e.target.dataset.id][e.target.className] = e.target.value;

  }
  return (
    <>
      <Header />
      <section className="create-season">
        <div className="title-container">
          <h2 className="title">Create season!</h2>
        </div>
        <form onSubmit={sendToDB} >
          <label htmlFor="title">
            <span>Title:</span>
            <input name="title" id="title" value={title} onChange={(e) => updateTitle(e.target.value)} />
          </label>
          {
            names.map((val, idx) => {
              let nameID = `namefield-${idx + 1}`;
              return (
                <div className="namefields" key={idx}>
                  <label htmlFor={nameID}>
                    <span>Name: </span>
                    <input name={nameID} data-id={idx} id={nameID} onChange={addNames} className='name' />
                  </label>
                </div>
              )
            })
          }
          <select onChange={(e) => updateListOfGames(e.target.value)}>
            {/* {fetchList()} */}
          </select>
          <button type="button" className="btn create-field" onClick={newField}>+</button>
          <input type="submit" className="btn submit" value="Send" />
        </form>
      </section>
    </>
  );
}

export default CreateSeason;
