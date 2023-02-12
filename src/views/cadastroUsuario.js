import React from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";

class CadastroUsuario extends React.Component{

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    cadastrar = () =>{
        console.log(this.state)
    }

    render() {
        return (

            <Card title="Cadastro de Usuario">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <fieldset>

                                <FormGroup label="Nome: *" htmlFor="inputNome">
                                        
                                    <input type="text" 
                                        // value={this.state.email}
                                        onChange= {  e => this.setState({nome: e.target.value})}
                                        className="form-control" 
                                        id="inputNome"                         
                                        placeholder="Digite o Nome"
                                        name="nome"/>

                                </FormGroup>

                                <FormGroup label="Email: *" htmlFor="inputEmail">
                                        
                                    <input type="email" 
                                        // value={this.state.email}
                                        onChange= {  e => this.setState({email: e.target.value})}
                                        className="form-control" 
                                        id="inputEmail"                                            
                                        placeholder="Digite o Email"/>

                                </FormGroup>

                                <FormGroup label="Senha: *" htmlFor="inputSenha">
                                        
                                    <input type="password" 
                                        // value={this.state.email}
                                        onChange= {  e => this.setState({senha: e.target.value})}
                                        className="form-control" 
                                        id="inputSenha"                                            
                                        placeholder="Digite a Senha"/>

                                </FormGroup>

                                
                                <FormGroup label="Digite a Senha novemanete: *" htmlFor="inputRepitaSenha">
                                        
                                    <input type="password" 
                                        // value={this.state.email}
                                        onChange= {  e => this.setState({senhaRepeticao: e.target.value})}
                                        className="form-control" 
                                        id="inputRepitaSenha"                                            
                                        placeholder="Digite a Senha novamente"/>

                                </FormGroup>

                                <div className="card-body d-flex justify-content-center">
                                    <button onClick={ this.cadastrar } className="btn btn-success btn-lg me-2">Salvar</button>
                                    <button type="button" className="btn btn-danger btn-lg">Cancelar</button>
                                </div>

                            </fieldset>
                        </div>
                    </div>
                </div>
                
            </Card>
           
        )
    }
}

export default CadastroUsuario;