const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
// import routes
const path = require('path');
const postRoutes = require('./routes/post.routes');
const loadTestData = require('./testData');
const mongoSanitize = require("express-mongo-sanitize");


dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('' + '<dbuser>', process.env.USENAME).replace(''+'<dbpassword>',process.env.DATABASE_PASSWORD);
	mongoose.connect(DB, {
	useNewUrlParser: true
});

let db = mongoose.connection;
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

db.once('open', () =>
	console.log('Connected to the database'),
	loadTestData()
);
db.on('error', (err) => console.log('Error :' + err));
const app = express();
app.use(mongoSanitize());
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use("/api", postRoutes);
app.use(express.static(path.join(__dirname, '/../client/build')));
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});
app.use(express.json());
app.use('/api', postRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

