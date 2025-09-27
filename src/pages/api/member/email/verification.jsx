import nodemailer from 'nodemailer';
import { pool, mybatisMapper } from "@/lib/db";
import { EmailValidationError, EmailExistError } from "@/lib/errors";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth:{
        type: "OAuth2",
        user: "ryoojj8998@gmail.com",
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_CLIENT_TOKEN,
    }
});

const handler = async(req, res) => {
    if(req.method == 'GET'){
        try{
            var conn = await pool.connect();
            const { email } = req.query
            if(!email.match(/\S+@\S+\.\S+/)) throw new EmailValidationError();
            const param = {
                email: email
            }
            let sql = mybatisMapper.getStatement("memberMapper", "selectEmail", param);
            const result = await conn.query(sql);
            const cnt = result.rows[0].cnt;
            console.log(sql);
            console.log("cnt: " + cnt);
            if(cnt >= 1) throw new EmailExistError();
            sql = mybatisMapper.getStatement("memberMapper", "insertVerification", param);
            const { rows } = await conn.query(sql);
            console.log(sql);
            console.log(rows);
            const sendMailRes = await transporter.sendMail({
                from: "ryoojj8998@gmail.com",
                to: rows[0].email,
                subject: "Next.log()에서 이메일 인증번호가 도착하였습니다",
                text: `인증번호: ${rows[0].verification_code}`,
            });
            console.log(sendMailRes);
            return res.status(200).json({
                code: 200,
                msg: "success",
                data: rows[0]
            });
        }catch (e) {
            console.error(e)
            let msg = e.message || "서버 내부 에러입니다."
            return res.status(500).json({
                code: 500,
                msg: msg,
                data: {}
            });
        }finally {
            if(conn) conn.release()
        }
    }
}

export default handler