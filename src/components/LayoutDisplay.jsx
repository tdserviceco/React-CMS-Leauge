import React from 'react';

function LayoutDisplay(props) {
  return (
    <div className="content-container">
      <h1>{props.title}</h1>
      <p>{props.players}</p>
    </div>
  );
}

export default LayoutDisplay;