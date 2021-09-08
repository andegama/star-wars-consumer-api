import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppComponentService {

  urlPlanets: string = 'http://swapi.dev/api/planets';

  constructor(private http: HttpClient) {}

  /**
   * Lista os planetas de star wars
   * 
   * @param next 
   * @returns 
   */
  public getPlanets(next?:string): Observable<any> {

    let url: string;

    if (next){
      url = next;
    } else {
      url = this.urlPlanets;
    }

    return this.http.get<any>(url);
  }
}
