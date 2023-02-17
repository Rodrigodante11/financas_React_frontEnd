import LocalHistorageService from "./localstorageService";


export default class AuthService {

    static isUsuarioAutenticado (){

        const usuario = LocalHistorageService.obterItem('_usuario_logado')
        return usuario && usuario.id

    }

    static removerUsuarioLogado (){

        LocalHistorageService.removerItem('_usuario_logado')

    }
}