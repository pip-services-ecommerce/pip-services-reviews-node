import { CommandSet } from 'pip-services3-commons-node';
import { ICommand } from 'pip-services3-commons-node';
import { Command } from 'pip-services3-commons-node';
import { Parameters } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { FilterParamsSchema } from 'pip-services3-commons-node';
import { PagingParamsSchema } from 'pip-services3-commons-node';

import { ReviewV1 } from '../data/version1/ReviewV1';
import { ReviewV1Schema } from '../data/version1/ReviewV1Schema';
import { IReviewsController } from './IReviewsController';

export class ReviewsCommandSet extends CommandSet {
    private _logic: IReviewsController;

    constructor(logic: IReviewsController) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetReviewsCommand());
        this.addCommand(this.makeGetReviewByIdCommand());
        this.addCommand(this.makeGetPartyReviewCommand());
        this.addCommand(this.makeGetProductRatingCommand());
        this.addCommand(this.makeSubmitReviewCommand());
        this.addCommand(this.makeUpdateReviewCommand());
        this.addCommand(this.makeReportHelpfulCommand());
        this.addCommand(this.makeReportAbuseCommand());
		this.addCommand(this.makeDeleteReviewByIdCommand());
    }

	private makeGetReviewsCommand(): ICommand {
		return new Command(
			"get_reviews",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                this._logic.getReviews(correlationId, filter, paging, null, callback);
            }
		);
	}

	private makeGetReviewByIdCommand(): ICommand {
		return new Command(
			"get_review_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('review_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let reviewId = args.getAsString("review_id");
                this._logic.getReviewById(correlationId, reviewId, callback);
            }
		);
	}

	private makeGetPartyReviewCommand(): ICommand {
		return new Command(
			"get_party_review",
			new ObjectSchema(true)
                .withRequiredProperty('party_id', TypeCode.String)
                .withRequiredProperty('product_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let partyId = args.getAsString("party_id");
                let productId = args.getAsString("product_id");
                this._logic.getPartyReview(correlationId, partyId, productId, callback);
            }
		);
    }
    
	private makeGetProductRatingCommand(): ICommand {
		return new Command(
			"get_product_rating",
			new ObjectSchema(true)
                .withRequiredProperty('product_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let productId = args.getAsString("product_id");
                this._logic.getProductRating(correlationId, productId, callback);
            }
		);
    }

	private makeSubmitReviewCommand(): ICommand {
		return new Command(
			"submit_review",
			new ObjectSchema(true)
				.withRequiredProperty('review', new ReviewV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let review = args.get("review");
                this._logic.submitReview(correlationId, review, callback);
            }
		);
    }
    
    private makeUpdateReviewCommand(): ICommand {
		return new Command(
			"update_review",
			new ObjectSchema(true)
				.withRequiredProperty('review', new ReviewV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let review = args.get("review");
                this._logic.updateReview(correlationId, review, callback);
            }
		);
	}

	private makeReportHelpfulCommand(): ICommand {
		return new Command(
			"report_helpful",
			new ObjectSchema(true)
                .withRequiredProperty('review_id', TypeCode.String)
                .withRequiredProperty('party_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let reviewId = args.get("review_id");
                let partyId = args.get("party_id");
                this._logic.reportHelpful(correlationId, reviewId, partyId, callback);
            }
		);
    }
    
	private makeReportAbuseCommand(): ICommand {
		return new Command(
			"report_abuse",
			new ObjectSchema(true)
                .withRequiredProperty('review_id', TypeCode.String)
                .withRequiredProperty('party_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let reviewId = args.get("review_id");
                let partyId = args.get("party_id");
                this._logic.reportAbuse(correlationId, reviewId, partyId, callback);
            }
		);
	}
	
	private makeDeleteReviewByIdCommand(): ICommand {
		return new Command(
			"delete_review_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('review_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let reviewId = args.getAsNullableString("review_id");
                this._logic.deleteReviewById(correlationId, reviewId, callback);
			}
		);
	}
}