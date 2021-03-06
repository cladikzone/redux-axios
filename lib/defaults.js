'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onComplete = exports.onError = exports.onSuccess = exports.getRequestConfig = exports.isAxiosRequest = exports.returnRejectedPromiseOnError = undefined;

var _getActionTypes = require('./getActionTypes');

var returnRejectedPromiseOnError = exports.returnRejectedPromiseOnError = false;

var isAxiosRequest = exports.isAxiosRequest = function isAxiosRequest(action) {
  return action.payload && action.payload.request;
};

var getRequestConfig = exports.getRequestConfig = function getRequestConfig(action) {
  return action.payload.request;
};

var onSuccess = exports.onSuccess = function onSuccess(_ref, options) {
  var action = _ref.action,
      next = _ref.next,
      response = _ref.response;

  var nextAction = {
    type: (0, _getActionTypes.getActionTypes)(action, options)[1],
    payload: response,
    meta: {
      previousAction: action
    }
  };
  next(nextAction);
  return nextAction;
};

var onError = exports.onError = function onError(_ref2, options) {
  var action = _ref2.action,
      next = _ref2.next,
      error = _ref2.error;

  var errorObject = void 0;
  if (error instanceof Error) {
    errorObject = {
      data: error.message,
      status: 0
    };
    if (process.env.NODE_ENV !== 'production') {
      console.log('HTTP Failure in Axios', error);
    }
  } else {
    errorObject = error;
  }
  var nextAction = {
    type: (0, _getActionTypes.getActionTypes)(action, options)[2],
    error: errorObject,
    meta: {
      previousAction: action
    }
  };

  next(nextAction);
  return nextAction;
};

var onComplete = exports.onComplete = function onComplete() {};