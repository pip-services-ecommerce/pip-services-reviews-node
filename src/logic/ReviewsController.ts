let async = require('async');

import { ConfigParams, SortParams, IdGenerator, Descriptor, NotFoundException } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { DependencyResolver } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';

import { ReviewV1 } from '../data/version1/ReviewV1';
import { RatingV1 } from '../data/version1/RatingV1';

import { IReviewsPersistence } from '../persistence/IReviewsPersistence';
import { IReviewsController } from './IReviewsController';
import { ReviewsCommandSet } from './ReviewsCommandSet';
import { IRatingsPersistence } from '../persistence/IRatingsPersistence';

export class ReviewsController implements IConfigurable, IReferenceable, ICommandable, IReviewsController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'pip-services-reviews:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(ReviewsController._defaultConfig);
    private _reviewsPersistence: IReviewsPersistence;
    private _ratingsPersistence: IRatingsPersistence;
    private _commandSet: ReviewsCommandSet;

    public constructor() {
        this._dependencyResolver.put('reviews-persistence', new Descriptor('pip-services-reviews', 'persistence', '*', 'reviews', '1.0'));
        this._dependencyResolver.put('ratings-persistence', new Descriptor('pip-services-reviews', 'persistence', '*', 'ratings', '1.0'));
    }

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._reviewsPersistence = this._dependencyResolver.getOneRequired<IReviewsPersistence>('reviews-persistence');
        this._ratingsPersistence = this._dependencyResolver.getOneRequired<IRatingsPersistence>('ratings-persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new ReviewsCommandSet(this);
        return this._commandSet;
    }

    public getReviews(correlationId: string, filter: FilterParams, paging: PagingParams, sorting: SortParams,
        callback: (err: any, page: DataPage<ReviewV1>) => void): void {
        this._reviewsPersistence.getPageByFilter(correlationId, filter, paging, callback);
    }

    public getReviewById(correlationId: string, reviewId: string,
        callback: (err: any, review: ReviewV1) => void): void {
        this._reviewsPersistence.getOneById(correlationId, reviewId, (err, review) => {
            callback(err, review);
        });
    }

    public getPartyReview(correlationId: string, partyId: string, productId: string, callback: (err: any, review: ReviewV1) => void): void {
        this._reviewsPersistence.getPageByFilter(correlationId, FilterParams.fromValue({
            party_id: partyId,
            product_id: productId
        }), null, (err: any, page: DataPage<ReviewV1>) => {
            let review = page && page.data.length > 0 ? page.data[0] : null;
            if (callback) callback(err, review);
        });
    }

    public getProductRating(correlationId: string, productId: string, callback: (err: any, rating: RatingV1) => void): void {
        this._ratingsPersistence.getOneById(correlationId, productId, callback);
    }

    public submitReview(correlationId: string, review: ReviewV1,
        callback: (err: any, rating: RatingV1) => void): void {

        let rating: RatingV1;

        review.id = review.id ?? IdGenerator.nextLong();
        review.create_time = new Date(Date.now());
        review.update_time = new Date(Date.now());

        async.series([
            (callback) => {
                this._reviewsPersistence.create(correlationId, review, (err: any, review: ReviewV1) => {
                    callback(err);
                });
            },
            (callback) => {
                this._ratingsPersistence.increment(correlationId, review.product_id, review.rating, (err: any, data: RatingV1) => {
                    rating = data;
                    callback(err);
                });
            },
        ], (err) => {
            callback(err, rating);
        });
    }

    public updateReview(correlationId: string, review: ReviewV1,
        callback: (err: any, rating: RatingV1) => void): void {
        let oldRating = 0;
        let rating: RatingV1;

        async.series([
            (callback) => {
                this._reviewsPersistence.getOneById(correlationId, review.id, (err, data) => {
                    if (err != null || data == null) {
                        err = new NotFoundException(
                            correlationId,
                            'NOT_FOUND',
                            'Review ' + review.id + ' was not found'
                        )
                        callback(err);
                        return;
                    }

                    oldRating = data.rating;
                    callback(err);
                });
            },
            (callback) => {
                this._ratingsPersistence.decrement(correlationId, review.product_id, oldRating, (err: any, data: RatingV1) => {
                    callback(err);
                });
            },
            (callback) => {
                review.update_time = new Date(Date.now());
                this._reviewsPersistence.update(correlationId, review, (err, data) => {
                    callback(err);
                });
            },
            (callback) => {
                this._ratingsPersistence.increment(correlationId, review.product_id, review.rating, (err: any, data: RatingV1) => {
                    rating = data;
                    callback(err);
                });
            },
        ], (err) => {
            callback(err, rating);
        });

    }

    public reportHelpful(correlationId: string, reviewId: string, partyId: string, callback: (err: any, review: ReviewV1) => void): void {
        let review: ReviewV1;
        async.series([
            (callback) => {
                this._reviewsPersistence.getOneById(correlationId, reviewId, (err, data) => {
                    review = data;
                    callback(err);
                });
            },
            (callback) => {
                review.update_time = new Date(Date.now());
                review.helpful_count = (review.helpful_count ?? 0) + 1;
                this._reviewsPersistence.update(correlationId, review, (err, data) => {
                    callback(err);
                });
            }
        ], (err) => {
            callback(err, review);
        });
    }

    public reportAbuse(correlationId: string, reviewId: string, partyId: string, callback: (err: any, review: ReviewV1) => void): void {
        let review: ReviewV1;
        async.series([
            (callback) => {
                this._reviewsPersistence.getOneById(correlationId, reviewId, (err, data) => {
                    review = data;
                    callback(err);
                });
            },
            (callback) => {
                review.update_time = new Date(Date.now());
                review.abuse_count = (review.abuse_count ?? 0) + 1;
                this._reviewsPersistence.update(correlationId, review, (err, data) => {
                    callback(err);
                });
            }
        ], (err) => {
            callback(err, review);
        });
    }

    public deleteReviewById(correlationId: string, reviewId: string, callback: (err: any, rating: RatingV1) => void): void {
        let rating: RatingV1;
        let review: ReviewV1;

        async.series([
            (callback) => {
                this._reviewsPersistence.deleteById(correlationId, reviewId, (err: any, data: ReviewV1) => {
                    review = data;
                    callback(err);
                });
            },
            (callback) => {
                this._ratingsPersistence.decrement(correlationId, review.product_id, review.rating, (err: any, data: RatingV1) => {
                    rating = data;
                    callback(err);
                });
            },
        ], (err) => {
            callback(err, rating);
        });
    }

}
