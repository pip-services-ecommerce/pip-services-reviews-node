"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_data_node_1 = require("pip-services3-data-node");
const RatingV1_1 = require("../data/version1/RatingV1");
class RatingsMemoryPersistence extends pip_services3_data_node_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
    }
    increment(correlationId, id, rating, callback) {
        this.getOneById(correlationId, id, (err, item) => {
            if (err) {
                if (callback)
                    callback(err, item);
            }
            if (item) {
                this.incrementRating(item, rating);
                this.update(correlationId, item, callback);
            }
            else {
                item = new RatingV1_1.RatingV1();
                item.id = id;
                this.incrementRating(item, rating);
                this.create(correlationId, item, callback);
            }
        });
    }
    decrement(correlationId, id, rating, callback) {
        this.getOneById(correlationId, id, (err, item) => {
            if (err) {
                if (callback)
                    callback(err, item);
            }
            if (item) {
                this.decrementRating(item, rating);
                this.update(correlationId, item, callback);
            }
        });
    }
    incrementRating(item, rating) {
        var _a, _b, _c, _d, _e, _f, _g;
        switch (rating) {
            case 0:
                item.rating_0_count = (_a = item.rating_0_count, (_a !== null && _a !== void 0 ? _a : 0)) + 1;
                break;
            case 1:
                item.rating_1_count = (_b = item.rating_1_count, (_b !== null && _b !== void 0 ? _b : 0)) + 1;
                break;
            case 2:
                item.rating_2_count = (_c = item.rating_2_count, (_c !== null && _c !== void 0 ? _c : 0)) + 1;
                break;
            case 3:
                item.rating_3_count = (_d = item.rating_3_count, (_d !== null && _d !== void 0 ? _d : 0)) + 1;
                break;
            case 4:
                item.rating_4_count = (_e = item.rating_4_count, (_e !== null && _e !== void 0 ? _e : 0)) + 1;
                break;
            case 5:
                item.rating_5_count = (_f = item.rating_5_count, (_f !== null && _f !== void 0 ? _f : 0)) + 1;
                break;
            default:
                break;
        }
        item.total_count = (_g = item.total_count, (_g !== null && _g !== void 0 ? _g : 0)) + 1;
    }
    decrementRating(item, rating) {
        var _a, _b, _c, _d, _e, _f, _g;
        switch (rating) {
            case 0:
                item.rating_0_count = (_a = item.rating_0_count, (_a !== null && _a !== void 0 ? _a : 0)) - 1;
                break;
            case 1:
                item.rating_1_count = (_b = item.rating_1_count, (_b !== null && _b !== void 0 ? _b : 0)) - 1;
                break;
            case 2:
                item.rating_2_count = (_c = item.rating_2_count, (_c !== null && _c !== void 0 ? _c : 0)) - 1;
                break;
            case 3:
                item.rating_3_count = (_d = item.rating_3_count, (_d !== null && _d !== void 0 ? _d : 0)) - 1;
                break;
            case 4:
                item.rating_4_count = (_e = item.rating_4_count, (_e !== null && _e !== void 0 ? _e : 0)) - 1;
                break;
            case 5:
                item.rating_5_count = (_f = item.rating_5_count, (_f !== null && _f !== void 0 ? _f : 0)) - 1;
                break;
            default:
                break;
        }
        item.total_count = (_g = item.total_count, (_g !== null && _g !== void 0 ? _g : 0)) - 1;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
        let id = filter.getAsNullableString('id');
        let ids = filter.getAsObject('ids');
        // Process ids filter
        if (_.isString(ids))
            ids = ids.split(',');
        if (!_.isArray(ids))
            ids = null;
        return (item) => {
            if (id && item.id != id)
                return false;
            if (ids && _.indexOf(ids, item.id) < 0)
                return false;
            return true;
        };
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
}
exports.RatingsMemoryPersistence = RatingsMemoryPersistence;
//# sourceMappingURL=RatingsMemoryPersistence.js.map