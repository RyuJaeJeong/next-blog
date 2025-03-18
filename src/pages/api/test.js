import conn from '@/src/utils/db_con'

export default async function handler(req, res){
    if(req.method === 'GET'){
        const [rows] = await conn.query("SELECT now()")
        console.log(rows)
        return res.status(200).json({ "str" : "finish" });
    }
}