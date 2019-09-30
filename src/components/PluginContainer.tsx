import * as React from 'react';
import './PluginContainer.scss';
import { IPluginContainerProps } from '.';

export interface IProps {
  debug?: boolean;
  position?: string;
  size?: string;
  align?: string;
}

interface IState {}

/**
 * Casts an object derived from IPluginContainerProps and returns
 * only the properties that are relative to the plugin container.
 *
 * @param props The plugin container properties.
 */
export function castPluginContainerProps(props: IPluginContainerProps): IPluginContainerProps {
  return {
    debug: props.debug,
    position: props.position,
    size: props.size,
    align: props.align,
  };
}

export class PluginContainer extends React.Component<IProps, IState> {

  static defaultProps: IProps = {
    debug: false,
    position: '0 0',
    size: null,
    align: null,
  };

  private ref: React.RefObject<HTMLDivElement>;

  constructor(props: IProps) {
    super(props);

    this.ref = React.createRef();

    if (this.props.position && !this.validatePosition(this.props.position)) {
      console.error(`Position format is invalid. Expected two numbers (x, y)
        followed by "px" or "%", e.g. "0px 50px", but got "${this.props.position}".`);
    }

    if (this.props.size && !this.validateSize(this.props.size)) {
      console.error(`Size format is invalid. Expected two numbers (width, height)
        followed by "px" or "%", e.g. "250px 80px", but got "${this.props.size}".`)
    }
  }

  get width(): number {
    return this.ref.current ? this.ref.current.clientWidth : 0;
  }

  get height(): number {
    return this.ref.current ? this.ref.current.clientHeight : 0;
  }

  get x(): number {
    return this.ref.current ? this.ref.current.offsetLeft : 0;
  }

  get y(): number {
    return this.ref.current ? this.ref.current.offsetTop : 0;
  }

  validatePosition(position: string): boolean {
    return /^[-]?[\d]+(px|%)? [-]?[\d]+(px|%)?$/g.test(position);
  }

  validateSize(size: string): boolean {
    return /^([\d]+(px|%)?|auto) ([\d]+(px|%)?|auto)$/g.test(size);
  }

  getStyle(): React.CSSProperties {
    return {
      position: 'absolute',
      ...this.getPositionStyle(),
      ...this.getSizeStyle(),
      ...this.getAlignmentStyle(),
    } as React.CSSProperties;
  }

  getPositionStyle() {
    if (this.props.position) {
      const [ x, y ] = this.props.position.split(' ');

      return {
        ...this.getPositiveOrNegativeX(x),
        ...this.getPositiveOrNegativeY(y),
      };
    }

    return {};
  }

  getPositiveOrNegativeX(x: string) {
    return x.startsWith('-')
      ? { right: x.replace(/-/, '') }
      : { left: x };
  }

  getPositiveOrNegativeY(y: string) {
    return y.startsWith('-')
      ? { bottom: y.replace(/-/, '') }
      : { top: y };
  }

  getSizeStyle() {
    if (this.props.size) {
      const [ width, height ] = this.props.size.split(' ');

      return {
        width: width !== 'auto' ? width : null,
        height: height !== 'auto' ? height : null,
      };
    }

    return {};
  }

  getAlignmentStyle() {
    if (this.props.align) {
      return { textAlign: this.props.align };
    }

    return {};
  }

  render() {
    return (
      <div style={this.getStyle()} className={this.props.debug ? 'plugin-container--debug' : null} ref={this.ref}>
        {this.props.debug && this.renderPosition()}
        {this.props.children}
      </div>
    );
  }

  renderPosition() {
    return (
      <div className="plugin-container__position">
        x: {this.x} y: {this.y} / w: {this.width} h: {this.height}
      </div>
    );
  }
}
