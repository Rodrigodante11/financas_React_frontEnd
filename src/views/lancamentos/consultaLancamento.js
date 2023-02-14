import React from "react";
import { withRouter } from "react-router";
import FormGroup from "../../components/form-group";
import Card from "../../components/card";
import SelectMenu from "../../components/selectMenu";
import LancamentoTable from "./lancamentoTable";

class ConsultaLancamentos extends React.Component{

    render(){

        const meses = [
            
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

        const tipos = [
            {    label: 'Selecione...' , value: '' },
            {    label: 'Despesa' ,      value: 'DESPESA'  },
            {    label: 'Receita' ,   value: 'RECEITA' },
            
        ]
        
        const lancamentos = [
            { id: 1, descricao: 'Salario' , valor: 5000, mes: 1, tipo: 'Receita' , status: 'Efetivado' }
        ]



        return(
            <Card title="Consulta Lancamentos">

                <div className="row">
                    <div className="col-md-5">
                        <div className="bs-component">

                            <FormGroup htmlFor="inputAno" label="Ano: *">
                            <input type="text" 
                                className="form-control" 
                                id="inputAno" 
                                aria-describedby="emailHelp" 
                                placeholder="Digite o Ano" />
                            </FormGroup>

                            <FormGroup htmlFor="inputMes" label="Mes: *">
                                <SelectMenu input="inputMes" className="form-control" lista={meses}/>
                            </FormGroup>

                            <FormGroup htmlFor="inputMes" label="Mes: *">
                                <SelectMenu input="inputTipo" className="form-control" lista={tipos}/>
                            </FormGroup>
                            <div className="card-body d-flex justify-content-center">
                                <button type="button" className="btn btn-primary btn-lg me-2">Editar</button>
                                <button type="button" className="btn btn-danger btn-lg me-2">Deletar</button>
                            </div>
                        
                        </div>

                        

                        <div className="row">
                            <div className="col-md-12">
                                <div className="bs-component">

                                    <LancamentoTable lancamentos={lancamentos}></LancamentoTable>

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