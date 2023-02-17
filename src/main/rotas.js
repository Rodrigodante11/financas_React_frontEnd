import React from "react";
import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuario";
import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'
import Home from "../views/home";
import ConsultaLancamentos from "../views/lancamentos/consultaLancamento";
import CadastroLancamento from "../views/lancamentos/cadastro-lancamento";
import AuthService from "../app/service/authService";


function RotaAutenticada( { component: Component, ...props }){

    return(

        <Route {...props} render={ (componentProps ) =>{  // roster= componente que quero renderizar

           if(AuthService.isUsuarioAutenticado()){

                return (
                    <Component {...componentProps} />
                )

           }else{ // se nao tiver usuario logado

                return(
                    <Redirect to = {{ pathname: '/login' , state: { from: componentProps.location }}} />    
                    // redirecione para tela login       //(state) { de onde : de onde veio a chamada para o login (exemplo da home)
                )

           }
        }} />
    )
}

function Rotas(){
    return(

        <HashRouter> {/*  colocar a rota na url (/usuario, /cadastro) */}
            <Switch>  {/*  um Swittch case padrao de toda linguagem */}
                
                <Route path="/login" component={Login} />    {/* case do Switch */}  
                <Route path="/cadastro-usuarios" component={CadastroUsuario} />    {/* case do Switch */}

                <RotaAutenticada path="/home" component={Home} />                             
                <RotaAutenticada path="/consulta-lancamento" component={ConsultaLancamentos} />    {/* case do Switch */}
                <RotaAutenticada path="/cadastro-lancamento/:id?" component={CadastroLancamento} />    {/* case do Switch   (?) significa que o paraetro ID eh opcional*/}

            </Switch>
        </HashRouter>
    )
}

export default Rotas;