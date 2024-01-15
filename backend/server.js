const dotenv = require('dotenv');
const express = require('express');
dotenv.config();
const bodyParser = require('body-parser');
const cors = require('cors');
const candidatesRoutes = require('./routes/candidatesRoutes');
const { sequelize } = require('./models/candidate');
const path = require('path');

const app = express();
const port = process.env.PORT || 5002;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.static('./build'));

const currentFilename = path.join(__dirname, 'server.js');
const currentDirname = path.dirname(currentFilename);
// console.log('currentDirname:', currentFilename);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(currentDirname, 'build', 'index.html'));
});

app.use('/candidates', candidatesRoutes);

sequelize.sync({ force: true }).then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
