import SimpleGit from 'simple-git/promise'

import logger from './logger.js'
import { getLocalTimeStamp, markTime } from './utils-time'

const cloneGitAsDepthOne = async (workPath, gitInfo) => {
    logger.info(`  - clone git depth 1`)
    // clone
    try {
        const USER = gitInfo.username
        const PASS = gitInfo.password
        const REPO = gitInfo.repo
        const remote = `https://${USER}:${PASS}@${REPO}`

        logger.info(`    work path     : ${workPath}`)
        logger.info(`    git username  : ${USER}`)
        logger.info(`    git repo      : ${REPO}`)
        logger.info(`    git remote    : ${remote}`)

        logger.info(`    clone start   : ${getLocalTimeStamp()}`)
        let markedTime = markTime()
        await SimpleGit().silent(true).clone(remote, workPath, {'--depth': 1})
        logger.info(`    clone end     : ${getLocalTimeStamp()}`)
        markedTime.done()
        logger.info(`    elapsed time  : ${markedTime.diff()}`)

    } catch (err) {
        logger.error('  - fail clone : ', err)
        throw err
    }
}

module.exports.cloneGitAsDepthOne = cloneGitAsDepthOne
