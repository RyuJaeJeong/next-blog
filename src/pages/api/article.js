import { pool, mybatisMapper } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const handler = async(req, res)=>{
    if(req.method == 'POST'){
        try{
            var conn = await pool.connect();
            const param = JSON.parse(req.body);
            const session = await getServerSession(req, res, authOptions);
            const userId = session.user.id;
            param.userId = userId;
            const sql = mybatisMapper.getStatement("articleMapper", "insertArticle", param);
            console.log(sql);
            const result = await conn.query(sql);
            console.log(result);
            return res.status(200).json({
                code: 200,
                msg: "success",
                data: result.rowCount
            });
        }catch (e) {
            console.error(e);
            return res.status(500).json({
                code: 500,
                msg: e.message
            })
        }finally {
            if(conn) conn.release();
        }
    }
}

export default handler