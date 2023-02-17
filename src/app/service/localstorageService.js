
class LocalStorageService{

    // O LocalStorage é uma forma de salvar dados no computador do cliente. 
    // Ele permite que salvemos pares de chaves e valores no web browser sem uma data de expiração.
    // Essa forma de armazenamento só pode ser acessada via JavaScript e HTML5, 
    // mas é importante saber que o usuário pode limpar os dados/cache do browser se quiser.
    // Apos logar pode ser visto em inspecionar> Aplicativo> Armazenamento> ArmazenamentoLocal

    static addItem(chave, valor){

        //JSON.stringify() // TRanforma um objeto em String
        localStorage.setItem(chave, JSON.stringify(valor)); // pegando o Usuario Logado
    }

    static obterItem(chave){
        
        const item =  localStorage.getItem(chave); // pega o usuario logado
        return JSON.parse(item) ; // converte para json e retorna
    }

    static removerItem(chave){
        localStorage.removeItem(chave)
    }
}

export default LocalStorageService