import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';
import { ReviewV1 } from '../data/version1/ReviewV1';
import { IReviewsPersistence } from './IReviewsPersistence';
export declare class ReviewsMongoDbPersistence extends IdentifiableMongoDbPersistence<ReviewV1, string> implements IReviewsPersistence {
    constructor();
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<ReviewV1>) => void): void;
}
