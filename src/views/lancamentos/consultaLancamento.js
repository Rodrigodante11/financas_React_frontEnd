import React from "react";
import { withRouter } from "react-router";
import FormGroup from "../../components/form-group";
import Card from "../../components/card";
import SelectMenu from "../../components/selectMenu";
import LancamentoTable from "./lancamentoTable";

import LancamentoService from "../../app/service/lancamentoService";
import LocalHistorageService from "../../app/service/localstorageService";

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

    render(){

        const meses =this.lancamentoService.obterListaMeses();

        const tipos = this.lancamentoService.obterTipos();

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
                                <button type="button" className="btn btn-danger btn-lg me-2">Excluir</button>
                            </div>
                        
                        </div>
                    </div>
                    <div className="col-md-12">
                        

                        <div className="row">
                            <div className="col-md-12">
                                <div className="bs-component">

                                    <LancamentoTable lancamentos={this.state.lancamentos}></LancamentoTable>

                                </div>
                            </div>
                        </div>
                    </div>
                
                </div>
            </Card>
        )
    }
    
}

export default withRouter(ConsultaLancamentos)