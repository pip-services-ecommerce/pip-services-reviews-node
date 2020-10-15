let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { ReviewV1 } from '../../../src/data/version1/ReviewV1';
import { ReviewsMemoryPersistence } from '../../../src/persistence/ReviewsMemoryPersistence';
import { ReviewsController } from '../../../src/logic/ReviewsController';
import { ReviewsHttpServiceV1 } from '../../../src/services/version1/ReviewsHttpServiceV1';
import { TestModel } from '../../data/TestModel';
import { RatingsMemoryPersistence } from '../../../src/persistence/RatingsMemoryPersistence';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let REVIEW1: ReviewV1 = TestModel.createReview1();
let REVIEW2: ReviewV1 = TestModel.createReview2();


suite('ReviewsHttpServiceV1', () => {
    let service: ReviewsHttpServiceV1;
    let rest: any;

    suiteSetup((done) => {
        let reviewsPersistence = new ReviewsMemoryPersistence();
        let ratingsPersistence = new RatingsMemoryPersistence();
        let controller = new ReviewsController();

        service = new ReviewsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-reviews', 'persistence', 'memory', 'reviews', '1.0'), reviewsPersistence,
            new Descriptor('pip-services-reviews', 'persistence', 'memory', 'ratings', '1.0'), ratingsPersistence,
            new Descriptor('pip-services-reviews', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-reviews', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });

    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });


    test('CRUD Operations', (done) => {

        let review1:ReviewV1;

        async.series([
            // Create one Review
            (callback) => {
                rest.post('/v1/reviews/submit_review',
                    {
                        review: REVIEW1
                    },
                    (err, req, res, rating) => {
                        assert.isNull(err);

                        assert.isObject(rating);

                        callback();
                    }
                );
            },
            // Create another Review
            (callback) => {
                rest.post('/v1/reviews/submit_review',
                    {
                        review: REVIEW2
                    },
                    (err, req, res, rating) => {
                        assert.isNull(err);

                        assert.isObject(rating);

                        callback();
                    }
                );
            },
            // Get all Reviews
            (callback) => {
                rest.post('/v1/reviews/get_reviews',
                    {},
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);
                        review1 = page.data[0];

                        callback();
                    }
                );
            },
            // Get Review by id
            (callback) => {
                rest.post('/v1/reviews/get_review_by_id',
                    {
                        review_id: REVIEW1.id
                    },
                    (err, req, res, review) => {
                        assert.isNull(err);

                        assert.isObject(review);
                        TestModel.assertEqualReviewV1(review, REVIEW1);

                        callback();
                    }
                );
            },
            // Get party Review
            (callback) => {
                rest.post('/v1/reviews/get_party_review',
                    {
                        party_id: REVIEW1.party_id,
                        product_id: REVIEW1.product_id,
                    },
                    (err, req, res, review) => {
                        assert.isNull(err);

                        assert.isObject(review);
                        TestModel.assertEqualReviewV1(review, REVIEW1);

                        callback();
                    }
                );
            },
            // Get product rating
            (callback) => {
                rest.post('/v1/reviews/get_product_rating',
                    {
                        product_id: REVIEW1.product_id,
                    },
                    (err, req, res, rating) => {
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
            // Update Review
            (callback) => {
                review1.rating = 5;
                review1.testimonial = "Update Test msg";
                rest.post('/v1/reviews/update_review',
                    {
                        review: review1
                    },
                    (err, req, res, rating) => {
                        assert.isNull(err);

                        assert.isObject(rating);
                        assert.equal(rating.rating_0_count, 0);
                        assert.isUndefined(rating.rating_1_count);
                        assert.isUndefined(rating.rating_2_count);
                        assert.equal(rating.rating_3_count, 1);
                        assert.isUndefined(rating.rating_4_count);
                        assert.equal(rating.rating_5_count, 1);
                        assert.equal(rating.total_count, 2);

                        callback();
                    }
                );
            },
            // Get Review by id
            (callback) => {
                rest.post('/v1/reviews/get_review_by_id',
                    {
                        review_id: review1.id
                    },
                    (err, req, res, review) => {
                        assert.isNull(err);

                        assert.isObject(review);
                        TestModel.assertEqualReviewV1(review, review1);

                        callback();
                    }
                );
            },
            // Report Review helpful
            (callback) => {
                rest.post('/v1/reviews/report_helpful',
                    {
                        review_id: REVIEW1.id,
                        party_id: REVIEW1.party_id
                    },
                    (err, req, res, review) => {
                        assert.isNull(err);

                        assert.isObject(review);
                        assert.equal(review.helpful_count, 1);

                        callback();
                    }
                );
            },
            // Report Review abuse
            (callback) => {
                rest.post('/v1/reviews/report_abuse',
                    {
                        review_id: REVIEW2.id,
                        party_id: REVIEW2.party_id
                    },
                    (err, req, res, review) => {
                        assert.isNull(err);

                        assert.isObject(review);
                        assert.equal(review.abuse_count, 1);

                        callback();
                    }
                );
            },
            // Delete Review
            (callback) => {
                rest.post('/v1/reviews/delete_review_by_id',
                    {
                        review_id: REVIEW1.id
                    },
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
            // Try to get delete Review
            (callback) => {
                rest.post('/v1/reviews/get_review_by_id',
                    {
                        review_id: REVIEW1.id
                    },
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            }
        ], done);
    });
});