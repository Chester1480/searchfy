const config = require('config');
const clientId = config.get('spotify').clientId;
const clientSecret = config.get('spotify').clientSecret;
const axios = require('axios');
const qs = require('qs');

const contryCode = {
    JP: "JP",
    TW: "TW",
    US: "US"
}

const getToken = async () => {
    const url = 'https://accounts.spotify.com/api/token';
    const data = qs.stringify({'grant_type':'client_credentials'});
    const token = Buffer.from(`${clientId}:${clientSecret}`, 'utf-8').toString('base64');

    const headers = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${token}`
        }
    };
    const response = await axios.post(
        url,
        data,
        headers
    );
    return response.data.access_token;
}

exports.search = async (parameters) => {
    const { q , type , limit,  offset } = parameters;
    const token = await getToken();
    //market
    const url = 'https://api.spotify.com/v1/search';
    const params = {
        q,
        type, 
        limit, 
        offset,
        include_external:"audio"
    }

    const result = await axios.get(url, {
            params,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
    })
    const response = {
        totalCount:result.data.total,
        data:result.data
    }
    return response;
}


exports.newReleases = async (parameters) => {
    const { countryCode, limit, offset } = parameters;
    const token = await getToken();

    const url = 'https://api.spotify.com/v1/browse/new-releases';
    if (!countryCode) {
        countryCode = contryCode.US;
    }

    const params = {
        countryCode,
        limit, 
        offset
    }
    const result = await axios.get(url, {
        params,
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    })
    return result.data;
}