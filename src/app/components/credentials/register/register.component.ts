import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User.model';
import { distinct } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


    private registerForm: FormGroup;
    private loading: boolean;
    private success: boolean;
    private allreadyTaken: boolean;
    private serverError: boolean;
    private passwordsDontMatch: boolean;
    private submitErrors: boolean;
    private wrongPassword: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required, Validators.minLength(9)]],
            confirmPassword: [null, [Validators.required, Validators.minLength(9)]],
            name: [null, [Validators.required]],
            lastName: [null, [Validators.required]],
            subscribeNewsletter: [false, Validators.required]
        });
        this.loading = false;
        this.success = false;
        this.resetAlerts();
        console.log(this.registerForm)
        this.registerForm.valueChanges.subscribe(() => {
            this.submitErrors = false;
        });
    }

    get form(): any {
        return this.registerForm.controls;
    }

    resetAlerts() {
        this.allreadyTaken = false;
        this.serverError = false;
        this.passwordsDontMatch = false;
        this.submitErrors = false;
        this.wrongPassword = false;
    }

    validate() {
        //TODO: Priorize errors and add returns
        let valid = true;
        if ( this.form.password.value !==  this.form.confirmPassword.value ) {
            this.passwordsDontMatch = true;
            valid = false;
        }
        if (this.registerForm.invalid) {
            valid = false;
        }
        if (/*Add check for numbers*/this.form.password.value.length < 9) {
            this.wrongPassword = true;
            valid = false;
        }
        return valid;
    }

    submit() {
        this.resetAlerts();
        this.submitErrors = true;
        if (this.validate()) {
            this.sendUser();
        }
    }

    sendUser() {
        this.loading = true;
        this.userService.register(this.formToUser()).subscribe(
            (response) => {
                this.loading = false;
                this.success = true;
                this.logUser(this.form.email.value, this.form.password.value);
            },
            (error) => {
                this.loading = false;
                if (error.status === 409) {
                    this.allreadyTaken = true;
                } else {
                    this.serverError = true;
                }

            }
        );
    }

    logUser(email: string, password: string) {
        this.authService.login(email, password, false).subscribe(() => {
            setTimeout(() => {
                this.router.navigate(['']);//TODO: GO TO PAYMENT BEFORE LOGIN IN, ADD TOKEN DIRECTLY TO BACKEND
            }, 1200);
        }, (error) => {
            this.success = false;
            this.serverError = true;
        });

    }

    formToUser(): User {
        const user: User = {
            name: this.form.name.value,
            surname: this.form.lastName.value,
            email: this.form.email.value,
            password: this.form.password.value
        };
        return user;
    }

}
