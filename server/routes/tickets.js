const router = require('express').Router();
const {zendeskService} = require('../services/zendesk');

router.get('/:id', async (req, res) => {
  const data = await zendeskService().getTicket(req.params.id);

  res.send(data);
});

router.get('/', async (req, res) => {
  const data = await zendeskService().getTicketList(req.query.page);

  res.send(data);
});

module.exports = router;
