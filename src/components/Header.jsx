import React from 'react';
import {
  Link
} from "react-router-dom";
function Header(props) {
  return (
    <header>
      <Link to={'/'}>Home</Link>
      <Link to={'/dashboard/create/season'}>Create new season</Link>
    </header>
  );
}

export default Header;