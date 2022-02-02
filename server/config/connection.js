const mongoose = require('mongoose');

mongoose.connect(MONGODB_URI="mongodb+srv://Morris:2107@cluster0.jzyvg.mongodb.net/streaming?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

module.exports = mongoose.connection;
