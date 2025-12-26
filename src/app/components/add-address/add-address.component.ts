import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddressService } from 'src/app/services/address.service';
import { ToastrService } from 'ngx-toastr';

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
    private dialogRef: MatDialogRef<AddAddressComponent>,
    private toaster :ToastrService
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

  //  console.log('ADD PAYLOAD 👉', payload);

    this.addressService.createAddress(payload).subscribe({
      next: (res) => {
       // console.log('ADD SUCCESS', res);
        this.dialogRef.close(res);   //  sends data back to table
      },
      error: (err) => {
        console.error('ADD FAILED', err);
      }
    });
        this.toaster.success('Added Successfull');

  }
  
}