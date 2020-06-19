import { sendGmail } from './utils-mail'
import { getLocalTimeStamp } from './utils-time'

console.log('start schedule')
console.log('process.env.SEND_MAIL : ', process.env.SEND_MAIL)
if (process.env.SEND_MAIL === 'yes') {
    let timestamp = getLocalTimeStamp()
    sendGmail({
        // to: 'frog@falinux.com, ksskor@falinux.com',
        to: 'ksskor@falinux.com',
        subject: `[START:SCHEDULE] mongodb schedule started on mongodb server`,
        text: `hello!\n I am mongodb schedule application\n I am running on mongodb server  at ${timestamp}\n`
    })
    console.log('send mail to frog, ksskor')
}
