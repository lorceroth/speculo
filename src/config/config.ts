export interface IConfig {
  plugins: IPluginConfig[];
}

export interface IPluginConfig {
  name: string;
  version: string;
  componentName: any;
  position: string;
  size: string;
  props: any;
}
