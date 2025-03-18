import mysql from 'mysql2/promise';

const host = "127.0.0.1";
const user = "root";
const password = "8998";
const database = "next-blog";

const pool = mysql.createPool({
    host: host,
    user: user,
    password: password,
    database: database
});

export default pool