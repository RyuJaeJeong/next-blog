import nodemailer from 'nodemailer';
import { pool, mybatisMapper } from "@/lib/db";
import { EmailValidationError, EmailExistError } from "@/lib/errors";

const handler = async(req, res) => {
    if(req.method == 'GET'){
        try{
            var conn = await pool.connect();
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth:{
                    user: process.env.GOOGLE_APP_USER,
                    pass: process.env.GOOGLE_APP_PASS,
                }
            });
            const { email } = req.query
            if(!email.match(/\S+@\S+\.\S+/)) throw new EmailValidationError();
            const param = {
                email: email
            }
            let sql = mybatisMapper.getStatement("memberMapper", "selectEmail", param);
            const result = await conn.query(sql);
            const cnt = result.rows[0]?.cnt;
            console.log(sql);
            console.log("cnt: " + cnt);
            if(cnt >= 1) throw new EmailExistError();
            sql = mybatisMapper.getStatement("memberMapper", "insertVerification", param);
            const { rows } = await conn.query(sql);
            console.log(sql);
            console.log(rows);
            const emailForm = getEmailForm(rows[0].verificationCode)
            const sendMailRes = await transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: rows[0].email,
                subject: process.env.EMAIL_SUBJECT,
                html: emailForm,
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

const getEmailForm = (verificationCode) => {
    return `
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
                    <tr>
                        <td style="padding: 40px 40px 20px 40px; text-align: center;">
                            <h1 style="margin: 0; color: #333333; font-size: 24px; font-weight: 600;">
                                이메일 인증
                            </h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 0 40px 20px 40px;">
                            <p style="margin: 0; color: #666666; font-size: 16px; line-height: 1.6;">
                                안녕하세요,<br>
                                요청하신 인증번호를 안내해 드립니다.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 0 40px 20px 40px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="background-color: #f8f9fa; border-radius: 8px; padding: 30px; text-align: center;">
                                        <p style="margin: 0 0 10px 0; color: #666666; font-size: 14px;">
                                            인증번호
                                        </p>
                                        <p style="margin: 0; color: #333333; font-size: 32px; font-weight: 700; letter-spacing: 8px;">
                                            ${verificationCode}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 0 40px 30px 40px;">
                            <p style="margin: 0; color: #999999; font-size: 14px; line-height: 1.6;">
                                • 인증번호는 <strong style="color: #666666;">3분간</strong> 유효합니다.<br>
                                • 본인이 요청하지 않은 경우, 이 이메일을 무시하셔도 됩니다.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px 40px; background-color: #f8f9fa; border-top: 1px solid #e9ecef; border-radius: 0 0 8px 8px;">
                            <p style="margin: 0; color: #999999; font-size: 12px; text-align: center;">
                                본 메일은 발신 전용입니다.<br>
                                © 2025 Your Company. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>`
}

export default handler