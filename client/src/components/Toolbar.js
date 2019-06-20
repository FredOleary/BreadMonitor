import React, { Component } from 'react';
import Select from 'react-select';
import {updateBatches} from '../actions/batchesAction';
import { isPatternLike } from '@babel/types';
import { connect } from "react-redux";
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
    width:200,
    backgroundColor: 'yellow',
//    paddingLeft:'30px',
    marginLeft:'30px',
    marginTop:'auto',
    marginBottom:'auto',
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
        updateBatches: batches => dispatch(updateBatches(batches))
    };
  }
  
class ConnectedToolbar extends Component{
    componentDidMount() {
        console.log("ConnectedToolbar");
        this.props.updateBatches( options);
      }
    render(){
        return (
            <div style = {toolbar} >
                <div style ={batchSelector}>
                    <Select options={this.props.batches} onChange={this._onSelect}  />
                </div>
                <div style = {logo}>
                    <img style={imageStyle} src={breadLogo} />
                </div>
            </div>
        )
    }
}
const Toolbar = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedToolbar);
export default Toolbar