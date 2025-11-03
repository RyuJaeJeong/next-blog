import verificationHandler from "@/pages/api/member/email/verification";
import memberHandler from "@/pages/api/member";
import { createMocks } from 'node-mocks-http';
import dotenv from 'dotenv'

describe('/api/member', ()=>{
    beforeEach(()=>{
        return dotenv.config({ path: '.env.local' });
    });
    let verificationCode;
    test('이메일 인증코드 발행', async ()=>{
        const {req, res} = createMocks({
            method: 'GET',
            query: {
                email: 'test235@example.com'
            }
        });
        await verificationHandler(req, res);
        verificationCode = JSON.parse(res._getData()).data.verificationCode;
        expect(res._getStatusCode()).toBe(200);
    }, 10000);
    test('회원가입 테스트', async ()=>{
        console.log(`verificationCode2: ${verificationCode}`);
        const {req, res} = createMocks({
            method: 'POST',
            body: JSON.stringify({
                name: "류재정",
                email: "test235@example.com",
                verificationCode: verificationCode,
                password: "123",
                passwordCheck: "123"
            })
        });
        await memberHandler(req, res);
        expect(JSON.parse(res._getData()).data).toBe(1);
    });
    test('회원삭제 테스트', async ()=>{
        const {req, res} = createMocks({
            method: 'DELETE',
            query: {
                email: "test235@example.com",
            }
        });
        await memberHandler(req, res);
        expect(JSON.parse(res._getData()).data).toBe(1);
    });
});