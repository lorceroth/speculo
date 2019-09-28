import * as React from 'react';
import * as moment from 'moment';
import { PluginContainer, IPluginContainerProps } from '@app/components';
import './Clock.scss';

interface IProps extends IPluginContainerProps {
  showDate: boolean;
  dateFormat: string;
}

interface IState {
  now: moment.Moment;
}

export default class Clock extends React.Component<IProps, IState> {

  static defaultProps: IProps = {
    showDate: true,
    dateFormat: 'LL',
  };

  private interval: NodeJS.Timeout;

  constructor(props: IProps) {
    super(props);

    this.state = {
      now: moment(),
    };
  }

  get time() {
    return this.state.now.format('HH:mm');
  }

  get date() {
    return this.state.now.format(this.props.dateFormat);
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.update();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  update() {
    this.setState({
      now: moment(),
    });
  }

  render() {
    return (
      <PluginContainer position={this.props.position} size={this.props.size}>
        <div className="clock">
          <div className="clock__time">
            {this.time}
          </div>

          {this.props.showDate && (
            <div className="clock__date">
              {this.date}
            </div>
          )}
        </div>
      </PluginContainer>
    );
  }
}
