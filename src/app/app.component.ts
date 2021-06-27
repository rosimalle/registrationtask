import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmedValidator } from './conformedpassword.validator';
//import { ValidatePassword } from "./must-match/validate-password";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  registerForm: any;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(16),
          ],
        ],
        lastName: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(16),]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        phoneNumber: [
          '',
          [
            Validators.required,
            Validators.maxLength(10),
            Validators.pattern('[7-9]\\d{9}'),
          ],
        ],
      },
      {
        validator: ConfirmedValidator('password', 'confirmPassword')
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    console.log("roja", this.registerForm.valid);
    console.log("form values : " + JSON.stringify(this.registerForm.value, null, 4))
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
