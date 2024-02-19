'use strict'
const User = use('App/Models/User')

class AuthController {


	async admin_register({request, response}) {
        try {
            const user = new User()
            user.fullname = request.all().fullname
            user.email = request.all().email
            user.phone = request.all().phone
            user.password = request.all().password    
            user.status = '1'
            user.type = "admin"
            await user.save()
            return response.json({
                status: true,
                message: 'User created'
            })

        } catch (error) {
            console.log(error)
            return response.json({
                status: false,
                message: 'Something wrong'
            })
        }
	}
	
	async admin_login({auth, request, response}){
        try {
            const data = await auth.authenticator('admin').attempt(request.all().email, request.all().password)

            let user = await User.query().where('email',request.all().email).first()
            data.user = user
            if(user.status === '0'){
                // return 0
                return response.json({
                     status: false,
                     message: "user not active"
                 })
            }else{
                // return 1
                
                return response.json({
                    status: true,
                    data: data
                }

                )
            }

        } catch (error) {
			console.log(error)
            return response.json({
                status: false,
                message: "invalid email or password"
            })
        }

    }

}

module.exports = AuthController
