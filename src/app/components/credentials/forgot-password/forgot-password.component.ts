import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

    private email: FormControl;
    private loading: boolean;
    private emailError: boolean;
    private emailNotFound: boolean;
    private serverError: boolean;
    private success: boolean;

    constructor(
        private userService: UserService
    ) { }

    ngOnInit() {
        this.email = new FormControl(null, [Validators.required, Validators.email]);
        this.loading = false;
        this.success = false;
        this.resetErrors();
    }

    resetErrors() {
        this.emailError = false;
        this.emailNotFound = false;
        this.serverError = false;
    }

    submit() {
        this.resetErrors();

        if (this.email.valid) {
            this.loading = true;
            this.userService.resetPassword({email: this.email.value})
            .subscribe(() => {
                this.loading = false;
                this.success = true;
            }, (err) => {
                this.loading = false;
                if(err.status === 404) {
                    this.emailNotFound = true;
                } else {
                    this.serverError = true;
                }
            });
        } else {
            this.emailError = true;
        }
    }

}
