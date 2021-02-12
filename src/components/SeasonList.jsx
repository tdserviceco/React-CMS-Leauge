import React from 'react';
import {
  Link
} from "react-router-dom";

function SeasonList(props) {
  return (
    <Link to={`/season/${props.id}/${props.title.toLowerCase()}`}>
      <div className="season">
        <h2 className="season-title">{props.title}</h2>
      </div>
    </Link>
  );
}

export default SeasonList;