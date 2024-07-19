import express from 'express';
const cors = require('cors');
import todoRoutes from './routes/todo';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/todos', todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
