import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IGetter } from 'pip-services3-data-node';

import { ReviewV1 } from '../data/version1/ReviewV1';
import { RatingV1 } from '../data/version1/RatingV1';

export interface IReviewsPersistence extends IGetter<ReviewV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<ReviewV1>) => void): void;

    getOneById(correlationId: string, id: string, 
        callback: (err: any, item: ReviewV1) => void): void;
        
    create(correlation_id: string, review: ReviewV1, 
        callback?: (err: any, review: ReviewV1) => void): void;

    update(correlation_id: string, review: ReviewV1, 
        callback?: (err: any, review: ReviewV1) => void): void;

    deleteById(correlationId: string, id: string,
        callback: (err: any, item: ReviewV1) => void): void;
}
