import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Customer } from 'app/models/customer.model';
import { CustomerService } from 'app/services/customer.service';
import { Gender } from 'app/enums/gender.enum';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  customer?: Customer;
  gender = Gender;

  constructor(
    private CustomerSvc: CustomerService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.getCustomer();
  }

  getCustomer() {

    let customerId = this.getCustomerId();

    if (customerId) {

      this.CustomerSvc.getCustomer(customerId).subscribe({
        error: (e: HttpErrorResponse) => {
          console.log(e);
          this.router.navigate(['not-found']);
        },
        complete: () => {
          console.info('complete')
        }
      });
    }

  }

  getCustomerId(): number {

    return Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }
}
  

