import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  baseUrl: string;
  Token: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
    this.Token = environment.apiKey;
  }

  getWeather(city: string): Observable<any> {
    const cityWithoutCountry = city.split(' (')[0];
    return this.http.jsonp(`${this.baseUrl}${cityWithoutCountry}&appid=${this.Token}`, 'callback=JSONP_CALLBACK');
  }
}
