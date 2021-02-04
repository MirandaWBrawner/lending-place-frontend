import { Component, OnInit } from '@angular/core';
import { PendingLoan } from 'src/app/common/PendingLoan';
import { PendingLoanService } from 'src/app/services/pending-loan.service';

@Component({
  selector: 'app-employee-portal',
  templateUrl: './employee-portal.component.html',
  styleUrls: ['./employee-portal.component.sass']
})
export class EmployeePortalComponent implements OnInit {

  pendingLoans: PendingLoan[] = [];

  constructor(private loanService: PendingLoanService) { }

  ngOnInit(): void {
    this.loanService.getLoans().subscribe(
      results => this.pendingLoans = results
    );
  }
}
