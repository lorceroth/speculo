import { IConfig } from "./config";

const CONFIG_PATH = 'config.json';

export class ConfigLoader {

  async load(): Promise<IConfig> {
    try {
      let response = await fetch(CONFIG_PATH);

      return await response.json() as IConfig;
    }
    catch (err) {
      console.error('Error loading config:', err);
    }
  }
}
