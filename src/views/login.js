import React from "react";
import Card from "../components/card"
import FormGroup from "../components/form-group";
import { withRouter } from "react-router-dom"; 
import axios from "axios";
// import imgSpringReact from "../img/Spring-Boot-React.png"


class Login extends React.Component{
    state = {
        email: '',
        senha: '',
        mensagemErro: null
    }
    entrar = async() => {

        await axios.post('http://localhost:8080/api/usuario/autenticar', { 
            email: this.state.email,
            senha: this.state.senha

        }).then(response => {
            this.props.history.push('/home')
        }).catch( erro =>{  
            this.setState({mensagemErro: erro.response.data})
        })
        
        // o que esta aqui executa antes do que esta no axios se nao tiver o async() await
        // no caso com async() await eu digo pra ele executa e esperar a resposta antes de fazer outra coisa
        // no caso as coisas que estao abaixo do axist.post()

        // usuariotest@email.com
        // senhatest
        
    }

    prepareCadastrar = () => {
       
        this.props.history.push('/cadastro-usuarios')
    }

    render(){
        return (

                <div className="row">
                    <div className="col-md-6" style={{ position: 'relative', left: '300px'}}  >

                         <Card title='Finanças Login'>  {/*tudo que esta dentro dessa Tag ira para {this.props.children} la em (Card) */}
                            <div className="row">
                                <span>{this.state.mensagemErro}</span>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                    <fieldset>

                                        <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                            
                                            <input type="email" 
                                                value={this.state.email}
                                                onChange= {  e => this.setState({email: e.target.value})}
                                                className="form-control" 
                                                id="exampleInputEmail1" 
                                                aria-describedby="emailHelp" 
                                                placeholder="Digite o Email"/>

                                        </FormGroup>
                                        <FormGroup  label="Senha: *" htmlFor="exampleInputPassword1">

                                            <input type="password" 
                                                value={this.state.senha}
                                                onChange= {  e => this.setState({senha: e.target.value})}
                                                className="form-control" 
                                                id="exampleInputPassword1" 
                                                placeholder="Password"/>
                                        </FormGroup>
                                        <div className="card-body d-flex justify-content-center">
                                            <button onClick={ this.entrar } className="btn btn-success btn-lg me-2">   Entrar</button>
                                            <button type="button" onClick={ this.prepareCadastrar } className="btn btn-danger btn-lg">Cadastrar</button>
                                        </div>
                                        
                                    </fieldset>

                                    </div>
                                </div>
                            </div>

                        </Card>
                        {/* <img src={imgSpringReact} style={{ width: '100%', height:'100' }} /> */}
                    </div>
                </div>
            
        )
    }
    
}

export default withRouter(Login);