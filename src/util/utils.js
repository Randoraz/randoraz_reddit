export const fixUrl = url => {
    const fixedUrl = url.replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>');
    return fixedUrl;
}