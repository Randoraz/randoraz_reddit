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
});

test('formats the number according to its value', () => {
    const num1 = 0;
    const num2 = 1;
    const num3 = 999;
    const num4 = 1000;
    const num5 = 1001;
    const num6 = 1501;
    const num7 = 999999;
    const num8 = 1000000;
    const num9 = 1500001;
    const num10 = 999999999;
    const num11 = 1000000000;
    const num12 = 999999999999;

    expect(utils.shortenNumbers(num1)).toEqual(0);
    expect(utils.shortenNumbers(num2)).toEqual(1);
    expect(utils.shortenNumbers(num3)).toEqual(999);
    expect(utils.shortenNumbers(num4)).toEqual('1k');
    expect(utils.shortenNumbers(num5)).toEqual('1k');
    expect(utils.shortenNumbers(num6)).toEqual('1.5k');
    expect(utils.shortenNumbers(num7)).toEqual('999.9k');
    expect(utils.shortenNumbers(num8)).toEqual('1M');
    expect(utils.shortenNumbers(num9)).toEqual('1.5M');
    expect(utils.shortenNumbers(num10)).toEqual('999.9M');
    expect(utils.shortenNumbers(num11)).toEqual('1B');
    expect(utils.shortenNumbers(num12)).toEqual('999.9B');
    
})