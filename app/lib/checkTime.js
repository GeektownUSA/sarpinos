import moment from 'moment-timezone';
import { fetchACFDayTimes } from './utils';

export async function checkTime() {
  try {
    const { dayStart, dayEnd } = await fetchACFDayTimes();
    // console.log('dayStart: ', dayStart);
    // console.log('dayEnd: ', dayEnd);

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const currentHour = moment().tz(timeZone).hour();
    // console.log('timeZone', timeZone);

    const serverTimezone = moment.tz.guess();
    // console.log('Server timezone:', serverTimezone);

    const isDay = currentHour >= dayStart && currentHour < dayEnd;
    // console.log('currentHour', currentHour);
    // console.log('isDay', isDay);

    return isDay;
  } catch (error) {
    console.error('Error in checkTime:', error);
    return false; // Default to false in case of error
  }
}