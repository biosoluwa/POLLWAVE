import {EventEmitter} from 'node:events'

export const voteUpdateEmitter = new EventEmitter()

voteUpdateEmitter.emit('voteUpdate')