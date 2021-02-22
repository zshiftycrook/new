'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */
function getRoom(data){
    return (strapi.query('Room').find({id: data})) // check for a solution for the whole run
   }
function getCusomer(data){
    return (strapi.query('Customer').find({id: data.customer}))
}

async function checkerented (data){
    var x = await getRoom(data)
    //console.log(x[0].status)
 if (x[0].status == 'Rented'){
     console.log("**************")
     return false;
 }
 else {
     return true;
 }
}
async function checkestatus(data){
    console.log(data.customer)
    var x = await getCusomer(data);
    console.log(x[0].Status)
    
    if(x[0].Status == 'Suspended')
    {
        
        console.log("suspende")
        return false;
    }
    else
    {
        return true;
    }
}
function checkDate(ends,starts){
    const dateFromAPI = ends;
      const now = starts;
      const datefromAPITimeStamp = (new Date(dateFromAPI)).getTime();
      const nowTimeStamp = (new Date(now)).getTime();
      const microSecondsDiff = Math.abs(datefromAPITimeStamp - nowTimeStamp);
      
      // Math.round is used instead of Math.floor to account for certain DST cases
      // Number of milliseconds per day =
      //   24 hrs/day * 60 minutes/hour * 60 seconds/minute * 1000 ms/second
      const daysDiff = Math.round(microSecondsDiff / (1000 * 60 * 60  * 24));
     
      if (datefromAPITimeStamp < nowTimeStamp) {
        return true;
      }
      else 
      {return false}
  
  }
module.exports = {
  
    lifecycles:{
        async beforeCreate(data){
            var x =await checkerented(data.room)
           if (x){ //if it is rented
                //console.log(data)
                var y=await(checkDate(data.ends,data.starting))
                if(y){ //if the end is greater than starting
                    throw new Error('Date is not properly inputeed')
                }
                var j= await(checkestatus(data))
                if(!j){
                    throw new Error('Customer Has been suspended')
                }
                else{
                    strapi.query('Customer').update(
                        {id: data.customer},
                        {
                          Status: 'Active'
                        })

                }
            }
            else {
                throw new Error('Room is Rented');
            }
          
        } , 
    
        async afterCreate(results){
            console.log(results.room.id)
            strapi.query('Room').update(
                {id: results.room.id},
                {
                  status: 'Rented'
                })
        }
    }
};
