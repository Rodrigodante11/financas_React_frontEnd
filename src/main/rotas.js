import React from "react";
import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuario";
import { Route, Switch, HashRouter } from 'react-router-dom'
import Home from "../views/home";
import ConsultaLancamentos from "../views/lancamentos/consultaLancamento";
import CadastroLancamento from "../views/lancamentos/cadastro-lancamento";

function Rotas(){
    return(
        <HashRouter> {/*  colocar a rota na url (/usuario, /cadastro) */}
            <Switch>  {/*  um Swittch case padrao de toda linguagem */}

                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />    {/* case do Switch */}
                <Route path="/cadastro-usuarios" component={CadastroUsuario} />    {/* case do Switch */}
                <Route path="/consulta-lancamento" component={ConsultaLancamentos} />    {/* case do Switch */}
                <Route path="/cadastro-lancamento/:id?" component={CadastroLancamento} />    {/* case do Switch   (?) significa que o paraetro ID eh opcional*/}

            </Switch>
        </HashRouter>
    )
}

export default Rotas;