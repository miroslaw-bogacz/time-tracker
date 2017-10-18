export function stringTimeToSeconds(time: string): number {
  let seconds = 0;
  const hours: any[] = /([0-9]+)h/.exec(time);
  const minutes: any[] = /([0-9]+)m/.exec(time);

  seconds += hours !== null ? (hours[1] * 60 * 60) : 0;
  seconds += minutes !== null ? (minutes[1] * 60) : 0;

  return seconds;
}
