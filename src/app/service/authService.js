import LocalStorageService from "./localstorageService";


export default class AuthService {

    static isUsuarioAutenticado (){

        const usuario = LocalStorageService.obterItem('_usuario_logado')
        return usuario && usuario.id

    }

    static removerUsuarioLogado (){

        LocalStorageService.removerItem('_usuario_logado')

    }

    static logar(usuario){
        
        LocalStorageService.addItem('_usuario_logado', usuario)
        
    }

    static obterUsuarioAutenticado(){

        return LocalStorageService.obterItem('_usuario_logado')
    }
}