import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import { connect } from "react-redux";


const mapStateToProps = state => {
    return { chartData: state.chartData };
  };
class ConnectedCo2Chart extends Component {

    render() {
        return (<div className = "chart">
                <Line
                    data={this.getChartData()}
                    options={{
                        maintainAspectRatio: true,
                        scales: {
                            yAxes: [{
                                id:'A',
                                position:'left',
                                ticks: {
                                    beginAtZero:true,
									max: 10000,
									stepSize: 1000,
                                }
                            },{
                                id:'B',
                                position:'right',
                                ticks: {
                                    beginAtZero:true,
									max: 800,
									stepSize: 80,
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    autoSkip: true,
                                    autoSkipPadding: 30
                                }
                            }]

                        },
                        title: {
                            display: true,
                            text: 'CO2 Level (PPM)',
                            position:"bottom"
                        }

                    }}
                />
            </div>
        );
    }
    getChartData = () =>{
        return this.props.chartData;
    }
    getDeltaChartData =() =>{
        return this.props.chartData;
    }
}
const Co2Chart = connect(
    mapStateToProps,
)(ConnectedCo2Chart);

export default Co2Chart;
