import Validator = require('../Validator');

/**
 * 校验字符串
 *
 * ```
 * class XxxModel extends Model {
 *      rules() {
 *          return [
 *              {
 *                  rule: {
 *                      classPath: 'fate/model/validators/StringValidator',
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

    /**
     * 删除两端空格
     */
    public trim: boolean = true;

    /**
     * 最小长度
     */
    public minLength: number = 1;

    /**
     * 最大长度
     */
    public maxLength: number = 2333;

    constructor() {
        super();
    }

    /**
     * @inheritdoc
     */
    public validate(attributeName: string, attributeValue: any): string {
        let info = this.getMessage(attributeName);

        if(undefined === attributeValue) {
            attributeValue = '';
        }

        if('' !== attributeValue && this.trim) {
            attributeValue = attributeValue.trim();
        }

        if(attributeValue.length < this.minLength || attributeValue.length > this.maxLength) {
            return '' === info
                ? 'length of the '+ attributeName +' should be between '+ this.minLength +' and '+ this.maxLength
                : info;
        }

        return '';
    }

}

export = StringValidator;
