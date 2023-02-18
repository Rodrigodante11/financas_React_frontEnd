import React from "react";
import NavBarItem from "./navBarItem";
// import AuthService from "../app/service/authService";
import { AuthConsumer } from "../main/provedorAutenticacao";
import LocalStorageService from "../app/service/localstorageService";


// const deslogar = () =>{
//     AuthService.removerUsuarioLogado();
// }

// const isUsuarioAutenticado = () =>{
//     return AuthService.isUsuarioAutenticado();
// }
const usuarioNome = () =>{
    const teste  = LocalStorageService.obterItem('_usuario_logado')
    console.log(teste.nome)
    return teste.nome
}

function NavBar(props){
                    
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary" >
            <div className="container">
                <a href="#/home" className="navbar-brand">Minhas Finanças</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                    
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">

                        <NavBarItem render={props.isUsuarioAutenticado} href="#/home" label="Home"/>
                        <NavBarItem render={props.isUsuarioAutenticado} href="#/cadastro-usuarios" label="Usuários"/>
                        <NavBarItem render={props.isUsuarioAutenticado} href="#/consulta-lancamento" label="Lançamentos"/>
                        <NavBarItem render={props.isUsuarioAutenticado} href="#/login" label={props.isUsuarioAutenticado ? `Bem vindo, ${usuarioNome()}` :  "Logar"}  onClick={props.deslogar} />

                    </ul>
                </div>
        </div>
    </div>
    )
}

// export default NavBar;
export default () => (
    <AuthConsumer>
        {
             (context) => ( <NavBar isUsuarioAutenticado={context.isAutenticado} deslogar={context.encerrarSessao} /> )
        }
       
    </AuthConsumer>
)