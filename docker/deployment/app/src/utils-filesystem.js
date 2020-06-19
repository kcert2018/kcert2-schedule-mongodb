import path from 'path'
import fs from 'file-system'

const removeAllSync = (targetPath) => {
    fs.rmdirSync(targetPath)
    // fs.readdir(targetPath, (err, files) => {
    //     if (err) throw err;
    //     for (const file of files) {
    //         try {
    //             fs.unlinkSync(path.join(targetPath, file))
    //         } catch (err) {
    //             throw err
    //         }
    //     }
    // })
}

const removeAllMatchSync = (targetPath, match) => {
    fs.readdir(targetPath, (err, files) => {
        if (err) throw err;
        for (const file of files) {
            if (file.match(match) === null) continue
            try {
                fs.unlinkSync(path.join(targetPath, file))
            } catch (err) {
                throw err
            }
        }
    })
}

module.exports.removeAllSync = removeAllSync
module.exports.removeAllMatchSync = removeAllMatchSync
