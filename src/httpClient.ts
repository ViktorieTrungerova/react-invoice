import request from "superagent";

export default class HttpClient {

    baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    /**
     * Send http request by method GET
     * @param {string} url
     * @param {object} args
     * @returns {Promise}
     */
    sendGetRequest(url, args) {
        let self = this;
        return new Promise(function (reseolve, reject) {
            request
                .get(self.baseUrl + url)
                .query(args)
                .then(function (response) {
                    if (response.statusCode === 200) reseolve(JSON.parse(response.text));
                    else reject();
                });

        });
    }
    /**
     * Send http request by method POST
     * @param {string} url
     * @param {object} args
     * @returns {Promise}
     */
    sendPostRequest(url, args) {
        let self = this;
        return new Promise(function (reseolve, reject) {
            request
                .post(self.baseUrl + url)
                .query(args)
                .set('Content-Type', 'application/json')
                .then(function (response) {
                    if (response.statusCode === 200) reseolve(JSON.parse(response.text));
                    else reject();
                });

        });
    }
}
