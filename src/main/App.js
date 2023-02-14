import React from 'react';

import 'bootswatch/dist/flatly/bootstrap.css';
import '../views/custom.css'

import 'toastr/build/toastr.min.js'

import Rotas from './rotas';
import NavBar from '../components/navBar';
import 'toastr/build/toastr.css'

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
