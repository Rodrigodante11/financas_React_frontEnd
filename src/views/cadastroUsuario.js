import React from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import { withRouter } from "react-router-dom"; 
import UsuarioService from "../app/service/usuarioService";
import { mensagemSucesso, mensagemErro } from "../components/toastr";

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

    validar(){
        const msgs = []

        if(!this.state.nome){

            msgs.push('O campo Nome é Obrigatorio')

        }
        if(!this.state.email){
            msgs.push('O campo Email é Obrigatorio')
        }
        else if( !this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
            msgs.push(' Informe um email Valido')
        }

        if(!this.state.senha){
            msgs.push(' Informe a senha')
        }
        if(!this.state.senhaRepeticao)
        {
            msgs.push('O campo confirmacao de senha é Obrigatorio')
        }
        if(this.state.senha !== this.state.senhaRepeticao){
            msgs.push('As senha nao combinam!')
        }


        return msgs;
    }

    cancelar = () => {
       
        this.props.history.push('/login')
    }

    cadastrar = () => {
        const msgs =  this.validar();

        if(msgs && msgs.length >0){
            
            msgs.forEach( (msg, index) => {
                mensagemErro(msg)
            });
            return false;
        }


        const usuario = {
            email: this.state.email,
            nome:  this.state.nome,
            senha: this.state.senha
        }


        this.usuarioService.salvar(usuario)
            .then( response => {
                mensagemSucesso( "Usuario cadastrado com sucesso! Faca login para acesssar o sistema. ")
                this.props.history.push('/login')
            }).catch(error => {

                mensagemErro(error.response.data)

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
                                    <button onClick={ this.cadastrar } className="btn btn-success btn-lg me-2">Salvar</button>
                                    <button type="button" onClick={ this.cancelar } className="btn btn-danger btn-lg">Cancelar</button>
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