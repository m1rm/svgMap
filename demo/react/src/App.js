// React
import React, { Component } from 'react';
import './App.css';

// svgMap
import svgMap from 'svgmap';
import 'svgmap/style';

const gdpData = {
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
        data: gdpData
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

    if (!this.svgMapWithTooltips) {

      var mySvgMapWithTooltips = new svgMap({
        targetElementID: 'svgMapTooltips',
        data: gdpData,
        hideFlag: true,
        showTooltipsOnLoad: ['AF', 'AL', 'DZ']
      });

      this.svgMapWithTooltips = mySvgMapWithTooltips;
    }
  }

  render() {
    return (
      <div className='app'>
        <h1>svgMap React demo</h1>
        <div className='demo-container'>
          <h2>GDP per capita</h2>
          <div id='svgMap'></div>
        </div>
        <div className='demo-container'>
          <h2>GDP per capita (selected tooltips shown on load)</h2>
          <div id='svgMapTooltips'></div>
        </div>
      </div>
    );
  }
}

export default App;
