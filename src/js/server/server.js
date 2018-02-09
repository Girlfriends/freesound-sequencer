import axios from 'axios';
import querystring from 'querystring';

const serverURLRoot= "http://localhost:8080"

export function fetchAccessToken(code) {
    const serverURL = serverURLRoot +"/auth/fetchAccessToken";
    const data = { code };
    return axios.post(serverURL, querystring.stringify(data));
}

export function getAuthorizationURL() {
    const serverURL = serverURLRoot + "/auth/getAuthorizationURL";
    return axios.get(serverURL);
}