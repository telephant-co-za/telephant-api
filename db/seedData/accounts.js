const mongoose = require('mongoose');

const a = mongoose.Types.ObjectId('60ebd53e2f79311541618bc4');
const b = mongoose.Types.ObjectId('60ebd53e2f79311541618bc5');
const c = mongoose.Types.ObjectId('60ebd53e2f79311541618bc6');

export const accounts = [
    {"type":"USR", "accountName": "+27829524031", "balance": 250.00, "sign": true, "owners": ['27829524031', '27828099070']},
    {"type":"USR", "accountName": "+27829524041", "balance": 250.00, "sign": true, "owners": ['27829524031', '27828099070']},
    {"type":"USR", "accountName": "+27829524051", "balance": 250.00, "sign": true, "owners": ['27829524031', '27828099070']},
    {"type":"USR", "accountName": "+27829524061", "balance": 250.00, "sign": true, "owners": ['27829524031', '27828099070']},
    {"type":"USR", "accountName": "27829524031", "balance": 250.00, "sign": true},
    {"type":"USR", "accountName": "+27829524081", "balance": 250.00, "sign": false},
    {"type":"USR", "accountName": "+27829524091", "balance": 250.00, "sign": true},
    {"type":"USR", "accountName": "+27829524020", "balance": 250.00, "sign": true},
    {"type":"USR", "accountName": "+27829524011", "balance": 250.00, "sign": true},
    {"_id": a, "type":"GRP", "accountName": "MyCompany", "description": "The account description for My Company", "balance": 2500.00, "sign": false, "owners": ['27829524031', '27828099070']},
    {"_id": b, "type":"GRP", "accountName": "My Company 2", "description": "The account description for My Company 2", "balance": 2500.00, "sign": false, "owners": ['27829524031', '27828099070']},
    {"_id": c, "type":"GRP", "accountName": "My Company 3", "description": "The account description for My Company 3", "balance": 2500.00, "sign": false, "owners": ['27829524032', '27828099070']}
];