import pool from '@/src/utils/db_con'

export default async function handler(req, res){
    if(req.method === 'GET'){
        const data = {}
        try{
            var conn = await pool.getConnection();
            let sql = "SELECT T1.id" +
                                  ", T1.title" +
                                  ", T1.contents" +
                                  ", T1.inp_dttm AS inpDttm" +
                                  ", DATE_FORMAT(T1.upd_dttm, '%y년 %m월') AS updDttm " +
                               "FROM t_board T1" +
                             " WHERE 1 = 1"  +
                               " AND T1.delete_yn = 0 ";
            const pageNo = req.query.pageNo || 1;
            const contentsSize = 30;
            let stNum = (pageNo - 1) * contentsSize;
            sql += "LIMIT ?, ?"
            console.log(sql)
            const rows = await conn.query(sql, [stNum, contentsSize]);
            console.log(rows)
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
    }else if(req.method === 'POST'){
        const data = {};
        try{
            var conn = await pool.getConnection();
            const param = JSON.parse(req.body)

            const result = await conn.query({
                sql: 'INSERT INTO t_board(title, contents) VALUES(? , ?)'
            }, [param.title, param.contents]);
            
            if(result[0].affectedRows > 0){
                data.code = 1;
                data.message = "처리성공";
                data.data = result
            }else{
                data.code = 0;
                data.message = "영향을 끼치지 않았습니다";
                data.data = null;
            }

            return res.status(200).json(data);
        }catch (e) {
            console.log(e);

            data.code = -1;
            data.message = "관리자에게 문의하세요.";
            data.data = e.toString();

            return res.status(500).json(data)
        }finally {
            if (conn) return conn.release();
        }
    }else if(req.method === 'PATCH'){
        const data = {};
        try{
            var conn = await pool.getConnection();
            const param = JSON.parse(req.body)

            const result = await conn.query({
                sql: 'UPDATE t_board T1 SET T1.title=?, T1.contents=?, T1.upd_dttm=now() WHERE T1.id=?'
            }, [param.title, param.contents, param.id]);

            if(result[0].affectedRows > 0){
                data.code = 1;
                data.message = "처리성공";
                data.data = result;
            }else{
                data.code = 0;
                data.message = "영향을 끼치지 않았습니다";
                data.data = null;
            }

            return res.status(200).json(data);
        }catch (e) {
            console.log(e);

            data.code = -1;
            data.message = "관리자에게 문의하세요.";
            data.data = e.toString();

            return res.status(500).json(data)
        }finally {
            if (conn) return conn.release();
        }
    }
}