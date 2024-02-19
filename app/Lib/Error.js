'use strict'
module.exports = {
    MySQL(code) {
        let result
        switch (code) {
            case 1062:
                result = 'email or phone number already registered, please login'
                break;

            default:
                break;
        }

        return result
    }
}
