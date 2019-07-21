import { Injectable } from '@angular/core';
import {webSocket} from 'rxjs/webSocket';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  private wsSubj;
  public connected$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor() {
    this.startSocket();
  }

  private startSocket() {
    this.wsSubj = webSocket('ws://localhost/api/alive');
    this.wsSubj.subscribe((msg) => {
      if (msg === 'ping') {
        this.connected$.next(true);
        this.wsSubj.next('pong');
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
