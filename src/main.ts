import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as $script from 'scriptjs';

import { ConfigLoader, IConfig } from './config';
import { PluginLoader, IPlugin, PLUGINS_SCRIPT_ID } from './plugins';

import './resources/styles.scss';

console.log('%cSpeculo - https://github.com/lorceroth/speculo', 'color: royalblue; font-weight: bold');

let config: IConfig;
let loadedPlugins: IPlugin[];

async function bootstrap() {
  let configLoader = new ConfigLoader();
  config = await configLoader.load();

  let pluginLoader = new PluginLoader();
  loadedPlugins = pluginLoader.load(config);
}

bootstrap();

$script.ready(PLUGINS_SCRIPT_ID, () => {
  ReactDOM.render(renderPlugins(loadedPlugins), document.getElementById('app'));
});

function renderPlugins(plugins: IPlugin[]) {
  return React.createElement('div', {}, plugins.map((plugin, index) =>
    renderPlugin(plugin, index)));
}

function renderPlugin(plugin: IPlugin, index: number) {
  let props = { debug: config.debug, ...plugin.props };

  return React.createElement(plugin.component, {key: index, ...props}, null);
}
