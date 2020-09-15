import {Injectable} from '@angular/core';

import * as socketIo from 'socket.io-client';
import {SysDynamic} from '../model/SysDynamic';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';

@Injectable()
export class SocketService {
  private socket;

  public initSocket(): void {
    this.socket = socketIo(environment.socketIoUrl);
  }

  public onMessage(): Observable<SysDynamic> {
    return new Observable<SysDynamic>(observer => {
      this.socket.on('message', (data: SysDynamic) => observer.next(data));
    });
  }

}
