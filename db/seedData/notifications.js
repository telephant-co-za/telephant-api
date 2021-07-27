// Notifcations intersect with to Contacts and Transacrions

const mongoose = require('mongoose');

const a = mongoose.Types.ObjectId('60ebd53e2f79311541619554');

export const notifications = 
[
    {
      "dateTime": "2021-05-05T14:12",
      "subject": "Top Up",
      "message": "You deposited R 500 into your telphant account.",
      "read": false,
      "type": "INFO",
      "owner": "27829524031",
      "link": "8he49vuc",
      "_id": a
    },
    {
      "dateTime": "2021-05-05T14:12",
      "subject": "Top Up",
      "message": "You deposited R 50 into your telphant account.",
      "read": false,
      "type": "INFO",
      "owner": "27829524032",
      "link": "khm6yoax"
    },
    {
      "dateTime": "2021-05-11T18:55",
      "subject": "Top Up",
      "message": "You deposited R 1500 into your telphant account.",
      "read": false,
      "type": "INFO",
      "owner": "my-business-1",
      "link": "3zm9e5o5"
    },
    {
      "dateTime": "2021-05-13T05:27",
      "subject": "Top Up",
      "message": "You deposited R 1500 into your telphant account.",
      "read": false,
      "type": "INFO",
      "owner": "27829524033",
      "link": "prq10vg0"
    },
    {
      "dateTime": "2021-05-17T13:45",
      "subject": "Sent",
      "message": "You sent Cobello R 10",
      "read": false,
      "type": "INFO",
      "owner": "27829524033",
      "link": "4g7hcv7"
    },
    {
      "dateTime": "2021-05-17T13:45",
      "subject": "Received",
      "message": "You received R 10 from Barclay Gammill",
      "read": false,
      "type": "INFO",
      "owner": "27829524031",
      "link": "4g7hcv7"
    },
    {
      "dateTime": "2021-05-23T09:18",
      "subject": "Sent",
      "message": "You sent Napoleon R 50",
      "read": false,
      "type": "INFO",
      "owner": "my-business-1",
      "link": "y3huwi17"
    },
    {
      "dateTime": "2021-05-23T09:18",
      "subject": "Received",
      "message": "You received R 50 from My_Business_1",
      "read": false,
      "type": "INFO",
      "owner": "27829524032",
      "link": "y3huwi17"
    },
    {
      "dateTime": "2021-05-27T11:16",
      "subject": "Sent",
      "message": "You sent Napoleon R 100",
      "read": false,
      "type": "INFO",
      "owner": "27829524031",
      "link": "8q129bib"
    },
    {
      "dateTime": "2021-05-27T11:16",
      "subject": "Received",
      "message": "You received R 100 from Fleming",
      "read": false,
      "type": "INFO",
      "owner": "27829524032",
      "link": "8q129bib"
    },
    {
      "dateTime": "2021-06-01T11:12",
      "subject": "Sent",
      "message": "You sent Barclay Gammill R 10",
      "read": false,
      "type": "INFO",
      "owner": "27829524031",
      "link": "2dguitrb"
    },
    {
      "dateTime": "2021-06-01T11:12",
      "subject": "Received",
      "message": "You received R 10 from Cobello",
      "read": false,
      "type": "INFO",
      "owner": "27829524033",
      "link": "2dguitrb"
    },
    {
      "dateTime": "2021-06-07T09:23",
      "subject": "Sent",
      "message": "You sent Carine Rablen R 10",
      "read": false,
      "type": "INFO",
      "owner": "27829524033",
      "link": "axu684oc"
    },
    {
      "dateTime": "2021-06-07T09:23",
      "subject": "Received",
      "message": "You received R 10 from Barclay Gammill",
      "read": false,
      "type": "INFO",
      "owner": "27829524034",
      "link": "axu684oc"
    },
    {
      "dateTime": "2021-06-13T10:13",
      "subject": "Converted",
      "message": "You converted R 50 credit",
      "read": false,
      "type": "INFO",
      "owner": "27829524032",
      "link": "8sxoj2yb"
    },
    {
      "dateTime": "2021-06-18T11:58",
      "subject": "Sent",
      "message": "You sent Kidston R 10",
      "read": false,
      "type": "INFO",
      "owner": "27829524033",
      "link": "uydsi7ys"
    },
    {
      "dateTime": "2021-06-18T11:58",
      "subject": "Received",
      "message": "You received R 10 from Barclay Gammill",
      "read": false,
      "type": "INFO",
      "owner": "27829524035",
      "link": "uydsi7ys"
    },
    {
      "dateTime": "2021-06-25T17:50",
      "subject": "Sent",
      "message": "You sent Marcos Ranner R 10",
      "read": false,
      "type": "INFO",
      "owner": "27829524033",
      "link": "kbml24qg"
    },
    {
      "dateTime": "2021-06-25T17:50",
      "subject": "Received",
      "message": "You received R 10 from Barclay Gammill",
      "read": false,
      "type": "INFO",
      "owner": "27829524036",
      "link": "kbml24qg"
    },
    {
      "dateTime": "2021-06-30T14:20",
      "subject": "Converted",
      "message": "You converted R 20 credit",
      "read": false,
      "type": "INFO",
      "owner": "27829524033",
      "link": "4t98mypd"
    },
    {
      "dateTime": "2021-07-08T14:49",
      "subject": "Converted",
      "message": "You converted R 5 credit",
      "read": false,
      "type": "INFO",
      "owner": "27829524035",
      "link": "r5gnb2ic"
    }
   ];