const schedule = require('node-schedule');

/**
 * a minute
 */
exports.oneMinuteJob = schedule.scheduleJob('*/1 * * * *', async function(){
  console.log('one minute excute!');
});

/**
 * 10 minute
 */
exports.tenMinuteJob = schedule.scheduleJob('*/10 * * * *', async function(){
    console.log('ten minute excute!');
});