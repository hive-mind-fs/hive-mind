const express = require('express');
const app = express();
app.get('/ping', (req, res, next) => {
    res.send('hello2');
});
app.listen(8080, () => console.log(`Mixing it up on port ${8080}`));
