// @ts-nocheck
global.fetch = require('jest-fetch-mock');

require("regenerator-runtime/runtime");

window.currency = require('../../public/external/currency.min');

window.$ = require('../../node_modules/jquery/dist/jquery.slim');
window.jQuery = window.$;