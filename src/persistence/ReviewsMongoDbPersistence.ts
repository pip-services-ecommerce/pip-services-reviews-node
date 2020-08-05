let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { TagsProcessor } from 'pip-services3-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';

import { ReviewV1 } from '../data/version1/ReviewV1';
import { IReviewsPersistence } from './IReviewsPersistence';

export class ReviewsMongoDbPersistence
    extends IdentifiableMongoDbPersistence<ReviewV1, string>
    implements IReviewsPersistence {

    constructor() {
        super('reviews');
        super.ensureIndex({ product_id: 1 });
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
    
    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<ReviewV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }

}
