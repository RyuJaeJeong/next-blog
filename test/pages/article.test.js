import articleHandler from "@/pages/api/article/[articleDt]/[articleSeq]";
import articleRegisterHandler from "@/pages/api/article";
import { createMocks } from 'node-mocks-http';
import sampleData from './sample_data.json' assert { type: 'json' };
import dotenv from 'dotenv';

jest.mock('next-auth');
jest.mock('@/pages/api/auth/[...nextauth]', ()=>({}));


describe('/api/article', ()=>{
    beforeEach(()=>{
        return dotenv.config({ path: '.env.local' });
    });

    test('게시물 조회', async ()=>{
        const {req, res} = createMocks({
            method: 'GET',
            query: {
                articleDt: "20251207",
                articleSeq: 1,
            }
        });
        await articleHandler(req, res);
        const data = JSON.parse(res._getData());
        console.log(data);
        expect(data.code).toBe(200);
    });

    test('게시물 등록', async ()=>{
        let cnt = 0;
        for (const sample of sampleData) {
            const {req, res} = createMocks({
                method: 'POST',
                body: JSON.stringify({
                    title: sample.title,
                    subTitle: sample.subTitle,
                    content: sample.content,
                    userId: 151
                })
            });
            await articleRegisterHandler(req, res);
            const data = JSON.parse(res._getData());
            if(data.code == 200) cnt++;
        }

        expect(cnt).toBe(61);
    }, 10000);

});