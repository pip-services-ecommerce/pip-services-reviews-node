let async = require('async');
let assert = require('chai').assert;

import { ConfigParams, IdGenerator } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { ReviewsMemoryPersistence } from '../../src/persistence/ReviewsMemoryPersistence';
import { ReviewsController } from '../../src/logic/ReviewsController';
import { RatingsMemoryPersistence } from '../../src/persistence/RatingsMemoryPersistence';
import { ReviewV1 } from '../../src/data/version1/ReviewV1';
import { TestModel } from '../data/TestModel';

let REVIEW1: ReviewV1 = TestModel.createReview1();
let REVIEW2: ReviewV1 = TestModel.createReview2();

suite('ReviewsController', () => {
    let reviewsPersistence: ReviewsMemoryPersistence;
    let ratingsPersistence: RatingsMemoryPersistence;
    let controller: ReviewsController;

    setup((done) => {
        reviewsPersistence = new ReviewsMemoryPersistence();
        reviewsPersistence.configure(new ConfigParams());

        ratingsPersistence = new RatingsMemoryPersistence();
        ratingsPersistence.configure(new ConfigParams());

        controller = new ReviewsController();
        controller.configure(new ConfigParams());

        let references = References.fromTuples(
            new Descriptor('pip-services-reviews', 'persistence', 'memory', 'reviews', '1.0'), reviewsPersistence,
            new Descriptor('pip-services-reviews', 'persistence', 'memory', 'ratings', '1.0'), ratingsPersistence,
            new Descriptor('pip-services-reviews', 'controller', 'default', 'default', '1.0'), controller
        );

        controller.setReferences(references);

        reviewsPersistence.open(null, done);
    });

    teardown((done) => {
        reviewsPersistence.close(null, done);
    });

    test('CRUD Operations', (done) => {
        async.series([
            // Create one Review
            (callback) => {
                controller.submitReview(
                    null,
                    REVIEW1,
                    (err, rating) => {
                        assert.isNull(err);

                        assert.isObject(rating);

                        callback();
                    }
                );
            },
            // Create another Review
            (callback) => {
                controller.submitReview(
                    null,
                    REVIEW2,
                    (err, rating) => {
                        assert.isNull(err);

                        assert.isObject(rating);

                        callback();
                    }
                );
            },
            // Get all Reviews
            (callback) => {
                controller.getReviews(
                    null,
                    null,
                    null,
                    null,
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
            // Get Review by id
            (callback) => {
                controller.getReviewById(
                    null,
                    REVIEW1.id,
                    (err, review) => {
                        assert.isNull(err);

                        assert.isObject(review);
                        TestModel.assertEqualReviewV1(review, REVIEW1);

                        callback();
                    }
                );
            },
            // Get party Review
            (callback) => {
                controller.getPartyReview(
                    null,
                    REVIEW1.party_id,
                    REVIEW1.product_id,
                    (err, review) => {
                        assert.isNull(err);

                        assert.isObject(review);
                        TestModel.assertEqualReviewV1(review, REVIEW1);

                        callback();
                    }
                );
            },
            // Get product rating
            (callback) => {
                controller.getProductRating(
                    null,
                    REVIEW1.product_id,
                    (err, rating) => {
                        assert.isNull(err);

                        assert.isObject(rating);
                        assert.equal(rating.rating_0_count, 1);
                        assert.isUndefined(rating.rating_1_count);
                        assert.isUndefined(rating.rating_2_count);
                        assert.equal(rating.rating_3_count, 1);
                        assert.isUndefined(rating.rating_4_count);
                        assert.isUndefined(rating.rating_5_count);
                        assert.equal(rating.total_count, 2);

                        callback();
                    }
                );
            },
            // Report Review helpful
            (callback) => {
                controller.reportHelpful(
                    null,
                    REVIEW1.id,
                    REVIEW1.party_id,
                    (err, review) => {
                        assert.isNull(err);

                        assert.isObject(review);
                        assert.equal(review.helpful_count, 1);

                        callback();
                    }
                );
            },
            // Report Review abuse
            (callback) => {
                controller.reportAbuse(
                    null,
                    REVIEW2.id,
                    REVIEW2.party_id,

                    (err, review) => {
                        assert.isNull(err);

                        assert.isObject(review);
                        assert.equal(review.abuse_count, 1);

                        callback();
                    }
                );
            },
            // Delete Review
            (callback) => {
                controller.deleteReviewById(
                    null,
                    REVIEW1.id,

                    (err) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
            // Try to get delete Review
            (callback) => {
                controller.getReviewById(
                    null,
                    REVIEW1.id,
                    (err) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            }
        ], done);

    });
});