'use strict'

class DocumentStatus {
    get rules () {
		return {
			status: "required|in:ready,error,request generate",
		}
	}

	get messages(){
		return {
			"status.required": "status is required",
            "status.in": "invalid status value",
		}
	}

	async fails(errorMessages) {
		return this.ctx.response.json({
			status: false,
			message: errorMessages[0].message
		});
	}
}

module.exports = DocumentStatus