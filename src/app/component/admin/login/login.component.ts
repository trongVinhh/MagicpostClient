import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/admin/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  constructor(private formBuilder: FormBuilder, 
              private authService: AuthService) { }
  
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
      console.log(usernameOrEmail, password)
      this.authService.login(usernameOrEmail, password).subscribe(
        response => {
          // Xử lý phản hồi từ API hoặc dịch vụ xác thực
          const accessToken = response.accessToken;

          
          console.log(accessToken)
          // xử lý đăng nhập thành công ở đây
          // Lưu token vào local storage hoặc session storage
          // localStorage.setItem('token', token);
          // Điều hướng người dùng đến trang chính
          // Ví dụ: this.router.navigate(['/home']);
        },
        error => {
          // Xử lý lỗi đăng nhập
          console.log('Đăng nhập thất bại:', error);
          // Hiển thị thông báo lỗi cho người dùng
        }
      );
    } else {
      console.log('Form is invalid. Please check the input fields.');
    }
  }
}