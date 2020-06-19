import fs from 'file-system'
import moment from 'moment-timezone'

const getLocalTimeStamp = () => {
    let stamp = moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss.SSS")
    return stamp
}

class MarkTime {
    constructor () {
        this.start = moment().tz("Asia/Seoul")
        this.end = this.start
    }

    done () {
        this.end = moment().tz("Asia/Seoul")
    }

    diff () {
        let diff = this.end.diff(this.start)
        return moment.utc(diff).format("HH:mm:ss")
    }

}

const markTime = () => {
    return new MarkTime()
}

module.exports.markTime = markTime
module.exports.getLocalTimeStamp = getLocalTimeStamp

