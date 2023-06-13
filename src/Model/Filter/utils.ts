export function setGetParam(key: string, value: string) {
    if (typeof history.pushState !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        params.set(key, value);
        const newUrl =
            window.location.origin +
            window.location.pathname +
            "?" +
            params.toString();
        window.history.pushState({ path: newUrl }, "", newUrl);
    }
}