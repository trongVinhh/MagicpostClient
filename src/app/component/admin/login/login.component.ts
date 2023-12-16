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

      console.log(usernameOrEmail, password)
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
    } else {
      console.log('Form is invalid. Please check the input fields.');
    }
  }
}