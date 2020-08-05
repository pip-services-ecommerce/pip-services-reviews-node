import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IGetter } from 'pip-services3-data-node';

import { RatingV1 } from '../data/version1/RatingV1';

export interface IRatingsPersistence extends IGetter<RatingV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<RatingV1>) => void): void;

    getOneById(correlationId: string, id: string, 
        callback: (err: any, item: RatingV1) => void): void;
        
    increment(correlationId: string, id: string, rating: number, 
        callback?: (err: any, review: RatingV1) => void): void;

    decrement(correlationId: string, id: string, rating: number, 
        callback?: (err: any, review: RatingV1) => void): void;

    deleteById(correlationId: string, id: string,
        callback: (err: any, item: RatingV1) => void): void;
}
