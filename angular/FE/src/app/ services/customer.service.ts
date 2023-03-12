import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {

    return this.http.get<Customer[]>(`/GetCustomers`);
  }
  
  getCustomer(id: number): Observable<Customer> {

    return this.http.get<Customer>(`/GetCustomer/${id}`);
  }
}
