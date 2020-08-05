"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
class ReviewV1Schema extends pip_services3_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services3_commons_node_2.TypeCode.String);
        this.withRequiredProperty('product_id', pip_services3_commons_node_2.TypeCode.String);
        this.withRequiredProperty('party_id', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('create_time', pip_services3_commons_node_2.TypeCode.DateTime);
        this.withOptionalProperty('update_time', pip_services3_commons_node_2.TypeCode.DateTime);
        this.withRequiredProperty('rating', pip_services3_commons_node_2.TypeCode.Integer);
        this.withOptionalProperty('testimonial', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('full_review', pip_services3_commons_node_2.TypeCode.Boolean);
        this.withOptionalProperty('helpful_count', pip_services3_commons_node_2.TypeCode.Integer);
        this.withOptionalProperty('abuse_count', pip_services3_commons_node_2.TypeCode.Integer);
    }
}
exports.ReviewV1Schema = ReviewV1Schema;
//# sourceMappingURL=ReviewV1Schema.js.map