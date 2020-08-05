let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { ReviewV1 } from '../../src/data/version1/ReviewV1';

import { IReviewsPersistence } from '../../src/persistence/IReviewsPersistence';
import { RatingV1 } from '../../src/data/version1/RatingV1';
import { TestModel } from '../data/TestModel';

let REVIEW1: ReviewV1 = TestModel.createReview1();
let REVIEW2: ReviewV1 = TestModel.createReview2();
let REVIEW3: ReviewV1 = TestModel.createReview3();

export class ReviewsPersistenceFixture {
    private _persistence: IReviewsPersistence;

    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    private testCreateReviews(done) {
        async.series([
            // Create one Review
            (callback) => {
                this._persistence.create(
                    null,
                    REVIEW1,
                    (err, review) => {
                        assert.isNull(err);

                        assert.isObject(review);
                        TestModel.assertEqualReviewV1(review, REVIEW1);

                        callback();
                    }
                );
            },
            // Create another Review
            (callback) => {
                this._persistence.create(
                    null,
                    REVIEW2,
                    (err, review) => {
                        assert.isNull(err);

                        assert.isObject(review);
                        TestModel.assertEqualReviewV1(review, REVIEW2);

                        callback();
                    }
                );
            },
            // Create yet another Review
            (callback) => {
                this._persistence.create(
                    null,
                    REVIEW3,
                    (err, review) => {
                        assert.isNull(err);

                        assert.isObject(review);
                        TestModel.assertEqualReviewV1(review, REVIEW3);

                        callback();
                    }
                );
            }
        ], done);
    }

    testCrudOperations(done) {
        let review1: ReviewV1;

        async.series([
            // Create items
            (callback) => {
                this.testCreateReviews(callback);
            },
            // Get all Reviews
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        review1 = page.data[0];

                        callback();
                    }
                );
            },
            // Update the Review
            (callback) => {
                review1.testimonial = 'Updated Review 1';

                this._persistence.update(
                    null,
                    review1,
                    (err, review) => {
                        assert.isNull(err);

                        assert.isObject(review);
                        assert.equal(review.testimonial, 'Updated Review 1');

                        review1 = review;

                        callback();
                    }
                );
            },
            // Delete Review
            (callback) => {
                this._persistence.deleteById(
                    null,
                    review1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
            // Try to get delete Review
            (callback) => {
                this._persistence.getOneById(
                    null,
                    review1.id,
                    (err, review) => {
                        assert.isNull(err);

                        assert.isNull(review || null);

                        callback();
                    }
                );
            }
        ], done);
    }

    testGetWithFilter(done) {
        async.series([
            // Create Reviews
            (callback) => {
                this.testCreateReviews(callback);
            },
            // Get Reviews filtered by party id
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        party_id: '1'
                    }),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 1);

                        callback();
                    }
                );
            },
            // Get Reviews by product id
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        product_id: '1'
                    }),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        callback();
                    }
                );
            },
            // Get Reviews by full review
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        full_review: true
                    }),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
            // Get Reviews by ids
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        ids: ['1', '3']
                    }),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        // PayPal manages ids by itself
                        //assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        ], done);
    }

}
