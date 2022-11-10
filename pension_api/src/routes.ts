import express from "express";
const router = express.Router();

router.get('/healthCheck', (req:any, res:any)=> {
    return res.send.json({
        "message": "API is up"
    })
});

export default router;