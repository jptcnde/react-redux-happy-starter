
import {API_URL} from '../constants/resources'
export default function callApi(args, method = 'get', body) {

  let opts = {
    endpoint : '',
    headers: { 'content-type': 'application/json' },
    method,
    body: JSON.stringify(body)
  };
  if (typeof args === 'string') {
    opts.endpoint = args;
  }

  if (({}).toString.call(args) === '[object Object]') {
    args = Object.assign({}, opts, args, {
      method : args.method || method
    });
  }
  return fetch(`${API_URL}/${args.endpoint}`, args)
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }
    const camelizedJson = camelizeKeys(json);
    // if (!args.schema) {
    //   return Object.assign({}, normalize(camelizedJson, args.schema));
    // }
    return camelizedJson;
  })
}


