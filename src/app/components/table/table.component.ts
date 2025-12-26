import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { AddressService } from 'src/app/services/address.service'; 
import { EditAddressComponent } from '../edit-address/edit-address.component';
import { AddAddressComponent } from '../add-address/add-address.component';

/* Interface for table row */
export interface AddressData {
  id: number;
  empRegId: number;
  createdBy: string;
  permanentAddress: string;
  presentAddress: string;
  presentPostalcode: string;
  presentCountry: string;
  presentCity: string;
  permanentCountry: string;
  permanentState: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'select',
    'id',
    'createdBy',
    'permanentAddress',
    'presentAddress',
    'presentPostalcode',
    'presentCountry',
    'presentCity',
    'permanentCountry',
    'permanentState',
    'action'
  ];

  dataSource = new MatTableDataSource<AddressData>([]);
  selection = new SelectionModel<AddressData>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private addressService: AddressService,
    private dialog: MatDialog
  ) {}

  /* -------------------- INIT -------------------- */

  ngOnInit(): void {

  this.addressService.getEmployees().subscribe(res => {
    this.dataSource.data = res.map(item => ({
      id: item.addressId.toString(),
      empRegId: item.empRegId,
      createdBy: item.createdBy,
      permanentAddress: item.permanentAddress,
      presentAddress: item.presentAddress,
      presentPostalcode: item.presentPostalcode,
      presentCountry: item.presentCountry,
      presentCity: item.presentCity,
      permanentCountry: item.permanentCountry,
      permanentState: item.permanentState
    }));
  });

  this.addressService.loadEmployees(); //  loads data once
}


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /* -------------------- LOAD DATA -------------------- */

  loadAddresses(): void {
    this.addressService.getAllAddresses().subscribe({
      next: (res: any[]) => {
        this.dataSource.data = res.map(item => ({
          id: item.addressId,
          empRegId: item.empRegId,
          createdBy: item.createdBy,
          permanentAddress: item.permanentAddress,
          presentAddress: item.presentAddress,
          presentPostalcode: item.presentPostalcode,
          presentCountry: item.presentCountry,
          presentCity: item.presentCity,
          permanentCountry: item.permanentCountry,
          permanentState: item.permanentState
        }));
      },
      error: err => console.error('API Error', err)
    });
  }

  /* -------------------- SEARCH -------------------- */

  applyFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: AddressData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }

//add

createNewAddress(): void {
  const dialogRef = this.dialog.open(AddAddressComponent, {
    width: '600px'
  });

  dialogRef.afterClosed().subscribe(saved => {
    if (!saved) return;

    // ONLY reload from API
    this.loadAddresses();
  });
}


//edit

// editUpdateEmp(row: AddressData) {

//   this.addressService.getAddressByEmpRegId(row.empRegId).subscribe(apiData => {

//     const dialogRef = this.dialog.open(EditAddressComponent, {
//       width: '600px',
//       data: apiData
//     });

//     dialogRef.afterClosed().subscribe(formData => {
//       if (!formData) return; // ✅ fixed

//       const payload = { ...apiData, ...formData };

//       this.addressService.updateAddress(apiData.addressId, payload).subscribe({
//         next: () => {
//           this.addressService.loadEmployees(); //  auto refresh UI
//         },
//         error: err => {
//           console.error('Update failed', err);
//         }
//       });
//     });

//   });
// }
editUpdateEmp(row: AddressData): void {

  this.addressService.getAddressByEmpRegId(row.empRegId).subscribe(apiData => {

    const dialogRef = this.dialog.open(EditAddressComponent, {
      width: '600px',
      data: apiData
    });

    dialogRef.afterClosed().subscribe(formData => {
      if (!formData) return;

      const payload = { ...apiData, ...formData };

      this.addressService.updateAddress(apiData.addressId, payload).subscribe({
        next: () => {
          this.loadAddresses();
        },
        error: err => console.error('Update failed', err)
      });
    });

  });
}


//delete
  // deleteEmp(id: any): void {
  //   if (!confirm('Are you sure?')) return;

  //   this.addressService.deleteAddress(id).subscribe({
  //     next: () => {
  //       this.dataSource.data = this.dataSource.data.filter(d => d.id !== id);
  //     },
  //     error: err => console.error('Delete failed', err)
  //   });
  // }

  deleteEmp(id: number): void {
  if (!confirm('Are you sure?')) return;

  this.addressService.deleteAddress(id).subscribe({
    next: () => {
      this.loadAddresses();
    },
    error: err => console.error('Delete failed', err)
  });
}



}



