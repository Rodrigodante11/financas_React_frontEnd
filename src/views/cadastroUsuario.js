import React from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import { withRouter } from "react-router-dom"; 
import UsuarioService from "../app/service/usuarioService";
import * as messages from '../components/toastr'

class CadastroUsuario extends React.Component{

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor (){
        super()
        this.usuarioService = new UsuarioService();
    }

    cancelar = () => {
       
        this.props.history.push('/login')
    }

    cadastrar = () => {

        // const usuario = {
        //     email: this.state.email,
        //     nome:  this.state.nome,
        //     senha: this.state.senha,
        //     senhaRepeticao: this.state.senhaRepeticao
        // }

        const { nome, email, senha, senhaRepeticao } = this.state // igual ao de cima comentado

        const usuario = { nome, email, senha, senhaRepeticao }

        try{

            this.usuarioService.validar(usuario)

        }catch(erro){

            const mensagens = erro.mensagens;
            mensagens.forEach( msg => messages.mensagemErro(msg));
            return false;

        }

        this.usuarioService.salvar(usuario)
            .then( response => {
                messages.mensagemSucesso( "Usuario cadastrado com sucesso! Faca login para acesssar o sistema. ")
                this.props.history.push('/login')
            }).catch(error => {

                messages.mensagemErro(error.response.data)

            })
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
                                    
                                    <button onClick={ this.cadastrar } 
                                            className="btn btn-success btn-lg me-2">
                                                <i className="pi pi-save"></i>Salvar
                                    </button>

                                    <button type="button" onClick={ this.cancelar } 
                                            className="btn btn-danger btn-lg">
                                                <i className="pi pi-times"></i>Cancelar
                                    </button>

                                </div>

                            </fieldset>
                        </div>
                    </div>
                </div>
                
            </Card>
           
        )
    }
}

export default withRouter( CadastroUsuario);