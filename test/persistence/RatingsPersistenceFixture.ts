let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { RatingV1 } from '../../src/data/version1/RatingV1';

import { IRatingsPersistence } from '../../src/persistence/IRatingsPersistence';
import { TestModel } from '../data/TestModel';

let RATING1: RatingV1 = TestModel.createRating1();
let RATING2: RatingV1 = TestModel.createRating2();
let RATING3: RatingV1 = TestModel.createRating3();

export class RatingsPersistenceFixture {
    private _persistence: IRatingsPersistence;

    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    private testCreateRatings(done) {
        async.series([
            // Create one Rating
            (callback) => {
                this._persistence.increment(
                    null,
                    '1',
                    3,
                    (err, rating) => {
                        assert.isNull(err);

                        assert.isObject(rating);
                        TestModel.assertEqualRatingV1(rating, RATING1);

                        callback();
                    }
                );
            },
            // Create another Rating
            (callback) => {
                this._persistence.increment(
                    null,
                    '2',
                    1,
                    (err, rating) => {
                        assert.isNull(err);

                        assert.isObject(rating);
                        TestModel.assertEqualRatingV1(rating, RATING2);

                        callback();
                    }
                );
            },
            // Create yet another Rating
            (callback) => {
                this._persistence.increment(
                    null,
                    '3',
                    5,
                    (err, rating) => {
                        assert.isNull(err);

                        assert.isObject(rating);
                        TestModel.assertEqualRatingV1(rating, RATING3);

                        callback();
                    }
                );
            }
        ], done);
    }

    testCrudOperations(done) {
        let rating1: RatingV1;

        async.series([
            // Create items
            (callback) => {
                this.testCreateRatings(callback);
            },
            // Get all Ratings
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        rating1 = page.data[0];

                        callback();
                    }
                );
            },
            // Increment the Rating
            (callback) => {
                this._persistence.increment(
                    null,
                    rating1.id,
                    5,
                    (err, rating) => {
                        assert.isNull(err);

                        assert.isObject(rating);
                        assert.equal(rating.id, rating1.id);
                        assert.equal(rating.rating_3_count, 1);
                        assert.equal(rating.rating_5_count, 1);

                        rating1 = rating;

                        callback();
                    }
                );
            },
            // Decrement the Rating
            (callback) => {
                this._persistence.decrement(
                    null,
                    rating1.id,
                    5,
                    (err, rating) => {
                        assert.isNull(err);

                        assert.isObject(rating);
                        assert.equal(rating.id, rating1.id);
                        assert.equal(rating.rating_3_count, 1);
                        assert.equal(rating.rating_5_count, 0);

                        rating1 = rating;

                        callback();
                    }
                );
            },
            // Delete Rating
            (callback) => {
                this._persistence.deleteById(
                    null,
                    rating1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
            // Try to get delete Rating
            (callback) => {
                this._persistence.getOneById(
                    null,
                    rating1.id,
                    (err, rating) => {
                        assert.isNull(err);

                        assert.isNull(rating || null);

                        callback();
                    }
                );
            }
        ], done);
    }

    testGetWithFilter(done) {
        async.series([
            // Create Ratings
            (callback) => {
                this.testCreateRatings(callback);
            },
            // Get Ratings by ids
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
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        ], done);
    }

}
