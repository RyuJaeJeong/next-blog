import pool from '@/src/utils/db_con'

export default async function handler(req, res){
    if(req.method === 'GET'){
        var conn = await pool.getConnection();
        const [rows] = await conn.query("SELECT now()")
        console.log(rows)
        return res.status(200).json({ "str" : "finish" });
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
            }else{
                data.code = 0;
                data.message = "영향을 끼치지 않았습니다";
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
            }else{
                data.code = 0;
                data.message = "영향을 끼치지 않았습니다";
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