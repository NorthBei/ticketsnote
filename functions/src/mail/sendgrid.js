const client = require('@sendgrid/client');

if (!process.env.SENDGRID_API_KEY) {
  throw new Error('SENDGRID_API_KEY not found');
}

if (!process.env.SENDGRID_TEMPLATE_ID) {
  throw new Error('SENDGRID_TEMPLATE_ID not found');
}

if (!process.env.TICKETSNOTE_BASE_URL) {
  throw new Error('TICKETSNOTE_BASE_URL not found');
}

client.setApiKey(process.env.SENDGRID_API_KEY);

const baseUrl = process.env.TICKETSNOTE_BASE_URL;

async function send(email, date, startTime, endTime, startStation, endStation, count, source, userToken, recordToken) {
  const sourceList = [];
  if (source.web) {
    sourceList.push('網頁');
  }
  if (source.app) {
    sourceList.push('App');
  }

  const request = {
    method: 'POST',
    url: '/v3/mail/send',
    body: {
      personalizations: [
        {
          to: [
            {
              email: email,
              name: ''
            }
          ],
          dynamic_template_data: {
            startStation,
            endStation,
            date,
            startTime,
            endTime,
            count,
            source: sourceList.join('/'),
            editUrl: `${baseUrl}#/edit?ut=${userToken}`,
            verifyUrl: `${baseUrl}#/edit?rt=${recordToken}&at=verify`
          }
        }
      ],
      from: {
        email: 'noreply@ticketsnote.com',
        name: '票知'
      },
      // 和from相同
      reply_to: {
        email: 'noreply@ticketsnote.com',
        name: '票知'
      },
      template_id: process.env.SENDGRID_TEMPLATE_ID
    }
  };

  const confirmMail = { isSent: false };

  try {
    const [response] = await client.request(request);
    if (response.statusCode === 202) {
      confirmMail.isSent = true;
      confirmMail.message = response.statusMessage;
    } else {
      confirmMail.errorMsg = response.errors[0].message;
      console.error(`Response Error: recevier: ${email}, error:${confirmMail.errorMsg}`);
    }
  } catch (error) {
    confirmMail.errorMsg = error.message;
    console.error(`Catch Error: recevier: ${email}, error:${confirmMail.errorMsg}`);
  }

  return confirmMail;
}

module.exports = {
  send
};
