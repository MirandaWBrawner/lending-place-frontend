import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckoutRequest } from 'src/app/common/CheckoutRequest';
import { PendingLoan } from 'src/app/common/PendingLoan';
import { PendingLoanService } from 'src/app/services/pending-loan.service';

@Component({
  selector: 'app-employee-portal',
  templateUrl: './employee-portal.component.html',
  styleUrls: ['./employee-portal.component.sass']
})
export class EmployeePortalComponent implements OnInit {

  pendingLoans: PendingLoan[] = [];
  monthNames: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];
  jsonWebToken = '';

  constructor(private loanService: PendingLoanService,
              private router: Router,
              private currentPath: ActivatedRoute) { }

  ngOnInit(): void {
    const tempToken = this.currentPath.snapshot.paramMap.get('jwt');
    if (tempToken !== null) {
      this.jsonWebToken = `Bearer ${tempToken}`;
      this.refreshLoans();
    } else {
      this.router.navigate(['/failedLogin']);
    }
  }
  refreshLoans(): void {
    this.loanService.getLoansUnpaginated(this.jsonWebToken).subscribe(
      results => this.pendingLoans = results
    );
  }

  padNumber(amount: number, minLength: number): string {
    let formatted = amount.toString(10);
    while (formatted.length < minLength) {
      formatted = '0' + formatted;
    }
    return formatted;
  }

  dateString(milliseconds: bigint): string {
    const timeAsFloat: number = Number.parseFloat(milliseconds.toString());
    const date: Date = new Date(timeAsFloat);
    const year = date.getFullYear();
    const month = this.monthNames[date.getMonth()];
    const day = date.getDay();
    const hour = date.getHours();
    const minute = this.padNumber(date.getMinutes(), 2);
    return `${day} ${month} ${year}\nat ${hour}:${minute}`;
  }

  isReadyForCheckout(loan: PendingLoan): boolean {
    return loan.member !== null && loan.member !== undefined
    && loan.member.id !== null && loan.member.id !== undefined;
  }

  loanStatus(loan: PendingLoan): string {
    if (this.isReadyForCheckout(loan)) {
      return 'Ready for Checkout';
    } else {
      return 'Account Needs to Be Created';
    }
  }
  checkoutOne(loan: PendingLoan): void {
    if (this.jsonWebToken !== '' && this.isReadyForCheckout(loan)) {
      const request = CheckoutRequest.buildForSingleCopy(loan);
      console.log(request);
      this.loanService.checkout(request, this.jsonWebToken).subscribe(
        response => console.log(response)
      );
      this.refreshLoans();
    }
  }
  checkoutSeveral(loan: PendingLoan): void {
    if (this.jsonWebToken !== '' && this.isReadyForCheckout(loan)) {
      const request = CheckoutRequest.buildForMultiple(loan);
      this.loanService.checkout(request, this.jsonWebToken).subscribe(
        response => console.log(response)
      );
      this.refreshLoans();
    }
  }
}
