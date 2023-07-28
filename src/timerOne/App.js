import React from 'react';
import Entries from "./Components/Entries.jsx";

const App = (props) => {

  return (

    <div>
      <div>
        <div><Entries store={props.store}/></div>
      </div>
    </div>
  );
}
export default App;
