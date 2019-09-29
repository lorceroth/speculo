import axios from 'axios';
import { CacheStorage } from '@app/cache';
import { Forecast, TimeSeries } from '../models';

const BASE_URL = 'https://opendata-download-metfcst.smhi.se/api';
const CACHE_TIME = 3600;

export class SMHIService {

  constructor(
    private cacheStorage: CacheStorage = new CacheStorage('smhi')
  ) {}

  async getForecast(lat: number, lon: number): Promise<Forecast> {
    if (this.cacheStorage.hasExpired([this.getUniqueKey(lat, lon)])) {
      return this.getForecastFromSMHI(lat, lon);
    }

    return this.getForecastFromCache(lat, lon);
  }

  private async getForecastFromSMHI(lat: number, lon: number): Promise<Forecast> {
    console.log('Get forecast from SMHI', { lat, lon });

    let url = BASE_URL.concat(`/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`);

    let response = await axios.get(url);
    let forecast = Forecast.createFromObject(response.data);

    this.cacheStorage.set(this.getUniqueKey(lat, lon), forecast, CACHE_TIME);

    return forecast;
  }

  private getForecastFromCache(lat: number, lon: number): Forecast {
    console.log('Get forecast from cache', { lat, lon });

    let forecastCacheItem = this.cacheStorage.get(this.getUniqueKey(lat, lon));
    let forecast = Forecast.createFromObject(forecastCacheItem.value);

    console.log('forecast', forecast);

    return forecast;
  }

  private getUniqueKey(lat: number, lon: number): string {
    return `${lat.toString()}_${lon.toString()}`;
  }
}
