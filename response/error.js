class errData {
    constructor(code, msg) {
        if (code) {
            this.code = code;
        } 
        if (msg) {
            this.msg = msg;
        }
    }
}

export default errData;