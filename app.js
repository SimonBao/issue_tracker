const express = require('express')
const app = express();
app.use(express.static('/public', 'static'));
app.listen(3000)