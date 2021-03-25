import React from 'react';
import {
  Link
} from "react-router-dom";

function Lists(props) {
  return (
    <Link to={`/list/${props.id}/${props.title}`}>
      <div className="list">
        <h2 className="list-title">{props.title}</h2>
      </div>
    </Link>
  );
}

export default Lists;