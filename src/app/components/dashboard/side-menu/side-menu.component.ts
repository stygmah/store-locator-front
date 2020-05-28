import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

    constructor(private authservice: AuthService, private router: Router) { }

    ngOnInit() {
    }

    logout() {
        this.authservice.logout();
        this.router.navigate(['/login']);
    }

}
