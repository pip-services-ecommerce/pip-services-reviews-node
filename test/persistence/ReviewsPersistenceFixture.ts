// let _ = require('lodash');
// let async = require('async');
// let assert = require('chai').assert;

// import { FilterParams } from 'pip-services3-commons-node';
// import { PagingParams } from 'pip-services3-commons-node';

// import { ReviewV1 } from '../../src/data/version1/ReviewV1';
// import { ReviewTypeV1 } from '../../src/data/version1/ReviewTypeV1';
// import { ReviewStateV1 } from '../../src/data/version1/ReviewStateV1';

// import { IReviewsPersistence } from '../../src/persistence/IReviewsPersistence';
// import { RatingV1 } from '../../src/data/version1/RatingV1';

// let REVIEW1: ReviewV1 = {
//     id: '1',
//     customer_id: '1',
//     type: ReviewTypeV1.Visa,
//     number: '4032036094894795',
//     expire_month: 1,
//     expire_year: 2021,
//     first_name: 'Bill',
//     last_name: 'Gates',
//     billing_address: {
//         line1: '2345 Swan Rd',
//         city: 'Tucson',
//         state: 'AZ',
//         postal_code: '85710',
//         country_code: 'US'
//     },
//     ccv: '213',
//     name: 'Test Review 1',
//     saved: true,
//     default: true,
//     state: ReviewStateV1.Ok
// };
// let REVIEW2: ReviewV1 = {
//     id: '2',
//     customer_id: '1',
//     type: ReviewTypeV1.Visa,
//     number: '4032037578262780',
//     expire_month: 4,
//     expire_year: 2028,
//     first_name: 'Joe',
//     last_name: 'Dow',
//     billing_address: {
//         line1: '123 Broadway Blvd',
//         city: 'New York',
//         state: 'NY',
//         postal_code: '123001',
//         country_code: 'US'
//     },
//     name: 'Test Review 2',
//     saved: true,
//     default: false,
//     state: ReviewStateV1.Expired
// };
// let REVIEW3: ReviewV1 = {
//     id: '3',
//     customer_id: '2',
//     type: ReviewTypeV1.Visa,
//     number: '4032037578262780',
//     expire_month: 5,
//     expire_year: 2022,
//     first_name: 'Steve',
//     last_name: 'Jobs',
//     billing_address: {
//         line1: '234 6th Str',
//         city: 'Los Angeles',
//         state: 'CA',
//         postal_code: '65320',
//         country_code: 'US'
//     },
//     ccv: '124',
//     name: 'Test Review 2',
//     state: ReviewStateV1.Ok
// };

// export class ReviewsPersistenceFixture {
//     private _persistence: IReviewsPersistence;
    
//     constructor(persistence) {
//         assert.isNotNull(persistence);
//         this._persistence = persistence;
//     }

//     private testCreateReviews(done) {
//         async.series([
//         // Create one Review
//             (callback) => {
//                 this._persistence.create(
//                     null,
//                     REVIEW1,
//                     (err, review) => {
//                         assert.isNull(err);

//                         assert.isObject(review);
//                         assert.equal(review.first_name, REVIEW1.first_name);
//                         assert.equal(review.last_name, REVIEW1.last_name);
//                         assert.equal(review.expire_year, REVIEW1.expire_year);
//                         assert.equal(review.customer_id, REVIEW1.customer_id);

//                         callback();
//                     }
//                 );
//             },
//         // Create another Review
//             (callback) => {
//                 this._persistence.create(
//                     null,
//                     REVIEW2,
//                     (err, review) => {
//                         assert.isNull(err);

//                         assert.isObject(review);
//                         assert.equal(review.first_name, REVIEW2.first_name);
//                         assert.equal(review.last_name, REVIEW2.last_name);
//                         assert.equal(review.expire_year, REVIEW2.expire_year);
//                         assert.equal(review.customer_id, REVIEW2.customer_id);

//                         callback();
//                     }
//                 );
//             },
//         // Create yet another Review
//             (callback) => {
//                 this._persistence.create(
//                     null,
//                     REVIEW3,
//                     (err, review) => {
//                         assert.isNull(err);

//                         assert.isObject(review);
//                         assert.equal(review.first_name, REVIEW3.first_name);
//                         assert.equal(review.last_name, REVIEW3.last_name);
//                         assert.equal(review.expire_year, REVIEW3.expire_year);
//                         assert.equal(review.customer_id, REVIEW3.customer_id);

//                         callback();
//                     }
//                 );
//             }
//         ], done);
//     }
                
//     testCrudOperations(done) {
//         let review1: ReviewV1;

//         async.series([
//         // Create items
//             (callback) => {
//                 this.testCreateReviews(callback);
//             },
//         // Get all Reviews
//             (callback) => {
//                 this._persistence.getPageByFilter(
//                     null,
//                     new FilterParams(),
//                     new PagingParams(),
//                     (err, page) => {
//                         assert.isNull(err);

//                         assert.isObject(page);
//                         assert.lengthOf(page.data, 3);

//                         review1 = page.data[0];

//                         callback();
//                     }
//                 );
//             },
//         // Update the Review
//             (callback) => {
//                 review1.name = 'Updated Review 1';

//                 this._persistence.update(
//                     null,
//                     review1,
//                     (err, review) => {
//                         assert.isNull(err);

//                         assert.isObject(review);
//                         assert.equal(review.name, 'Updated Review 1');
//                         // PayPal changes id on update
//                         //!!assert.equal(review.id, review1.id);

//                         review1 = review;

//                         callback();
//                     }
//                 );
//             },
//         // Delete Review
//             (callback) => {
//                 this._persistence.deleteById(
//                     null,
//                     review1.id,
//                     (err) => {
//                         assert.isNull(err);

//                         callback();
//                     }
//                 );
//             },
//         // Try to get delete Review
//             (callback) => {
//                 this._persistence.getOneById(
//                     null,
//                     review1.id,
//                     (err, review) => {
//                         assert.isNull(err);

//                         assert.isNull(review || null);

//                         callback();
//                     }
//                 );
//             }
//         ], done);
//     }

//     testGetWithFilter(done) {
//         async.series([
//         // Create Reviews
//             (callback) => {
//                 this.testCreateReviews(callback);
//             },
//         // Get Reviews filtered by customer id
//             (callback) => {
//                 this._persistence.getPageByFilter(
//                     null,
//                     FilterParams.fromValue({
//                         customer_id: '1'
//                     }),
//                     new PagingParams(),
//                     (err, page) => {
//                         assert.isNull(err);

//                         assert.isObject(page);
//                         assert.lengthOf(page.data, 2);

//                         callback();
//                     }
//                 );
//             },
//         // Get Reviews by state
//             (callback) => {
//                 this._persistence.getPageByFilter(
//                     null,
//                     FilterParams.fromValue({
//                         state: 'ok'
//                     }),
//                     new PagingParams(),
//                     (err, page) => {
//                         assert.isNull(err);

//                         assert.isObject(page);
//                         // PayPal calculate states by itself
//                         //assert.lengthOf(page.data, 2);

//                         callback();
//                     }
//                 );
//             },
//         // Get Reviews by saved
//             (callback) => {
//                 this._persistence.getPageByFilter(
//                     null,
//                     FilterParams.fromValue({
//                         saved: true
//                     }),
//                     new PagingParams(),
//                     (err, page) => {
//                         assert.isNull(err);

//                         assert.isObject(page);
//                         assert.lengthOf(page.data, 2);

//                         callback();
//                     }
//                 );
//             },
//         // Get Reviews by ids
//             (callback) => {
//                 this._persistence.getPageByFilter(
//                     null,
//                     FilterParams.fromValue({
//                         ids: ['1', '3']
//                     }),
//                     new PagingParams(),
//                     (err, page) => {
//                         assert.isNull(err);

//                         assert.isObject(page);
//                         // PayPal manages ids by itself
//                         //assert.lengthOf(page.data, 2);

//                         callback();
//                     }
//                 );
//             },
//         ], done);
//     }

// }
