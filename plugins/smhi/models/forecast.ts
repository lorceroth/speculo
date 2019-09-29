import * as moment from 'moment';
import { TimeSeries } from "./time-series";

const UTC_FORMAT = 'YYYY-MM-DD[T]HH:mm:ss[Z]';

export class Forecast {

  constructor(
    public timeSeries: TimeSeries[]
  ) {}

  get today(): TimeSeries {
    let nowUtc = moment()
      .startOf('hour')
      .format(UTC_FORMAT);

    let timeSeriesNow = this.timeSeries
      .find(t => t.validTime.toString() == nowUtc);

    return timeSeriesNow;
  }

  get upcomingDays(): TimeSeries[] {
    let timeSeries = new Array<TimeSeries>();

    for (let i = 1; i <= 5; i++) {
      let nextDayUtc = moment()
        .add(i, 'days')
        .startOf('day')
        .add(12, 'hours')
        .format(UTC_FORMAT);

      let item = this.timeSeries
        .find(t => t.validTime.toString() == nextDayUtc);

      timeSeries.push(item);
    }

    console.log('timeSeries', timeSeries);

    return timeSeries;
  }

  static createFromObject(obj: any): Forecast {
    let timeSeries = (obj.timeSeries as any[]).map(item =>
      TimeSeries.createFromObject(item));

    return new Forecast(timeSeries);
  }
}
