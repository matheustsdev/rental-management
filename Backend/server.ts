import express from 'express';
import { UserModule } from './modules/user/user.module';

const app = express();

new UserModule();

app.listen(8080, () => {
    console.log('Server running on port 8080');
})