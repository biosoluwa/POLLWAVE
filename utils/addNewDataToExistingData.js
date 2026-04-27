import { getExistingPollData } from "./getExistingPollData.js";
import path from "node:path";
import fs from "node:fs/promises"


export async function addNewDataToExistingData(newData){
    try{
        const oldData = await getExistingPollData()
        oldData.push(newData)
        const dataPath = path.join('data', 'data.json')
        await fs.writeFile(dataPath, JSON.stringify(oldData, null, 2), 'utf8')
    }catch(err){
        throw new Error(err)
    }
}