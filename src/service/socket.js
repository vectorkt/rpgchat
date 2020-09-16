import io from "socket.io-client";   
import {server} from '../serverVar.js'

    
const ENDPOINT = server+'/';

export const socket = io(ENDPOINT);