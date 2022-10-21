const utils = require('./utils');

test('gets time difference between a timestamp and the current time', () => {
    const currentTime = new Date();

    const minusTwoDays = Math.floor(currentTime.getTime() / 1000) - 172800; //Current time minus 2 days
    const minusFiveHours = Math.floor(currentTime.getTime() / 1000) - 18000; //Current time minus 5 hours
    const minusTenMinutes = Math.floor(currentTime.getTime() / 1000) - 600; //Current time minus 10 minutes
    const minusThirtySeconds = Math.floor(currentTime.getTime() / 1000) - 30; //Current time minus 30 seconds

    expect(utils.convertUnixIntoDate(minusTwoDays)).toEqual('2 days ago');
    expect(utils.convertUnixIntoDate(minusFiveHours)).toEqual('5 hours ago');
    expect(utils.convertUnixIntoDate(minusTenMinutes)).toEqual('10 minutes ago');
    expect(utils.convertUnixIntoDate(minusThirtySeconds)).toEqual('30 seconds ago');
})