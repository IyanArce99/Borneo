import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  logo = 'assets/logo.png';
  
  loginForm = new FormGroup
  ({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onLogin() {
    const { email, password } = this.loginForm.value;
    console.log(email, password);
    this.router.navigate(['./dashboard/listPropertys']);
    // try {
    //   const user = this.authSvc.login(email, password);
    //   if (user) {
    //     this.router.navigate(['./dashboard/categories']);
    //   }
    // }
    // catch {
    //   console.log("errro");
    // }
  }

}
