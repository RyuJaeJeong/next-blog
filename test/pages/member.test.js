import verificationHandler from "@/pages/api/member/email/verification";
import memberHandler from "@/pages/api/member";
import { createMocks } from 'node-mocks-http';
import dotenv from 'dotenv'

describe('/api/member', ()=>{
    beforeEach(()=>{
        return dotenv.config({ path: '.env.local' });
    });

    const userData = {
        name: "류재정",
        email: "testfinal@example.com",
        verificationCode: null,
        password: "testfinal",
        passwordCheck: "testfinal"
    }

    test('이메일 인증코드 발행', async ()=>{
        const {req, res} = createMocks({
            method: 'GET',
            query: {
                email: userData.email
            }
        });
        await verificationHandler(req, res);
        userData.verificationCode = JSON.parse(res._getData()).data.verificationCode;
        expect(res._getStatusCode()).toBe(200);
    }, 10000);

    test('회원가입 테스트', async ()=>{
        console.log(`verificationCode2: ${userData.verificationCode}`);
        const {req, res} = createMocks({
            method: 'POST',
            body: JSON.stringify(userData)
        });
        await memberHandler(req, res);
        expect(JSON.parse(res._getData()).data).toBe(1);
    }, 10000);

    test('회원삭제 테스트', async ()=>{
        const {req, res} = createMocks({
            method: 'DELETE',
            query: {
                email: userData.email,
            }
        });
        await memberHandler(req, res);
        expect(JSON.parse(res._getData()).data).toBe(1);
    }, 10000);
});