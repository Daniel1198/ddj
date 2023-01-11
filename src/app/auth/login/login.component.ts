import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  model: any = {};
  loginFormGroup!: FormGroup;
  afficheErreur = false;
  isLoadingResults = false;
  UtilPremiereCnx: any;
  item: any = localStorage.getItem('Util_PremiereCnx');
  reponse: any;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.logout();
    this.initForm();
  }

  initForm() {
    this.loginFormGroup = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(f: any) {
    const loginFormData = new FormData();
    loginFormData.append('Util_Email', f.userName);
    loginFormData.append('Util_Mdp', f.password);
    //  this.model.action = 'login';
    console.log(loginFormData);
    this.authService.loginForm(loginFormData).subscribe(
      (response) => {
        console.log(response);
        if (response.status === 'success') {
          //this.authService.setUser(response);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  connexion(f: any) {
    this.isLoadingResults = true;
    const loginFormData = new FormData();
    loginFormData.append('Util_Email', f.userName);
    loginFormData.append('Util_Mdp', f.password);

    this.authService.login(loginFormData).subscribe(
      (result) => {
        this.reponse = result;
        console.log(result);
        this.router.navigate(['/admin/dashboard']);
        // window.location.href = '/dashboard';
        /* this.UtilPremiereCnx = JSON.parse(this.item);
        alert(this.reponse);
        if (this.UtilPremiereCnx == 1) {
          window.location.href = 'auth/firstpassword';
        } else {
          window.location.href = '/dashboard';
        }*/
      },
      () => {
        localStorage.clear();
        this.afficheErreur = true;
        this.isLoadingResults = false;
      }
    );
  }
}
