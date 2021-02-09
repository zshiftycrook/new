'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

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
      console.log(datefromAPITimeStamp)
      console.log(nowTimeStamp)
      if (datefromAPITimeStamp < nowTimeStamp) {
        return true;
      }
      else 
      {return false}
  
  }
  function getPayment(Data){
      console.log(Data.rental)
    return (strapi.query('Payment').find({_sort: 'ends:desc' }));
 }
module.exports = {
    lifecycles:{
        
        async beforeCreate(data){
            var x=await(checkDate(data.ends,data.starting))
            if(x){ //if the end is greater than starting
                throw new Error('Date is not properly inputeed')
            }

            // compare the dates
            var payment = await getPayment(data)
            console.log (payment[0])
            for (var i=0;payment[i]!=undefined;i++){
                if (data.rental == payment[i].rental.id )
            {
                console.log(i)
                var x=await(checkDate(data.starting,payment[i].ends))
                if(x){ //if the end is greater than starting
                    //console.log (strapi.query('Payment').find({id_nin, _sort: 'ends:desc' },[room]));
    
                    throw new Error('Please change the starting date')
                }

            }
            
            
        }
            
            
        },
        
    }
};
