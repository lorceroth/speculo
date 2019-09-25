export interface IConfig {
  plugins: IPluginConfig[];
}

export interface IPluginConfig {
  name: string;
  position: string;
  size: string;
  props: any;
}
