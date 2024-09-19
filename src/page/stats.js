import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// Create Chart
class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = { dataPoints: [], isLoaded: false };
  }

  render() {
    const options = {
      theme: "light2",
      title: {
        text: "Nifty 50 Index"
      },
      data: [{
        type: "line",
        xValueFormatString: "MMM YYYY",
        yValueFormatString: "#,##0.00",
        dataPoints: this.state.dataPoints
      }]
    }
    return (
      <div>
        {this.state.isLoaded && <CanvasJSChart options={options}
          onRef={ref => this.chart = ref}
        />}
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }

  componentDidMount() {
    fetch('https://canvasjs.com/data/gallery/react/nifty-stock-price.json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        var dps = [];

        for (var i = 0; i < data.length; i++) {
          dps.push({
            x: new Date(data[i].x),
            y: data[i].y
          });
        }

        this.setState({
          isLoaded: true,
          dataPoints: dps
        });
      });
  }
}

export default Stats;