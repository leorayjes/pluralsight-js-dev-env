/* Used in webpack production build only. This separate bundle for vendor code is useful
because it is unlikely to change as often as the application's code. All referenced libraries will be written to
vendor.js. WGeb any piece of code is changed, only vendor.js will need to be downloaded (instead of a huge js file.)*/

/* eslint-disable no-unused-vars */

import fetch from 'whatwg-fetch';
