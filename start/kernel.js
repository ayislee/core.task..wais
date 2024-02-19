'use strict'

/** @type {import('@adonisjs/framework/src/Server')} */
const Server = use('Server')

/*
|--------------------------------------------------------------------------
| Global Middleware
|--------------------------------------------------------------------------
|
| Global middleware are executed on each http request only when the routes
| match.
|
*/
const globalMiddleware = [
  'Adonis/Middleware/BodyParser',
  'Adonis/Middleware/Session',
  'Adonis/Middleware/Shield',
  'Adonis/Middleware/AuthInit',
  'App/Middleware/ConvertEmptyStringsToNull',
]

/*
|--------------------------------------------------------------------------
| Named Middleware
|--------------------------------------------------------------------------
|
| Named middleware is key/value object to conditionally add middleware on
| specific routes or group of routes.
|
| // define
| {
|   auth: 'Adonis/Middleware/Auth'
| }
|
| // use
| Route.get().middleware('auth')
|
*/
const namedMiddleware = {
  auth: 'Adonis/Middleware/Auth',
  guest: 'Adonis/Middleware/AllowGuestOnly',
  CustomerOnly: 'App/Middleware/CustomerOnly',
  CustomerAddress: 'App/Middleware/CustomerAddress',
  CreateSubscription: 'App/Middleware/CreateSubscription',
  CreateMessage: 'App/Middleware/CreateMessage',
  Transaction: 'App/Middleware/Transaction',
  Withdraw: 'App/Middleware/Withdraw',
  Admin: 'App/Middleware/Admin',
}

/*
|--------------------------------------------------------------------------
| Server Middleware
|--------------------------------------------------------------------------
|
| Server level middleware are executed even when route for a given URL is
| not registered. Features like `static assets` and `cors` needs better
| control over request lifecycle.
|
*/
const serverMiddleware = [
  'Adonis/Middleware/Static',
]

Server
  .registerGlobal(globalMiddleware)
  .registerNamed(namedMiddleware)
  .use(['Adonis/Middleware/Cors'])
  .use(serverMiddleware)

/*
|--------------------------------------------------------------------------
| Run Scheduler
|--------------------------------------------------------------------------
|
| Run the scheduler on boot of the web sever.
|
*/
const Scheduler = use('Adonis/Addons/Scheduler')
Scheduler.run()

