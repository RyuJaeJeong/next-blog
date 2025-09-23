import { pool, mybatisMapper } from "@/lib/db";
import argon2  from "argon2";

class VerificationError extends Error {
    constructor(message="이메일 인증에 실패하였습니다.") {
        super(message);
        this.name = "VerificationError";
        this.code = 'E_VERIFICATION_FAILED'
    }
}

const handler = async(req, res) =>{
    if(req.method == 'POST'){
        try{
            var conn = await pool.connect();
            const param = JSON.parse(req.body);
            let sql = mybatisMapper.getStatement("memberMapper", "selectVerificationCode", param);
            let { rows } = await conn.query(sql);
            if(!rows[0].isVerified) throw new VerificationError();
            param.password = await argon2.hash(param.password, { secret:  Buffer.from(process.env.PASSWORD_PEPPER) });
            sql = mybatisMapper.getStatement("memberMapper", "insertMember", param);
            const result = await conn.query(sql);
            return res.status(200).json({
                code: 200,
                msg: "success",
                data: result.rowCount
            });
        }catch (e) {
            console.error("예외가 발생 하였습니다.");
            console.error(e);
            let msg = "서버 내부 에러입니다.";
            if(e.code == '23505') msg = "이메일이 중복됩니다.";
            else if(e.code == 'E_VERIFICATION_FAILED') msg = `${e.message}`;
            return res.status(500).json({
                code: 500,
                msg: msg
            });
        }finally {
            if(conn) conn.release();
        }
    }
}

export default handler