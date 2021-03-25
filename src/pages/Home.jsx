import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Axios from 'axios';
import Lists from '../components/Lists';
function Home(props) {

  const getList = async () => {
    return await Axios.get('http://localhost:8080/get/todo-list');
  }

  const [lists, updateLists] = useState([]);


  useEffect(() => {
    document.title = "ToDo lists"
    getList().then(res => {
      console.log(res.data)
      updateLists(res.data)
    }).catch(error => {
      console.error(error)
    })
  }, [])

  const mapList = () => {
    if (lists.length === 0) {
      return <h1>Table of ToDo lists is empty</h1>
    }
    else {
      return lists.map((index, key) => <Lists key={key} id={index.id} title={index.name} />)
    }
  }

  return (
    <>
      <Header />
      <section className="lists">
        <div className="container">
          {mapList()}
        </div>
      </section>
    </>
  );
}

export default Home;