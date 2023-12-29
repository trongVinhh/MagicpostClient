import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/service/employee/employee.service';
import { ManagerService } from 'src/app/service/manager/manager.service';

@Component({
  selector: 'app-update-staff',
  templateUrl: './update-staff.component.html',
  styleUrl: './update-staff.component.css'
})
export class UpdateStaffComponent implements OnInit{
  showAdvancedUpdate = false;
  employeeForm!: FormGroup;
  username: string | null = '';
  selectedEmployee: any;
  private baseUpdateUrl = 'http://localhost:8080/api/employee';
  constructor(private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private managerService: ManagerService) {
    this.username = this.managerService.getUserName();
  }
  ngOnInit(): void {
    this.onSubmit();
  }

  onSubmit() {
    const selectedEmployeeString = sessionStorage.getItem('selectedEmployee');
    if (selectedEmployeeString) {
      this.selectedEmployee = JSON.parse(selectedEmployeeString);
      console.log(this.selectedEmployee);
    }

    this.employeeForm = this.formBuilder.group({
      id: new FormControl({ value: this.selectedEmployee.id, disabled: true }),
      firstName: new FormControl({ value: this.selectedEmployee.firstName, disabled: false }),
      lastName: new FormControl({ value: this.selectedEmployee.lastName, disabled: false }),
      username: new FormControl({ value: this.selectedEmployee.username, disabled: false }),
      password: new FormControl({ value: '', disabled: false }),
      repeatPassword: new FormControl({ value: '', disabled: false }),
      email: new FormControl({ value: this.selectedEmployee.email, disabled: false }),
      phone: new FormControl({ value: this.selectedEmployee.phone, disabled: false }),
      address: new FormControl({ value: this.selectedEmployee.address, disabled: false }),
      role: new FormControl({ value: this.selectedEmployee.role[0].id, disabled: false })
    });

  }

  updateEmployee() {
    const id = this.selectedEmployee.id;
    const firstName = this.employeeForm.get('firstName')?.value;
    const lastName = this.employeeForm.get('lastName')?.value;
    const username = this.employeeForm.get('username')?.value;
    const password = this.employeeForm.get('password')?.value;
    const email = this.employeeForm.get('email')?.value;
    const phone = this.employeeForm.get('phone')?.value;
    const address = this.employeeForm.get('address')?.value;
    const role = this.employeeForm.get('role')?.value;
    const repeatPassword = this.employeeForm.get('repeatPassword')?.value;
    console.log(id, firstName, lastName, username, password, email, phone, address, role, repeatPassword);
    
    if (this.showAdvancedUpdate) {
      if (password != repeatPassword) {
        alert("Mật khẩu không trùng khớp");
      } else {
        const employee = {
          id: id,
          firstName: firstName,
          lastName: lastName,
          username: username,
          password: password,
          email: email,
          phone: phone,
          address: address,
        }
        console.log(employee);
        this.employeeService.updateEmployee(employee, role).subscribe(
          data => {
            if (data != null) {
              alert("Cập nhật nhân viên thành công");
              sessionStorage.removeItem('selectedEmployee');
              this.router.navigate(['/manager-storage/home']);
            }
          }
        )
      }
    } else {
      const employee = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        phone: phone,
        address: address,
      }
      console.log(employee);
      this.employeeService.updateEmployee(employee, role).subscribe(
        data => {
          if (data != null) {
            alert("Cập nhật nhân viên thành công");
            this.router.navigate(['/manager-storage/home']);
            sessionStorage.removeItem('selectedEmployee');
          }
        }
      )
    }
  }

  advancedUpdate() {
    this.showAdvancedUpdate = !this.showAdvancedUpdate;
  }
}
