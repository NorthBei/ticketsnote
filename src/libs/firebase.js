import dateFormat from 'dateformat';
import { initializeApp } from 'firebase/app';
import { connectFunctionsEmulator, getFunctions, httpsCallable } from 'firebase/functions';

const app = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
});

const functions = getFunctions(app);

if (import.meta.env.MODE === 'development') {
  connectFunctionsEmulator(functions, '127.0.0.1', 5001);
}

export const addRecord = async (email, date, time, station, count, source) => {
  const addRecordFunction = httpsCallable(functions, 'addRecord');
  return await addRecordFunction({
    recordObj: {
      email,
      date: dateFormat(date, 'yyyy-mm-dd'),
      startStation: station.start,
      endStation: station.end,
      startTime: time.start,
      endTime: time.end,
      count,
      source
    }
  });
};

export const getUserRecords = async (token) => {
  const getUserRecordsFunction = httpsCallable(functions, 'getUserRecords');
  return await getUserRecordsFunction({ token });
};

export const updateUserRecords = async (token, recordsObj) => {
  const updateUserRecordsFunction = httpsCallable(functions, 'updateUserRecords');
  return await updateUserRecordsFunction({ token, recordsObj });
};

export const verifyRecord = async (token) => {
  const verifyRecordFunction = httpsCallable(functions, 'verifyRecord');
  return await verifyRecordFunction({ token });
};

export const resubscribeRecord = async (token) => {
  const resubscribeRecordFunction = httpsCallable(functions, 'resubscribeRecord');
  return await resubscribeRecordFunction({ token });
};
