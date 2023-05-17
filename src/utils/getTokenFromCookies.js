export const getTokenFromCookies = () => {
    const cookie =  document.cookie;
    if (cookie) {
        return cookie.split('; ')
            .find(e => e.startsWith('Token'))
            .split('=')[1]
    } else {
        return undefined;
    }
}
