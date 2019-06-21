import React, { Component } from 'react';
import Select from 'react-select';
import {batchesActions} from '../actions/batchesAction';
import { isPatternLike } from '@babel/types';
import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import { fromEventPattern } from 'rxjs';

const breadLogo = require('.././images/bread_icon.png');


const options = [
    { value:1, label:'one'}, 
    { value:2, label:'two'},
    { value:3, label:'three'}
  ];
const defaultOption = options[1];

const toolbar = {
    backgroundColor: 'yellow' ,
    display:'flex'
};

const batchSelector = {
    width:300,
    backgroundColor: 'yellow',
//    paddingLeft:'30px',
    marginLeft:'30px',
    marginTop:'auto',
    marginBottom:'auto',
    textAlign:'left'
};

const logo = {
    width:50,
    backgroundColor: 'yellow',
    marginLeft: 'auto',
    marginRight: '30px'
};
const imageStyle ={
    maxWidth:'100%',
    maxHeight:'100%'
}

const mapStateToProps = state => {
    return { batches: state.batches };
  };
  function mapDispatchToProps(dispatch) {
    return {
        batchesActions: bindActionCreators(batchesActions, dispatch)
    };
  }
  
class ConnectedToolbar extends Component{
    componentDidMount() {
        console.log("ConnectedToolbar");
 //       this.props.batchesActions.updateBatches(options);
        this.props.batchesActions.fetchBatches();
     }
    render(){
        return (
            <div style = {toolbar} >
                <div style ={batchSelector}>
                    <Select options={this.props.batches} onChange={this.onSelectChange.bind(this)} />
                </div>
                <div style = {logo}>
                    <img style={imageStyle} src={breadLogo} />
                </div>
            </div>
        )
    }
    onSelectChange( selectedItem ){
        console.log(selectedItem);
    }
}
const Toolbar = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedToolbar);
export default Toolbar