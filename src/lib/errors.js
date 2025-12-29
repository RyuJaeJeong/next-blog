export class ValidationError extends Error{
    constructor(message) {
        super(message);
        this.name = "ValidationError";
        this.code = 'E_VALIDATION_CHECK_FAILED'
    }
}

export class VerificationError extends Error {
    constructor(message="이메일 인증에 실패하였습니다.") {
        super(message);
        this.name = "VerificationError";
        this.code = 'E_VERIFICATION_FAILED'
    }
}

export class EmailExistError extends Error{
    constructor(message="이미 존재하는 이메일입니다.") {
        super(message);
        this.name = "EmailExistError";
        this.code = "E_EMAIL_EXIST";
    }
}

export class EmailValidationError extends Error{
    constructor(message="이메일 형식이 올바르지 않습니다.") {
        super(message);
        this.name = "EmailValidationError";
        this.code = "E_EMAIL_VALIDATION";
    }
}