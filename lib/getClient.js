'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getClient = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getClient = exports.getClient = function getClient(configs, action) {
  var config = configs[action.payload && action.payload.client ? action.payload.client : 'default'];

  return { client: _axios2.default.create(config.axios), providedOptions: config.options };
};