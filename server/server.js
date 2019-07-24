const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
// import routes
const postRoutes = require('./routes/post.routes');


dotenv.config({ path: './config.env' });



const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', postRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

