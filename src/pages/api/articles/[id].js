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
                               " WHERE T1.id = ?";
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
    }else if(req.method === 'POST'){
        try{
            const formData = req.body
            formData.updDttm = moment().format('YYYY-MM-DD HH:mm:SS')
            const client = await connectDB;
            const db = client.db('forum');
            await db.collection('post').updateOne({ _id : new ObjectId(id) }, { $set: formData })
            return res.status(200).redirect('/list')
        }catch (e) {
            console.error(e)
            return res.status(500).json('실패했음')
        }
    }else if(req.method === 'DELETE'){
        try{
            const id = req.query.id
            const client = await connectDB;
            const db = client.db('forum');
            let result = await db.collection('post').deleteOne({_id : new ObjectId(id)})
            return res.status(200).json({ message : '삭제 성공' })
        }catch (e) {
            console.error(e);
            return res.status(500).json({ message : '삭제 실패' })
        }
    }
}