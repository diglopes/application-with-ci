import mongoose from 'mongoose';
import chalk from 'chalk';

class Database {
    constructor() {
        const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/node-starter';
        mongoose.Promise = global.Promise;
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.set('useUnifiedTopology', true);
        mongoose.connect(url, (err) => {
            if (err) console.log('>>', chalk.red('Something went wrong on MongoDB connection...'));
        });
        mongoose.connection.on('connected', () => {
            console.log('>> Established a new connection with url:', chalk.green(url));
        });
    }
}

export default new Database();
