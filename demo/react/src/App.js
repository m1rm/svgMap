// React
import React, { Component } from 'react';
import './App.css';

// svgMap
import svgMap from 'svgmap';
import 'svgmap/style';

const sampleGdpData = {
  data: {
    gdp: {
      name: 'GDP per capita',
      format: '{0} USD',
      thousandSeparator: ',',
      thresholdMax: 50000,
      thresholdMin: 1000
    },
    change: {
      name: 'Change to year before',
      format: '{0} %'
    }
  },
  applyData: 'gdp',
  values: {
    AF: { gdp: 587, change: 4.73 },
    AL: { gdp: 4583, change: 11.09 },
    DZ: { gdp: 4293, change: 10.01 }
    // ...
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickDemoSelection: 'Click a country on the map.'
    };
  }

  componentDidMount() {
    if (!this.svgMap) {
      this.svgMap = new svgMap({
        targetElementID: 'svgMap',
        data: sampleGdpData
      });
    }

    if (!this.clickDemoMap) {
      const clickDemoMap = new svgMap({
        targetElementID: 'svgMapClickCallback',
        data: sampleGdpData,
        onCountryClick: (countryID) => {
          const label = clickDemoMap.countries[countryID] || countryID;
          this.setState({
            clickDemoSelection: `Selected: ${label} (${countryID})`
          });
          return false;
        }
      });
      this.clickDemoMap = clickDemoMap;
    }
  }

  render() {
    return (
      <div className='app'>
        <h1>svgMap React demo</h1>

        <section className='demo-section'>
          <h2>GDP per capita (sample)</h2>
          <div id='svgMap'></div>
        </section>

        <section className='demo-section'>
          <h2>Country click callback</h2>
          <div id='svgMapClickCallback'></div>
          <div className='demo-click-result'>{this.state.clickDemoSelection}</div>
        </section>
      </div>
    );
  }
}

export default App;
