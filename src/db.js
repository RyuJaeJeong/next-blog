import { Pool } from "@neondatabase/serverless";
import mybatisMapper from 'mybatis-mapper'
import path from "path";
import fs from "fs";

let pool = null;
if(!global.pool){
    console.log("POOL INIT!!!!!!")
    global.pool = new Pool({ connectionString: process.env.DATABASE_URL })
}
pool = global.pool

if(!global.mybatisMapper){
    const mapperArr = []
    const dir = path.join(process.cwd(), 'src', 'assets', 'mapper')
    const items = fs.readdirSync(dir)
    for (const item of items){
        if(item.endsWith(".xml")){
            mapperArr.push(dir + path.sep + item)
        }else{
            const innerDir = path.join(dir, item)
            const innerItems = fs.readdirSync(innerDir)
            for(const innerItem of innerItems){
                mapperArr.push(innerDir + path.sep + innerItem)
            }
        }
    }
    mybatisMapper.createMapper(mapperArr)
}

export {pool, mybatisMapper}