
import schedule from 'node-schedule-tz'
import shell from 'shelljs'
import { getLocalTimeStamp } from './utils-time'

//  *     *     *    *     *     *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)
// console.log('JOB: [0 0 5 * * *] Mongodb Manager')
console.log('JOB: [*/10 * * * * *] Mongodb Manager')
// let j = schedule.scheduleJob('Mongodb manager', '0 0 5 * * *', "Asia/Seoul", () => {
    let j = schedule.scheduleJob('Mongodb manager', '*/10 * * * * *', "Asia/Seoul", () => {
    let timestamp = getLocalTimeStamp()
    console.log(`SCHEDULE:CALL: ${timestamp} : Source Manager`)

    let result = ''
    result = shell.exec('echo "test mongodb schedule."', {silent:true}).stdout
    console.log(`run Source Manager`)
    console.log(result)
})
