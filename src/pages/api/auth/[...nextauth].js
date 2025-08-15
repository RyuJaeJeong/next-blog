import NextAuth from "next-auth";
import NeonAdapter from "@auth/neon-adapter";
import Credentials from "next-auth/providers/credentials";
import { pool } from "@/utils/db"

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
                    if (!credentials.email || !credentials.password) {
                        throw new Error("Invalid credentials.")
                    }
                    var conn = await pool.connect();
                    const sql = `SELECT T1.* FROM users T1 WHERE T1.email = $1 AND T1.password = crypt($2, T1.password)`;
                    const rows = await conn.query(sql, [credentials.email, credentials.password]);
                    user = (rows.rows && rows.rows.length > 0)?rows.rows[0]:null
                }catch (e) {
                    console.log("error occurs!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                    console.error(e)
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