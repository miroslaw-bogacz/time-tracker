import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export function handleFor<A>(ctor: { new(arg: any): A }) {
  return function handler(payload: Response) {
    let res;

    try {
      res = payload.json();
    } catch (e) {
      console.error('Error extracting json:', e);
    }

    return Observable.of(new ctor(res));
  };
}
