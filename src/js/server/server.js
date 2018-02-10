import axios from 'axios';
import querystring from 'querystring';

const serverURLRoot= "";

export function fetchAccessToken(code) {
    const serverURL = serverURLRoot +"/auth/fetchAccessToken";
    const data = { code };
    return axios.post(serverURL, querystring.stringify(data));
}

export function getAuthorizationURL() {
    const serverURL = serverURLRoot + "/auth/getAuthorizationURL";
    return axios.get(serverURL);
}

export function textSearch(query) {
    const serverURL = serverURLRoot + "/search";
    const data = { query };
    return axios.post(serverURL, querystring.stringify(data));
    
}