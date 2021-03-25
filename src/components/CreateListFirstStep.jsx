import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
function CreateListFirstStep(props) {
  const [title, updateTitle] = useState('');
  let history = useHistory();
  const createListName = (e) => {
    e.preventDefault();
    let data = {
      'name': title,
    }
    axios.post('http://localhost:8080/create/list', data).then(res => {
      alert('Done')
      history.push(`/dashboard/create/list/step2?id=${res.data.insertId}`)
    }).catch(error => console.error(error))
  }
  return (
    <section className="first-step">
      <form onSubmit={createListName}>
        <label htmlFor="title">
          <span>Title:</span>
          <input name="title" id="title" onChange={(e) => updateTitle(e.target.value)} placeholder="Enter title for todo list" />
        </label>
        <input type="submit" value="Next step" />
      </form>
    </section>
  );
}

export default CreateListFirstStep;