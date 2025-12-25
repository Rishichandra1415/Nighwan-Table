// import { Component, Inject } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatDialogRef } from '@angular/material/dialog';
// import { AddressService } from './../../services/address.service';

//  @Component({
//    selector: 'app-add-address',
//    templateUrl: './add-address.component.html',
//    styleUrls: ['./add-address.component.scss']
//  })
// export class AddAddressComponent  {

//   empForm!: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private AddressService: AddressService,
//     private dialogRef: MatDialogRef<AddAddressComponent>
//   ) {
//     this.buildForm();
//   }

//   buildForm() {
//     this.empForm = this.fb.group({
//       empRegId: ['', Validators.required],
//       createdBy: ['', Validators.required],

//       presentAddress: ['', Validators.required],
//       presentPostalcode: ['', Validators.required],
//       presentCountry: ['', Validators.required],

//       permanentAddress: ['', Validators.required],
//       permanentCountry: ['', Validators.required],
//       permanentState: ['', Validators.required],
//     });
//   }

//   onSubmit() {
//     if (this.empForm.invalid) {
//       this.empForm.markAllAsTouched();
//       return;
//     }

//     const v = this.empForm.value;

//     const payload = {
//       EmpRegId: Number(v.empRegId),
//       CreatedBy: v.createdBy,

//       PresentAddress: v.presentAddress,
//       PresentAddress2: v.presentAddress,
//       PresentCity: v.permanentState,
//       PresentPostalcode: v.presentPostalcode,
//       PresentCountry: v.presentCountry,
//       PresentState: v.permanentState,

//       PermanentAddress: v.permanentAddress,
//       PermanentCountry: v.permanentCountry,
//       PermanentState: v.permanentState,
//     };

//     this.AddressService.createAddress(payload).subscribe({
//       next: (res) => {
//         // 🔥 send data back to table
//         this.dialogRef.close(res);
//       },
//       error: (err) => {
//         console.error('Add failed', err);
//       }
//     });
//   }
// }


import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent {

  empForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private dialogRef: MatDialogRef<AddAddressComponent>
  ) {
    this.buildForm();
  }

  buildForm() {
    this.empForm = this.fb.group({
      empRegId: ['', Validators.required],
      createdBy: ['', Validators.required],

      presentAddress: ['', Validators.required],
      presentCity: ['', Validators.required],
      presentPostalcode: ['', Validators.required],
      presentCountry: ['', Validators.required],

      permanentAddress: ['', Validators.required],
      permanentCountry: ['', Validators.required],
      permanentState: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.empForm.invalid) {
      this.empForm.markAllAsTouched();
      return;
    }

    const v = this.empForm.value;

    // ✅ BACKEND-COMPATIBLE PAYLOAD
    const payload = {
      empRegId: Number(v.empRegId),
      createdBy: v.createdBy,

      presentAddress: v.presentAddress,
      presentAddress2: v.presentAddress,
      presentCity: v.presentCity,
      presentPostalcode: v.presentPostalcode,
      presentCountry: v.presentCountry,
      presentState: v.presentCity,

      permanentAddress: v.permanentAddress,
      permanentCountry: v.permanentCountry,
      permanentState: v.permanentState,

      isActive: true,
      remarks: null
    };

    console.log('ADD PAYLOAD 👉', payload);

    this.addressService.createAddress(payload).subscribe({
      next: (res) => {
        console.log('ADD SUCCESS', res);
        this.dialogRef.close(res);   // 🔥 sends data back to table
      },
      error: (err) => {
        console.error('ADD FAILED', err);
      }
    });
  }
}
