import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidationService } from 'src/app/services/CommonService/custom-validation.service';

@Component({
  selector: 'app-facility-form-create',
  templateUrl: './facility-form-create.component.html',
  styleUrls: ['./facility-form-create.component.scss']
})
export class FacilityFormCreateComponent implements OnInit {
  registerForm: any;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private customValidator: CustomValidationService
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required], this.customValidator.userNameValidator.bind(this.customValidator)],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      confirmPassword: ['', [Validators.required]],
      number: ['', [Validators.required]],
    },
      {
        // validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
      }
    );
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      alert('Form Submitted succesfully!!!\n Check the values in browser console.');
      console.table(this.registerForm.value);
    }
  }
}
