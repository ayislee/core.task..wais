'use strict'
const Lib = use('App/Lib/Lib.js')
const GroupPlanController = use('App/Controllers/Http/GroupPlanController')
const Database = use('Database')
const Packages = use('App/Models/Package')
const Env = use('Env')
const CryptoJS = use("crypto-js");
const qs = use('qs')
const Transaction = use('App/Models/Transaction')
const CustomerCard = use('App/Models/CustomerCard')
const TransactionPayment = use('App/Models/TransactionPayment')
const TransactionStatus = use('App/Models/TransactionStatus')
const Subscription = use('App/Models/Subscription')
const SubscriptionSchedule = use('App/Models/SubscriptionSchedule')
const axios = use('axios')
const moment = use('moment')
const Customer = use('App/Models/Customer')
const Referral = use('App/Models/Referral')

module.exports = {
	
	async DecryptCard(data) {
		const secret = Env.get('NEXT_PUBLIC_SECRET_KEY')
		var bytes  = CryptoJS.AES.decrypt(data, secret);
		var originalText = bytes.toString(CryptoJS.enc.Utf8);
		try {
            data = JSON.parse(originalText)
        } catch (error) {
            return {
                status: false,
                message: 'Invalid card'
            }
        }

		const aExpire = data.expiry.split('/')
        if(aExpire.length !=2){
            return response.json({
                status: false,
                message: 'Invalid card'
            })
        }

		return {
			status: true,
			data: data
		}




	},
	async RegisterCard(card) {
		const reg_url = await Lib.SystemSetting('REG_CARD')
		const serverKey = await Lib.SystemSetting('MT_SERVER_KEY')
        const clientKey = await Lib.SystemSetting('MT_CLIENT_KEY')

		const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g
		const onlyNumbers = card.number.replace(/[^\d]/g, '')
		
		const ccFormat = onlyNumbers.replace(regex, (regex, $1, $2, $3, $4) => [$1, $2, $3, $4].filter(group => !!group).join(' '))
		
		const aExpire = card.expiry.split('/')
		const p = {
			card_number: ccFormat,
			card_exp_month: aExpire[0],
			card_exp_year: `20${aExpire[1]}`,
			client_key: clientKey

		}
		
		let params
        params = qs.stringify(p)
		const key = Buffer.from(`${serverKey}`).toString('base64')
		try {
			const resp = await axios(reg_url+'?'+params,{
				headers : {
					Authorization : 'Basic '+ key
				}
			})

			if(resp.data.status_code !== "200"){
				return {
					status: false,
					message: "Card registration fail"
				}
			}
			return {
				status: true,
				data: resp.data
			}
		} catch (error) {
			
			console.log(error)
			return {
				status: false,
				message: error.code
			}
		}
	},
	async CheckTransactionBeforePay(transaction_id) {
		const now = moment()
		const transaction = await Transaction.find(transaction_id)
		if(transaction.status != 'preview'){
			return {
				status: false,
				message: "invalid transaction"

			}
		}

		const created = moment(transaction.created_at)
		if(now.format('YYYY-MM-DD') != created.format('YYYY-MM-DD' )){
			return {
				status: false,
				message: "transaction expired"
			}
		}

		return {
			status: true,
			message: "success"
		}


	},
	async Payment(transaction_id, saved_token_id) {


		const transaction = await Transaction.query()
		.where('transaction_id',transaction_id)
		.with('customer')
		.first()

		// get customer info

		const dataTransaction = transaction.toJSON()
		dataTransaction.subscription_json = JSON.parse(dataTransaction.subscription_json)
		const order_id = `TRX-C${dataTransaction.customer.customer_id}-PKG${dataTransaction.transaction_id}`
		let payment_log
		let trxPayment
		const customer = await Customer.find(transaction.customer_id)
		if(customer.trial === '1'){

			return {
				status : true,
				trial: true,
				order_id: order_id,
				data: {
					message: "Trial payment"					
				}
			}			
		}

		// return dataTransaction
		const serverKey = await Lib.SystemSetting('MT_SERVER_KEY')
		const urlCharge = await Lib.SystemSetting('CHARGE_CARD')
		const base64 = Buffer.from(serverKey+':').toString('base64')
		const config = {
			headers : {'Authorization': 'Basic '+base64}
		}


		const reqBody = {
			payment_type: "credit_card",
			credit_card:{
				token_id: saved_token_id
			},
			transaction_details: {
				order_id: order_id,
				gross_amount: transaction.total_billing
			},
			customer_details: {
				first_name: dataTransaction.customer.firstname,
				last_name: dataTransaction.customer.lastname,
				email: dataTransaction.customer.email,
				phone: dataTransaction.customer.msisdn,
			}

		}

		// return reqBody


		const params = {
			url: urlCharge,

		}
		
		try {
			const responsePayment = await axios.post(params.url,reqBody,config)	
			if(responsePayment.data.status_code !== "200"){
				console.log(responsePayment.data)
				return {
					status: false,
					message: responsePayment.data.status_message
				}
			}

			return {
				status: true,
				trial: false,
				order_id: order_id,
				data: responsePayment.data
			}
			

		} catch (error) {
			console.log(error)
			console.log(error)
			return {
				status: false,
				message: error.code
			}
		}
		
	}, 
	async CreateSchedule(transaction_id) {
		const trx = await Database.beginTransaction()
		const transaction = await Transaction.find(transaction_id)
		try {
			
		} catch (error) {
			
		}
	},
	async ReferralRevenue(transaction_id,order_id){
		const rev = await Lib.SystemSetting('REFERRAL_REVENUE')
		let ref = parseFloat(rev)
		const transaction = await Transaction.find(transaction_id)
		const customer = await Customer.find(transaction.customer_id)
		const referral = await Customer.query()
		.where('customer_id', customer.rid)
		.where('status','ACTIVE')
		.where('type','partner')
		.first()

		if(referral){

			const referralRevenue = new Referral()
			referralRevenue.customer_id = referral.customer_id
			referralRevenue.from =customer.customer_id
			referralRevenue.debit = ref * transaction.total_billing
			referralRevenue.credit = 0
			referralRevenue.ref = order_id
			referralRevenue.description = `revenue from ${customer.firstname}`
			referralRevenue.status = `approved`
			await referralRevenue.save()
		}
	}
}