import React from "react";
import Card from "../components/card"
import FormGroup from "../components/form-group";
// import imgSpringReact from "../img/Spring-Boot-React.png"

class Login extends React.Component{
    state = {
        email: '',
        senha: ''
    }
    entrar = () => {
        console.log('Email: ', this.state.email)
        console.log('Senha: ', this.state.senha)
    }

    render(){
        return (<div className="container">
                <div className="row">
                    <div className="col-md-6" style={{ position: 'relative', left: '300px'}}  >

                         <Card title='Finanças Login'>  {/*tudo que esta dentro dessa Tag ira para {this.props.children} la em (Card) */}
                         
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
                                            <button type="button" className="btn btn-danger btn-lg">Cadastrar</button>
                                        </div>
                                        
                                    </fieldset>

                                    </div>
                                </div>
                            </div>

                        </Card>
                        {/* <img src={imgSpringReact} style={{ width: '100%', height:'100' }} /> */}
                    </div>
                </div>
            </div>
        )
    }
    
}

export default Login;