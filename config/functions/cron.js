'use strict';

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/concepts/configurations.html#cron-tasks
 */
function dateDiff(ends){
  const dateFromAPI = ends;
    const now = new Date();
    const datefromAPITimeStamp = (new Date(dateFromAPI)).getTime();
    const nowTimeStamp = now.getTime();
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
function checkRental(){
 return (strapi.query('Rental').find({})) // check for a solution for the whole run
}

module.exports =  {
  /**
   * Simple example.
   * Every monday at 1am.
   */
 
  '* */24 * * *': async() => { //every 24 hours
    console.log('Daily Rental Check')
      var x = await checkRental();
     for (var i =0;x[i]!=undefined;i++){
       if(await dateDiff(x[i].ends)){ // if the date is less than 0
        strapi.query('Room').update(
          {id: x[i].room.id},
          {
            status: 'Available'
          })
          strapi.query('Rental').update(
            {id: x[i].id},
            {
              passed: true
            }
          )
       }
       
      
     }
  }
  
};
