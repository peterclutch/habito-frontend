import { Component, OnInit } from '@angular/core';
import { GuardsCheckEnd, GuardsCheckStart, NavigationCancel, NavigationEnd, Router } from '@angular/router';
import { AutoUnsubscriber } from '../../../shared/util/auto-unsubscriber';
import { DisplayedRouteService } from '../../../shared/service/displayed-route.service';

@Component({
  selector: 'ha-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends AutoUnsubscriber implements OnInit {
  menuHidden: boolean = false;
  loading: boolean = true;

  constructor(
    private routeService: DisplayedRouteService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof GuardsCheckStart) {
        this.loading = true;
      }

      if (event instanceof GuardsCheckEnd || event instanceof NavigationCancel) {
        this.loading = false;
      }
    });

    this.registerSubscription(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          const routeSnapShot = this.router.routerState.snapshot.root.firstChild
          if (routeSnapShot != null) {
            this.menuHidden = this.routeService.findRouterData(routeSnapShot, 'isMenuHidden') || false;
          }
        }
      })
    );
  }

}
