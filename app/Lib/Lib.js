'use strict'
const Database = use('Database')
const Env = use('Env')
const Mail = use('App/Lib/BasicEmailService')
const sortArray = use('sort-array')



module.exports = {
    toSlug(Text) {
        let x  = Text.toLowerCase().replace(/ /g,"-")
        let regex = /\?/g;
        let out = x.replace(regex, "");

        console.log('text',Text)
        console.log('out',out)
        return out
    },

    async SystemSetting(key) {
        const setting = await Setting.query()
            .where('key',key)
            .first()
        if(setting){
            return setting.value
        }else{
            return null
        }
    },
    async GenerateSchedules(subscription_id){
        const subscription = await Subscription.query()
            .innerJoin('subscription_schedules','subscription_schedules.subscription_id','subscriptions.subscription_id')
            .where('subscription_id',subscription_id)
            .fetch()

        if(subscription.rows > 0) {
            return false
        }else{
            return true
        }
    },

    async GetDateOfMonth(year,month) {
        // return new Date(`${year}-${month<10?"0"+month:month}-03`)
        let week = 0;
        const  dates = new Date(year, month, 0).getDate();

        const ms_schedule = await MsSchedule.query().fetch()


        let d;
        let mingguan;
        let amingguan = []
        for (const iterator of ms_schedule.rows) {
            switch (iterator.day_of_week) {
                case "Sunday":
                    week = 0;
                    break;
                case "Monday":
                    week = 1;
                    break;
                case "Tuesday":
                    week = 2;
                    break;
                case "Wednesday":
                    week = 3;
                    break;
                case "Thursday":
                    week = 4;
                    break;
                case "Friday":
                    week = 5;
                    break;
                case "Saturday":
                    week = 6;
                    break;
                default:
                    break;
            }
            amingguan.push({
                day: week,
                week_name: iterator.day_of_week,
                hours: iterator.start_hours
            })
        }

        // return amingguan


        let array = []
        for (let date = 1;date<=dates;date++) {
            d = new Date(`${year}-${month<10?"0"+month:month}-${date<10?"0"+date:date}`)
            mingguan = d.getDay()

            for (const iterator of amingguan) {
                if(iterator.day == mingguan){
                    array.push({
                        date: d.toISOString().slice(0, 10),
                        day: iterator.week_name,
                        hours: iterator.hours
                    })
                }
            }





        }

        return array


        return ms_schedule

    },
    async GetSetting(key){

    },
    async GroupPlanSchedule(auth,request) {

    },
    async getCardType( number ) {
        if (number !== '' || number !== null) {
            const amexReg   = new RegExp('^3[47]');
            const jbcReg    = new RegExp('^35(2[89]|[3-8][0-9])');
            const masterReg = new RegExp('^5[1-5][0-9]');
            const visaReg   = new RegExp('^4');

            if (number.toString().match(amexReg)) {
                return 'amex';
            } else if (number.toString().match(jbcReg)) {
                return 'jcb';
            } else if (number.toString().match(masterReg)) {
                return 'mastercard';
            } else if (number.toString().match(visaReg)) {
                return 'visa';
            } else {
                return 'invalid';
            }
        }
    },
    async EmailSender() {

    },
    isEmail( text ) {
        var validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if(text.match(validRegex)){
            return true
        } else {
            return false
        }
    },
    isPhone( text ) {
        var validRegex = /^(^08)(\d{3,4}){2}\d{3,4}$/;
        if(text.match(validRegex)){
            return true
        } else {
            return false
        }
    },
    async SendMailTransaction(transaction_id, trial) {
        let trx
        const trans =  await Transaction.query()
        .with('customer')
        .where('transaction_id',transaction_id)
        .first()
        const transData = trans.toJSON()
        const packages = await Package.find(transData.package_id_reference)

        const number_delivery = parseInt(packages.number_delivery)+parseInt(transData.customer.trial)
        trx = await Transaction.query()
		.select('packages.package_id',
        'transactions.transaction_id',
        'transactions.transaction_ref',
        'transactions.customer_id',
        'transactions.total_price',
        'transactions.discount',
        'transactions.administration_fee',
        'transactions.vat',
        'transactions.total_billing',
        'transactions.status',
        'transactions.created_at',
        'transactions.price',
        'transactions.payment_response',
        'transactions.payment_token',
        'transactions.package_name_reference',
        'transactions.next_billing_date',
        'transactions.subscription_number',
        'transactions.package_id_reference',

        )
		.innerJoin('packages','packages.package_id','transactions.package_id_reference')
		.where('transaction_id',transaction_id)
		.with('customer')
		.with('subscriptions', (build)=>{
			build.with('subscription_schedule',(build)=>{
				build
                .with('group',(build)=>{
					build.with('group_products',(build)=>{
				 		build.with('product')
				 	})
				})
                .orderBy('subscription_schedules.subscription_schedule_id','desc')
                .offset(0)
                .limit(number_delivery)
                
			})
		})
		.first()

        

        /// ------------------ NOT SORTED
		const pkg = await Package.query()
		.where('package_id',trx.package_id)
		.with('benefits',(build)=>{
			build.where('benefit_id',Env.get('BENEFIT_ID'))
		})
		.first()

		const p = pkg.toJSON()
		let data = trx.toJSON()

        data = {
			...data,benefit: p.benefits.length > 0 ? true : false
		}

        data.benefit = p.benefits.length > 0 ? true : false
		// return response.json(data.benefit)
        // karena bug adonis heheh
        let delivers
        if(data.subscriptions.length > 1){
            delivers = data.subscriptions[1].subscription_schedule
        }else{
            delivers = data.subscriptions[0].subscription_schedule
        }


        
        // console.log('data',data)

        const sorted = await sortArray(delivers,{by: 'schedule_date',order: 'asc'})

        // console.log('sorted ===========>',sorted)
        
        for (const key in data.subscriptions) {
            // console.log('key',key)
            data.subscriptions[key].subscription_schedule = sorted
            // console.log(`data.subscriptions[${key}].subscription_schedule`,data.subscriptions[key].subscription_schedule)
        }



		let attachments = [
			{
			filename: 'logo_white.png',
			path: Env.get('APP_URL') +'/assets/images/logo_white.png',
			cid: 'logo'  
			},
			{
				filename: 'social-instagram.png',
				path: Env.get('APP_URL') +'/assets/images/social-instagram.png',
				cid: 'instagram' 
			},
			{
				filename: 'social-tiktok.png',
				path: Env.get('APP_URL') +'/assets/images/social-tiktok.png',
				cid: 'tiktok' 
			},
			{
				filename: 'social-linkin.png',
				path: Env.get('APP_URL') +'/assets/images/social-linkin.png',
				cid: 'linkin' 
			},
			{
				filename: 'roti.png',
				path: Env.get('APP_URL') +'/assets/images/roti.png',
				cid: 'roti' 
			}

		]

		if(data.benefit){
			attachments.push({
				filename: 'voucher.png',
				path: Env.get('APP_URL') +'/assets/images/voucher.png',
				cid: 'voucher' 
			})
		}
		

		const dt = {
			recipient_email: data.customer.email,
			package_name: data.package_name_reference,
			recipient_name:  `${data.customer.firstname} ${data.customer.lastname}`,
			transaction:data,
			attachments : attachments
		}
        await Messages.send('transaction',data)
		await Mail.transaction(dt,trial)
    }





}

