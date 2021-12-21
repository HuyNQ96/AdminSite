import { Component, OnInit, ViewChild } from "@angular/core";
import { MessageService } from "primeng/api";
import { Customer, Representative } from 'src/app/models/custom.model';
import { CustomerService } from 'src/app/services/CustomerService/customer.service';

@Component({
  selector: 'app-facility-list',
  templateUrl: './facility-list.component.html',
  styleUrls: ['./facility-list.component.scss'],
  providers: [MessageService]
})
export class FacilityListComponent implements OnInit {
  public customers: Customer[] = [];

  public representatives: Representative[] = [];

  public statuses: any[] = [];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  constructor(private customerService: CustomerService) {

  }

  ngOnInit() {
    this.customerService.getCustomersLarge().then(customers => {
      this.customers = customers;
      this.loading = false;

      this.customers.forEach(
        customer => (customer.date = new Date(customer.date))
      );
    });

    this.representatives = [
      { name: "Amy Elsner", image: "amyelsner.png" },
      { name: "Anna Fali", image: "annafali.png" },
      { name: "Asiya Javayant", image: "asiyajavayant.png" },
      { name: "Bernardo Dominic", image: "bernardodominic.png" },
      { name: "Elwin Sharvill", image: "elwinsharvill.png" },
      { name: "Ioni Bowcher", image: "ionibowcher.png" },
      { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
      { name: "Onyama Limba", image: "onyamalimba.png" },
      { name: "Stephen Shaw", image: "stephenshaw.png" },
      { name: "XuXue Feng", image: "xuxuefeng.png" }
    ];

    this.statuses = [
      { label: "Unqualified", value: "unqualified" },
      { label: "Qualified", value: "qualified" },
      { label: "New", value: "new" },
      { label: "Negotiation", value: "negotiation" },
      { label: "Renewal", value: "renewal" },
      { label: "Proposal", value: "proposal" }
    ];
  }
}
