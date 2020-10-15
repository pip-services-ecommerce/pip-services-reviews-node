"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsMongoDbPersistence = void 0;
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_mongodb_node_1 = require("pip-services3-mongodb-node");
class ReviewsMongoDbPersistence extends pip_services3_mongodb_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('reviews');
        super.ensureIndex({ product_id: 1 });
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
        let criteria = [];
        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });
        // Filter ids
        let ids = filter.getAsObject('ids');
        if (_.isString(ids))
            ids = ids.split(',');
        if (_.isArray(ids))
            criteria.push({ _id: { $in: ids } });
        let partyId = filter.getAsNullableString('party_id');
        if (partyId != null)
            criteria.push({ party_id: partyId });
        let productId = filter.getAsNullableString('product_id');
        if (productId != null)
            criteria.push({ product_id: productId });
        let fullReview = filter.getAsNullableBoolean('full_review');
        if (fullReview != null)
            criteria.push({ full_review: fullReview });
        return criteria.length > 0 ? { $and: criteria } : null;
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
}
exports.ReviewsMongoDbPersistence = ReviewsMongoDbPersistence;
//# sourceMappingURL=ReviewsMongoDbPersistence.js.map