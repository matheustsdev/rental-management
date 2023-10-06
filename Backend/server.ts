import express from 'express';
import { UserModule } from './modules/user/user.module';

const app = express();

new UserModule(app);

app.listen(8080, () => {
    console.log("\n\n\n\x1b[32mServer running on port 8080");
})