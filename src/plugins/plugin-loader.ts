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
        let component = (<any>window[pluginConfig.componentName]).default;
        if (component) {
          let plugin = {
            path: this.getPluginPath(pluginConfig),
            version: pluginConfig.version,
            component: component,
            props: Object.assign({
              position: pluginConfig.position,
              size: pluginConfig.size,
            }, pluginConfig.props),
          };

          plugins.push(plugin);

          console.log('Loaded plugin:', plugin);
        }
        else {
          console.error('Plugin component is not accessable:', pluginConfig);
        }
      }

      console.log('Plugins loaded:', plugins.length);
    });

    return plugins;
  }

  private getPluginPath(plugin: IPluginConfig): string {
    return PLUGINS_PATH.concat(`/${plugin.name}-${plugin.version}.js`);
  }
}
