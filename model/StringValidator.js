"use strict";
const Validator = require("./Validator");
/**
 * 校验字符串
 *
 * ```
 * class XxxModel extends Model {
 *      rules() {
 *          return [
 *              {
 *                  rule: {
 *                      classPath: 'fate/model/StringValidator',
 *                      minLength: 1,
 *                      maxLength: 2333
 *                  },
 *                  attributes: ['name'],
 *                  messages: ['length of the name should be between 1 and 2333']
 *              }
 *          ];
 *      }
 * }
 * ```
 *
 */
class StringValidator extends Validator {
    constructor() {
        super();
        /**
         * 最小长度
         */
        this.minLength = 1;
        /**
         * 最大长度
         */
        this.maxLength = 2333;
    }
    /**
     * @inheritdoc
     */
    validate(attributeName, attributeValue) {
        let info = this.getMessage(attributeName);
        if (attributeValue.length < this.minLength || attributeValue.length > this.maxLength) {
            return '' === info
                ? 'length of the ' + attributeName + ' should be between ' + this.minLength + ' and ' + this.maxLength
                : info;
        }
        return '';
    }
}
module.exports = StringValidator;