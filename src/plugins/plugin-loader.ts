import * as $script from 'scriptjs';

import { IConfig } from "../config/config";
import { IPlugin } from "./plugin";

const PLUGINS_PATH = '/plugins';
export const PLUGINS_SCRIPT_ID = 'plugins';

export class PluginLoader {

  constructor() {
    console.log('Plugins loaded from:', PLUGINS_PATH);
  }

  public load(config: IConfig): IPlugin[] {
    let plugins: IPlugin[] = new Array<IPlugin>();

    let paths = config.plugins
      .map(plugin => PLUGINS_PATH.concat(`/${plugin.name}.js`));

    $script(paths, PLUGINS_SCRIPT_ID, () => {
      for (let plugin of config.plugins) {
        let component = window[plugin.name];
        if (component) {
          plugins.push({
            name: plugin.name,
            component: component,
            position: plugin.position,
            size: plugin.size,
            props: plugin.props,
          });

          console.log('Plugin loaded:', plugin);
        } else {
          console.error('Plugin component is not accessable:', plugin);
        }
      }

      console.log('Plugins loaded:', plugins.length);
    });

    return plugins;
  }
}
