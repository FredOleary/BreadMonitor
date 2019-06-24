import React, { Component } from 'react';
import Select from 'react-select';
import {batchesActions} from '../actions/batchesAction';
//import { isPatternLike } from '@babel/types';
import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import { connectableObservableDescriptor } from '../../../../../Library/Caches/typescript/3.5/node_modules/rxjs/internal/observable/ConnectableObservable';
//import { fromEventPattern } from 'rxjs';

const breadLogo = require('.././images/bread_icon.png');


// const options = [
//     { value:1, label:'one'}, 
 //    { value:2, label:'two'},
 //    { value:3, label:'three'}
 //  ];
// const defaultOption = options[1];

const toolbar = {
    backgroundColor: 'rgb(200,200,200)' ,
    display:'flex'
};

const batchSelector = {
    width:300,
    backgroundColor: 'rgb(200,200,200)',
//    paddingLeft:'30px',
    marginLeft:'30px',
    marginTop:'auto',
    marginBottom:'auto',
    textAlign:'left'
};

const refreshButton = {
 //   height:50,
    backgroundColor: 'rgb(200,200,200)',
//    paddingLeft:'30px',
    marginLeft:'30px',
    marginTop:'auto',
    marginBottom:'auto',
    textAlign:'center'
};

const logo = {
    width:50,
    backgroundColor: 'rgb(200,200,200)',
    marginLeft: 'auto',
    marginRight: '30px'
};
const imageStyle ={
    maxWidth:'100%',
    maxHeight:'100%'
}

const mapStateToProps = state => {
    return { batches: state.batches, selectedBatch: state.selectedBatch };
  };
function mapDispatchToProps(dispatch) {
    return {
        batchesActions: bindActionCreators(batchesActions, dispatch)
    };
}
  
class ConnectedToolbar extends Component{
    componentDidMount() {
        console.log("ConnectedToolbar-componentDidMount");
        this.props.batchesActions.fetchBatches();
     }
    render(){
        return (
            <div style = {toolbar} >
                <div style ={batchSelector}>
                    <Select options={this.props.batches} onChange={this.onSelectChange.bind(this)} />
                </div>
                <div style={refreshButton}>
                    <button disabled ={this.isSelectedEmpty()} onClick={this.onRefresh.bind(this)} style ={{height:30, fontSize:'16px'}}>Refresh</button>
                </div>
                <div style = {logo}>
                    <img style={imageStyle} src={breadLogo} alt="Bread icon" />
                </div>
            </div>
        )
    }
    onSelectChange( selectedItem ){
        if( selectedItem){
            this.props.batchesActions.updateSelectedBatch(selectedItem);
            this.props.batchesActions.fetchReadingsForBatch( selectedItem.value);
        }
    }
    isSelectedEmpty(){
        return JSON.stringify(this.props.selectedBatch) === JSON.stringify({});
    }
    onRefresh(){
        this.props.batchesActions.fetchReadingsForBatch( this.props.selectedBatch.value);
    //    console.log("onRefresh");
    }
}
const Toolbar = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedToolbar);
export default Toolbar