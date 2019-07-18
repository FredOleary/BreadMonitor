import React, { Component } from 'react';
import { connect } from "react-redux";
import RecipeEntry from './RecipeEntry';

const mapStateToProps = state => {
    return { batches: state.batches, selectedBatch: state.selectedBatch };
  };

class ConnectedRecipe extends Component{
    render(){
        return (
            <div style = {{marginTop:"20px"}}>
                <RecipeEntry label="Batch" value={this.getBatchInfo("name")}/>
                <br/>
                <RecipeEntry label="White flour (gms)" value={this.getBatchInfo("whiteFlourGms")}/>
                <RecipeEntry label="Instant Yeast (gms)" value={this.getBatchInfo("instantYeastGms")}/>
                <RecipeEntry label="Salt (gms)" value={this.getBatchInfo("saltGms")}/>
                <RecipeEntry label="Water (gms)" value={this.getBatchInfo("waterGms")}/>
                <br/>
                <RecipeEntry label="Water Temp. (Deg F)" value={this.getBatchInfo("waterTempDegF")}/>
                <br/>
                <RecipeEntry label="Fermentation Time (mins)" value={this.getBatchInfo("fermentationTimeMins")}/>
                <RecipeEntry label="Proof Time (mins)" value={this.getBatchInfo("proofTimeMins")}/>
               
          </div>
        )
    }
    getBatchInfo = (info)=>{
        console.log("foo");
        if(this.props.selectedBatch.hasOwnProperty("entry") ){
            return this.props.selectedBatch.entry[info];
        }
        return null;
    }
};


const Recipe = connect(
    mapStateToProps,
)(ConnectedRecipe);
export default Recipe