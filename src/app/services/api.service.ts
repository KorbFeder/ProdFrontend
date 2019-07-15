import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  /**
   * This method is for getting the data from the backend, it requires the path, which gets appended to /api
   * and the params which get then appended afterwards.
   * it will return an Observable containing the values
   *
   * @param path api path, that gets appended to /api
   * @param httpParams the http params that get appended
   */
  public get(path: string, httpParams: HttpParams): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { params: httpParams});
  }

  /**
   * This method is for saving new elements into the Database.
   * It needs the path that gets appended after /api and the object that will be sent as the request body.
   * The method will return the object that just got saved to the Database.
   *
   * @param path api path, that gets appended to /api
   * @param body the js object that gets send to the backend in the request body
   */
  public post(path: string, body: Object = {}): Observable<any> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('Content-Type', 'application/json');
    return this.http.post(`${environment.api_url}${path}`, JSON.stringify(body), {headers: httpHeaders});
  }

  /**
   * This method will update the database with the new object, the httpParams contain the requested object
   * that will get updated in the database.
   *
   * @param path api path, that gets appended after /api
   * @param body the request object that gets sent to the database
   * @param httpParams the request params
   */
  public put(path: string, body: Object = {}, httpParams: HttpParams): Observable<any> {
    return this.http.put(`${environment.api_url}${path}`, JSON.stringify(body), { params: httpParams });
  }

  /**
   * This method will delete an object from the database, the object can be specified with the httpParams
   *
   * @param path api path, that gets appended after /api
   * @param httpParams the request params
   */
  public delete(path: string, httpParams: HttpParams): Observable<any> {
    return this.http.delete(`${environment.api_url}${path}`, {params: httpParams});
  }
}