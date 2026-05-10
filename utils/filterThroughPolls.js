import fs from "node:fs/promises"
import path from 'node:path'

export async function filterThroughPolls(voteData){
    const filePath = path.join('data', 'data.json')
    let allPolls = await fs.readFile(filePath)
    allPolls = JSON.parse(allPolls)
console.log(typeof allPolls)
let poll = allPolls.filter(poll =>poll.id === voteData.id)[0]
// const optionKeys = Object.keys(poll).filter(key =>key.startsWith('option'))
option = poll.options.find(function(optionObj){
    return optionObj.text === voteData.text
})

option.votes ++
}