import fs from 'file-system'
import path from 'path'

const getProjects  = async (projectsPath) => {
    let searchPath = path.join(__dirname, projectsPath)
    let fileNames = []
    fs.readdirSync(searchPath)
    .forEach((file) => {
        if (file.match(/\.js$/) !== null && file !== 'index.js') {
            fileNames.push(file)
        }
    })
    fileNames.sort()

    let projects = []
    for (const file of fileNames) {
        let modulePath = path.join(searchPath,file)
        let oneModule = await import(modulePath)
        projects.push(oneModule.default)
    }

    return projects
}

module.exports.getProjects = getProjects
