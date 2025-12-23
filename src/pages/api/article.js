import formidable from "formidable";
import fs from 'fs';
import { getServerSession } from "next-auth";
import path from 'path';
import { put } from '@vercel/blob';
import { pool, mybatisMapper } from "@/lib/db";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

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
            const uploadDir = path.join(process.cwd(), "tmp");
            const form = formidable({
                uploadDir: uploadDir,
                keepExtensions: true,
                maxFileSize: 4 * 1024 * 1024
            });
            const [fields, files] = await form.parse(req);
            const fileBuffer = fs.readFileSync(files.headImage[0].filepath);
            const blob = await put(files.headImage[0].newFilename, fileBuffer, {
                access: 'public',
            });
            var conn = await pool.connect();
            await conn.query('BEGIN')
            const headImageParam = {
                "imageUrl": blob.url,
                "imageDownloadUrl": blob.downloadUrl,
                "imageOriginalNm": files.headImage[0].originalFilename,
                "imageSaveNm": blob.pathname,
                "userId": userId
            }
            const headImageSql = mybatisMapper.getStatement("articleMapper", "insertHeadImage", headImageParam);
            const headImageResult = await conn.query(headImageSql);
            console.log(headImageSql);
            console.log(headImageResult);
            const articleParam = {
                "title": fields.title?.[0],
                "subTitle": fields.subTitle?.[0] || null,
                "content": fields.content?.[0],
                "headImageId": headImageResult.rows[0].imageId,
                "userId": userId
            }
            const articleSql = mybatisMapper.getStatement("articleMapper", "insertArticle", articleParam);
            const articleResult = await conn.query(articleSql);
            console.log(articleSql);
            console.log(articleResult);
            await conn.query('COMMIT');
            return res.status(200).json({
                code: 200,
                msg: "success",
                data: articleResult.rowCount
            });
        }catch (e) {
            if(conn) await conn.query('ROLLBACK');
            console.error(e);
            return res.status(500).json({
                code: 500,
                msg: e.message
            })
        }finally {
            if(conn) conn.release();
        }
    }
}

export default handler