module.exports = {
  PORT: 3000,
  BASE_URL: 'https://zccstudents6181.zendesk.com',
  AUTH_TOKEN: Buffer.from(`${process.env.USERNAME}:${process.env.PASSWORD}`).toString('base64'),
}
