import argon2  from "argon2";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import NextAuth from "next-auth";
import NeonAdapter from "@auth/neon-adapter";
import { mybatisMapper, pool } from "@/lib/db"



export const authOptions = {
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        NaverProvider({
            clientId: process.env.NAVER_CLIENT_ID,
            clientSecret: process.env.NAVER_CLIENT_SECRET,
            authorization: { params: { scope: "name email profile_image" } },
            profile(profile) {
                const p = profile.response;
                return {
                    id: p.id,
                    name: p.name,  // name 없으면 nickname으로 폴백
                    email: p.email,
                    image: p.profile_image,
                    emailVerified: new Date()
                };
            },
        }),
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
                    if (!validateUser(credentials)) {
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
    adapter: NeonAdapter(pool),
    events:{
        linkAccount: async ({ user })=>{
            if(!user.emailVerified){
                try{
                    var conn = await pool.connect();
                    user.emailVerified = new Date();
                    const sql = mybatisMapper.getStatement("authMapper", "updateEmailVerified", user)
                    await conn.query(sql);
                }catch (e) {
                    console.error(e)
                    return null
                }finally {
                    if(conn) conn.release();
                }
                return user
            }
        },
    }
}

/**
 * 사용자 이메일, 비밀번호에 대한 유효성 검사 수행
 * @param credentials 사용자 인증 정보
 * @returns {boolean} 유효성 여부
 */
const validateUser = (credentials)=>{
    let result = true;
    let mailReg = /\S+@\S+\.\S+/;
    if(!credentials.email){
        result = false;
    }else if(!credentials.email.match(mailReg)){
        result = false;
    }else if(!credentials.password){
        result = false;
    }else if(8 > credentials.password.length||64 < credentials.password.length){
        result = false;
    }

    return result;
}

export default NextAuth(authOptions);