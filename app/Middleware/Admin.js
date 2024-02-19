'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Admin {
    /**
    * @param {object} ctx
    * @param {Request} ctx.request
    * @param {Function} next
    */
    async handle ({ request,response,auth }, next) {
        // call next to advance the request

        
        if(!auth.user){
     
            return response.json({
                status: false,
                message: 'you are not allowed'
            })
        }
        await next()
    }
}

module.exports = Admin
