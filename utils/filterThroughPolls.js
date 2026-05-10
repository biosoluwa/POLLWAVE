import fs from "node:fs/promises"
import path from 'node:path'

export async function filterThroughPolls(voteData){
const filePath = path.join('data', 'data.json')
try{
    let allPolls = await fs.readFile(filePath)
    allPolls = JSON.parse(allPolls)
let poll = allPolls.filter(poll =>poll.id === voteData.id)[0]
const option = poll.options.find(function(optionObj){
    return optionObj.text === voteData.text
})

 option.votes ++

 await fs.writeFile(filePath, JSON.stringify(allPolls, null, 2), 'utf8')
}catch(err){
    console.error(err)
}
}