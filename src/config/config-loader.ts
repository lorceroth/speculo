import { IConfig } from "./config";

const CONFIG_PATH = 'config.json';

export class ConfigLoader {

  public async load(): Promise<IConfig> {
    let response = await fetch(CONFIG_PATH);

    return await response.json() as IConfig;
  }
}
