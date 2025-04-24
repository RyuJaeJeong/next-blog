import { describe, it, expect } from 'vitest';
import { createMocks } from 'node-mocks-http';
import handler from '../../../../src/pages/api/articles/[id]';
import dotenv from 'dotenv';
dotenv.config();

describe('/api/articles/', () => {
    it('게시물 조회', async () => {
        const { req, res } = createMocks({
            method: 'GET',
            query: {
                id: '1'
            }
        });

        await handler(req, res);
        expect(res._getStatusCode()).toBe(200);
        expect(res._getJSONData().data[0].id).toBe(1);
    });

    it('게시물 삭제', async () => {
        const { req, res } = createMocks({
            method: 'DELETE',
            query: {
                id: '1'
            }
        });

        await handler(req, res);
        expect(res._getStatusCode()).toBe(200);
        expect(res._getJSONData().data[0].affectedRows).toBe(1);
    });
});
