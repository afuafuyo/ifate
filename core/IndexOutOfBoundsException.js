/**
 * @author yu
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const Exception = require('./Exception');

/**
 * 索引越界
 */
class IndexOutOfBoundsException extends Exception {}

module.exports = IndexOutOfBoundsException;
