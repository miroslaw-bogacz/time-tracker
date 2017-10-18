import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { path } from 'ramda';


@Pipe({
  name: 'orderByDate',
})
export class OrderByDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.sort((a, b) => {
      const aDate = moment(path(args.split('.'), a));
      const bDate = moment(path(args.split('.'), b));
      let result = 0;

      if (aDate.isAfter(bDate)) {
        result = -1;
      } else if (bDate.isAfter(aDate)) {
        result = 1;
      }

      return result;
    });
  }

}
