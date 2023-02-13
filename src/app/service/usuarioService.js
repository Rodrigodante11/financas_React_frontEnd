import ApiService from "../apiService";

class UsuarioService extends ApiService{

    constructor(){
        super('/api/usuario')
    }

    autenticar(credencias){
        return this.post( '/autenticar', credencias)
    }

}

export default UsuarioService;