# Read Me

<img alt="Waterford Institute of Technology" width="30%" height="30%" src="https://github.com/telephant-co-za/telephant-api/blob/1db76d351260cac7c2a7e33e305c8e1705c04cb0/README/img/wit-logo.jpeg">

<table>
   <tbody>
      <tr>
         <th>
            Name
         </th>
         <td>
            Warren Byron
         </td>
      </tr>
      <tr>
         <th>
            Student Number
         </th>
         <td>
            W20091892
         </td>
      </tr>
      <tr>
         <th>
            Course Code
         </th>
         <td>
            WD571
         </td>
      </tr>
      <tr>
         <th>
            Course
         </th>
         <td>
            Masters of Science in Computing (Enterprise Software Systems)
         </td>
      </tr>
      <tr>
         <th>
            Module Code
         </th>
         <td>
            A13886
         </td>
      </tr>
      <tr>
         <th>
            Module Name
         </th>
         <td>
            Enterprise Web Development
         </td>
      </tr>
      <tr>
         <th>
            Document
         </th>
         <td>
            Continuous Assessment Assignment #2
         </td>
      </tr>
      <tr>
         <th>
            Title
         </th>
         <td>
            Telephant : Application Programming Interface
         </td>
      </tr>
      <tr>
         <th>
            Date
         </th>
         <td>
            &nbsp;
         </td>
      </tr>
      <tr>
         <th>
            Facilitator
         </th>
         <td>
            Frank Walsh
         </td>
      </tr>
   </tbody>
</table>

# Telephant API

## Table of Contents

* Introduction
* Work Carried Out
* Delivarables
* Properties

## Introduction

### Context
In South Africa, between 20 and 22 million individuals use smartphones, accounting for roughly one-third of the population. However, with more than 90 million mobile connections, the aggregate number of connections is substantially larger, as dual SIM phones are popular and widely utilized in the country and across the continent.  A significant proportion of users are using the prepaid model to access voice and data services.   The prepaid model is colloquially known as *pay-as-you-go*.  As adoption of mobile phones and data apps have increased revenues have reflected the growth.  Prepaid mobile data income has expanded rapidly in South Africa, more than tripling from 2015 to 2020, reaching around 2.1 billion US dollars in 2020, and surpassing prepaid mobile voice revenue for the first time during this period.

### Situation
Uber, Uber Eats, Taxify, Mr Delivery, and Take-a-Lot, among other companies, have created a considerable number of job opportunities for drivers. Large fleets of delivery drivers on motorcycles and taxi drivers are on the road 24 hours a day, seven days a week. To use these applications, they need data, and they collectively spend millions of Rand per month on data.  Meanwhile, communication apps such as WhatsApp, Telegram, and Viber are widely utilized because they save money on cell phone calls, which are pricey per minute, and since these communication apps use relatively little inexpensive data to make calls, send messages and media. The cost of a call over data is unaffected by whether calls, messages, or media are sent abroad or locally, which is enticing to a population like that found in cities like Johannesburg, where migrant workers come from all across Africa to work.

<img alt="Dr Delivery driver." width="50%" height="50%" src="https://github.com/telephant-co-za/telephant-api/blob/746e74e0cb1f681b449b7d89dc88f8aee51d01a4/README/img/6.jpeg">

<img alt="Uber driver." width="50%" height="50%" src="https://github.com/telephant-co-za/telephant-api/blob/746e74e0cb1f681b449b7d89dc88f8aee51d01a4/README/img/5.jpeg">

### Problem
Many people may not have access to internet hotspots in their homes, and they may not have access to free wifi in and around the city at cafes or restaurants, as they do in Europe and America. It has been my observation that in order to obtain pre-paid data, a user must visit a large retail outlet such as Checkers, Pick n Pay, or a petrol station. Users often only buy airtime in modest amounts, such as R5.00.  Buying airtime is an extremely inefficient and costly endeavor, as a trip to the mall or the CBD can easily cost R20.00 by taxi.

<img alt="Retail shoping mall." width="50%" height="50%" src="https://github.com/telephant-co-za/telephant-api/blob/746e74e0cb1f681b449b7d89dc88f8aee51d01a4/README/img/4.jpeg">

<img alt="Taxi rank." width="50%" height="50%" src="https://github.com/telephant-co-za/telephant-api/blob/746e74e0cb1f681b449b7d89dc88f8aee51d01a4/README/img/2.jpeg">

### Opportunity
I became aware that developers can utilize Africa's Talking's API to create apps that send airtime to phones. The company offers this service on major cell phone networks in numerous African nations, including South Africa.  To assist *prepaid* customers in overcoming the difficulties of getting airtime I have set out to to create a web app to assist and find opportunity in solving the following potential use cases:

### Use Cases

#### Airtime Vendors
Vendors will be able to send clients airtime via the app. As a result, the vendor will give airtime in exchange for cash; this will save the Uber Delivery driver time because he will not have to go to a retail store to acquire airtime before his shift. He'll buy it from airtime sellers who meet them in the parking lots of restaurants.  This expands the ecosystem of the burgeoning sharing economy's opportunities and serves as a point of entry and exit for liquid assets into and out of the broader system.

<img alt="Street vendor" width="50%" height="50%" src="https://github.com/telephant-co-za/telephant-api/blob/746e74e0cb1f681b449b7d89dc88f8aee51d01a4/README/img/1.jpeg">

#### Informal Traders and Spaza Shops (i.e. localised retailers)**
In every neighborhood and township across the city are street vendors and spaza shops.  These vendors are generally very close to where consumers work, live or travel.  Unlike huge retail enterprises, which have vast IT systems to manage, control, and supply airtime and may interface directly into mobile networks, these mall shops will be able to buy, sell, control, manage, and issue airtime using only a mobile app or a USSD interface, thanks to the Telephant app.  Despite the low margins on air time, the vendor will find a method to attract customers, while the consumer will gain from the convenience.It also gives the informal trader a cash management mechanism in a world where street crime is a major concern.

<img alt="Spaza shop." width="50%" height="50%" src="https://github.com/telephant-co-za/telephant-api/blob/746e74e0cb1f681b449b7d89dc88f8aee51d01a4/README/img/3.jpeg">

#### Employers
Employers require air time to communicate with their staff. Domestic helpers in South Africa, for example, assist with laundry, washing, gardening, construction/painting, and other duties. Many households may use the app to provide airtime to their domestic workers as part of their wage and to keep in contact with them.  Larger businesses could utilize the Telephant API to connect their payroll, tax, and ERP systems to the service. This will enable these businesses to grant monthly airtime allocations to their employees.  Companies often do not provide wifi or cell phone contracts to all employees; only white collar workers receive these benefits. However, with remote work during the pandemic, many types of business communication, meeting, support, customer engagement, chats, and company messages are accessed via digital channels; however, denying airtime data to all workers is clearly a discriminatory labor practice.

#### Banking
In South Africa, there are a huge number of people who are *"unbankable."* The main reason for this is that the cost of opening and keeping a bank account is disproportionately expensive in comparison to income. People can share *"credit"* on the app and receive some form of transactional banking services as a result of using it.  The app's credit could begin to have the same utility as a currency. As an illustration, oftentimes if you buy a piece of fruit from a street vendor say for 80c and you need 20c in change, you may get your change in the form of sweets (Chappies chewing gums). Among informal traders, Chappies chewing gum has practically become a type of cash for small denominations of currency. Similarly, the liquidity of the system will be equal to its utility. People need airtime and data, and they'll be able to send it in little amounts because of the low transaction fees, effectively turning the app's credit into a cash substitute at the grassroots, micro level. As cash reserves increase additional services can be incorporated.

### Conclusion
As a result of this assignment the Telephant App is available to be launched as a beta version. The project aimed to match the specification of the Enterprise Web Development assignment  while also serving as a proof of concept that may be turned into a live app and pitched to investors. I believe that an app like this would be extremely beneficial to the communities it wants to serve and future enhancements and ideas are listed.

### Sources

https://africabusinesscommunities.com/news/government-formalises-spaza-shops-in-south-africa/

https://www.diamondpavilion.co.za/

https://www.farmersweekly.co.za/agri-news/south-africa/locked-out-of-livelihoods-women-struggle-to-feed-families/attachment/female-hawker-johannesburg_02/

https://theconversation.com/cape-towns-taxi-violence-is-rooted-in-attempts-to-govern-competition-114936

https://www.reuters.com/article/us-safrica-retail-spaza-idUSBREA3J06420140420

https://www.statista.com/statistics/1074337/south-africa-prepaid-mobile-revenue-by-segment/

https://www.statista.com/statistics/488376/forecast-of-smartphone-users-in-south-africa/

https://www.svcapital.co.za/product-page/delivery-bike

https://www.voanews.com/africa/uber-struggles-spreads-africa