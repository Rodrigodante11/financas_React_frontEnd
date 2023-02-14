import React from 'react'


// function SelectMenu(props){
//     return(
//         <dic> Teste 1</dic>
//     )
// }
// export default SelectMenu;


// export default (props)=>{
//     return(
//         <dic> Teste 2</dic>
//     )
// }

export default (props)=>{

    const options = props.lista.map( (option, index) =>{
        return (
            <option key={index} value={option.value} > {option.label}</option>
        )
    }) 

    return(
        <select {...props}>
            {options}
        </select>
    )
}

// Atribua o primeiro e o segundo itens de às variáveis e coloque o restante em uma matriz:numbers

// const numbers = [1, 2, 3, 4, 5, 6];

// const [one, two, ...rest] = numbers;
