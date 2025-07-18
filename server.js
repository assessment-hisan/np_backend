import express from 'express';
import cors from 'cors';
import routes from './routes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/files', express.static('files'))
app.use('/api', routes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
