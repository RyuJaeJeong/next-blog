import handler from "@/pages/api/member/email/verification";
// import handler from "@/pages/api/member";
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
                email: 'test210@example.com'
            }
        });
        await handler(req, res);
        verificationCode = JSON.parse(res._getData()).data.verification_code;
        expect(res._getStatusCode()).toBe(200);
    }, 10000);

    test('회원가입 테스트', async ()=>{
        const {req, res} = createMocks({
            method: 'POST',
            body: JSON.stringify({
                name: "류재정",
                email: "test210@example.com",
                verificationCode: verificationCode,
                password: "123",
                passwordCheck: "123"
            })
        });
        await handler(req, res);
        expect(res._getStatusCode()).toBe(200);
    });
});