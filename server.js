import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import broadcastRouter from './server/src/router/broadcastRouter.js';
import authRouter from './server/src/router/authRouter.js';
import channelRouter from './server/src/router/channelRouter.js';
import meRouter from './server/src/router/meRouter.js';
import healthCheckRouter from './server/src/router/healthCheckRouter.js';

// Hämtar port från .env, annars default 3000
const PORT = process.env.PORT || 3000;

// Server
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: { origin: 'http://localhost:5173' },
});

// Cors middleware
app.use(cors());
// JSON middleware
app.use(express.json());

// Gör "io" tillgänglig som middleware
app.use((req, res, next) => {
    req.io = io;
    return next();
});

//Routers
app.use('/api/broadcast', broadcastRouter);
app.use('/api/auth', authRouter);
app.use('/api/channel', channelRouter);
app.use('/api/me', meRouter);
app.use('/api/health', healthCheckRouter);

server.listen(PORT, async () => {
    console.log('Server is running on port: ' + PORT);
});
