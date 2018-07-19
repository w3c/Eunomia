/**
 * @file Handle timezones
 * @author Antonio Olmo Titos <antonio@w3.org>
 * @exports lib/timezones
 */

// External packages:
const MOMENT_TIMEZONE = require('moment-timezone');

// Internal packages:
const LOGGING = require('./logging'),
    UTIL = require('./util');

// Constants:
const // REGEX_TZ_CODE = /^[A-Z]{2,4}$/,
    REGEX_TZ_CONTINENT_AND_COUNTRY = /^[^/]+\/[^/]+$/,
    REGEX_REPLACE_DASHES = /_/gi,
    FORMAT_DATETIME = 'ddd, D MMM Y, H:mm';

// Variables:
var zones;

/**
 * Set up timezones
 */

const setUp = function() {
    if (zones)
        LOGGING.warn(`“timezones.setUp()” called more than once`);
    else {
        zones = MOMENT_TIMEZONE.tz.names();
        const // codes = zones.filter(v => { return v.match(REGEX_TZ_CODE); }),
            continentAndCountry = zones.filter(function(v) {
                return v.match(REGEX_TZ_CONTINENT_AND_COUNTRY);
            }),
            // others = zones.filter(v => { return !v.match(REGEX_TZ_CODE) && !v.match(REGEX_TZ_CONTINENT_AND_COUNTRY); }),
            continents = {UTC: {UTC: 'UTC/UTC'}};
        continentAndCountry.forEach(function(i) {
            const p = i.replace(REGEX_REPLACE_DASHES, '&nbsp;').split('/');
            if ('Etc' !== p[0]) {
                if (!continents.hasOwnProperty(p[0]))
                    continents[p[0]] = {};
                if (!continents[p[0]].hasOwnProperty(p[1]))
                    continents[p[0]][p[1]] = i;
            }
        });
        // Export more stuff:
        // exports.tzCodes = codes;
        exports.tzContinents = continents;
        // exports.tzOthers = others;
        exports.timezoneExists = timezoneExists;
        exports.processTimezone = processTimezone;
        exports.shiftTime = shiftTime;
    }
};

/**
 * Check if a string corresponds to a known timezone
 * @param {String} tz - the string
 * @returns {Boolean} whether it's a valid timezone
 */

const timezoneExists = function(tz) {
    return zones.includes(tz);
};

/**
 * @TODO: Document this.
 */

const processTimezone = function(data) {
    const correctedTimezone = 'UTC/UTC' === data.tz ? 'UTC' : data.tz;
    const m = new MOMENT_TIMEZONE().tz(correctedTimezone),
        abbrs = m._z.abbrs,
        offset = m._offset;
    LOGGING.dir(m);
    data.time = m.tz(correctedTimezone).format(FORMAT_DATETIME);
    data.offset = UTIL.formatDuration(offset, true);
    data.related = Array.from(new Set(abbrs));
    LOGGING.dir(data);
};

/**
 * Return the equivalent date-time in a different timezone
 * @param {String} to - the target timezone
 * @param {Object} time - (optional) the date-time (<code>now()</code> if not present)
 * @returns {Object} the equivalent date-time
 */

const shiftTime = function(to, time) {
    const t = time ? time : new MOMENT_TIMEZONE();
    const result = t.tz(to).format();
    return result;
};

// Export stuff:
exports.setUp = setUp;
