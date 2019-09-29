import { Parameter } from "./parameter";

/**
 * A time series represents a recorded point of time with weather information
 * such as temperature, wind speed, humidity e.t.c.
 *
 * You can add more getters if you need to simplify access to
 * more weather parameters.
 * http://opendata.smhi.se/apidocs/metfcst/parameters.html
 */
export class TimeSeries {

  constructor(
    public validTime: Date,
    public parameters: Parameter[]
  ) {}

  static createFromObject(obj: any): TimeSeries {
    return new TimeSeries(
      obj.validTime,
      obj.parameters as Parameter[]
    );
  }

  get temperature(): Parameter {
    return this.parameters.find(p => p.name === 't');
  }

  get windSpeed(): Parameter {
    return this.parameters.find(p => p.name === 'ws');
  }

  get humidity(): Parameter {
    return this.parameters.find(p => p.name === 'r');
  }

  get medianPrecipitationIntensity(): Parameter {
    return this.parameters.find(p => p.name === 'pmedian');
  }

  get symbol(): Parameter {
    return this.parameters.find(p => p.name === 'Wsymb2');
  }
}
