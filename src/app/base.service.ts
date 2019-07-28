import {UUID} from 'angular2-uuid';
import {Base} from './models/base';
import {OAuthService} from 'angular-oauth2-oidc';

import {environment} from '../environments/environment';
import {from, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

export abstract class BaseService<T extends Base> {
  protected baseUrl = environment.baseAPIURL;

  constructor(private http: HttpClient, private authService: OAuthService, protected endpointURL: string) {}

  getRequest(url: string): Observable<any> {
    return this.http.get(new URL(url, this.baseUrl).toString(), this.getRequestOptions());
  }

  getAll(pageNumber: number = 1, pageSize: number = 100): Observable<any> {
    return this.getRequest(`${this.endpointURL}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  getAllCount(): Observable<any> {
    return this.getRequest(`${this.endpointURL}/count`);
  }

  get(id: UUID): Observable<any> {
    if (!id) throw new Error('Id cannot be null');
    return this.getRequest(`${this.endpointURL}/${id.toString()}`);
  }

  getByIds(ids: UUID[], pageNumber: number = 1, pageSize: number = 100): Observable<any> {
    if (ids == null) return from([]);
    return this.getRequest(`${this.endpointURL}?ids=${ids.filter(x => x != null).map(x => x.toString())
      .join(',')}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  getByIdsCount(ids: UUID[]): Observable<any> {
    if (ids == null) return from([]);
    return this.getRequest(`${this.endpointURL}/count?ids=${ids.filter(x => x != null).map(x => x.toString()).join(',')}`);
  }

  putRequest(url: string, data: string): Observable<any> {
    return this.http.put(new URL(url, this.baseUrl).toString(), data, this.getRequestOptions());
  }

  put(id: UUID, model: T): Observable<any> {
    return this.putRequest(`${this.endpointURL}/${id.toString()}`, JSON.stringify(model));
  }

  postRequest(url: string, data: string): Observable<any> {
    return this.http.post(new URL(url, this.baseUrl).toString(), data, this.getRequestOptions());
  }

  post(model: T) {
    return this.postRequest(this.endpointURL, JSON.stringify(model));
  }

  deleteRequest(url: string): Observable<any> {
    return this.http.delete(new URL(url, this.baseUrl).toString(), this.getRequestOptions());
  }

  delete(id: UUID): Observable<any> {
    return this.deleteRequest(`${this.endpointURL}/${id.toString()}`);
  }

  private getRequestOptions() {
    return { headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${this.authService.getAccessToken()}`
      })};
  }
}
