"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
const pip_services3_commons_node_5 = require("pip-services3-commons-node");
const pip_services3_commons_node_6 = require("pip-services3-commons-node");
const pip_services3_commons_node_7 = require("pip-services3-commons-node");
const pip_services3_commons_node_8 = require("pip-services3-commons-node");
const ReviewV1Schema_1 = require("../data/version1/ReviewV1Schema");
class ReviewsCommandSet extends pip_services3_commons_node_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetReviewsCommand());
        this.addCommand(this.makeGetReviewByIdCommand());
        this.addCommand(this.makeGetPartyReviewCommand());
        this.addCommand(this.makeGetProductRatingCommand());
        this.addCommand(this.makeSubmitReviewCommand());
        this.addCommand(this.makeReportHelpfulCommand());
        this.addCommand(this.makeReportAbuseCommand());
        this.addCommand(this.makeDeleteReviewByIdCommand());
    }
    makeGetReviewsCommand() {
        return new pip_services3_commons_node_2.Command("get_reviews", new pip_services3_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_node_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_node_8.PagingParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services3_commons_node_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_node_4.PagingParams.fromValue(args.get("paging"));
            this._logic.getReviews(correlationId, filter, paging, null, callback);
        });
    }
    makeGetReviewByIdCommand() {
        return new pip_services3_commons_node_2.Command("get_review_by_id", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('review_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let reviewId = args.getAsString("review_id");
            this._logic.getReviewById(correlationId, reviewId, callback);
        });
    }
    makeGetPartyReviewCommand() {
        return new pip_services3_commons_node_2.Command("get_party_review", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('party_id', pip_services3_commons_node_6.TypeCode.String)
            .withRequiredProperty('product_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let partyId = args.getAsString("party_id");
            let productId = args.getAsString("product_id");
            this._logic.getPartyReview(correlationId, partyId, productId, callback);
        });
    }
    makeGetProductRatingCommand() {
        return new pip_services3_commons_node_2.Command("get_product_rating", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('product_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let productId = args.getAsString("product_id");
            this._logic.getProductRating(correlationId, productId, callback);
        });
    }
    makeSubmitReviewCommand() {
        return new pip_services3_commons_node_2.Command("submit_review", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('review', new ReviewV1Schema_1.ReviewV1Schema()), (correlationId, args, callback) => {
            let review = args.get("review");
            this._logic.submitReview(correlationId, review, callback);
        });
    }
    makeReportHelpfulCommand() {
        return new pip_services3_commons_node_2.Command("report_helpful", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('review_id', pip_services3_commons_node_6.TypeCode.String)
            .withRequiredProperty('party_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let reviewId = args.get("review_id");
            let partyId = args.get("party_id");
            this._logic.reportHelpful(correlationId, reviewId, partyId, callback);
        });
    }
    makeReportAbuseCommand() {
        return new pip_services3_commons_node_2.Command("report_abuse", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('review_id', pip_services3_commons_node_6.TypeCode.String)
            .withRequiredProperty('party_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let reviewId = args.get("review_id");
            let partyId = args.get("party_id");
            this._logic.reportAbuse(correlationId, reviewId, partyId, callback);
        });
    }
    makeDeleteReviewByIdCommand() {
        return new pip_services3_commons_node_2.Command("delete_review_by_id", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('review_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let reviewId = args.getAsNullableString("review_id");
            this._logic.deleteReviewById(correlationId, reviewId, callback);
        });
    }
}
exports.ReviewsCommandSet = ReviewsCommandSet;
//# sourceMappingURL=ReviewsCommandSet.js.map