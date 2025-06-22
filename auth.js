import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message: "Unauthorized: No token Provided"});
    }

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err) {
        console.error(`Error: ${err.message}`);
        return res.status(401).json({message : "Unauthorized: Invalid or Expired token"});
    }
}

export default auth;