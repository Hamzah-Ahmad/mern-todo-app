const express = require('express');
const app = express();
const connectDB = require('./config/db');
const items = require('./routes/api/items');
const path = require('path');
connectDB();
app.use(express.json({extended: false}));
app.use('/api/items', items);


//Serve static assets if in production
if(process.env.NODE_ENV === 'production' ){
    //set static folder
    app.use(expres.static('client/build'));

    app.get( '*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));