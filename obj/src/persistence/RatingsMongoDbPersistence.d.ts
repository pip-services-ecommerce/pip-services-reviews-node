import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';
import { RatingV1 } from '../data/version1/RatingV1';
import { IRatingsPersistence } from './IRatingsPersistence';
export declare class RatingsMongoDbPersistence extends IdentifiableMongoDbPersistence<RatingV1, string> implements IRatingsPersistence {
    constructor();
    private composeFilter;
    increment(correlationId: string, id: string, rating: number, callback?: (err: any, review: RatingV1) => void): void;
    decrement(correlationId: string, id: string, rating: number, callback?: (err: any, review: RatingV1) => void): void;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<RatingV1>) => void): void;
}
