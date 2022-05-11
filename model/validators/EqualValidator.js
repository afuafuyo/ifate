"use strict";
const Validator = require("../Validator");
/**
 * 多个值是否完全相等
 *
 * ```
 * class XxxModel extends Model {
 *      rules() {
 *          return [
 *              {
 *                  rule: 'fate/model/validators/EqualValidator',
 *                  attributes: ['password', 'confirming'],
 *                  messages: ['password error']
 *              }
 *          ];
 *      }
 * }
 * ```
 *
 */
class EqualValidator extends Validator {
    /**
     * @inheritdoc
     */
    validate(attributeName, attributeValue) {
        let hasError = false;
        let validatingAttributes = this.attributes;
        let firstValue = attributeValue;
        let info = this.getMessage(attributeName);
        this.skip = true;
        for (let i = 1; i < validatingAttributes.length; i++) {
            if (firstValue !== this.model.attributes[validatingAttributes[i]]) {
                hasError = true;
                break;
            }
        }
        if (hasError) {
            return '' === info ? this.attributes.toString() + ' are not equal' : info;
        }
        return '';
    }
}
module.exports = EqualValidator;
