import { neon } from '@neondatabase/serverless';
import path from 'path';
import mybatisMapper from 'mybatis-mapper'


const mapperDir = path.join(process.cwd(), 'src', 'assets', 'mapper', 'test.xml')
mybatisMapper.createMapper([mapperDir])

const handler = async (req, res) => {
    if(req.method == 'GET'){
        const client = neon(`${process.env.DATABASE_URL}`);
        const param = {
            timezone: 'Asia/Seoul',
            template: 'YYYY-MM-DD HH24:MI:SS'
        }
        const sql = mybatisMapper.getStatement('test', 'selectTest', param, {language: 'sql', indent: '  '});
        const rows = await client.query(sql);
        console.log(sql);
        return res.status(200).json({"now" : rows[0]})
    }else{
        return res.status(404).json({"msg" : "not found"})
    }
}

export default handler