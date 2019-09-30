import * as React from 'react';
import { PluginContainer, IPluginContainerProps, castPluginContainerProps } from '@app/components';
import { SMHIService } from './services';
import { Forecast, TimeSeries } from './models';
import { Symbol } from './Symbol';
import './SMHI.scss';
import moment = require('moment');

interface IProps extends IPluginContainerProps {
  lat: number;
  lon: number;
}

interface IState {
  isLoaded: boolean;
  forecast: Forecast;
}

export default class SMHI extends React.Component<IProps, IState> {

  static defaultProps: IProps = {
    lat: 0,
    lon: 0,
  };

  private interval: NodeJS.Timeout;
  private smhiService: SMHIService;

  constructor(props: IProps) {
    super(props);

    this.state = {
      isLoaded: false,
      forecast: null,
    };

    this.smhiService = new SMHIService();
  }

  componentDidMount() {
    this.interval = setInterval(async () => {
      await this.getForecast();
    }, 900 * 1000);

    setTimeout(async () => {
      await this.getForecast();
    }, 100);
  }

  async getForecast() {
    let forecast = await this.smhiService.getForecast(this.props.lat, this.props.lon);

    this.setState({ isLoaded: true, forecast });
  }

  render() {
    return (
      <PluginContainer {...castPluginContainerProps(this.props)}>
        {this.state.isLoaded && (
          <div className="smhi">
            {this.renderInfo()}
            {this.renderSummary()}
            {this.renderUpcomingDays()}
          </div>
        )}
      </PluginContainer>
    );
  }

  renderInfo() {
    return (
      <ul className="smhi__info">
        <li>
          <i className="wi wi-strong-wind"></i> {this.state.forecast.today.windSpeed.values[0]} m/s
        </li>

        <li>
          <i className="wi wi-humidity"></i> {this.state.forecast.today.humidity.values[0]}%
        </li>

        <li>
          <i className="wi wi-raindrop"></i> {this.state.forecast.today.medianPrecipitationIntensity.values[0]} mm/h
        </li>
      </ul>
    );
  }

  renderSummary() {
    return (
      <div className="smhi__summary">
        <div className="smhi__symbol">
          <Symbol number={this.state.forecast.today.symbol.values[0]} />
        </div>

        <div className="smhi__temperature">
          {this.state.forecast.today.temperature.values[0]}&deg;C
        </div>
      </div>
    );
  }

  renderUpcomingDays() {
    return (
      <table className="smhi__table">
        <tbody>
          {this.state.forecast.upcomingDays.map((item, index) => (
            <tr key={index}>
              <td className="smhi__table-text">
                {moment(item.validTime).format('ddd')}
              </td>

              <td className="smhi__table-symbol">
                <Symbol number={item.symbol.values[0]} />
              </td>

              <td>
                {item.temperature.values[0]}&deg;C
              </td>

              <td>
                {item.windSpeed.values[0]} m/s
              </td>

              <td>
                {item.medianPrecipitationIntensity.values[0]} mm/h
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
