import { pool, mybatisMapper } from "@/lib/db";

const handler = async(req, res)=>{
    if(req.method == 'GET'){
        try{
            var conn = await pool.connect();
            const articleDt = req.query.articleDt;
            const articleSeq = req.query.articleSeq;
            const param = {
                articleDt: articleDt,
                articleSeq: articleSeq
            }
            const sql = mybatisMapper.getStatement("articleMapper", "selectArticle", param);
            console.log(sql);
            const { rows, rowCount } = await conn.query(sql);
            if(rowCount == 0){
                return res.status(404).json({
                    code: 404,
                    msg: "fail",
                    data: null
                })
            }else{
                return res.status(200).json({
                    code: 200,
                    msg: "success",
                    data: rows[0]
                });
            }
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