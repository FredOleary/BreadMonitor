import React, { Component } from 'react';
import {Chart, Line} from 'react-chartjs-2';
import { connect } from "react-redux";


const mapStateToProps = state => {
    return { chartData: state.chartData, selectedBatch: state.selectedBatch };
  };

const getFermentationFraction = (labels, selectedBatch) =>{
    if( labels.length > 0 ){
        let startDate = Date.parse(labels[0]);
        let endDate = Date.parse(labels[labels.length-1]);
        if(selectedBatch.hasOwnProperty("entry") && selectedBatch.entry.hasOwnProperty("fermentationTimeMins") ){
            let fermentationTime = selectedBatch.entry.fermentationTimeMins * 60 * 1000 + startDate;
            if( startDate < endDate ){
                let fraction = (fermentationTime-startDate)/(endDate-startDate);
                return fraction;
            }
        }
    }
    return 0;
 }

class ConnectedCo2Chart extends Component {

    componentWillMount() {
        var that = this;
        Chart.pluginService.register({
          afterDraw: function(chart, easing) {
            let fermentationFraction = getFermentationFraction( chart.data.labels, that.props.selectedBatch);
            if( fermentationFraction ){
                const x = (chart.chartArea.right - chart.chartArea.left) * fermentationFraction + chart.chartArea.left;
                const topY = chart.scales['A'].top;
                const bottomY = chart.scales['A'].bottom;
                let ctx = chart.ctx;
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x, topY);
                ctx.lineTo(x, bottomY);
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#20C020';
                ctx.stroke();
                ctx.restore();
            }
          }
        });
    }
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
                                scaleLabel:{
                                    display:true,
                                    labelString:"ppm",
                                    fontColor: "blue"
                                },
                                ticks: {
                                    beginAtZero:true,
									max: 10000,
									stepSize: 1000,
                                }
                            },{
                                id:'B',
                                position:'right',
                                scaleLabel:{
                                    display:true,
                                    labelString:"delta ppm",
                                    fontColor: "red"
                                },
                               ticks: {
                                    beginAtZero:true,
									max: 1000,
									stepSize: 100,
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
