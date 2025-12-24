import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AddressService {

  //  Base API URL
  private readonly BASE_URL = 'https://hrmsapi.leanxpert.in/api/Address';
  private employees$ = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {}
getEmployees() {
    return this.employees$.asObservable();
  }
  /* ===========================
     GET – Load table data
     =========================== */
  getAllAddresses(): Observable<any[]> {
    return this.http.get<any[]>(this.BASE_URL);
  }
  loadEmployees() {
    this.http.get<any[]>(this.BASE_URL).subscribe(res => {
      this.employees$.next(res);
    });
  }
//get field by using empid
  getAddressByEmpRegId(empRegId: number): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/${empRegId}`);
  }

//create new 
  createAddress(payload: any): Observable<any> {
    return this.http.post<any>(this.BASE_URL, payload);
  }
//update field
  updateAddress(addressId: number, payload: any): Observable<any> {
    return this.http.put<any>(`${this.BASE_URL}/${addressId}`, payload);
  }


  deleteAddress(addressId: number): Observable<any> {
    return this.http.delete<any>(`${this.BASE_URL}/${addressId}`);
  }
}
