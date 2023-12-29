import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StorageOffices } from 'src/app/entity/storage-offices';
import { DirectorService } from 'src/app/service/director/director.service';
import { EmployeeService } from 'src/app/service/employee/employee.service';

@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrls: ['./delivery-form.component.css']
})
export class DeliveryFormComponent implements OnInit {
  storageId: string  = '';
  orderCode: string = '';
  transactionOfficeId: string = '';
  storageList: StorageOffices[] = [];
  deliveryForm: FormGroup = new FormGroup({});

  constructor(private route: ActivatedRoute, private directorService: DirectorService, private employeeService: EmployeeService, private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.deliveryForm = this.formBuilder.group({
      storageId: [''],
      address: ['']
    })
    this.route.queryParams.subscribe(params => {
      this.orderCode = params['orderCode'];
      this.transactionOfficeId = params['id'];
    })
    console.log(this.orderCode);
    console.log(this.transactionOfficeId);
    this.getStorageList();
  }

  getStorageList(): void {
    this.directorService.getAllStorageOffices().subscribe(data => {
      this.storageList = data;
    })
  }
  

  onSubmit() {
    console.log(this.deliveryForm.get('storageId')?.value);
    this.storageId = this.deliveryForm.get('storageId')?.value;
    console.log(this.storageId);
    this.employeeService.sendPackageFromTransToWarehouse(this.transactionOfficeId, this.storageId, this.orderCode).subscribe(response => {
      alert("Đã gửi đơn đến kho tập kết");
      console.log(response);
      
    })
    
    
  }

}
