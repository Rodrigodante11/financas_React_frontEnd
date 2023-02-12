import React from 'react';

class Card extends React.Component{
    
    render(){
        return(
           <div className='card mb-3 '>
                
                <h3 className="card-header tcr">
                    <p className="text-center text-danger">{this.props.title}</p>
                </h3>
                <div className="card-body">
                {this.props.children}
                </div>
           </div> 
        )
    }
}

export default Card;