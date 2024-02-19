"use strict";

const Event = use('Event')
const Database = use('Database')
const uuid = use('uuid')
const moment = use('moment')
const Env = use('Env')


Event.on('message::autoreply', async (message) => {
    console.log('Action auto reply',message)

})