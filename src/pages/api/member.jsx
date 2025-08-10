import {pool, mybatisMapper} from "@/db";

const handler = async(req, res) =>{
    if(req.method == 'POST'){
        try{
            var conn = await pool.connect();
            const param = JSON.parse(req.body)
            const sql = mybatisMapper.getStatement("memberMapper", "insertMember", param, {language: 'sql', indent: '  '})
            const rows = await conn.query(sql);
            return res.status(200).json({
                code: 200,
                msg: "success",
                data: rows.rowCount
            });
        }catch (e) {
            console.error("예외가 발생 하였습니다.")
            console.error(e)
            return res.status(500).json({
                code: 500,
                msg: e.message
            });
        }finally {
            if(conn) conn.release()
        }
    }
}

export default handler