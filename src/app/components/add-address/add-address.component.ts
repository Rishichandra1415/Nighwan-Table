// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatDialogRef } from '@angular/material/dialog';
// import { AddressService } from 'src/app/services/address.service';
// @Component({
//   selector: 'app-add-address',
//   templateUrl: './add-address.component.html',
//   styleUrls: ['./add-address.component.scss']
// })
// export class AddAddressComponent implements OnInit {

//   empForm!: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private addressService: AddressService,
//     private dialogRef: MatDialogRef<AddAddressComponent>
//   ) {}

//   ngOnInit(): void {
//     this.empForm = this.fb.group({
//       empRegId: ['', Validators.required],
//       createdBy: ['', Validators.required],

//       presentAddress: ['', Validators.required,  Validators.minLength(5),
//           Validators.pattern('^[A-Za-z ]+$')
// ],
//       presentCity: ['', Validators.required],
//       presentPostalcode: ['', Validators.required],
//       presentCountry: ['', Validators.required],

//       permanentAddress: ['', Validators.required],
//       permanentCountry: ['', Validators.required],
//       permanentState: ['', Validators.required],
//     });
//   }

//   private buildPayload(v: any) {
//     return {
//       empRegId: Number(v.empRegId),
//       createdBy: v.createdBy,

//       presentAddress: v.presentAddress,
//       presentAddress2: v.presentAddress,
//       presentCity: v.presentCity,
//       presentPostalcode: v.presentPostalcode,
//       presentCountry: v.presentCountry,
//       presentState: v.presentCity,

//       permanentAddress: v.permanentAddress,
//       permanentCountry: v.permanentCountry,
//       permanentState: v.permanentState,

//       isActive: true,
//       remarks: null
//     };
//   }

//   onSubmit(): void {
//     if (this.empForm.invalid) {
//       this.empForm.markAllAsTouched();
//       return;
//     }

//     const payload = this.buildPayload(this.empForm.value);

//     this.addressService.createAddress(payload).subscribe({
//       next: (res) => this.dialogRef.close(res),
//       error: (err) => console.error('ADD FAILED', err)
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


  submitted = false;

// isInvalid(controlName: string): boolean {
//   const control = this.empForm.get(controlName);
//   return !!(
//     control &&
//     control.invalid &&
//     (control.touched || this.submitted)
//   );
// }

// isValid(controlName: string): boolean {
//   const control = this.empForm.get(controlName);
//   return !!(
//     control &&
//     control.valid &&
//     (control.touched || this.submitted)
//   );
// }

  onSubmit() {
   // this.submitted=true;
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