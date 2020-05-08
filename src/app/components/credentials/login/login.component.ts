import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    private loginForm: FormGroup;
    private loading: boolean;
    private unauthorized: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(9)]],
            rememberMe: [false, Validators.required]
        });
        this.loading = false;
        this.unauthorized = false;
    }

    private submit() {
        this.login();
    }

    private success() {
        console.log();
    }

    private login() {
        this.loading = true;
        this.unauthorized = false;
        this.authService.login(
            this.loginForm.controls.email.value,
            this.loginForm.controls.password.value,
            this.loginForm.controls.rememberMe.value
        ).subscribe( response => {
            this.router.navigate(['']);
            console.log(response);
        }, err => {
            this.loading = false;
            this.unauthorized = true;
            //Add server error
        });
    }

}
