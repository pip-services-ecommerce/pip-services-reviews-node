// let async = require('async');

// import { ConfigParams } from 'pip-services3-commons-node';
// import { IConfigurable } from 'pip-services3-commons-node';
// import { IReferences } from 'pip-services3-commons-node';
// import { Descriptor } from 'pip-services3-commons-node';
// import { IReferenceable } from 'pip-services3-commons-node';
// import { DependencyResolver } from 'pip-services3-commons-node';
// import { FilterParams } from 'pip-services3-commons-node';
// import { PagingParams } from 'pip-services3-commons-node';
// import { DataPage } from 'pip-services3-commons-node';
// import { ICommandable } from 'pip-services3-commons-node';
// import { CommandSet } from 'pip-services3-commons-node';
// import { BadRequestException } from 'pip-services3-commons-node';

// import { ReviewV1 } from '../data/version1/ReviewV1';
// import { ReviewStateV1 } from '../data/version1/ReviewStateV1';
// import { IReviewsPersistence } from '../persistence/IReviewsPersistence';
// import { IReviewsController } from './IReviewsController';
// import { ReviewsCommandSet } from './ReviewsCommandSet';
// import { UnauthorizedException } from 'pip-services3-commons-node/obj/src/errors/UnauthorizedException';

// export class ReviewsController implements  IConfigurable, IReferenceable, ICommandable, IReviewsController {
//     private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
//         'dependencies.persistence', 'pip-services-reviews:persistence:*:*:1.0'
//     );

//     private _dependencyResolver: DependencyResolver = new DependencyResolver(ReviewsController._defaultConfig);
//     private _persistence: IReviewsPersistence;
//     private _commandSet: ReviewsCommandSet;

//     public configure(config: ConfigParams): void {
//         this._dependencyResolver.configure(config);
//     }

//     public setReferences(references: IReferences): void {
//         this._dependencyResolver.setReferences(references);
//         this._persistence = this._dependencyResolver.getOneRequired<IReviewsPersistence>('persistence');
//     }

//     public getCommandSet(): CommandSet {
//         if (this._commandSet == null)
//             this._commandSet = new ReviewsCommandSet(this);
//         return this._commandSet;
//     }
    
//     public getReviews(correlationId: string, filter: FilterParams, paging: PagingParams, 
//         callback: (err: any, page: DataPage<ReviewV1>) => void): void {
//         this._persistence.getPageByFilter(correlationId, filter, paging, callback);
//     }

//     public getReviewById(correlationId: string, id: string, customerId: string,
//         callback: (err: any, review: ReviewV1) => void): void {
//         this._persistence.getOneById(correlationId, id, (err, review) => {
//             // Do not allow to access review of different customer
//             if (review && review.customer_id != customerId)
//                 review = null;
            
//             callback(err, review);
//         });
//     }

//     public createReview(correlationId: string, review: ReviewV1, 
//         callback: (err: any, review: ReviewV1) => void): void {

//         review.state = review.state || ReviewStateV1.Ok;
//         review.create_time = new Date();
//         review.update_time = new Date();

//         this._persistence.create(correlationId, review, callback);
//     }

//     public updateReview(correlationId: string, review: ReviewV1, 
//         callback: (err: any, review: ReviewV1) => void): void {

//         let newReview: ReviewV1;

//         review.state = review.state || ReviewStateV1.Ok;
//         review.update_time = new Date();
    
//         async.series([
//             (callback) => {
//                 this._persistence.getOneById(correlationId, review.id, (err, data) => {
//                     if (err == null && data && data.customer_id != review.customer_id) {
//                         err = new BadRequestException(correlationId, 'WRONG_CUST_ID', 'Wrong Review customer id')
//                             .withDetails('id', review.id)
//                             .withDetails('customer_id', review.customer_id);
//                     }
//                     callback(err);
//                 });
//             },
//             (callback) => {
//                 this._persistence.update(correlationId, review, (err, data) => {
//                     newReview = data;
//                     callback(err);
//                 });
//             }
//         ], (err) => {
//             callback(err, newReview);
//         });
//     }

//     public deleteReviewById(correlationId: string, id: string, customerId: string,
//         callback: (err: any, review: ReviewV1) => void): void {  

//         let oldReview: ReviewV1;

//         async.series([
//             (callback) => {
//                 this._persistence.getOneById(correlationId, id, (err, data) => {
//                     if (err == null && data && data.customer_id != customerId) {
//                         err = new BadRequestException(correlationId, 'WRONG_CUST_ID', 'Wrong Review customer id')
//                             .withDetails('id', id)
//                             .withDetails('customer_id', customerId);
//                     }
//                     callback(err);
//                 });
//             },
//             (callback) => {
//                 this._persistence.deleteById(correlationId, id, (err, data) => {
//                     oldReview = data;
//                     callback(err);
//                 });
//             }
//         ], (err) => {
//             if (callback) callback(err, oldReview);
//         });
//     }

// }
