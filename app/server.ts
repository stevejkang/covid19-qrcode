import express from 'express';

import { QrController } from './controllers';

const app: express.Application = express();
const port: number = Number(process.env.PORT) || 3000;

app.use('/qr', QrController);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
