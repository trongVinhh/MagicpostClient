import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: string = '';
  loginFormGroup!: FormGroup;
  constructor(private formBuilder: FormBuilder, 
              private authService: AuthService,
              private router: Router) { }
  
  ngOnInit(): void {

    this.loginFormGroup = this.loginFormGroup = this.formBuilder.group({ // Use the formBuilder to create the FormGroup
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit() {
    if (this.loginFormGroup.valid) {
      const usernameOrEmail = this.loginFormGroup.get('username')?.value;
      const password = this.loginFormGroup.get('password')?.value;
      const credentials = { usernameOrEmail: usernameOrEmail, password: password };

      this.authService.login(credentials).subscribe(
        (response) => {
          // Handle successful login
          console.log('Login successful', response);
          console.log(response.accessToken);
          console.log(response.username)
          sessionStorage.setItem('token', response.accessToken);
          sessionStorage.setItem('username', response.username);
          sessionStorage.setItem('role', response.role);
          sessionStorage.setItem('employeeId', response.employeeId);

          if (sessionStorage.getItem('role') == 'ROLE_ADMIN') {
            this.router.navigate(['/director/home']);
          } else if (sessionStorage.getItem('role') == 'ROLE_MANAGER_STORAGE') {
            this.router.navigate(['/manager-storage/home']);
          } else if (sessionStorage.getItem('role') == 'ROLE_MANAGER_TRANSACTION') {
            this.router.navigate(['/manager-transaction/home']);
          } else if (sessionStorage.getItem('role') == 'ROLE_EMPLOYEE_STORAGE') {
            this.router.navigate(['/employee-storage/home']);
          } else if (sessionStorage.getItem('role') == 'ROLE_EMPLOYEE_TRANSACTION') {
            this.router.navigate(['/employee-transaction/home']);
          }
        },
        (error) => {
          // Handle login error
          console.error('Login failed', error);
          this.error = 'Invalid credentials'; // Display error message
        }
      );
    } else {
      console.log('Form is invalid. Please check the input fields.');
    }
  }
}