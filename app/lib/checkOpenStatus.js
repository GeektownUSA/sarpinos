export function convertTo12Hour(time) {
  const [hour, minute, second] = time.split(':');
  let newHour = parseInt(hour, 10);
  const period = newHour >= 12 ? 'PM' : 'AM';

  if (newHour === 0) {
    newHour = 12; // Midnight case
  } else if (newHour > 12) {
    newHour -= 12; // Convert to 12-hour format
  }

  // Ensure minute is defined and pad it
  const paddedMinute = minute ? minute.padStart(2, '0') : '00';

  return `${newHour === 0 ? 12 : newHour}:${paddedMinute} ${period}`;
}

export function convertTo24Hour(time) {
  const [hourMinute, period] = time.split(' ');
  const [hour, minute] = hourMinute.split(':');
  let newHour = parseInt(hour, 10);

  if (period && period.toLowerCase() === 'pm' && newHour !== 12) {
    newHour += 12;
  } else if (period && period.toLowerCase() === 'am' && newHour === 12) {
    newHour = 0;
  }

  return `${newHour.toString().padStart(2, '0')}:${minute}:00`;
}

export function checkOpenStatus(post) {
  const currentTime = new Date();
  const currentDay = currentTime.toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
  const openTimeStr = post.acf[`${currentDay}_open`];
  const closeTimeStr = post.acf[`${currentDay}_close`];
  const openTime24 = convertTo24Hour(openTimeStr);
  const closeTime24 = convertTo24Hour(closeTimeStr);
  const openTime = new Date(`${currentTime.toDateString()} ${openTime24}`);
  let closeTime = new Date(`${currentTime.toDateString()} ${closeTime24}`);

  // If closeTime is before openTime, add a day to closeTime
  if (closeTime.getTime() < openTime.getTime()) {
    closeTime = new Date(closeTime.getTime() + 24 * 60 * 60 * 1000);
  }

  // console.log(`${post.acf.name} Adjusted Close Time: ${closeTime}`);

  const result = {
    isOpen: currentTime >= openTime && currentTime <= closeTime,
    currentOpenTime: convertTo12Hour(openTime24),
    currentCloseTime: convertTo12Hour(`${closeTime.getHours()}:${closeTime.getMinutes()}:00`),
  };

  // console.log(`${post.acf.name}: ${JSON.stringify(result)}`);

  if (result.isOpen) {
    return result;
  } else {
    // Calculate the next open day and time
    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    let nextDayIndex = (currentTime.getDay() + 1) % 7;
    while (post.acf[`${daysOfWeek[nextDayIndex]}_open`] === undefined) {
      nextDayIndex = (nextDayIndex + 1) % 7;
    }
    const nextOpenTimeStr = post.acf[`${daysOfWeek[nextDayIndex]}_open`];

    return {
      isOpen: false,
      nextOpenTime: nextOpenTimeStr ? convertTo12Hour(nextOpenTimeStr) : '',
    };
  }
}
