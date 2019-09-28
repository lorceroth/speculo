export interface IConfig {
  debug: boolean;
  plugins: IPluginConfig[];
}

export interface IPluginConfig {
  name: string;
  position: string;
  size: string;
  align: string;
  props: any;
}
