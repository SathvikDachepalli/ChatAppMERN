const mongoose = require('mongoose');

const url='mongodb+srv://dachepallisathvik:<>@cluster0.qtlpmqb.mongodb.net/ChatApp?retryWrites=true&w=majority';

mongoose.connect(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,

}).then(() => {
    console.log('Connection Successful');
}).catch((e) => {
    console.log('No Connection',e);
})
