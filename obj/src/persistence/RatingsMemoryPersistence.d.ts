import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';
import { RatingV1 } from '../data/version1/RatingV1';
import { IRatingsPersistence } from './IRatingsPersistence';
export declare class RatingsMemoryPersistence extends IdentifiableMemoryPersistence<RatingV1, string> implements IRatingsPersistence {
    constructor();
    increment(correlationId: string, id: string, rating: number, callback?: (err: any, review: RatingV1) => void): void;
    decrement(correlationId: string, id: string, rating: number, callback?: (err: any, review: RatingV1) => void): void;
    private incrementRating;
    private decrementRating;
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<RatingV1>) => void): void;
}
