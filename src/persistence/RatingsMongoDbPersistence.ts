let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { TagsProcessor } from 'pip-services3-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';

import { RatingV1 } from '../data/version1/RatingV1';
import { IRatingsPersistence } from './IRatingsPersistence';

export class RatingsMongoDbPersistence
    extends IdentifiableMongoDbPersistence<RatingV1, string>
    implements IRatingsPersistence {

    constructor() {
        super('ratings');
    }

    private composeFilter(filter: any) {
        filter = filter || new FilterParams();

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

    public increment(correlationId: string, id: string, rating: number,
        callback?: (err: any, review: RatingV1) => void): void {
        let criteria = {
            _id: id
        };

        let update: any;

        if (rating <= 0) update = { $inc: { rating_0_count: 1, total_count: 1 } };
        else if (rating == 1)  update = { $inc: { rating_1_count: 1, total_count: 1 } };
        else if (rating == 2)  update = { $inc: { rating_2_count: 1, total_count: 1 } };
        else if (rating == 3)  update = { $inc: { rating_3_count: 1, total_count: 1 } };
        else if (rating == 4)  update = { $inc: { rating_4_count: 1, total_count: 1 } };
        else if (rating >= 5)  update = { $inc: { rating_5_count: 1, total_count: 1 } };

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

            if (callback) callback(err, item);
        })
    }

    public decrement(correlationId: string, id: string, rating: number,
        callback?: (err: any, review: RatingV1) => void): void {
            let criteria = {
                _id: id
            };
    
            let update: any;
    
            if (rating <= 0) update = { $inc: { rating_0_count: -1, total_count: -1 } };
            else if (rating == 1)  update = { $inc: { rating_1_count: -1, total_count: -1 } };
            else if (rating == 2)  update = { $inc: { rating_2_count: -1, total_count: -1 } };
            else if (rating == 3)  update = { $inc: { rating_3_count: -1, total_count: -1 } };
            else if (rating == 4)  update = { $inc: { rating_4_count: -1, total_count: -1 } };
            else if (rating >= 5)  update = { $inc: { rating_5_count: -1, total_count: -1 } };
    
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
    
                if (callback) callback(err, item);
            })
    
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<RatingV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }

}
