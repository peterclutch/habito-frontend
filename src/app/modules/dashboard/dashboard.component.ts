import { Component, OnInit } from '@angular/core';
import { Account } from '../../shared/model/account.model';
import { AccountService } from '../../core/auth/account.service';
import { HabitCheckService } from '../../shared/service/habit-check.service';
import { ICheckOverview } from '../../shared/model/habit-check.model';
import { IHabit } from '../../shared/model/habit.model';

@Component({
  selector: 'ha-calendar',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  account: Account | null = null;
  checks: ICheckOverview[] = [];
  dates: Date[] = [...Array(7)].map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - i)
    return d
  });

  constructor(
      private accountService: AccountService,
      private habitCheckService: HabitCheckService,
  ) {}

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => {
      if (account) {
        this.account = account;
      }
    });

    this.habitCheckService.getAll().subscribe(checks => {
      if (checks) {
        this.checks = checks;
      }
    })
  }

  findChecksOnDate(date: Date): IHabit[] {
    return this.checks.find(h => this.isSameDate(new Date(h.date), date))?.checks || [];
  }

  // todo util
  isSameDate(date1: Date, date2: Date) {
    return date1.getFullYear() == date2.getFullYear()
        && date1.getMonth() == date2.getMonth()
        && date1.getDate() == date2.getDate();
  }
}
