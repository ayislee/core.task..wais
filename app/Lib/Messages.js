'use strict'
const Message = use('App/Models/Message')
const Env = use('Env')

module.exports = {
	async send(type,data) {
		console.log('data',data)
		let subject, message, message_to, reference, reference_id,message_from

		switch (type) {
			case 'transaction':
				subject = `New transaction created`;
				message = `<p>Hi Admin</p><p>New transaction already created, please check at <a href='${Env.get('CMS_HOST')}/transactions/${data.transaction_id}'>${Env.get('CMS_HOST')}/transactions</a> for detail</p>`;
				message_to = `ADMIN`;
				reference = `transaction`;
				message_from = data.customer.email
				reference_id = data.transaction_id
				await mess.save()
				break;

				case 'withdraw':
				subject = `Request withdraw`;
				message = `<p>Hi Admin</p><p>I have applied for referral earnings withdrawal, please check at <a href='${Env.get('CMS_HOST')}/withdraw/${data.transaction_id}'>${Env.get('CMS_HOST')}/withdraw</a> for detail</p>`;
				message_to = `ADMIN`;
				reference = `withdraw`;
				message_from = data.customer.email
				reference_id = data.transaction_id
				break
			default:
				break;
		}

		const mess = new Message()
		mess.message_from = message_from
		mess.message_to = message_to
		mess.message = message
		mess.reference = reference
		mess.reference_id = reference_id
		mess.subject = subject
		await mess.save()

	}
}