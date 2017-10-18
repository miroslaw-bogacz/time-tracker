import * as moment from 'moment';

export function formatTimeSpent(time: number): string {
  const minutesAndSeconds: string = moment()
    .year(0)
    .month(0)
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(time || 0)
    .format('mm:ss');
  const hours: string = Math.floor(moment.duration((time)).asHours()).toString();

  return `${hours.length === 1 ? '0' + hours : hours}:${minutesAndSeconds}`;
}
