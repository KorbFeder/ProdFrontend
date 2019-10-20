import { Injectable, NgZone } from '@angular/core';
import {webSocket} from 'rxjs/webSocket';
import { BehaviorSubject } from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  public connected$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(private zone: NgZone) {
    this.startSocket();
  }

  private startSocket() {
    const wsSubj = webSocket(environment.ws_url);
    wsSubj.subscribe((msg) => {
      if (msg === 'ping') {
        if (this.connected$.value === false) {
          this.connected$.next(true);
        }
        wsSubj.next('pong');
      }
    }, (err) => {
      this.connected$.next(false);
      this.lookForBackend();
      console.log(err);
    });
  }

  private lookForBackend() {
    setTimeout(() => {
      this.startSocket();
    }, 15000);
  }

}
