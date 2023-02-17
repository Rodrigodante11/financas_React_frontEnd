import React from "react";
import { withRouter } from "react-router";
import FormGroup from "../../components/form-group";
import Card from "../../components/card";
import SelectMenu from "../../components/selectMenu";
import LancamentoTable from "./lancamentoTable";

import LancamentoService from "../../app/service/lancamentoService";
import LocalHistorageService from "../../app/service/localstorageService";


import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import * as messages from '../../components/toastr'

class ConsultaLancamentos extends React.Component{

    constructor(){

        super();
        this.lancamentoService = new LancamentoService();

    }

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao:'',
        showConfirmDialog: false,
        lancamentoDeletar:{},
        lancamentos: []
    }

    buscar = () =>{
        if(!this.state.ano){
            messages.mensagemErro('O campo Ano é obrigatorio.')
            return false
        }
        const usuarioLogado = LocalHistorageService.obterItem('_usuario_logado')

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.lancamentoService
            .consultar(lancamentoFiltro)
            .then( response =>{
                
                this.setState({ lancamentos : response.data})
              
            }).catch( error =>{
                console.log(error)
            })

    }

    editar = (id) =>{
        this.props.history.push(`/cadastro-lancamento/${id}`)
        
    }

    abrirConfirmacaoDeletar = (lancamento) =>{
        this.setState({ showConfirmDialog: true , lancamentoDeletar: lancamento})
        
    }
    cancelarDelecao =() =>{
        this.setState({ showConfirmDialog: false , lancamentoDeletar: {} })
    }
    deletar = () =>{

        this.lancamentoService
            .deletar(this.state.lancamentoDeletar.id)
            .then(response => {
                
                // comandos abaixo foi so para atualizar a pagina pois o item ja foi deletado 
                // entrando nesse metodo
                const lancamentosConst = this.state.lancamentos // pegando todos lancamentos 
                const indexParaDeletar = lancamentosConst.indexOf(this.lancamentoDeletar) // descobrindo o index do excluido

                lancamentosConst.splice(indexParaDeletar, 1) // deletando o excluido
                this.setState({lancamentos: lancamentosConst}) // setando a nova lista
                

                messages.mensagemSucesso('Lancamento deletado com Sucesso')
                this.setState({ showConfirmDialog: false , lancamentoDeletar: {}})
                
            }).catch(error =>{
                messages.mensagemErro(' Erro ao tentar deletar o Lancamento, Relate ao desenvolvedor')
            })
        
    }

    preparaFormularioCadastro =() => {
        this.props.history.push('/cadastro-lancamento')
    }
    
    render(){

        const meses =this.lancamentoService.obterListaMeses();

        const tipos = this.lancamentoService.obterTipos();

        const confirmDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} className="p-button-text" />
                
                <Button label="Cancelar" icon="pi pi-times"  onClick={this.cancelarDelecao} autoFocus />
            </div>
        );

        return(
            <Card title="Consulta Lancamentos">

                <div className="row">
                    <div className="col-md-5">
                        <div className="bs-component">

                            <FormGroup htmlFor="inputAno" label="Ano: ">
                            <input type="text" 
                                className="form-control" 
                                id="inputAno"
                                value={this.state.ano}
                                onChange={ e => this.setState({ ano: e.target.value})}                               
                                placeholder="Digite o Ano" />
                            </FormGroup>

                            <FormGroup htmlFor="inputMes" label="Mes: ">
                                <SelectMenu input="inputMes" 
                                        className="form-control" 
                                        value={this.state.mes}
                                        onChange={e => this.setState({ mes: e.target.value})}
                                        lista={meses}/>
                            </FormGroup>

                            <FormGroup htmlFor="inputDescricao" label="Descricao: ">
                                <input type="text" 
                                    className="form-control" 
                                    id="inputDescricao"
                                    value={this.state.descricao}
                                    onChange={ e => this.setState({ descricao: e.target.value})}                               
                                    placeholder="Digite o Ano" />
                            </FormGroup>

                            <FormGroup htmlFor="inputTipo" label="Tipo: *">
                                <SelectMenu input="inputTipo" 
                                        className="form-control" 
                                        value={this.state.tipo}
                                        onChange={e => this.setState({ tipo: e.target.value})}
                                        lista={tipos}/>
                            </FormGroup>

                            <div className="card-body d-flex justify-content-center">
                                <button type="button" onClick={this.buscar} className="btn btn-primary btn-lg me-2">Buscar</button>
                                <button onClick={this.preparaFormularioCadastro} type="button" className="btn btn-danger btn-lg me-2">Cadastrar</button>
                            </div>
                        
                        </div>
                    </div>
                    <div className="col-md-12">
                        

                        <div className="row">
                            <div className="col-md-12">
                                <div className="bs-component">

                                    <LancamentoTable lancamentos={this.state.lancamentos} 
                                        deleteAction={this.abrirConfirmacaoDeletar}
                                        editAction={this.editar} />                
                                    
                                    <div className="flex flex-wrap justify-content-center gap-2 mb-2">
    
                                    </div>
                                </div>                                                          
                            </div>

                            <div>
                            <Dialog header="Excluir Lancamento" 
                                visible={this.state.showConfirmDialog} 
                                style={{ width: '50vw' }} 
                                onHide={() => this.setState({showConfirmDialog: false})} 
                                modal={true}  //congelar a tela quando o dialog estever aparecendo
                                footer={confirmDialogFooter}>
                                <p className="m-0">
                                    Gostaria de Deletar o Lancamento?
                                </p>
                            </Dialog>
                            </div>
                        </div>
                    </div>

                </div>
            </Card>
        )
    }
    
}

export default withRouter(ConsultaLancamentos)