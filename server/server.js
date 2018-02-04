const express = require('express');


const port = process.env.PORT || 3000;
var app = express();



 app.get('/', (req, response) => {

 });

 app.listen(port, () => {
   console.log(`Server running on port ${port}`);
 });
