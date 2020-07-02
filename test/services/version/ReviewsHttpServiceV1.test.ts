// let _ = require('lodash');
// let async = require('async');
// let restify = require('restify');
// let assert = require('chai').assert;

// import { ConfigParams } from 'pip-services3-commons-node';
// import { Descriptor } from 'pip-services3-commons-node';
// import { References } from 'pip-services3-commons-node';

// import { ReviewV1 } from '../../../src/data/version1/ReviewV1';
// import { ReviewTypeV1 } from '../../../src/data/version1/ReviewTypeV1';
// import { ReviewStateV1 } from '../../../src/data/version1/ReviewStateV1';
// import { ReviewsMemoryPersistence } from '../../../src/persistence/ReviewsMemoryPersistence';
// import { ReviewsController } from '../../../src/logic/ReviewsController';
// import { ReviewsHttpServiceV1 } from '../../../src/services/version1/ReviewsHttpServiceV1';

// let httpConfig = ConfigParams.fromTuples(
//     "connection.protocol", "http",
//     "connection.host", "localhost",
//     "connection.port", 3000
// );

// let REVIEW1: ReviewV1 = {
//     id: '1',
//     customer_id: '1',
//     type: ReviewTypeV1.Visa,
//     number: '1111111111111111',
//     expire_month: 1,
//     expire_year: 2021,
//     first_name: 'Bill',
//     last_name: 'Gates',
//     billing_address: {
//         line1: '2345 Swan Rd',
//         city: 'Tucson',
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
//     number: '2222222222222222',
//     expire_month: 4,
//     expire_year: 2028,
//     first_name: 'Joe',
//     last_name: 'Dow',
//     billing_address: {
//         line1: '123 Broadway Blvd',
//         city: 'New York',
//         postal_code: '123001',
//         country_code: 'US'
//     },
//     name: 'Test Review 2',
//     saved: true,
//     default: false,
//     state: ReviewStateV1.Expired
// };


// suite('ReviewsHttpServiceV1', ()=> {    
//     let service: ReviewsHttpServiceV1;
//     let rest: any;

//     suiteSetup((done) => {
//         let persistence = new ReviewsMemoryPersistence();
//         let controller = new ReviewsController();

//         service = new ReviewsHttpServiceV1();
//         service.configure(httpConfig);

//         let references: References = References.fromTuples(
//             new Descriptor('pip-services-reviews', 'persistence', 'memory', 'default', '1.0'), persistence,
//             new Descriptor('pip-services-reviews', 'controller', 'default', 'default', '1.0'), controller,
//             new Descriptor('pip-services-reviews', 'service', 'http', 'default', '1.0'), service
//         );
//         controller.setReferences(references);
//         service.setReferences(references);

//         service.open(null, done);
//     });
    
//     suiteTeardown((done) => {
//         service.close(null, done);
//     });

//     setup(() => {
//         let url = 'http://localhost:3000';
//         rest = restify.createJsonClient({ url: url, version: '*' });
//     });
    
    
//     test('CRUD Operations', (done) => {
//         let review1, review2: ReviewV1;

//         async.series([
//         // Create one Review
//             (callback) => {
//                 rest.post('/v1/reviews/create_review',
//                     {
//                         review: REVIEW1
//                     },
//                     (err, req, res, review) => {
//                         assert.isNull(err);

//                         assert.isObject(review);
//                         assert.equal(review.number, REVIEW1.number);
//                         assert.equal(review.expire_year, REVIEW1.expire_year);
//                         assert.equal(review.customer_id, REVIEW1.customer_id);

//                         review1 = review;

//                         callback();
//                     }
//                 );
//             },
//         // Create another Review
//             (callback) => {
//                 rest.post('/v1/reviews/create_review', 
//                     {
//                         review: REVIEW2
//                     },
//                     (err, req, res, review) => {
//                         assert.isNull(err);

//                         assert.isObject(review);
//                         assert.equal(review.number, REVIEW2.number);
//                         assert.equal(review.expire_year, REVIEW2.expire_year);
//                         assert.equal(review.customer_id, REVIEW2.customer_id);

//                         review2 = review;

//                         callback();
//                     }
//                 );
//             },
//         // Get all Reviews
//             (callback) => {
//                 rest.post('/v1/reviews/get_reviews',
//                     {},
//                     (err, req, res, page) => {
//                         assert.isNull(err);

//                         assert.isObject(page);
//                         assert.lengthOf(page.data, 2);

//                         callback();
//                     }
//                 );
//             },
//         // Update the Review
//             (callback) => {
//                 review1.name = 'Updated Review 1';

//                 rest.post('/v1/reviews/update_review',
//                     { 
//                         review: review1
//                     },
//                     (err, req, res, review) => {
//                         assert.isNull(err);

//                         assert.isObject(review);
//                         assert.equal(review.name, 'Updated Review 1');
//                         assert.equal(review.id, REVIEW1.id);

//                         review1 = review;

//                         callback();
//                     }
//                 );
//             },
//         // Delete Review
//             (callback) => {
//                 rest.post('/v1/reviews/delete_review_by_id',
//                     {
//                         review_id: review1.id,
//                         customer_id: review1.customer_id
//                     },
//                     (err, req, res, result) => {
//                         assert.isNull(err);

//                         //assert.isNull(result);

//                         callback();
//                     }
//                 );
//             },
//         // Try to get delete Review
//             (callback) => {
//                 rest.post('/v1/reviews/get_review_by_id',
//                     {
//                         review_id: review1.id,
//                         customer_id: review1.customer_id
//                     },
//                     (err, req, res, result) => {
//                         assert.isNull(err);

//                         //assert.isNull(result);

//                         callback();
//                     }
//                 );
//             }
//         ], done);
//     });
// });