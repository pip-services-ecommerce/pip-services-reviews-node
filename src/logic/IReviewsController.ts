import { DataPage } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { SortParams } from 'pip-services3-commons-node';

import { ReviewV1 } from '../data/version1/ReviewV1';
import { RatingV1 } from '../data/version1/RatingV1';

export interface IReviewsController {
    getReviews(correlationId: string, filter: FilterParams, paging: PagingParams, sorting: SortParams,
        callback: (err: any, page: DataPage<ReviewV1>) => void): void;

    getReviewById(correlationId: string, review_id: string,
        callback: (err: any, review: ReviewV1) => void): void;

    getPartyReview(correlationId: string, party_id: string, product_id: string,
        callback: (err: any, review: ReviewV1) => void): void;

    getProductRating(correlationId: string, product_id: string,
        callback: (err: any, rating: RatingV1) => void): void;
        
    submitReview(correlationId: string, review: ReviewV1, 
        callback: (err: any, rating: RatingV1) => void): void;

    reportHelpful(correlationId: string, review_id: string, party_id: string,
        callback: (err: any, review: ReviewV1) => void): void;

    reportAbuse(correlationId: string, review_id: string, party_id: string,
        callback: (err: any, review: ReviewV1) => void): void;
            
    deleteReviewById(correlationId: string, review_id: string,
        callback: (err: any, rating: RatingV1) => void): void;
}
