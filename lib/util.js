/**
 * @file Miscellaneous utilities; mainly routines for strings
 * @author Antonio Olmo Titos <a@olmo-titos.info>
 * @exports lib/util
 */

// Internal packages:
const LOGGING = require('./logging');

// Constants:
const REGEX_VALID_ID = /^[\w\-.,()][\w \-.,()]*[\w\-.,()]$/,
    DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/**
 * Check if a string is a valid ID for an entity
 * @param {String} string - the candidate string
 * @returns {Boolean} whether the string is valid
 */

const isValidID = function(string) {
    if (!string)
        LOGGING.warn(`“isValidID()”: no string to normalise`);
    else
        return (string && string.match(REGEX_VALID_ID));
};

/**
 * “Normalise” a string to use it as the ID of an entity
 * @param {String} string - the candidate string
 * @returns {String} the normalised string
 */

const normaliseID = function(string) {
    if (!string)
        LOGGING.warn(`“util.normaliseID()”: no string to normalise`);
    else if (!string.match(REGEX_VALID_ID))
        LOGGING.warn(`“util.normaliseID()”: “${string}” is not a valid ID string`);
    else
        return string.toLowerCase();
};

/**
 * Format a duration in minutes as a more readable string
 * @param {Number} duration - duration, in min (eg, 150)
 * @returns {String} the equivalent "nice" duration (eg, "1h30'")
 */

const formatDuration = function(duration, forceSign) {
    if ('number' !== typeof duration)
        return '[unknown]';
    else if (0 === duration)
        return '0';
    else {
        const time = Math.abs(Math.round(duration)),
            h = Math.abs(Math.floor(duration / 60)),
            hs = h ? `${h}h` : '',
            m = time % 60,
            ms = m ? `${m}&prime;` : '',
            sign = duration < 0 ? '&minus;' : (forceSign ? '&plus;' : '');
        return `${sign}${hs}${ms}`;
    }
};

/**
 * Pre-process an entity item, or a list of entity items, to extend information
 * @param {Object} data - meeting info
 * @param {Object} the same object, perhaps extended with more info
 */

const processData = function(data) {
    for (const i in data) {
        if (data[i].duration)
            data[i].niceDuration = formatDuration(data[i].duration);
        if (data[i].day)
            data[i].niceDay = DAY_NAMES[data[i].day];
    }
};

// Export stuff
exports.isValidID = isValidID;
exports.normaliseID = normaliseID;
exports.processData = processData;
exports.formatDuration = formatDuration;
