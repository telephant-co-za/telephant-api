// transactions balance
// i.e A = L + OE
// Means DR = CR

export const transactions = 
[
  {
    "transactionID": "4zx66egq",
    "accountID": "60ebd53e2f79311541618bc3",
    "dateTime": "2021-05-1T10:23",
    "type": "INITIAL",
    "amount": 10000,
    "sign": 1,
    "description": "Initial funding"
  },
  {
    "transactionID": "4zx66egq",
    "accountID": "60ebd53e2f79311541618bc2",
    "dateTime": "2021-05-1T10:23",
    "type": "INITIAL",
    "amount": 10000,
    "sign": -1,
    "description": "Deposit from initial funding"
  },
  {
    "transactionID": "7868wibk",
    "accountID": "60ebd53e2f79311541618bc1",
    "dateTime": "2021-05-4T10:23",
    "type": "AIRTIME",
    "amount": 2000,
    "sign": 1,
    "description": "Buy airtime"
  },
  {
    "transactionID": "7868wibk",
    "accountID": "60ebd53e2f79311541618bc3",
    "dateTime": "2021-05-4T10:23",
    "type": "PAY",
    "amount": 2000,
    "sign": -1,
    "description": "Pay for airtime"
  },
  {
    "transactionID": "8he49vuc",
    "accountID": "60ebd53e2f79311541618bc3",
    "dateTime": "2021-05-5T14:12",
    "type": "DEPOSIT",
    "amount": 500,
    "sign": 1,
    "description": "Deposits cash"
  },
  {
    "transactionID": "8he49vuc",
    "accountID": "60ebd53e2f79311541618bc6",
    "dateTime": "2021-05-5T14:12",
    "type": "TOPUP",
    "amount": 500,
    "sign": -1,
    "description": "Account top up"
  },
  {
    "transactionID": "khm6yoax",
    "accountID": "60ebd53e2f79311541618bc3",
    "dateTime": "2021-05-8T9:16",
    "type": "DEPOSIT",
    "amount": 50,
    "sign": 1,
    "description": "Deposits cash"
  },
  {
    "transactionID": "khm6yoax",
    "accountID": "60ebd53e2f79311541618bc7",
    "dateTime": "2021-05-8T9:16",
    "type": "TOPUP",
    "amount": 50,
    "sign": -1,
    "description": "Account top up"
  },
  {
    "transactionID": "3zm9e5o5",
    "accountID": "60ebd53e2f79311541618bc3",
    "dateTime": "2021-05-11T18:55",
    "type": "DEPOSIT",
    "amount": 1500,
    "sign": 1,
    "description": "Deposits cash"
  },
  {
    "transactionID": "3zm9e5o5",
    "accountID": "60ebd53e2f79311541618bc5",
    "dateTime": "2021-05-11T18:55",
    "type": "TOPUP",
    "amount": 1500,
    "sign": -1,
    "description": "Account top up"
  },
  {
    "transactionID": "prq10vg0",
    "accountID": "60ebd53e2f79311541618bc3",
    "dateTime": "2021-05-13T5:27",
    "type": "DEPOSIT",
    "amount": 300,
    "sign": 1,
    "description": "Deposits cash"
  },
  {
    "transactionID": "prq10vg0",
    "accountID": "60ebd53e2f79311541618bc8",
    "dateTime": "2021-05-13T5:27",
    "type": "TOPUP",
    "amount": 300,
    "sign": -1,
    "description": "Account top up"
  },
  {
    "transactionID": "4g7hcv7",
    "accountID": "60ebd53e2f79311541618bc8",
    "dateTime": "2021-05-17T13:45",
    "type": "SEND",
    "amount": 10,
    "sign": 1,
    "description": "Sending credit"
  },
  {
    "transactionID": "4g7hcv7",
    "accountID": "60ebd53e2f79311541618bc8",
    "dateTime": "2021-05-17T13:45",
    "type": "FEE",
    "amount": 1,
    "sign": 1,
    "description": "Sending fee"
  },
  {
    "transactionID": "4g7hcv7",
    "accountID": "60ebd53e2f79311541618bc8",
    "dateTime": "2021-05-17T13:45",
    "type": "TAX",
    "amount": 0.15,
    "sign": 1,
    "description": "VAT"
  },
  {
    "transactionID": "4g7hcv7",
    "accountID": "60ebd53e2f79311541618bc6",
    "dateTime": "2021-05-17T13:45",
    "type": "RECEIVE",
    "amount": 10,
    "sign": -1,
    "description": "Received credit"
  },
  {
    "transactionID": "4g7hcv7",
    "accountID": "60ebd53e2f79311541618bc4",
    "dateTime": "2021-05-17T13:45",
    "type": "FEE_REVENUE",
    "amount": 1,
    "sign": -1,
    "description": "Sending fee"
  },
  {
    "transactionID": "4g7hcv7",
    "accountID": "60ebd53e2f79311541618b12",
    "dateTime": "2021-05-17T13:45",
    "type": "TAX_ACCOUNT",
    "amount": 0.15,
    "sign": -1,
    "description": "VAT"
  },
  {
    "transactionID": "y3huwi17",
    "accountID": "60ebd53e2f79311541618bc5",
    "dateTime": "2021-05-23T9:18",
    "type": "SEND",
    "amount": 50,
    "sign": 1,
    "description": "Sending credit"
  },
  {
    "transactionID": "y3huwi17",
    "accountID": "60ebd53e2f79311541618bc5",
    "dateTime": "2021-05-23T9:18",
    "type": "FEE",
    "amount": 1,
    "sign": 1,
    "description": "Sending fee"
  },
  {
    "transactionID": "y3huwi17",
    "accountID": "60ebd53e2f79311541618bc5",
    "dateTime": "2021-05-23T9:18",
    "type": "TAX",
    "amount": 0.15,
    "sign": 1,
    "description": "VAT"
  },
  {
    "transactionID": "y3huwi17",
    "accountID": "60ebd53e2f79311541618bc7",
    "dateTime": "2021-05-23T9:18",
    "type": "RECEIVE",
    "amount": 50,
    "sign": -1,
    "description": "Received credit"
  },
  {
    "transactionID": "y3huwi17",
    "accountID": "60ebd53e2f79311541618bc4",
    "dateTime": "2021-05-23T9:18",
    "type": "FEE_REVENUE",
    "amount": 1,
    "sign": -1,
    "description": "Sending fee"
  },
  {
    "transactionID": "y3huwi17",
    "accountID": "60ebd53e2f79311541618b12",
    "dateTime": "2021-05-23T9:18",
    "type": "TAX_ACCOUNT",
    "amount": 0.15,
    "sign": -1,
    "description": "VAT"
  },
  {
    "transactionID": "8q129bib",
    "accountID": "60ebd53e2f79311541618bc6",
    "dateTime": "2021-05-27T11:16",
    "type": "SEND",
    "amount": 100,
    "sign": 1,
    "description": "Sending credit"
  },
  {
    "transactionID": "8q129bib",
    "accountID": "60ebd53e2f79311541618bc6",
    "dateTime": "2021-05-27T11:16",
    "type": "FEE",
    "amount": 1,
    "sign": 1,
    "description": "Sending fee"
  },
  {
    "transactionID": "8q129bib",
    "accountID": "60ebd53e2f79311541618bc6",
    "dateTime": "2021-05-27T11:16",
    "type": "TAX",
    "amount": 0.15,
    "sign": 1,
    "description": "VAT"
  },
  {
    "transactionID": "8q129bib",
    "accountID": "60ebd53e2f79311541618bc7",
    "dateTime": "2021-05-27T11:16",
    "type": "RECEIVE",
    "amount": 100,
    "sign": -1,
    "description": "Received credit"
  },
  {
    "transactionID": "8q129bib",
    "accountID": "60ebd53e2f79311541618bc4",
    "dateTime": "2021-05-27T11:16",
    "type": "FEE_REVENUE",
    "amount": 1,
    "sign": -1,
    "description": "Sending fee"
  },
  {
    "transactionID": "8q129bib",
    "accountID": "60ebd53e2f79311541618b12",
    "dateTime": "2021-05-27T11:16",
    "type": "TAX_ACCOUNT",
    "amount": 0.15,
    "sign": -1,
    "description": "VAT"
  },
  {
    "transactionID": "2dguitrb",
    "accountID": "60ebd53e2f79311541618bc6",
    "dateTime": "2021-06-1T11:12",
    "type": "SEND",
    "amount": 10,
    "sign": 1,
    "description": "Sending credit"
  },
  {
    "transactionID": "2dguitrb",
    "accountID": "60ebd53e2f79311541618bc6",
    "dateTime": "2021-06-1T11:12",
    "type": "FEE",
    "amount": 1,
    "sign": 1,
    "description": "Sending fee"
  },
  {
    "transactionID": "2dguitrb",
    "accountID": "60ebd53e2f79311541618bc6",
    "dateTime": "2021-06-1T11:12",
    "type": "TAX",
    "amount": 0.15,
    "sign": 1,
    "description": "VAT"
  },
  {
    "transactionID": "2dguitrb",
    "accountID": "60ebd53e2f79311541618bc8",
    "dateTime": "2021-06-1T11:12",
    "type": "RECEIVE",
    "amount": 10,
    "sign": -1,
    "description": "Received credit"
  },
  {
    "transactionID": "2dguitrb",
    "accountID": "60ebd53e2f79311541618bc4",
    "dateTime": "2021-06-1T11:12",
    "type": "FEE_REVENUE",
    "amount": 1,
    "sign": -1,
    "description": "Sending fee"
  },
  {
    "transactionID": "2dguitrb",
    "accountID": "60ebd53e2f79311541618b12",
    "dateTime": "2021-06-1T11:12",
    "type": "TAX_ACCOUNT",
    "amount": 0.15,
    "sign": -1,
    "description": "VAT"
  },
  {
    "transactionID": "axu684oc",
    "accountID": "60ebd53e2f79311541618bc8",
    "dateTime": "2021-06-7T9:23",
    "type": "SEND",
    "amount": 10,
    "sign": 1,
    "description": "Sending credit"
  },
  {
    "transactionID": "axu684oc",
    "accountID": "60ebd53e2f79311541618bc8",
    "dateTime": "2021-06-7T9:23",
    "type": "FEE",
    "amount": 1,
    "sign": null,
    "description": "Sending fee"
  },
  {
    "transactionID": "axu684oc",
    "accountID": "60ebd53e2f79311541618bc8",
    "dateTime": "2021-06-7T9:23",
    "type": "TAX",
    "amount": 0.15,
    "sign": null,
    "description": "VAT"
  },
  {
    "transactionID": "axu684oc",
    "accountID": "60ebd53e2f79311541618bc9",
    "dateTime": "2021-06-7T9:23",
    "type": "RECEIVE",
    "amount": 10,
    "sign": -1,
    "description": "Received credit"
  },
  {
    "transactionID": "axu684oc",
    "accountID": "60ebd53e2f79311541618bc4",
    "dateTime": "2021-06-7T9:23",
    "type": "FEE_REVENUE",
    "amount": 1,
    "sign": -1,
    "description": "Sending fee"
  },
  {
    "transactionID": "axu684oc",
    "accountID": "60ebd53e2f79311541618b12",
    "dateTime": "2021-06-7T9:23",
    "type": "TAX_ACCOUNT",
    "amount": 0.15,
    "sign": -1,
    "description": "VAT"
  },
  {
    "transactionID": "8sxoj2yb",
    "accountID": "60ebd53e2f79311541618bc7",
    "dateTime": "2021-06-13T10:13",
    "type": "CONVERT",
    "amount": 50,
    "sign": 1,
    "description": "Conversion of credit"
  },
  {
    "transactionID": "8sxoj2yb",
    "accountID": "60ebd53e2f79311541618bc7",
    "dateTime": "2021-06-13T10:13",
    "type": "FEE",
    "amount": 1,
    "sign": 1,
    "description": "Converting fee"
  },
  {
    "transactionID": "8sxoj2yb",
    "accountID": "60ebd53e2f79311541618bc7",
    "dateTime": "2021-06-13T10:13",
    "type": "TAX",
    "amount": 0.15,
    "sign": 1,
    "description": "VAT"
  },
  {
    "transactionID": "8sxoj2yb",
    "accountID": "60ebd53e2f79311541618bc1",
    "dateTime": "2021-06-13T10:13",
    "type": "AIRTIME",
    "amount": 50,
    "sign": -1,
    "description": "Reduce airtime"
  },
  {
    "transactionID": "8sxoj2yb",
    "accountID": "60ebd53e2f79311541618bc4",
    "dateTime": "2021-06-13T10:13",
    "type": "FEE_REVENUE",
    "amount": 1,
    "sign": -1,
    "description": "Conversion fee"
  },
  {
    "transactionID": "8sxoj2yb",
    "accountID": "60ebd53e2f79311541618b12",
    "dateTime": "2021-06-13T10:13",
    "type": "TAX_ACCOUNT",
    "amount": 0.15,
    "sign": -1,
    "description": "VAT"
  },
  {
    "transactionID": "uydsi7ys",
    "accountID": "60ebd53e2f79311541618bc8",
    "dateTime": "2021-06-18T11:58",
    "type": "SEND",
    "amount": 10,
    "sign": 1,
    "description": "Sending credit"
  },
  {
    "transactionID": "uydsi7ys",
    "accountID": "60ebd53e2f79311541618bc8",
    "dateTime": "2021-06-18T11:58",
    "type": "FEE",
    "amount": 1,
    "sign": 1,
    "description": "Sending fee"
  },
  {
    "transactionID": "uydsi7ys",
    "accountID": "60ebd53e2f79311541618bc8",
    "dateTime": "2021-06-18T11:58",
    "type": "TAX",
    "amount": 0.15,
    "sign": 1,
    "description": "VAT"
  },
  {
    "transactionID": "uydsi7ys",
    "accountID": "60ebd53e2f79311541618b10",
    "dateTime": "2021-06-18T11:58",
    "type": "RECEIVE",
    "amount": 10,
    "sign": -1,
    "description": "Received credit"
  },
  {
    "transactionID": "uydsi7ys",
    "accountID": "60ebd53e2f79311541618bc4",
    "dateTime": "2021-06-18T11:58",
    "type": "FEE_REVENUE",
    "amount": 1,
    "sign": -1,
    "description": "Sending fee"
  },
  {
    "transactionID": "uydsi7ys",
    "accountID": "60ebd53e2f79311541618b12",
    "dateTime": "2021-06-18T11:58",
    "type": "TAX_ACCOUNT",
    "amount": 0.15,
    "sign": -1,
    "description": "VAT"
  },
  {
    "transactionID": "kbml24qg",
    "accountID": "60ebd53e2f79311541618bc8",
    "dateTime": "2021-06-25T17:5",
    "type": "SEND",
    "amount": 10,
    "sign": 1,
    "description": "Sending credit"
  },
  {
    "transactionID": "kbml24qg",
    "accountID": "60ebd53e2f79311541618bc8",
    "dateTime": "2021-06-25T17:5",
    "type": "FEE",
    "amount": 1,
    "sign": 1,
    "description": "Sending fee"
  },
  {
    "transactionID": "kbml24qg",
    "accountID": "60ebd53e2f79311541618bc8",
    "dateTime": "2021-06-25T17:5",
    "type": "TAX",
    "amount": 0.15,
    "sign": 1,
    "description": "VAT"
  },
  {
    "transactionID": "kbml24qg",
    "accountID": "60ebd53e2f79311541618b11",
    "dateTime": "2021-06-25T17:5",
    "type": "RECEIVE",
    "amount": 10,
    "sign": -1,
    "description": "Received credit"
  },
  {
    "transactionID": "kbml24qg",
    "accountID": "60ebd53e2f79311541618bc4",
    "dateTime": "2021-06-25T17:5",
    "type": "FEE_REVENUE",
    "amount": 1,
    "sign": -1,
    "description": "Sending fee"
  },
  {
    "transactionID": "kbml24qg",
    "accountID": "60ebd53e2f79311541618b12",
    "dateTime": "2021-06-25T17:5",
    "type": "TAX_ACCOUNT",
    "amount": 0.15,
    "sign": -1,
    "description": "VAT"
  },
  {
    "transactionID": "4t98mypd",
    "accountID": "60ebd53e2f79311541618bc8",
    "dateTime": "2021-06-30T14:2",
    "type": "CONVERT",
    "amount": 21.15,
    "sign": 1,
    "description": "Conversion of credit"
  },
  {
    "transactionID": "4t98mypd",
    "accountID": "60ebd53e2f79311541618bc8",
    "dateTime": "2021-06-30T14:2",
    "type": "FEE",
    "amount": 1,
    "sign": 1,
    "description": "Conversion fee"
  },
  {
    "transactionID": "4t98mypd",
    "accountID": "60ebd53e2f79311541618bc8",
    "dateTime": "2021-06-30T14:2",
    "type": "TAX",
    "amount": 0.15,
    "sign": 1,
    "description": "VAT"
  },
  {
    "transactionID": "4t98mypd",
    "accountID": "60ebd53e2f79311541618bc1",
    "dateTime": "2021-06-30T14:2",
    "type": "AIRTIME",
    "amount": 20,
    "sign": -1,
    "description": "Reduce airtime"
  },
  {
    "transactionID": "4t98mypd",
    "accountID": "60ebd53e2f79311541618bc4",
    "dateTime": "2021-06-30T14:2",
    "type": "FEE_REVENUE",
    "amount": 1,
    "sign": -1,
    "description": "Conversion fee"
  },
  {
    "transactionID": "4t98mypd",
    "accountID": "60ebd53e2f79311541618b12",
    "dateTime": "2021-06-30T14:2",
    "type": "TAX_ACCOUNT",
    "amount": 0.15,
    "sign": -1,
    "description": "VAT"
  },
  {
    "transactionID": "r5gnb2ic",
    "accountID": "60ebd53e2f79311541618b10",
    "dateTime": "2021-07-8T14:49",
    "type": "CONVERT",
    "amount": 6.15,
    "sign": 1,
    "description": "Conversion of credit"
  },
  {
    "transactionID": "r5gnb2ic",
    "accountID": "60ebd53e2f79311541618b10",
    "dateTime": "2021-07-8T14:49",
    "type": "FEE",
    "amount": 1,
    "sign": 1,
    "description": "Conversion fee"
  },
  {
    "transactionID": "r5gnb2ic",
    "accountID": "60ebd53e2f79311541618b10",
    "dateTime": "2021-07-8T14:49",
    "type": "TAX",
    "amount": 0.15,
    "sign": 1,
    "description": "VAT"
  },
  {
    "transactionID": "r5gnb2ic",
    "accountID": "60ebd53e2f79311541618bc1",
    "dateTime": "2021-07-8T14:49",
    "type": "AIRTIME",
    "amount": 5,
    "sign": -1,
    "description": "Reduce airtime"
  },
  {
    "transactionID": "r5gnb2ic",
    "accountID": "60ebd53e2f79311541618bc4",
    "dateTime": "2021-07-8T14:49",
    "type": "FEE_REVENUE",
    "amount": 1,
    "sign": -1,
    "description": "Conversion fee"
  },
  {
    "transactionID": "r5gnb2ic",
    "accountID": "60ebd53e2f79311541618b12",
    "dateTime": "2021-07-8T14:49",
    "type": "TAX_ACCOUNT",
    "amount": 0.15,
    "sign": -1,
    "description": "VAT"
  }
 ];