import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { KubitService } from './kubit.service';
import { MatDialog } from '@angular/material';
import { KubitNotificationDialogComponent } from './shared/kubit-notification-dialog.component';

@Injectable()
export class KubitConnectedGuard implements CanActivate {

  constructor(private kubitService: KubitService,
    private router: Router,
    private notifiactionDialog: MatDialog) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (!this.kubitService.isConnected()) {
        this.router.navigate(['clusters']);
        return false;
      }
      return true;
     
  }
}
