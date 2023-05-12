import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Country } from '../types/country';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getCountries(searchTerm: string) {
    const url = `http://localhost:3000/countries?search=${searchTerm}&limit=5&offset=0`;
    return this.http.get<Country>(url);
  }
}
