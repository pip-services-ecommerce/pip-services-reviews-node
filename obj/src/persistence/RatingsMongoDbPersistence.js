"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingsMongoDbPersistence = void 0;
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_mongodb_node_1 = require("pip-services3-mongodb-node");
class RatingsMongoDbPersistence extends pip_services3_mongodb_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('ratings');
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
        return criteria.length > 0 ? { $and: criteria } : null;
    }
    increment(correlationId, id, rating, callback) {
        let criteria = {
            _id: id
        };
        let update;
        if (rating <= 0)
            update = { $inc: { rating_0_count: 1, total_count: 1 } };
        else if (rating == 1)
            update = { $inc: { rating_1_count: 1, total_count: 1 } };
        else if (rating == 2)
            update = { $inc: { rating_2_count: 1, total_count: 1 } };
        else if (rating == 3)
            update = { $inc: { rating_3_count: 1, total_count: 1 } };
        else if (rating == 4)
            update = { $inc: { rating_4_count: 1, total_count: 1 } };
        else if (rating >= 5)
            update = { $inc: { rating_5_count: 1, total_count: 1 } };
        let options = {
            upsert: true,
            returnOriginal: false
        };
        this._collection.findOneAndUpdate(criteria, update, options, (err, result) => {
            let item = result ? this.convertToPublic(result.value) : null;
            if (err == null) {
                if (item)
                    this._logger.trace(correlationId, "Updated in %s with id = %s", this._collection, item.id);
                else
                    this._logger.trace(correlationId, "Item %s was not found", id);
            }
            if (callback)
                callback(err, item);
        });
    }
    decrement(correlationId, id, rating, callback) {
        let criteria = {
            _id: id
        };
        let update;
        if (rating <= 0)
            update = { $inc: { rating_0_count: -1, total_count: -1 } };
        else if (rating == 1)
            update = { $inc: { rating_1_count: -1, total_count: -1 } };
        else if (rating == 2)
            update = { $inc: { rating_2_count: -1, total_count: -1 } };
        else if (rating == 3)
            update = { $inc: { rating_3_count: -1, total_count: -1 } };
        else if (rating == 4)
            update = { $inc: { rating_4_count: -1, total_count: -1 } };
        else if (rating >= 5)
            update = { $inc: { rating_5_count: -1, total_count: -1 } };
        let options = {
            returnOriginal: false
        };
        this._collection.findOneAndUpdate(criteria, update, options, (err, result) => {
            let item = result ? this.convertToPublic(result.value) : null;
            if (err == null) {
                if (item)
                    this._logger.trace(correlationId, "Updated in %s with id = %s", this._collection, item.id);
                else
                    this._logger.trace(correlationId, "Item %s was not found", id);
            }
            if (callback)
                callback(err, item);
        });
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
}
exports.RatingsMongoDbPersistence = RatingsMongoDbPersistence;
//# sourceMappingURL=RatingsMongoDbPersistence.js.map