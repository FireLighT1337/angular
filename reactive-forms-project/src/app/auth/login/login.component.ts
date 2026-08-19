import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, of } from 'rxjs';

// this is how you could implement a custom validation function if needed
function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    // we must return null to tell Angular that the check is valid
    return null;
  }
  // if the check fails the convention is to describe the error and set it to true
  return { doesNotContainQuestionMark: true };
}

// this is how you could implement an asyncValidator function if needed
function emailIsUnique(control: AbstractControl) {
  // in reality you would ofc check the emails in the backe
  if (control.value !== 'test@example.com') {
    // of is a function of rxjs that will create an observable that instantly emits a value
    return of(null);
  }

  return of({ notUnique: true });
}

// this is the reactive forms way of getting saved data:
// we can set the value inside of the form controls
// this only works if the application is fully client side though
let initialEmailValue = '';
const savedForm = window.localStorage.getItem('saved-login-form');
if (savedForm) {
  const loadedForm = JSON.parse(savedForm);
  initialEmailValue = loadedForm.email;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  // this is the first step of reactive forms, set up the form group/controls:
  form = new FormGroup({
    // we dont add validators in the HTML:
    email: new FormControl(initialEmailValue, {
      validators: [Validators.email, Validators.required],
      // the main difference for an asyncValidator is that it returns an observable, we could send an HTTP Request for example
      asyncValidators: [emailIsUnique],
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6),
        mustContainQuestionMark, // we do not need to execute the function, Angular does that for us
      ],
    }),
  });

  // we outsourced these checks from the HTML into a function
  get emailIsInvalid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }

  get passwordIsInvalid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    );
  }

  // we could use afterNextRender for this aswell but since we create the form in the code we can also use ngOnInit
  ngOnInit(): void {
    // this would still work but for reactive forms there is a different way too

    // const savedForm = window.localStorage.getItem('saved-login-form');

    // if (savedForm) {
    //   const loadedForm = JSON.parse(savedForm);
    //   this.form.patchValue({
    //     email: loadedForm.email,
    //   });
    // }

    const subscription = this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe({
        next: (value) => {
          window.localStorage.setItem(
            'saved-login-form',
            JSON.stringify({ email: value.email }),
          );
        },
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSubmit() {
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
    console.log(enteredEmail, enteredPassword);
  }
}
