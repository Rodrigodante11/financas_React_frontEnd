import logo from './logo.svg';
import './App.css';
import React from 'react';


// function App() { 
//   return ( 
//    <div>
//     Hello word
//   </div>
//   );
// }

class App extends React.Component {

  somar = ()=>{
    const resultado = parseFloat(this.state.numero2) + parseFloat(this.state.numero1)
    this.setState({resultado: resultado})
  }

  state = {
    numero1: '',
    numero2: '',
    resultado: ''
  }

  render(){
    return ( 
         <div>
          <label> Digte o primeiro numero 1: </label>

          <input type="text" value={this.state.numero1} 
              onChange={ (e) => 
              this.setState({numero1: e.target.value}) } />

          O nomero 1 digitado foi: {this.state.numero1}

          <br></br>

          <label> Digte o primeiro numero 2: </label>
          <input type="text" value={this.state.numero2} 
              onChange={ (e) => 
              this.setState({numero2: e.target.value}) } />

          O nomero 2 digitado foi: {this.state.numero2}        
         
          <br></br>

          <button onClick={this.somar}> Resultado</button>
          <br></br>
          Resultado: {this.state.resultado}       
        </div>
    )
  }
}

export default App;
