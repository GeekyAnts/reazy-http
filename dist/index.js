'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return function (serviceName) {
    var app = this;

    var setDefaultHeaders = function setDefaultHeaders(headers) {
      console.log('headers', headers);
      var newHeaders = _lodash2.default.merge({}, app.get([serviceName, 'defaultRequestHeaders']), headers);
      console.log('newHeaders', newHeaders);
      app.set([serviceName, 'defaultRequestHeaders'], newHeaders);
    };

    var request = function request() {
      for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }

      var requestHeaders = _lodash2.default.merge({}, app.get([serviceName, 'defaultRequestHeaders']), _lodash2.default.get(params, [1, 'headers'], {}));

      console.log('requestHeaders', requestHeaders);

      _lodash2.default.set(params, [1, 'headers'], requestHeaders);

      return fetch.apply(undefined, params);
    };

    var httpService = {
      setDefaultHeaders: setDefaultHeaders,
      request: request
    };

    app.set(serviceName, httpService);

    return httpService;
  };
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }