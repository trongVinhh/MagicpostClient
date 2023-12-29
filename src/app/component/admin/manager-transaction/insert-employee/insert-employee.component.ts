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
    throw new Error('Method not implemented.');
  }
  
  
}
