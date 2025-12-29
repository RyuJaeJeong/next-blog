import formidable from "formidable";
import fs from 'fs';
import { getServerSession } from "next-auth";
import path from 'path';
import { put } from '@vercel/blob';
import { pool, mybatisMapper } from "@/lib/db";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { ValidationError } from "@/lib/errors";
import os from 'os';

export const config = {
    api: {
        bodyParser: false,
    },
};


const handler = async(req, res)=>{
    if(req.method == 'POST'){
        try{
            const session = await getServerSession(req, res, authOptions);
            const userId = session?.user?.id;
            if(!userId) throw new ValidationError("사용자 ID가 존재하지 않습니다.")
            const uploadDir = os.tmpdir()
            if(!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
            const form = formidable({
                uploadDir: uploadDir,
                keepExtensions: true,
                maxFileSize: 4 * 1024 * 1024
            });
            const [fields, files] = await form.parse(req);
            console.log(fields.title?.[0].length)
            if(!fields.title?.[0] || fields.title?.[0].length < 2) throw new ValidationError("제목은 2글자 이상입니다.");
            else if(!fields.content?.[0] || fields.content?.[0].length < 10) throw new ValidationError("내용은 10글자 이상입니다.");
            var conn = await pool.connect();
            let headImageParam = null;
            let headImageResult = null;
            if(files.headImage && 0 < files.headImage.length){
                const fileBuffer = fs.readFileSync(files.headImage[0].filepath);
                const blob = await put(files.headImage[0].newFilename, fileBuffer, {
                    access: 'public',
                });
                headImageParam = {
                    "imageUrl": blob.url,
                    "imageDownloadUrl": blob.downloadUrl,
                    "imageOriginalNm": files.headImage[0].originalFilename,
                    "imageSaveNm": blob.pathname,
                    "userId": userId
                }
                await conn.query('BEGIN')
                const headImageSql = mybatisMapper.getStatement("articleMapper", "insertHeadImage", headImageParam);
                headImageResult = await conn.query(headImageSql);
                console.log(headImageSql);
                console.log(headImageResult);
            }
            const articleParam = {
                "title": fields.title?.[0],
                "subTitle": fields.subTitle?.[0] || null,
                "content": fields.content?.[0],
                "headImageId": (headImageParam)?headImageResult.rows[0].imageId:null,
                "userId": userId
            }
            const articleSql = mybatisMapper.getStatement("articleMapper", "insertArticle", articleParam);
            const articleResult = await conn.query(articleSql);
            console.log(articleSql);
            console.log(articleResult);
            if(headImageParam) await conn.query('COMMIT');
            return res.status(200).json({
                code: 200,
                msg: "success",
                data: articleResult.rowCount
            });
        }catch (e) {
            if(conn) await conn.query('ROLLBACK');
            let message = e.message;
            console.error(e);
            return res.status(500).json({
                code: 500,
                msg: message
            })
        }finally {
            if(conn) conn.release();
        }
    }
}

export default handler