const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
// const bodyParser = require('body-parser');
const cors = require('cors');
const candidatesRoutes = require('./routes/candidatesRoutes');
const { sequelize } = require('./models/candidate');
const path = require('path');

const app = express();
const port = process.env.PORT || 5002;

app.use(cors({
  origin:"*"
}));

app.use(express.json());
app.use(express.static('./build'));
// app.use(bodyParser.json());

const currentFilename = path.join(__dirname, 'server.js');
const currentDirname = path.dirname(currentFilename);
// console.log('currentDirname:', currentFilename);

app.get(/^\/(?!candidates).*/, (req, res) => {
  res.sendFile(path.resolve(__dirname,'build', 'index.html'));
});

app.use('/candidates', candidatesRoutes);

sequelize.sync({ force: true }).then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
