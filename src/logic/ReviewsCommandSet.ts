// import { CommandSet } from 'pip-services3-commons-node';
// import { ICommand } from 'pip-services3-commons-node';
// import { Command } from 'pip-services3-commons-node';
// import { Schema } from 'pip-services3-commons-node';
// import { Parameters } from 'pip-services3-commons-node';
// import { FilterParams } from 'pip-services3-commons-node';
// import { PagingParams } from 'pip-services3-commons-node';
// import { ObjectSchema } from 'pip-services3-commons-node';
// import { TypeCode } from 'pip-services3-commons-node';
// import { FilterParamsSchema } from 'pip-services3-commons-node';
// import { PagingParamsSchema } from 'pip-services3-commons-node';

// import { ReviewV1 } from '../data/version1/ReviewV1';
// import { ReviewV1Schema } from '../data/version1/ReviewV1Schema';
// import { IReviewsController } from './IReviewsController';

// export class ReviewsCommandSet extends CommandSet {
//     private _logic: IReviewsController;

//     constructor(logic: IReviewsController) {
//         super();

//         this._logic = logic;

//         // Register commands to the database
// 		this.addCommand(this.makeGetReviewsCommand());
// 		this.addCommand(this.makeGetReviewByIdCommand());
// 		this.addCommand(this.makeCreateReviewCommand());
// 		this.addCommand(this.makeUpdateReviewCommand());
// 		this.addCommand(this.makeDeleteReviewByIdCommand());
//     }

// 	private makeGetReviewsCommand(): ICommand {
// 		return new Command(
// 			"get_reviews",
// 			new ObjectSchema(true)
// 				.withOptionalProperty('filter', new FilterParamsSchema())
// 				.withOptionalProperty('paging', new PagingParamsSchema()),
//             (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
//                 let filter = FilterParams.fromValue(args.get("filter"));
//                 let paging = PagingParams.fromValue(args.get("paging"));
//                 this._logic.getReviews(correlationId, filter, paging, callback);
//             }
// 		);
// 	}

// 	private makeGetReviewByIdCommand(): ICommand {
// 		return new Command(
// 			"get_review_by_id",
// 			new ObjectSchema(true)
// 				.withRequiredProperty('review_id', TypeCode.String)
// 				.withRequiredProperty('customer_id', TypeCode.String),
//             (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
//                 let reviewId = args.getAsString("review_id");
//                 let customerId = args.getAsString("customer_id");
//                 this._logic.getReviewById(correlationId, reviewId, customerId, callback);
//             }
// 		);
// 	}

// 	private makeCreateReviewCommand(): ICommand {
// 		return new Command(
// 			"create_review",
// 			new ObjectSchema(true)
// 				.withRequiredProperty('review', new ReviewV1Schema()),
//             (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
//                 let review = args.get("review");
//                 this._logic.createReview(correlationId, review, callback);
//             }
// 		);
// 	}

// 	private makeUpdateReviewCommand(): ICommand {
// 		return new Command(
// 			"update_review",
// 			new ObjectSchema(true)
// 				.withRequiredProperty('review', new ReviewV1Schema()),
//             (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
//                 let review = args.get("review");
//                 this._logic.updateReview(correlationId, review, callback);
//             }
// 		);
// 	}
	
// 	private makeDeleteReviewByIdCommand(): ICommand {
// 		return new Command(
// 			"delete_review_by_id",
// 			new ObjectSchema(true)
// 				.withRequiredProperty('review_id', TypeCode.String)
// 				.withRequiredProperty('customer_id', TypeCode.String),
//             (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
//                 let reviewId = args.getAsNullableString("review_id");
//                 let customerId = args.getAsString("customer_id");
//                 this._logic.deleteReviewById(correlationId, reviewId, customerId, callback);
// 			}
// 		);
// 	}

// }