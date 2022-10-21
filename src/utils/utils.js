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