'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Env = use('Env')





Route.get('/',()=>{
    return "welcome to Core Task WAIS System"
})