import pool from '@/src/utils/db_con'

export default async function handler(req, res){
    if(req.method === 'GET'){
        const data = {}
        try{
            var conn = await pool.getConnection();
            let sql = "SELECT T1.id" +
                                  ", T1.title" +
                                  ", DATE_FORMAT(T1.inp_dttm, '%Y-%m-%d') AS inpDttm" +
                                  ", DATE_FORMAT(T1.upd_dttm, '%Y-%m-%d') AS updDttm " +
                               "FROM t_board T1" +
                             " WHERE 1 = 1"  +
                               " AND T1.delete_yn = 0 ";
            const pageNo = req.query.pageNo || 1;
            const pageSize = 15;
            const totalRecord = await getTotalRecord();
            const pageData = pager(pageSize, 10, totalRecord, pageNo);

            sql += "LIMIT ?, ?"
            console.log(sql)
            const rows = await conn.query(sql, [pageData.startRecord, pageSize]);

            data.code = 200;
            data.message = "처리성공";
            data.data = rows[0];
            data.pageData = pageData;
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




function pager(pageSize, blockSize, totalRecord, pageNo){
    const startRecord = pageSize * (pageNo - 1);
    let lastRecord = pageSize * pageNo;
    if(lastRecord > totalRecord) lastRecord = totalRecord
    let totalPage = 0;
    let startPage = 1;
    let lastPage = 1;
    if(totalRecord > 0){
        totalPage = totalRecord / pageSize + (totalRecord % pageSize == 0 ? 0 : 1)
        startPage = (pageNo / blockSize - (pageNo % blockSize != 0 ? 0 : 1)) * blockSize + 1;
        lastPage = startPage + blockSize - 1
        if(lastPage > totalPage) lastPage = totalPage
    }
    return {
        "startRecord":startRecord,
        "lastRecord":lastRecord,
        "totalPage":Math.ceil(totalPage),
        "startPage":startPage,
        "lastPage":lastPage
    }
}

async function getTotalRecord(){
    try{
        var conn = await pool.getConnection();
        let sql = "SELECT COUNT(1) AS cnt " +
                           "FROM t_board T1" +
                         " WHERE 1=1"  +
                           " AND T1.delete_yn = 0 ";
        console.log(sql)
        const rows = await conn.query(sql);
        console.log(rows)
        return rows[0][0].cnt
    }catch (e) {
      return 0
    }
}




// public int[] pager(int pageSize, int blockSize, int totalRecord, int pageNumber) {
//     int[]  result = new int[6];
//     int jj = totalRecord - pageSize * (pageNumber - 1);
//     int startRecord = pageSize*(pageNumber-1)+1;
//     int lastRecord = pageSize * pageNumber;
//     if( lastRecord >totalRecord) {
//         lastRecord = totalRecord;
//     }
//
//     int totalPage = 0;
//     int startPage = 1;
//     int lastPage = 1;
//     if(totalRecord > 0) {
//         totalPage = totalRecord / pageSize + (totalRecord % pageSize == 0? 0:1);
//         startPage = (pageNumber / blockSize - (pageNumber % blockSize != 0? 0:1)) * blockSize + 1;
//         lastPage = startPage + blockSize - 1;
//         if (lastPage>totalPage) {
//             lastPage = totalPage;
//         }
//     }
//
//     result[0] = jj;
//     result[1] = startRecord;
//     result[2] = lastRecord;
//     result[3] = totalPage;
//     result[4] = startPage;
//     result[5] = lastPage;
//
//     return result;
//
// }