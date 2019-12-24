const express = require('express');

const app = express();

app.get('/', (req, res) => {
  return res.send('Teste 123 servidor');
});

app.listen(5050);