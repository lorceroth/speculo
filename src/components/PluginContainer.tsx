import * as React from 'react';

export interface IProps {
  position?: string;
  size?: string;
}

interface IState {}

export class PluginContainer extends React.Component<IProps, IState> {

  static defaultProps: IProps = {
    position: '0 0',
    size: null,
  };

  constructor(props: IProps) {
    super(props);

    if (this.props.position && !this.validatePosition(this.props.position)) {
      console.error(`Position format is invalid. Expected two numbers (x, y)
        followed by "px" or "%", e.g. "0px 50px", but got "${this.props.position}".`);
    }

    if (this.props.size && !this.validateSize(this.props.size)) {
      console.error(`Size format is invalid. Expected two numbers (width, height)
        followed by "px" or "%", e.g. "250px 80px", but got "${this.props.size}".`)
    }
  }

  validatePosition(position: string): boolean {
    return /^[\d]+(px|%)? [\d]+(px|%)?$/g.test(position);
  }

  validateSize(size: string): boolean {
    return /^([\d]+(px|%)?|auto) ([\d]+(px|%)?|auto)$/g.test(size);
  }

  getStyle(): React.CSSProperties {
    return {
      position: 'absolute',
      ...this.getPositionStyle(),
      ...this.getSizeStyle()
    } as React.CSSProperties;
  }

  getPositionStyle() {
    if (this.props.position) {
      const [ left, top ] = this.props.position.split(' ');

      return { left, top };
    }

    return {};
  }

  getSizeStyle() {
    if (this.props.size) {
      const [ width, height ] = this.props.size.split(' ');

      return { width, height } || {};
    }

    return {};
  }

  render() {
    return (
      <div style={this.getStyle()}>
        {this.props.children}
      </div>
    );
  }
}
