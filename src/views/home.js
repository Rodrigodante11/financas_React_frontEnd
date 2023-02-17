import React from "react";
import UsuarioService from "../app/service/usuarioService";
import LocalHistorageService from "../app/service/localstorageService";

class Home extends React.Component{

    constructor(){
        super();
        this.usuarioService = new UsuarioService();
    }

    state = {
        saldo: 0
    
    }

    componentDidMount(){ //é invocado imediatamente após a montagem de um componente (inserido na árvore)
        
        const usuarioLogado = LocalHistorageService.obterItem('_usuario_logado')

        this.usuarioService
            .obterSaldoPorUsuario(usuarioLogado.id)
            .then( response =>{
                this.setState({saldo: response.data})
              
            }).catch( error =>{
                console.log(error.response)
            });
    }

    render(){
        return(
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                <p className="lead">Esse é seu sistema de finanças.</p>
                <p className="lead">Seu saldo para o mês atual é de R$ {this.state.saldo}</p>
                <hr className="my-4" />
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">

                    <a className="btn btn-primary btn-lg" 
                        href="#/cadastro-usuarios"  // nao preciso do (import { withRouter } from "react-router-dom") pois ja eh um Href
                        role="button"><i 
                        className="fa fa-users"></i>  Cadastrar Usuário</a>

                    <a className="btn btn-danger btn-lg" 
                        href="#/cadastro-lancamento" 
                        role="button"><i 
                        className="fa fa-users"></i>  Cadastrar Lançamento</a>
                </p>
            </div>
        )
    }
} 

export default  Home