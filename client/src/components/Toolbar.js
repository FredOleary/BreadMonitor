import React, { Component } from 'react';
import Select from 'react-select';
import {batchesActions} from '../actions/batchesAction';
//import { isPatternLike } from '@babel/types';
import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import { connectableObservableDescriptor } from '../../../../../Library/Caches/typescript/3.5/node_modules/rxjs/internal/observable/ConnectableObservable';

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
const duration ={
    marginLeft:'30px',
    marginTop:'auto',
    marginBottom:'auto',
 //   textAlign:'center'

}
const mapStateToProps = state => {
    return { batches: state.batches, selectedBatch: state.selectedBatch, chartData: state.chartData };
  };
function mapDispatchToProps(dispatch) {
    return {
        batchesActions: bindActionCreators(batchesActions, dispatch)
    };
}
  
class ConnectedToolbar extends Component{
    componentDidMount() {
        console.log("ConnectedToolbar-componentDidMount");
        this.selectedItem = null;
        this.props.batchesActions.fetchBatches();
        setInterval( this.onAutoUpdate.bind(this), 10000);
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
                <div style ={duration}>
                    Duration (hrs): {this.getDuration()}
                </div>
                <div style = {logo}>
                    <img style={imageStyle} src={breadLogo} alt="Bread icon" />
                </div>
            </div>
        )
    }
    onSelectChange( selectedItem ){
        this.selectedItem = selectedItem;
        if( selectedItem){
            this.props.batchesActions.updateSelectedBatch(selectedItem);
            this.props.batchesActions.fetchReadingsForBatch( selectedItem.value);
        }
    }
    isSelectedEmpty(){
        return JSON.stringify(this.props.selectedBatch) === JSON.stringify({});
    }
    getDuration(){
        if( ! this.isSelectedEmpty()){
            if( this.props.chartData.hasOwnProperty("labels") && this.props.chartData.labels.length > 0 ){
                let startDate = new Date( this.props.chartData.labels[0]);
                let endDate = new Date( this.props.chartData.labels[this.props.chartData.labels.length-1]);
                return ((endDate.getTime() - startDate.getTime())/(1000*60*60)).toFixed(2);
            }
        }
        return null;
    }
    onRefresh(){
        this.props.batchesActions.fetchReadingsForBatch( this.props.selectedBatch.value);
    //    console.log("onRefresh");
    }
    onAutoUpdate(){
        if( this.selectedItem ){
            let batchEndTime = new Date( this.selectedItem.endDate);
            let nowDate = new Date();
            if( batchEndTime > nowDate){
                console.log("refreshing");      
                this.props.batchesActions.fetchReadingsForBatch( this.props.selectedBatch.value);                        
            }else{
                console.log("batch has ended");               
            }

        }else{
            console.log("No batch");
        }
      }
}
const Toolbar = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedToolbar);
export default Toolbar