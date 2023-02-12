import 'bootswatch/dist/flatly/bootstrap.css';
import React from 'react';
import Login from './views/login';  // componente vai virando Tag no React
import './views/custom.css'

// function App() { 
//   return ( 
//    <div>
//     Hello word
//   </div>
//   );
// }

class App extends React.Component {

  
  render(){
    return ( 
      <div>
          <Login /> 
      </div>
    )
  }
}

export default App;
