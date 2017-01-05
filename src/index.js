import _ from 'lodash';

export default function() {
  return function(serviceName) {
    const app = this;

    const setDefaultHeaders = (headers) => {
      console.log('headers', headers);
      const newHeaders = _.merge({}, app.get([serviceName, 'defaultRequestHeaders']), headers);
      console.log('newHeaders', newHeaders);
      app.set([serviceName, 'defaultRequestHeaders'], newHeaders);
    }

    const request = (...params) => {
      const requestHeaders = _.merge(
        {},
        app.get([serviceName, 'defaultRequestHeaders']),
        _.get(params, [1, 'headers'], {})
      );

      console.log('requestHeaders', requestHeaders);

      _.set(params, [1, 'headers'], requestHeaders);

      return fetch(...params);
    }

    const httpService = {
      setDefaultHeaders,
      request
    }

    app.set(serviceName, httpService);

    return httpService;

  };
}
