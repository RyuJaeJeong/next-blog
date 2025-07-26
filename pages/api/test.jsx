import { neon } from '@neondatabase/serverless';

const handler = async (req, res) => {
    if(req.method == 'GET'){
        const sql = neon(`${process.env.DATABASE_URL}`);
        const rows = await sql.query(`SELECT TO_CHAR(NOW() AT TIME ZONE 'Asia/Seoul', $1) AS now`, ['YYYY-MM-DD HH24:MI:SS']);
        return res.status(200).json({"now" : rows[0]})
    }
}

export default handler