import React from "react";

import AuthService from "../app/service/authService";

export const AuthContext = React.createContext()
export const AuthConsumer =  AuthContext.Consumer;
const AuthProvider =  AuthContext.Provider;


class ProvedorAutenticacao extends React.Component{

    state = {
        usuarioAutenticado:  null,
        isAutenticado: false
    }

    iniciarSessao = (usuario) => {
        
        
        AuthService.logar(usuario);
        this.setState({ isAutenticado: true, usuarioAutenticado: usuario })
    }

    encerrarSessao = () => {
        AuthService.removerUsuarioLogado();
        this.setState({ isAutenticado: false, usuarioAutenticado: null})
    }

    

    render(){

        const contexto = { // contexto que esta sendo usado na tela login / home eh esse
            usuarioAutenticado: this.state.usuarioAutenticado,
            isAutenticado: this.state.isAutenticado,
            iniciarSessao: this.iniciarSessao,
            encerrarSessao: this.encerrarSessao
        }

        return(
            <AuthProvider value={contexto}>
                { this.props.children }  {/*tudo que tiver dentro do <ProvedorAutenticacao> sera o children */}
            </AuthProvider>

        )
    }
}

export default ProvedorAutenticacao