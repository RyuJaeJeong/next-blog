import { pool, mybatisMapper } from "@/lib/db";
import { VerificationError } from "@/lib/errors";
import argon2  from "argon2";


const handler = async(req, res) =>{
    if(req.method == 'POST'){
        try{
            var conn = await pool.connect();
            const param = JSON.parse(req.body);
            let sql = mybatisMapper.getStatement("memberMapper", "selectVerificationCode", param);
            let { rows } = await conn.query(sql);
            if(rows.length < 1 || !rows[0]?.isVerified) throw new VerificationError();
            param.password = await argon2.hash(param.password, { secret:  Buffer.from(process.env.PASSWORD_PEPPER) });
            sql = mybatisMapper.getStatement("memberMapper", "insertMember", param);
            const result = await conn.query(sql);
            console.log(result);
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
    }else if(req.method == 'DELETE'){
        try{
            var conn = await pool.connect();
            const param = req.query;
            const sql = mybatisMapper.getStatement("memberMapper", "deleteMember", param);
            const { rowCount } = await conn.query(sql);
            if(rowCount > 0){
                return res.status(200).json({
                    code: 200,
                    msg: "success",
                    data: rowCount
                });
            }else{
                return res.status(404).json({
                    code: 404,
                    msg: "not exist",
                    data: rowCount
                });
            }
        }catch (e) {
            console.error("예외가 발생 하였습니다.");
            console.error(e);
            return res.status(500).json({
                code: 500,
                msg: "internal server error"
            });
        }finally {
            if(conn) conn.release();
        }
    }
}

export default handler