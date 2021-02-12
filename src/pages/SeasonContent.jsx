import React, { useEffect, useState } from 'react';
import {
  useParams
} from "react-router-dom";
import Axios from 'axios';
import Header from '../components/Header';
import DisplayLayout from '../components/LayoutDisplay';
function SeasonContent(props) {
  let { id } = useParams();
  const layoutDisplay = async () => {
    return await Axios.get(`http://localhost:8080/get/season/${id}`);
  }

  const [mapFeature, updateMapFeature] = useState('');

  useEffect(() => {
    layoutDisplay().then(res => {
      updateMapFeature(res.data.map((index, key) => <DisplayLayout key={index.id} title={index.title} players={index.players} />))
    }).catch(error => console.error(error))
  }, [])
  return (
    <>
      <Header />
      <section className="season-content">
        {mapFeature}
      </section>
    </>
  );
}

export default SeasonContent;