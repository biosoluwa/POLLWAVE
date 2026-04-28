import path from "node:path";
import fs from 'node:fs/promises'
import { collectIncomingPollData } from "../utils/collectIncomingPollData.js";
import { sendResponse } from "../utils/sendResponse.js";
import { addNewDataToExistingData } from "../utils/addNewDataToExistingData.js";

 async function handlePostRequest(req, res){
    try{
        const pollData = await collectIncomingPollData(req)
        addNewDataToExistingData(pollData)
        sendResponse(res, 201, 'application/json', JSON.stringify(pollData))
    }catch(err){
        console.err(err)
    }
}

async function handleGetRequest(req, res){
    const dataPath = path.join('data', 'data.json')
    const content = await fs.readFile(dataPath) 
    sendResponse(res, 200, 'application/json', content)
}

export {handleGetRequest, handlePostRequest}