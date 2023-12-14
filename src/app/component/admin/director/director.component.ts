import { StorageOffices } from 'src/app/entity/storage-offices';
import { DirectorService } from '../../../service/director/director.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css']
})
export class DirectorComponent implements OnInit {
  
  storage_offices: StorageOffices[] = [];
  error: string = '';

  constructor(private storageOfficesService: DirectorService) {}

  ngOnInit(): void {
      this.storageOfficesService.getAllStorageOffices().subscribe(
        (data) => {
          console.log(data);
          this.storage_offices = data;
        },
        
        (error) => {
          // Handle login error
          console.error(error);
          this.error = 'No data'; // Display error message
        }
      )
  }
  
  // getAllEmployee() {}
  // getAllTransactionOffices() {}
  // getAllWareHouses() {}

}
