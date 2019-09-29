import * as React from 'react';

/**
 * Maps a number from SMHI to a symbol icon.
 * http://opendata.smhi.se/apidocs/metfcst/parameters.html
 * https://erikflowers.github.io/weather-icons/
 */
const SymbolMap = {
  0: 'wi wi-day-sunny',
  1: 'wi wi-day-cloudy',
  2: 'wi wi-day-cloudy',
  3: 'wi wi-cloud',
  4: 'wi wi-cloud',
  5: 'wi wi-cloudy',
  6: 'wi wi-day-sunny-overcast',
  7: 'wi wi-day-fog',
  8: 'wi wi-rain',
  9: 'wi wi-rain',
  10: 'wi wi-rain-wind',
  11: 'wi wi-thunderstorm',
  12: 'wi wi-sleet',
  13: 'wi wi-sleet',
  14: 'wi wi-sleet',
  15: 'wi wi-snow',
  16: 'wi wi-snow',
  17: 'wi wi-snow',
  18: 'wi wi-rain',
  19: 'wi wi-rain',
  20: 'wi wi-rain',
  21: 'wi wi-lightning',
  22: 'wi wi-sleet',
  23: 'wi wi-sleet',
  24: 'wi wi-sleet',
  25: 'wi wi-snow',
  26: 'wi wi-snow',
  27: 'wi wi-snow',
};

interface Props {
  number: number;
}

interface State {}

export class Symbol extends React.Component<Props, State> {

  render() {
    return <i className={SymbolMap[this.props.number]}></i>;
  }
}
