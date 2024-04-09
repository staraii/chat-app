import meService from '../service/meService.js';

const me = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const username = await meService.getUsernameFromToken(token);
        res.json({ username: username });
    } catch (err) {
        res.status(403).json({ error: 'Forbidden ' });
    }
};

export default { me };
