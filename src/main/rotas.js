import React from "react";
import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuario";
import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'
import Home from "../views/home";
import ConsultaLancamentos from "../views/lancamentos/consultaLancamento";
import CadastroLancamento from "../views/lancamentos/cadastro-lancamento";
import { AuthConsumer } from "./provedorAutenticacao";

// import AuthService from "../app/service/authService";


function RotaAutenticada( { component: Component, isUsuarioAutenticado, ...props }){

    return(

        <Route {...props} render={ (componentProps ) =>{  // roster= componente que quero renderizar

           if(isUsuarioAutenticado){

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

function Rotas(props){
    return(

        <HashRouter> {/*  colocar a rota na url (/usuario, /cadastro) */}
            <Switch>  {/*  um Swittch case padrao de toda linguagem */}
                
                <Route path="/login" component={Login} />    {/* case do Switch */}  
                <Route path="/cadastro-usuarios" component={CadastroUsuario} />    {/* case do Switch */}

                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado}  path="/home" component={Home} />                             
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-lancamento" component={ConsultaLancamentos} />    {/* case do Switch */}
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-lancamento/:id?" component={CadastroLancamento} />    {/* case do Switch   (?) significa que o paraetro ID eh opcional*/}

            </Switch>
        </HashRouter>
    )
}
// Rotas.contextType = AuthProvider (nao funciona em funcao so em classe)


// export default Rotas;

export default () =>( // mesma coisa que (Rotas.contextType = AuthProvider) porem por nao ser classe nao consigo usar o mesmo
    <AuthConsumer>
        { 
            (context) => ( <Rotas isUsuarioAutenticado={context.isAutenticado} /> )  // fiz tudo isso pra poder receber o (props) por parametro na funcao (function Rotas(props)

        }
    </AuthConsumer>
)