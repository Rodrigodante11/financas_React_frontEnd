import React from 'react';

import 'bootswatch/dist/flatly/bootstrap.css';
import '../views/custom.css'

import Rotas from './rotas';
import NavBar from '../components/navBar';

class App extends React.Component {

  
  render(){
    return ( 
      <>
        <NavBar />
          <div>
              <div className="container">
                  <Rotas />
              </div>              
          </div>
      </>
      
    )
  }
}

export default App;
