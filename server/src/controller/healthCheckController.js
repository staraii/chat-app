import healthCheckService from '../service/healthCheckService.js';

const healthCheck = async (req, res) => {
    try {
        const result = await healthCheckService.check();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const dbHealthCheck = async (req, res) => {
    try {
        const result = await healthCheckService.checkDb();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error ' });
    }
};

export default { healthCheck, dbHealthCheck };
