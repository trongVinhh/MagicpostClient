import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StorageId } from 'src/app/entity/storage-id';
import { StorageOffices } from 'src/app/entity/storage-offices';
import { TransactionOffices } from 'src/app/entity/transaction-offices';
import { DirectorService } from 'src/app/service/director/director.service';
import { EmployeeService } from 'src/app/service/employee/employee.service';
import { ManagerService } from 'src/app/service/manager/manager.service';

@Component({
  selector: 'app-storage-delivery-form',
  templateUrl: './storage-delivery-form.component.html',
  styleUrls: ['./storage-delivery-form.component.css']
})
export class StorageDeliveryFormComponent implements OnInit {
  storageDeliveryForm: FormGroup = new FormGroup({});
  orderCode: string = '';
  officeId: string = '';
  destinationId: string = '';
  storage_id!: StorageId;
  locationList: StorageOffices[] | TransactionOffices[] = [];
  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService, private route: ActivatedRoute, private directorService: DirectorService, private managerService: ManagerService) { }

  ngOnInit() {
    this.storageDeliveryForm = this.formBuilder.group({
      type: [''],
      name: ['']
    })

    this.managerService.getStorageIdByUsername(this.employeeService.getUserName()).subscribe(
      data => {
        console.log(data);
        this.storage_id = data;
        console.log(this.storage_id.officeId);
        this.officeId = this.storage_id.officeId;
        console.log(this.officeId);
    })

    this.route.queryParams.subscribe(params => {
      this.orderCode = params['orderCode'];
    })

    if (this.storageDeliveryForm.get('type')?.value == 'Điểm tập kết') {
      this.getStorageList();
    } else {    
      this.getTransactionList();
    }
  }

  getStorageList(): void {
    this.directorService.getAllStorageOffices().subscribe(data => {
      this.locationList = data;
    })
  }
  getTransactionList(): void {
    this.directorService.getAllTransactionOffices().subscribe(data => {
      this.locationList = data;
    })
  }

  onSubmit() {
    this.destinationId = this.storageDeliveryForm.get('name')?.value;
    console.log(this.storageDeliveryForm.get('type')?.value);
    if (this.storageDeliveryForm.get('type')?.value === 'Điểm giao dịch') {
      this.employeeService.sendPackageFromWarehouseToTransactionOffice(this.destinationId, this.officeId, this.orderCode).subscribe(response => {
        alert("Đã gửi đơn đến điểm tập kết");
        console.log(response);
      })
      console.log('Đem đến điểm giao dịch')
    } else {
      this.employeeService.sendPackageFromWarehouseToWarehouse(this.destinationId, this.officeId, this.orderCode).subscribe(response => {
        alert("Đã gửi đơn đến kho tập kết");
        console.log(response);
      })
      console.log('Đem đến kho tập kết')
    }
  }


}
