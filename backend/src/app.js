import express from 'express';
import routes from './routes/index.js';

const app = express();

app.disable('x-powered-by');
app.use(express.json());
app.use('/api', routes);

export default app;
