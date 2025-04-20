import pool from '@/src/utils/db_con'

export default async function handler(req, res){
    const id = req.query.id
    if(req.method === 'GET'){
        const data = {}
        try{
            var conn = await pool.getConnection();
            const sql = "SELECT T1.id" +
                                    ", T1.title" +
                                    ", T1.contents" +
                                    ", T1.inp_dttm" +
                                    ", DATE_FORMAT(T1.upd_dttm, '%y년 %m월') AS updDttm " +
                                 "FROM t_board T1" +
                               " WHERE T1.id = ?"  +
                               "   AND T1.delete_yn = 0";
            const rows = await conn.query(sql, [id]);
            console.log(rows);
            data.code = 200;
            data.message = "처리성공";
            data.data = rows[0];
        }catch (e) {
            console.error(e)
            data.code = 500;
            data.message = e.message;
            return res.status(500).json(data);
        }finally {
            if(conn) conn.release()
        }
        return res.status(200).json(data);
    }else if(req.method === 'DELETE'){
        const data = {}
        try{
            var conn = await pool.getConnection();
            const rows = await conn.query({
                sql: 'UPDATE t_board T1 SET T1.delete_yn = \'1\' WHERE T1.id=?'
            }, [id]);
            console.log(rows);
            data.code = 200;
            data.message = "처리성공";
            data.data = rows;
        }catch (e) {
            console.error(e)
            data.code = 500;
            data.message = e.message;
            return res.status(500).json(data);
        }finally {
            if(conn) conn.release()
        }
        return res.status(200).json(data);
    }
}