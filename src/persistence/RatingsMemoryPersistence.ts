let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';

import { RatingV1 } from '../data/version1/RatingV1';
import { IRatingsPersistence } from './IRatingsPersistence';

export class RatingsMemoryPersistence
    extends IdentifiableMemoryPersistence<RatingV1, string>
    implements IRatingsPersistence {

    constructor() {
        super();
    }

    public increment(correlationId: string, id: string, rating: number, callback?: (err: any, review: RatingV1) => void): void {
        this.getOneById(correlationId, id, (err, item) => {
            if (err) {
                if (callback) callback(err, item);
            }

            if (item) {
                this.incrementRating(item, rating);
                this.update(correlationId, item, callback);
            }
            else {
                item = new RatingV1();
                item.id = id;
                this.incrementRating(item, rating);
                this.create(correlationId, item, callback)
            }
        })
    }

    public decrement(correlationId: string, id: string, rating: number, callback?: (err: any, review: RatingV1) => void): void {
        this.getOneById(correlationId, id, (err, item) => {
            if (err) {
                if (callback) callback(err, item);
            }

            if (item) {
                this.decrementRating(item, rating);
                this.update(correlationId, item, callback);
            }
        })
    }

    private incrementRating(item: RatingV1, rating: number) {
        switch (rating) {
            case 0: item.rating_0_count = (item.rating_0_count ?? 0) + 1; break;
            case 1: item.rating_1_count = (item.rating_1_count ?? 0) + 1; break;
            case 2: item.rating_2_count = (item.rating_2_count ?? 0) + 1; break;
            case 3: item.rating_3_count = (item.rating_3_count ?? 0) + 1; break;
            case 4: item.rating_4_count = (item.rating_4_count ?? 0) + 1; break;
            case 5: item.rating_5_count = (item.rating_5_count ?? 0) + 1; break;
            default:
                break;
        }

        item.total_count = (item.total_count ?? 0) + 1;
    }

    private decrementRating(item: RatingV1, rating: number) {
        switch (rating) {
            case 0: item.rating_0_count = (item.rating_0_count ?? 0) - 1; break;
            case 1: item.rating_1_count = (item.rating_1_count ?? 0) - 1; break;
            case 2: item.rating_2_count = (item.rating_2_count ?? 0) - 1; break;
            case 3: item.rating_3_count = (item.rating_3_count ?? 0) - 1; break;
            case 4: item.rating_4_count = (item.rating_4_count ?? 0) - 1; break;
            case 5: item.rating_5_count = (item.rating_5_count ?? 0) - 1; break;
            default:
                break;
        }

        item.total_count = (item.total_count ?? 0) - 1;
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

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

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<RatingV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }

}
