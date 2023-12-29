import DateDiff from 'date-diff';
import dateformat from 'dateformat';

import { getTaipeiTime } from './day';

function getNowTime() {
  const time = getTaipeiTime();
  let m = time.getMinutes() > 30 ? '00' : '30';
  let h = time.getMinutes() > 30 ? time.getHours() + 1 : time.getHours();
  h = h === 24 ? '00' : h.toString().padStart(2, '0');
  return `${h}:${m}`;
}

const priceMap = {
  南港: {
    台北: 40,
    板橋: 70,
    桃園: 200,
    新竹: 330,
    苗栗: 480,
    台中: 750,
    彰化: 870,
    雲林: 970,
    嘉義: 1120,
    台南: 1390,
    左營: 1530
  },
  台北: {
    板橋: 40,
    桃園: 160,
    新竹: 290,
    苗栗: 430,
    台中: 700,
    彰化: 820,
    雲林: 930,
    嘉義: 1080,
    台南: 1350,
    左營: 1490
  },
  板橋: {
    桃園: 130,
    新竹: 260,
    苗栗: 400,
    台中: 670,
    彰化: 790,
    雲林: 900,
    嘉義: 1050,
    台南: 1320,
    左營: 1460
  },
  桃園: {
    新竹: 130,
    苗栗: 280,
    台中: 540,
    彰化: 670,
    雲林: 780,
    嘉義: 920,
    台南: 1190,
    左營: 1330
  },
  新竹: {
    苗栗: 140,
    台中: 410,
    彰化: 540,
    雲林: 640,
    嘉義: 790,
    台南: 1060,
    左營: 1200
  },
  苗栗: {
    台中: 270,
    彰化: 390,
    雲林: 500,
    嘉義: 640,
    台南: 920,
    左營: 1060
  },
  台中: {
    彰化: 130,
    雲林: 230,
    嘉義: 380,
    台南: 650,
    左營: 790
  },
  彰化: {
    雲林: 110,
    嘉義: 250,
    台南: 530,
    左營: 670
  },
  雲林: {
    嘉義: 150,
    台南: 420,
    左營: 560
  },
  嘉義: {
    台南: 280,
    左營: 410
  },
  台南: {
    左營: 140
  }
};

function formSubmit(date, time, station, count, source, isSuccess) {
  date = new Date(date);
  station = JSON.parse(JSON.stringify(station));
  time = JSON.parse(JSON.stringify(time));
  source = JSON.parse(JSON.stringify(source));

  window.dataLayer.push({
    event: 'FormSubmit-GA',
    category: '提交表單',
    action: isSuccess ? '成功' : '失敗',
    label: null,
    value: null
  });

  if (!isSuccess) {
    return;
  }

  window.dataLayer.push({
    event: 'FormSubmit-GA',
    category: '起點站',
    action: station.start,
    label: null,
    value: null
  });

  window.dataLayer.push({
    event: 'FormSubmit-GA',
    category: '終點站',
    action: station.end,
    label: null,
    value: null
  });

  let price = priceMap[station.start][station.end] || priceMap[station.end][station.start];
  window.dataLayer.push({
    event: 'FormSubmit-GA',
    category: '起訖點組',
    action: `${station.start}~${station.end}`,
    label: null,
    value: price
  });
  /* 時間 */
  window.dataLayer.push({
    event: 'FormSubmit-GA',
    category: '上界時間',
    action: time.start,
    label: null,
    value: null
  });

  window.dataLayer.push({
    event: 'FormSubmit-GA',
    category: '下界時間',
    action: time.end,
    label: null,
    value: null
  });

  window.dataLayer.push({
    event: 'FormSubmit-GA',
    category: '上下界時間',
    action: `${time.start}~${time.end}`,
    label: null,
    value: null
  });

  window.dataLayer.push({
    event: 'FormSubmit-GA',
    category: '表單填寫時間',
    action: getNowTime(),
    label: null,
    value: null
  });
  /* 日期 */
  let now = getTaipeiTime();
  let ticketWeek = dateformat(date, 'N');

  window.dataLayer.push({
    event: 'FormSubmit-GA',
    category: '車票星期',
    action: ticketWeek,
    label: ticketWeek >= '6' ? '週末' : '週間',
    value: null
  });
  // 表單填寫星期
  let todayWeek = dateformat(now, 'N');

  window.dataLayer.push({
    event: 'FormSubmit-GA',
    category: '表單填寫星期',
    action: todayWeek,
    label: todayWeek >= '6' ? '週末' : '週間',
    value: null
  });
  // 車票日期差
  let diff = new DateDiff(date, now);
  const days = Math.round(Math.abs(diff.days()));

  window.dataLayer.push({
    event: 'FormSubmit-GA',
    category: '車票日期差',
    action: days,
    label: null,
    value: days
  });
  /* 票數 */
  window.dataLayer.push({
    event: 'FormSubmit-GA',
    category: '車票數量',
    action: count,
    label: null,
    value: count
  });
  // 票源
  let sourceList = [];
  if (source.web) sourceList.push('網頁');
  if (source.app) sourceList.push('App');

  window.dataLayer.push({
    event: 'FormSubmit-GA',
    category: '票源',
    action: sourceList.join('/'),
    label: null,
    value: null
  });
  // 單次表單價值
  const interval = 500;
  let cost = price * count;
  let upper = parseInt(cost / interval);
  window.dataLayer.push({
    event: 'FormSubmit-GA',
    category: '單次表單價值',
    action: `${upper * interval}~${(upper + 1) * interval}`,
    label: price * count,
    value: price * count
  });

  window.dataLayer.push({
    event: 'FormSubmit-Pixel',
    startTrialValue: price * count
  });
}

export default {
  formSubmit
};
