import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})



export class EditAddressComponent implements OnInit {

  editForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      createdBy: [this.data.createdBy, Validators.required],
      presentAddress: [this.data.presentAddress, Validators.required],
      presentCity: [this.data.presentCity],
      presentPostalcode: [this.data.presentPostalcode],
      presentCountry: [this.data.presentCountry],
      permanentAddress: [this.data.permanentAddress],
      permanentCountry: [this.data.permanentCountry],
      permanentState: [this.data.permanentState]
    });
  }

  onSubmit(): void {
    if (this.editForm.invalid) return;

    //  RETURN ONLY FORM VALUES
    this.dialogRef.close(this.editForm.value);
  }
}
