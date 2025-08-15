import { pool, mybatisMapper } from "@/utils/db";
import argon2  from "argon2";

const handler = async(req, res) =>{
    if(req.method == 'POST'){
        try{
            var conn = await pool.connect();
            const param = JSON.parse(req.body)
            param.password = await argon2.hash(param.password, { secret:  Buffer.from(process.env.PASSWORD_PEPPER) })
            const sql = mybatisMapper.getStatement("memberMapper", "insertMember", param)
            const rows = await conn.query(sql);
            return res.status(200).json({
                code: 200,
                msg: "success",
                data: rows.rowCount
            });
        }catch (e) {
            console.error("예외가 발생 하였습니다.")
            console.error(e)
            let msg = "서버 내부 에러입니다."
            if(e.code == '23505') msg = "이메일이 중복됩니다."
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