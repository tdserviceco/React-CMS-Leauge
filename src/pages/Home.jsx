import React, { useEffect } from 'react';
import Header from '../components/Header';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { seasons } from '../actions';
import SeasonList from '../components/SeasonList';
function Home(props) {

  const dispatch = useDispatch();
  const listOfSeasons = useSelector(state => state.seasons)

  const getList = async () => {
    return await Axios.get('http://localhost:8080/get/seasons');
  }

  useEffect(() => {
    getList().then(res => {
      // console.log(res.data)
      dispatch(seasons(res.data.map((index, key) => <SeasonList key={index.id} id={index.id} title={index.title} />)));
    }).catch(error => {
      console.error(error)
    })
  }, [])


  return (
    <>
      <Header />
      <section className="seasons">
        <div className="container">
          {listOfSeasons}
        </div>
      </section>
    </>
  );
}

export default Home;