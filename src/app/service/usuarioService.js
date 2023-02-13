import ApiService from "../apiService";

class UsuarioService extends ApiService{

    constructor(){
        super('/api/usuario')
    }

    autenticar(credencias){
        return this.post( '/autenticar', credencias)
    }

    obterSaldoPorUsuario(id){
        return  this.get(`/${id}/saldo`)
    }

}

export default UsuarioService;