import NextAuth from "next-auth";
import NeonAdapter from "@auth/neon-adapter";
import Credentials from "next-auth/providers/credentials";
import { pool, mybatisMapper } from "@/utils/db"
import argon2  from "argon2";

export const authOptions = {
    providers:[
        Credentials({
            credentials: {
                email: {
                    type: "email",
                    label: "Email",
                    placeholder: "johndoe@gmail.com",
                },
                password: {
                    type: "password",
                    label: "Password",
                    placeholder: "*****",
                },
            },
            authorize: async (credentials, req) => {
                let user = null
                try{
                    var conn = await pool.connect();
                    if (!credentials.email || !credentials.password) {
                        throw new Error("Invalid credentials.")
                    }

                    // 로그인
                    let sql = mybatisMapper.getStatement("authMapper", "selectLOGIN", { email: credentials.email })
                    const { rows } = await conn.query(sql);
                    if(rows[0] && rows[0].restricYn) throw new Error(`로그인이 제한되어 있습니다.\n${rows[0].restricDttm}`)
                    const longHash = (rows && rows.length > 0 && rows[0].password)?rows[0].password:process.env.DUMMY_HASH;
                    const verified = await argon2.verify(longHash, credentials.password, {secret : Buffer.from(process.env.PASSWORD_PEPPER)})

                    // 로그인 성공 여부 로깅
                    const param = {
                        reqIp: req.headers['x-forwarded-for'],
                        reqEmail: credentials.email,
                        reqSuccYn: verified
                    }
                    await conn.query('BEGIN')
                    sql = mybatisMapper.getStatement("authMapper", "insertLoginLog", param)
                    await conn.query(sql)
                    sql = mybatisMapper.getStatement("authMapper", "upsertRetrictionInfo", param)
                    await conn.query(sql)
                    await conn.query('COMMIT')
                    user = (verified)?rows[0]:null;
                }catch (e) {
                    await conn.query('ROLLBACK')
                    console.log("error occurs!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                    console.error(e.message)
                    throw e
                }finally {
                    if(conn) conn.release()
                }
                return user
            },
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60 //30일
    },
    callbacks:{
        jwt: async ({ token, user }) => {
            if (user) {
                token.user = {};
                token.user.name = user.name
                token.user.email = user.email
            }
            return token;
        },
        session: async ({ session, token }) => {
            session.user = token.user;
            return session;
        },
    },
    pages: {
        signIn: '/member/login',
        error: '/member/login', // 에러 시 로그인 페이지로 리다이렉트
    },
    adapter: NeonAdapter(pool)
}

export default NextAuth(authOptions);