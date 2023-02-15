import ApiService from "../apiService";

export default class LancamentoService extends ApiService{
    
    constructor(){
        super('/api/lancamentos')
    }

    obterListaMeses()  {
        return [

            {    label: 'Selecione...' , value: '' },
            {    label: 'Janeiro' ,      value: 1  },
            {    label: 'Fevereiro' ,    value: 2  },
            {    label: 'Março' ,        value: 3  },
            {    label: 'Abril' ,        value: 4  },
            {    label: 'Maio' ,         value: 5  },
            {    label: 'Junho' ,        value: 6  },
            {    label: 'Julho' ,        value: 7  },
            {    label: 'Agosto' ,       value: 8  },
            {    label: 'Setembro' ,     value: 9  },
            {    label: 'Outubro' ,      value: 10 },
            {    label: 'Novembro' ,     value: 11 },
            {    label: 'Dezembro' ,     value: 12 },
            
        ]
    }
    obterTipos() {
        return [

            {    label: 'Selecione...' , value: '' },
            {    label: 'Despesa' ,      value: 'DESPESA'  },
            {    label: 'Receita' ,   value: 'RECEITA' },           
        ]
    } 

    consultar(LancamentoFiltro){

        //api/lancamentos?ano=2019&mes=1&usuario=4
        let params = `?ano=${LancamentoFiltro.ano}`

        if(LancamentoFiltro.mes){
            params = `${params}&mes=${LancamentoFiltro.mes}`
        }
        if(LancamentoFiltro.tipo){
            params = `${params}&tipo=${LancamentoFiltro.tipo}`
        }
        if(LancamentoFiltro.status){
            params = `${params}&status=${LancamentoFiltro.status}`
        }
        if(LancamentoFiltro.usuario){
            params = `${params}&usuario=${LancamentoFiltro.usuario}`
        }
        if(LancamentoFiltro.descricao){
            params = `${params}&descricao=${LancamentoFiltro.descricao}`
        }
        return this.get(params)
    }

    deletar(id){
        return this.delete(`/${id}`)
    }

   
}