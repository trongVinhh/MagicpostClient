import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/service/employee/employee.service';
import { ManagerService } from 'src/app/service/manager/manager.service';

@Component({
  selector: 'app-insert-employee',
  templateUrl: './insert-employee.component.html',
  styleUrl: './insert-employee.component.css'
})
export class InsertEmployeeComponent implements OnInit {

  employeeForm!: FormGroup;
  username: string | null = '';
  constructor(private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private managerService: ManagerService) {
      this.username = this.managerService.getUserName();
     }
    ngOnInit(): void {
      this.employeeForm = this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        username: [''],
        password: [''],
        email: [''],
        phone: [''],
        address: [''],
        role: ['']
      });
    }
  onSubmit() {
    const firstName = this.employeeForm.get('firstName')?.value;
    const lastName = this.employeeForm.get('lastName')?.value;
    const username = this.employeeForm.get('username')?.value;
    const password = this.employeeForm.get('password')?.value;
    const email = this.employeeForm.get('email')?.value;
    const phone = this.employeeForm.get('phone')?.value;
    const address = this.employeeForm.get('address')?.value;
    const role = this.employeeForm.get('role')?.value;
    console.log(firstName, lastName, username, password, email, phone, address, role);
    const employee = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
      email: email,
      phone: phone,
      address: address,
    }
    console.log(employee);
    this.employeeService.createEmployee(employee, role).subscribe(
      data => {
        if (data != null) {
          alert("Thêm nhân viên thành công");
          this.router.navigate(['/manager-transaction/home']);
        } 
      }, 
      error => {
        alert("Thêm nhân viên thất bại, vì" + error.error.message);
      }
    )
  }
  
  
}
