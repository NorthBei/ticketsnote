export function getTaipeiTime() {
  // Data from : https://noob.tw/js-timezone/
  let taipeiTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Taipei' });
  return new Date(taipeiTime);
}

export function isToday(date) {
  const now = getTaipeiTime();

  if (date === null) {
    return false;
  }

  return (
    now.getFullYear() === date.getFullYear() && now.getMonth() === date.getMonth() && now.getDate() === date.getDate()
  );
}
