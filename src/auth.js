import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import {neon} from "@neondatabase/serverless";
import NeonAdapter from "@auth/neon-adapter"
import { Pool } from "@neondatabase/serverless"


export const { handlers, signIn, signOut, auth } = NextAuth(()=> {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL })
    return{
        adapter: NeonAdapter(pool),
        providers: [
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
                authorize: async (credentials) => {
                    let user = null
                    try{
                        // logic to salt and hash password
                        // const pwHash = saltAndHashPassword(credentials.password)
                        if (!credentials.email || !credentials.password) {
                            throw new Error("Invalid credentials.")
                        }
                        var client = await pool.connect();
                        const sql = `SELECT id, name, email, "emailVerified", image, password FROM users T1 WHERE T1.email = $1 AND T1.password = $2`;
                        const rows = await client.query(sql, [credentials.email, credentials.password]);
                        user = (rows.rows && rows.rows.length > 0)?rows.rows[0]:null
                    }catch (e) {
                        console.log("error occurs!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                        console.error(e)
                    }finally {
                        if(client) client.release()
                    }
                    return user
                },
            })
        ],
        session: {
            strategy: 'jwt',
            maxAge: 30 * 24 * 60 * 60 //30일
        },
        callbacks: {
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
        }
    }
})

// const getUserFromDB = async (email, password)=>{
//     const sql = `SELECT T1.id, name, email, "emailVerified", image, password FROM users T1 WHERE T1.email = ${email} AND T1.password = ${password}`;
//     console.log(sql);
//     const rows = await client.query(sql);
//     return rows
// }