import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as $script from 'scriptjs';

import { ConfigLoader } from './config';
import { PluginLoader, IPlugin, PLUGINS_SCRIPT_ID } from './plugins';

import './resources/styles.scss';

console.log('%cSpeculo - https://github.com/lorceroth/speculo', 'color: royalblue; font-weight: bold');

let loadedPlugins: IPlugin[];

async function bootstrap() {
  let configLoader = new ConfigLoader();
  let config = await configLoader.load();

  let pluginLoader = new PluginLoader();
  let plugins = pluginLoader.load(config);

  loadedPlugins = plugins;
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
  return React.createElement(plugin.component, {key: index}, null);
}
