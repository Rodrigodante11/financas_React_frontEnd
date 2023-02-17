import React from "react";
import { withRouter  } from "react-router-dom";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import LancamentoService from "../../app/service/lancamentoService";
import * as messages from '../../components/toastr'
import LocalHistorageService from "../../app/service/localstorageService";


class CadastroLancamento extends React.Component{

    constructor(){
        super();
        this.lancamentoService = new LancamentoService();
    }

    handleChande= (event) =>{
        const value = event.target.value; // pegando o valor do input
        const name = event.target.name; // pegando o name da Tag

        this.setState({ [name] : value}) // setando os valores
    }

    componentDidMount(){ // executa depois de render (renderizar)
        const params = this.props.match.params // pegando as propriedades da URL

        if(params.id){ // se eu nao pasar o (id) como para entar estou entrando no formulario de cadastro para CRIAR e nao para ATUALIZAR
            this.lancamentoService.obterPorId(params.id)
                    .then(response => {
                        // console.log(response.data)
                        this.setState({
                            ...response.data , // ... = spread operator = colocar todos propriedades // mostrar todos dados de ataualizar ao usuario 
                            atualizando:true})  

                    }).catch(errors => {
                        messages.mensagemErro('Error a Atualizar , Aviso o desenvolvedor')
                    })
        }

        // console.log(params)
    }

    state={
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: '',
        usuario: null,
        atualizando:false
    }

    submit = () => { // cadastrar nao tem ID
        // console.log(this.state)

        const usuarioLogado = LocalHistorageService.obterItem('_usuario_logado')
        
        const { descricao, valor, mes, ano, tipo} =  this.state;

        const lancamento = { 
            descricao,  // descricao: descricao,
            valor,      // valor:valor
            mes,        // mes:mes
            ano,        // ano:ano
            tipo,       // tipo:tipo
            usuario:usuarioLogado.id
        }
        
        try{
            this.lancamentoService.validar(lancamento) // enviando para validar para confirmar que tdos os campos estao preenchidos

        }catch(erro){
          
            const mensagens = erro.mensagens;
            mensagens.forEach( msg => messages.mensagemErro(msg));
            return false;

        }
        
        this.lancamentoService
            .salvar(lancamento)
            .then(Response => {
                this.props.history.push('/consulta-lancamento')
                messages.mensagemSucesso('Lancamento Cadastratado com sucesso!')

            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })

    }  // igual ao metodo submit/cadastrar so que tem ID

    atualizar = () => {
        const { descricao, valor, mes, ano, tipo, status, usuario, id } = this.state;

        const lancamento = { 
            descricao,       //descricao:descricao  nomes iguais nao precisa colocar
            valor, 
            mes, 
            ano, 
            tipo, 
            usuario, 
            status, 
            id 
        };
        
        this.lancamentoService
            .atualizar(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamento')
                messages.mensagemSucesso('Lançamento atualizado com sucesso!')
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    render(){
        const tipos = this.lancamentoService.obterTipos();
        const meses = this.lancamentoService.obterListaMeses();

        return (
            <Card title={this.state.atualizando ? "Atualizar Lancamento" :  "Cadastro de lancamento"}>
                <div className="row">

                    <div className="col-md-12">
                        <FormGroup id="inputDescricao" label="Descricao: *">

                            <input id="inputDescricao" 
                                type="text" 
                                className="form-control"
                                name="descricao"
                                value={this.state.descricao}
                                onChange={this.handleChande}/>

                        </FormGroup>
                    </div>
                </div>

                <div className="row">

                    <div className="col-md-6">
                        <FormGroup id="inputAno" label="Ano: *">

                            <input id="inputAno" 
                                type="text" 
                                className="form-control" 
                                name="ano"
                                value={this.state.ano}
                                onChange={this.handleChande}/>

                        </FormGroup>
                    </div>

                    <div className="col-md-6">
                        <FormGroup id="inputMeses" label="Mes: *">

                            <SelectMenu id="inputMes" 
                                lista={meses} 
                                className="form-control" 
                                name="mes"
                                value={this.state.mes}
                                onChange={this.handleChande}/>
                          
                        </FormGroup>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputValor" label="Valor: *">

                            <input id="inputValor" 
                                type="text" 
                                className="form-control"
                                name="valor"
                                value={this.state.valor}
                                onChange={this.handleChande}/>

                        </FormGroup>
                    </div>

                    <div className="col-md-4">

                        <FormGroup id="inputTipo" label="Tipo: *">

                            <SelectMenu id="inputTipo" 
                                lista={tipos} 
                                className="form-control"
                                name="tipo"
                                value={this.state.tipo}
                                onChange={this.handleChande} />         
                            
                        </FormGroup>
                    </div>
                    
                    <div className="col-md-4">
                        <FormGroup id="inputStatus" label="Status: *">

                           <input type="text" 
                            className="form-control" 
                            disabled={true}
                            name="status"
                            value={this.state.status}
                            onChange={this.handleChande}/>

                        </FormGroup>
                    </div>

                    <div className="card-body d-flex justify-content-center">

                        {this.state.atualizando ?  // condicao ternaria para ver se a tela vai para atualizar ou cadastrar lancamento
                            (
                                <button onClick={this.atualizar} type="button" className="btn btn-primary btn-lg me-4">Atualizar</button>   
                            ) : (
                                <button onClick={this.submit} type="button" className="btn btn-success btn-lg me-4">Salvar</button>
                            )

                        }
                        
                        <button onClick={ e => this.props.history.push('/consulta-lancamento')}
                            type="button" className="btn btn-danger btn-lg me-2">Cancelar</button>

                    </div>


                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroLancamento);