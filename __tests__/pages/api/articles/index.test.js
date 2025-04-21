import { describe, it, expect } from 'vitest';
import { createMocks } from 'node-mocks-http';
import handler from '../../../../src/pages/api/articles/index';
import dotenv from 'dotenv';
dotenv.config();

describe('/api/articles', () => {
    var id = null;
    it('게시물 작성', async () => {
        const data = {
            title: "테스트 제목...",
            contents: "테스트 내용..."
        }

        const { req, res } = createMocks({
            method: 'POST',
            body:JSON.stringify(data)
        });

        await handler(req, res);
        id = res._getJSONData().data[0].insertId;
        expect(res._getStatusCode()).toBe(200);
        expect(res._getJSONData().data[0].affectedRows).toBe(1);
    });

    it('게시물 수정', async () => {
        const { req, res } = createMocks({
            method: 'PATCH',
            body:JSON.stringify({
                id: id,
                title:'수정 테스트 제목',
                contents:'수정 테스트 내용',
            })
        });

        await handler(req, res);
        expect(res._getStatusCode()).toBe(200);
        expect(res._getJSONData().data[0].affectedRows).toBe(1);
    });
});
