export const fixUrl = url => {
    const fixedUrl = url.replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>');
    return fixedUrl;
}

export const convertUnixIntoDate = unix => {
    const nowDate = new Date();
    const date = new Date(unix * 1000);

    const difference = nowDate.getTime() - date.getTime();
    const differenceInDays = Math.floor(difference / (1000 * 60 * 60 * 24));
    const differenceInHours = Math.floor(difference / (1000 * 60 * 60));
    const differenceInMinutes = Math.floor(difference / (1000 * 60));
    const differenceInSeconds = Math.floor(difference / 1000);

    const result = differenceInDays > 0 ? `${differenceInDays} days ago`
                 : differenceInHours > 0 ? `${differenceInHours} hours ago`
                 : differenceInMinutes > 0 ? `${differenceInMinutes} minutes ago`
                 : `${differenceInSeconds} seconds ago`;

    return result;
}

export const shortenNumbers = num => {
    const units = ['k', 'M', 'B'];

    for (let i = units.length; i > 0; i--) {
        const decimal = 1000 ** i;

        if(num > decimal)
        {
            const string = +(num/decimal).toString().slice(0, ((-2*i)-(i-1)));
            return string + units[i-1];

            // const roundNum = +(num/decimal).toFixed(1);
            // if(roundNum === 1000)
            //     return `${roundNum/1000}${units[i]}`

            // return `${+(num/decimal).toFixed(1)}${units[i-1]}`;
        }
        else if(num === decimal) {
            return `${(num/decimal)}${units[i-1]}`
        }
    }

    return num;
}