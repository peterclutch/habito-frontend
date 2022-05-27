import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { HabitComponent } from './modules/habit/habit.component';
import { LoginComponent } from './modules/login/login.component';
import { AccountViewComponent } from './modules/account/account-view/account-view.component';
import { AuthoritiesGuard } from './core/auth/authorities.guard';
import { HabitResolver } from './shared/resolver/habit.resolver';
import { AccountCreateComponent } from './modules/account/account-create/account-create.component';
import { AccountEditComponent } from './modules/account/account-edit/account-edit.component';
import { AccountResolver } from './shared/resolver/account.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      isMenuHidden: true
    }
  },
  {
    path: 'login/create',
    component: AccountCreateComponent,
    data: {
      isMenuHidden: true
    }
  },
  {
    path: 'home',
    component: DashboardComponent,
    canActivate: [AuthoritiesGuard],
  },
  {
    path: 'account',
    children: [
      {
        path: '',
        redirectTo: 'view',
        pathMatch: 'prefix'
      },
      {
        path: 'view',
        component: AccountViewComponent,
        canActivate: [AuthoritiesGuard],
        resolve: {
          account: AccountResolver
        }
      },
      {
        path: 'edit',
        component: AccountEditComponent,
        data: {
          isMenuHidden: true
        },
        canActivate: [AuthoritiesGuard],
        resolve: {
          account: AccountResolver
        }
      }
    ]
  },
  {
    path: 'habits/:id',
    component: HabitComponent,
    canActivate: [AuthoritiesGuard],
    resolve: {
      habit: HabitResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
