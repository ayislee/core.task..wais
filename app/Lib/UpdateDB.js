'use strict'

const Database = use("Database")


async function UpdateDB(action, model, data){
	let resp
	let trx
	switch(action){
		case "create":
			trx = await Database.beginTransaction()
	        try{
	            await model.create(data)
	            await trx.commit()
   	            resp  = {
	            	status: true,
	                message: "Create new data success"
	            }

	        }catch(e) {
	            await trx.rollback()
	            console.log(e);

	            resp  = {
	            	status: false,
	                message: "system error please contact administrator"
	            }
	        }
			break;
		case "update":

			trx = await Database.beginTransaction()
	        try{
	            const r = await model.update(data)
	            console.log(r)
	            await trx.commit()
   	            resp  = {
	            	status: true,
	                message: "Update success"
	            }

	        }catch(e) {
	            await trx.rollback()
	            console.log(e);

	            resp  = {
	            	status: false,
	                message: "system error please contact administrator"
	            }
	        }
			break;
	}

	console.log(resp)
	return resp


}

module.exports = UpdateDB
