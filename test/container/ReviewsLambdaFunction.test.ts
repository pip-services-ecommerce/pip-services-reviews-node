let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';

import { ReviewV1 } from '../../src/data/version1/ReviewV1';
import { ReviewsLambdaFunction } from '../../src/container/ReviewsLambdaFunction';
import { TestModel } from '../data/TestModel';

let REVIEW1: ReviewV1 = TestModel.createReview1();
let REVIEW2: ReviewV1 = TestModel.createReview2();

suite('ReviewsLambdaFunction', () => {
    let lambda: ReviewsLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'pip-services-reviews:persistence:memory:reviews:1.0',
            'persistence.descriptor', 'pip-services-reviews:persistence:memory:ratings:1.0',
            'controller.descriptor', 'pip-services-reviews:controller:default:default:1.0'
        );

        lambda = new ReviewsLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });

    suiteTeardown((done) => {
        lambda.close(null, done);
    });

    test('CRUD Operations', (done) => {

        async.series([
            // Create one Review
            (callback) => {
                lambda.act(
                    {
                        role: 'reviews',
                        cmd: 'submit_review',
                        review: REVIEW1
                    },
                    (err, rating) => {
                        assert.isNull(err);

                        assert.isObject(rating);

                        callback();
                    }
                );
            },
            // Create another Review
            (callback) => {
                lambda.act(
                    {
                        role: 'reviews',
                        cmd: 'submit_review',
                        review: REVIEW2
                    },
                    (err, rating) => {
                        assert.isNull(err);

                        assert.isObject(rating);

                        callback();
                    }
                );
            },
            // Get all Reviews
            (callback) => {
                lambda.act(
                    {
                        role: 'reviews',
                        cmd: 'get_reviews'
                    },
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
                lambda.act(
                    {
                        role: 'reviews',
                        cmd: 'get_review_by_id',
                        review_id: REVIEW1.id
                    },
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
                lambda.act(
                    {
                        role: 'reviews',
                        cmd: 'get_party_review',
                        party_id: REVIEW1.party_id,
                        product_id: REVIEW1.product_id,
                    },
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
                lambda.act(
                    {
                        role: 'reviews',
                        cmd: 'get_product_rating',
                        product_id: REVIEW1.product_id,
                    },
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
                lambda.act(
                    {
                        role: 'reviews',
                        cmd: 'report_helpful',
                        review_id: REVIEW1.id,
                        party_id: REVIEW1.party_id
                    },
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
                lambda.act(
                    {
                        role: 'reviews',
                        cmd: 'report_abuse',
                        review_id: REVIEW2.id,
                        party_id: REVIEW2.party_id
                    },
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
                lambda.act(
                    {
                        role: 'reviews',
                        cmd: 'delete_review_by_id',
                        review_id: REVIEW1.id,
                    },
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
            // Try to get delete Review
            (callback) => {
                lambda.act(
                    {
                        role: 'reviews',
                        cmd: 'get_review_by_id',
                        review_id: REVIEW1.id,
                    },
                    (err, review) => {
                        assert.isNull(err);

                        assert.isNull(review || null);

                        callback();
                    }
                );
            }
        ], done);
    });
});