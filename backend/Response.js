
class response {

    static success(data = {}) {
        return {success: true, data};
    }
    static error(message = "Something went wrong", error = null) {
        return {success: false, message, error};
    }

}

module.exports = { response }
