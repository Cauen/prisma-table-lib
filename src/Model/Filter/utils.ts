export function setGetParam(key: string, value: string) {
    if (!!history.pushState) {
        var params = new URLSearchParams(window.location.search);
        params.set(key, value);
        var newUrl =
            window.location.origin +
            window.location.pathname +
            "?" +
            params.toString();
        window.history.pushState({ path: newUrl }, "", newUrl);
    }
}