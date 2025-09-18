import { pool, mybatisMapper } from "@/utils/db";

const handler = async(req, res) => {
    if(req.method == 'GET'){
        try{
            var conn = await pool.connect();
            const { email } = req.query
            const sql = mybatisMapper.getStatement("memberMapper", "insertVerification", {email: email})
            console.log(sql)
            const { rows } = await conn.query(sql);
            console.log(rows)
            return res.status(200).json({
                code: 200,
                msg: "success",
                data: rows[0]
            });
        }catch (e) {
            console.error("예외가 발생 하였습니다.")
            console.error(e)
            let msg = "서버 내부 에러입니다."
            return res.status(500).json({
                code: 500,
                msg: msg
            });
        }finally {
            if(conn) conn.release()
        }
    }
}

export default handler