import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usernameOrEmail: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const credentials = { usernameOrEmail: this.usernameOrEmail, password: this.password };

    this.authService.login(credentials).subscribe(
      (response) => {
        // Handle successful login
        console.log('Login successful', response);
        console.log(response.accessToken);
        sessionStorage.setItem('token', response.accessToken);
        this.router.navigate(['/director/home']); // Redirect to director component
      },
      (error) => {
        // Handle login error
        console.error('Login failed', error);
        this.error = 'Invalid credentials'; // Display error message
      }
    );
  }

}