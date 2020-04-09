import server from './config/server';
import chalk from 'chalk';

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`>> App runing on port ${chalk.green(PORT)}`);
});
