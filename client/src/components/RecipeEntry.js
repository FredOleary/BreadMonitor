import React, { Component } from 'react';

const recipeDiv = {
    marginLeft: '10px' ,
    marginRight:'10px',
    color:"white"
};

class RecipeEntry extends Component{
    render(){
        return (
            <div>
                <div style={recipeDiv}>
                    <span style={{float:"left"}}>{this.props.label}</span><span style={{float:"right"}}>{this.props.value}</span>
                </div>
                <br/>
           </div>
        )
    }
 
};


export default RecipeEntry