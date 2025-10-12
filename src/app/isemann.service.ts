import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TemElement, HumElement, PreElement, BatElement } from './isemann.interface'; // Import the Log interface

@Injectable({
  providedIn: 'root'
})
export class IsemannService {

  private baseUrl = 'https://isemann.at:8088';

  constructor(private http: HttpClient) { }

  getTem(): Observable<TemElement[]> {
    return this.http.get<TemElement[]>(`${this.baseUrl}/tem`);
  }

  getHum(): Observable<HumElement[]> {
    return this.http.get<HumElement[]>(`${this.baseUrl}/hum`);
  }

  getPre(): Observable<PreElement[]> {
    return this.http.get<PreElement[]>(`${this.baseUrl}/pre`);
  }

  getBat(): Observable<BatElement[]> {
    return this.http.get<BatElement[]>(`${this.baseUrl}/bat`);
  }


}