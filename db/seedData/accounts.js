const mongoose = require('mongoose');

const a = mongoose.Types.ObjectId('60ebd53e2f79311541618bc1');
const b = mongoose.Types.ObjectId('60ebd53e2f79311541618bc2');
const c = mongoose.Types.ObjectId('60ebd53e2f79311541618bc3');
const d = mongoose.Types.ObjectId('60ebd53e2f79311541618bc4');
const e = mongoose.Types.ObjectId('60ebd53e2f79311541618bc5');
const f = mongoose.Types.ObjectId('60ebd53e2f79311541618bc6');
const g = mongoose.Types.ObjectId('60ebd53e2f79311541618bc7');
const h = mongoose.Types.ObjectId('60ebd53e2f79311541618bc8');
const i = mongoose.Types.ObjectId('60ebd53e2f79311541618bc9');
const j = mongoose.Types.ObjectId('60ebd53e2f79311541618b10');
const k = mongoose.Types.ObjectId('60ebd53e2f79311541618b11');
const l = mongoose.Types.ObjectId('60ebd53e2f79311541618b12');
const m = mongoose.Types.ObjectId('60ebd53e2f79311541618b13');
const n = mongoose.Types.ObjectId('60ebd53e2f79311541618b14');
const o = mongoose.Types.ObjectId('60ebd53e2f79311541618b15');

export const accounts = 
[
    {
      "_id": a,
      "type": "COA",
      "group": "asset",
      "balance": 1925,
      "sign": 1,
      "accountName": "africa-talking",
      "description": "Africa Talking",
      "businessType": "",
      "verified": null
    },
    {
      "_id": b,
      "type": "COA",
      "group": "owners-equity",
      "balance": 10000,
      "sign": -1,
      "accountName": "capital",
      "description": "Initial capital.",
      "businessType": "",
      "verified": null
    },
    {
      "_id": c,
      "type": "COA",
      "group": "asset",
      "balance": 10350,
      "sign": 1,
      "accountName": "cash",
      "description": "Cash in bank account available to app.",
      "businessType": "",
      "verified": null
    },
    {
      "_id": d,
      "type": "COA",
      "group": "owners-equity",
      "balance": 10,
      "sign": -1,
      "accountName": "fee",
      "description": "Fee revenue",
      "businessType": "",
      "verified": null
    },
    {
      "_id": e,
      "type": "GRP",
      "group": "liability",
      "balance": 1448.85,
      "sign": -1,
      "accountName": "my-business-1",
      "owners": ['27829524031', '27829524033'],
      "description": "My Business Pty (Ltd)",
      "businessType": "private",
      "verified": true
    },
    {
      "_id": f,
      "type": "USR",
      "group": "liability",
      "balance": 397.7,
      "sign": -1,
      "accountName": "27829524031",
      "description": "",
      "businessType": "",
      "verified": null
    },
    {
      "_id": g,
      "type": "USR",
      "group": "liability",
      "balance": 148.85,
      "sign": -1,
      "accountName": "27829524032",
      "description": "",
      "businessType": "",
      "verified": null
    },
    {
      "_id": h,
      "type": "USR",
      "group": "liability",
      "balance": 244.25,
      "sign": -1,
      "accountName": "27829524033",
      "description": "",
      "businessType": "",
      "verified": null
    },
    {
      "_id": i,
      "type": "USR",
      "group": "liability",
      "balance": 10,
      "sign": -1,
      "accountName": "27829524034",
      "description": "",
      "businessType": "",
      "verified": null
    },
    {
      "_id": j,
      "type": "USR",
      "group": "liability",
      "balance": 3.85,
      "sign": -1,
      "accountName": "27829524035",
      "description": "",
      "businessType": "",
      "verified": null
    },
    {
      "_id": k,
      "type": "USR",
      "group": "liability",
      "balance": 10,
      "sign": -1,
      "accountName": "27829524036",
      "description": "",
      "businessType": "",
      "verified": null
    },
    {
      "_id": l,
      "type": "COA",
      "group": "liability",
      "balance": 1.5,
      "sign": -1,
      "accountName": "vat",
      "description": "VAT owed to SARS.",
      "businessType": "",
      "verified": null
    },
    {
      "_id": m,
      "type": "GRP",
      "group": "liability",
      "balance": 0,
      "sign": -1,
      "accountName": "another-business",
      "owners": ['27829524031', '27829524035'],
      "description": "Another Business",
      "businessType": "public",
      "verified": true
    },
    {
      "_id": n,
      "type": "GRP",
      "group": "liability",
      "balance": 0,
      "sign": -1,
      "accountName": "a-ngo",
      "owners": ['27829524031'],
      "description": "Notptofit Org",
      "businessType": "ngo",
      "verified": false
    },
    {
      "_id": o,
      "type": "GRP",
      "group": "liability",
      "balance": 0,
      "sign": -1,
      "accountName": "gov-department",
      "owners": ['27829524031'],
      "description": "Government Department",
      "businessType": "gov",
      "verified": false
    }
   ]