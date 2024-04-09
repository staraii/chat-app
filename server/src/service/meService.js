import jwt from 'jsonwebtoken';

function getUsernameFromToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded.username);
            }
        });
    });
}

export default { getUsernameFromToken };
