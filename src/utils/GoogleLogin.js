export const b64url = (arrayBuffer) =>
    btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

export const randomVerifier = (len = 64) => {
    const bytes = crypto.getRandomValues(new Uint8Array(len));
    return b64url(bytes.buffer); // base64url 문자열 (A–Z a–z 0–9 - _ . ~ 포함)
};

export const makeCenteredFeatures = (w = 500, h = 600) => {
    const y = window.top.outerHeight / 2 + window.top.screenY - h / 2;
    const x = window.top.outerWidth / 2 + window.top.screenX - w / 2;
    return `popup=yes,width=${w},height=${h},top=${Math.max(0, y)},left=${Math.max(0, x)}`;
};
