module.exports = {
  PORT: 4000,
  BASE_URL: 'https://zccstudents6181.zendesk.com',
  AUTH_TOKEN: Buffer.from(
    `${process.env.END_USER_EMAIL}/token:${process.env.API_TOKEN}`
  ).toString('base64'),
};
