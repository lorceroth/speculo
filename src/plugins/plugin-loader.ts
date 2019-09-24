import * as $script from 'scriptjs';

import { IConfig, IPluginConfig } from "../config/config";
import { IPlugin } from './plugin';

const PLUGINS_PATH = '/plugins';
export const PLUGINS_SCRIPT_ID = 'plugins';

export class PluginLoader {

  constructor() {
    console.log('Plugins loaded from:', PLUGINS_PATH);
  }

  public load(config: IConfig): IPlugin[] {
    let plugins: IPlugin[] = new Array<IPlugin>();

    let paths = config.plugins
      .map(pluginConfig => this.getPluginPath(pluginConfig));

    $script(paths, PLUGINS_SCRIPT_ID, () => {
      for (let pluginConfig of config.plugins) {
        let plugin = this.createPlugin(pluginConfig);
        if (plugin) {
          plugins.push(plugin);
        }
      }

      console.log('Loaded plugins:', plugins);
    });

    return plugins;
  }

  private getPluginPath(plugin: IPluginConfig): string {
    return PLUGINS_PATH.concat(`/${plugin.name}-${plugin.version}.js`);
  }

  private createPlugin(pluginConfig: IPluginConfig): IPlugin | null {
    try {
      let component = (<any>window[pluginConfig.componentName]).default;

      return {
        path: this.getPluginPath(pluginConfig),
        version: pluginConfig.version,
        component: component,
        props: Object.assign({
          position: pluginConfig.position,
          size: pluginConfig.size,
        }, pluginConfig.props),
      }
    }
    catch (err) {
      console.error('Plugin component is not accessable:', pluginConfig);

      return null;
    }
  }
}
