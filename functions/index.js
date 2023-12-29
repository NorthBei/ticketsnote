require('dotenv-flow/config');
const { onCall } = require('firebase-functions/v2/https');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');

const jwt = require('./src/jwt');
const mail = require('./src/mail/sendgrid');

initializeApp();

const db = getFirestore();

const corsList = ['http://localhost:5173', 'https://ticketsnote.web.app'];

async function responseHandler(task) {
  const result = { isOk: false, data: null, message: '', error: null };
  try {
    const resultMessage = await task(result);
    result.isOk = true;
    result.message = resultMessage;
  } catch (e) {
    console.error(e);

    if (e instanceof jwt.TokenExpiredError) {
      result.message = 'Token過期，請重新登入';
    } else if (e instanceof jwt.JsonWebTokenError) {
      result.message = 'Token錯誤，無法正常存取服務';
    } else {
      result.message = 'Token或是資料庫出點了問題，操作失敗';
    }

    result.error = e;
  }
  return result;
}

exports.addRecord = onCall({ cors: corsList }, async (request) => {
  return await responseHandler(async () => {
    const recordObj = request.data.recordObj;

    const { email, date, startStation, endStation, startTime, endTime, count, source } = recordObj;
    const userRef = db.doc(`users/${email}`);

    let userToken = '';

    try {
      const userDoc = await userRef.get();
      // user 欄位沒有資料，就等於不存在
      const user = userDoc.exists ? userDoc.data() : null;
      if (user) {
        userToken = user.token;
      } else {
        let { token, tokenExpireTime } = jwt.signToken({ email });
        userToken = token;
        await userRef.set({
          token,
          tokenExpireTime,
          createdAt: new Date()
        });
        console.debug(`new user's token: ${userToken}`);
      }
    } catch (error) {
      console.error(`get or set user token error:${error}`);
    }

    // check user token is not empty
    if (userToken === '') {
      console.error(`Error: user token is empty`);
      return;
    }

    const recordId = `${date}#${startStation}~${endStation}`;

    let { token, tokenExpireTime } = jwt.signToken(
      {
        email,
        recordId,
        date,
        startStation,
        endStation
      },
      new Date(`${date} 00:00:00`)
    );

    const confirmMail = await mail.send(
      email,
      date,
      startTime,
      endTime,
      startStation,
      endStation,
      count,
      source,
      userToken,
      token
    );

    await userRef
      .collection('records')
      .doc(recordId)
      .set({
        confirmMail,
        isCanceled: false,
        isDeleted: false,
        isVerified: false,
        isSubscribed: false,
        notifyCount: 0,
        token,
        tokenExpireTime,
        ...recordObj,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp()
      });

    return '新增成功';
  });
});

exports.getUserRecords = onCall({ cors: corsList }, async (request) => {
  return await responseHandler(async (result) => {
    const { email } = jwt.verifyToken(request.data.token);
    result.data = { records: [] };
    const docs = await db.collection(`users/${email}/records`).get();
    docs.forEach((doc) => result.data.records.push(doc.data()));

    return '資料已成功回傳';
  });
});

exports.updateUserRecords = onCall({ cors: corsList }, async (request) => {
  return await responseHandler(async () => {
    const { email } = jwt.verifyToken(request.data.token);
    const recordsObj = request.data.recordsObj;
    const batch = db.batch();

    for (const recordId in recordsObj) {
      const recordRef = db.doc(`users/${email}/records/${recordId}`);
      batch.update(recordRef, {
        ...recordsObj[recordId],
        updatedAt: FieldValue.serverTimestamp()
      });
    }

    await batch.commit();
    return '更新完成';
  });
});

exports.verifyRecord = onCall({ cors: corsList }, async (request) => {
  return await responseHandler(async () => {
    const { email, recordId, date, startStation, endStation } = jwt.verifyToken(request.data.token);
    await db.doc(`users/${email}/records/${recordId}`).update({ isVerified: true, isSubscribed: true });

    return `${date} ${startStation}~${endStation}<br>高鐵票通知已經成功開通`;
  });
});

exports.resubscribeRecord = onCall({ cors: corsList }, async (request) => {
  return await responseHandler(async () => {
    const { email, recordId } = jwt.verifyToken(request.data.token);
    await db.doc(`users/${email}/records/${recordId}`).update({ isSubscribed: true });

    return '訂閱成功！<br>未來你會繼續收到我們的通知~';
  });
});
