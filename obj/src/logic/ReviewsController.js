"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsController = void 0;
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const ReviewsCommandSet_1 = require("./ReviewsCommandSet");
class ReviewsController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_node_2.DependencyResolver(ReviewsController._defaultConfig);
        this._dependencyResolver.put('reviews-persistence', new pip_services3_commons_node_1.Descriptor('pip-services-reviews', 'persistence', '*', 'reviews', '1.0'));
        this._dependencyResolver.put('ratings-persistence', new pip_services3_commons_node_1.Descriptor('pip-services-reviews', 'persistence', '*', 'ratings', '1.0'));
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._reviewsPersistence = this._dependencyResolver.getOneRequired('reviews-persistence');
        this._ratingsPersistence = this._dependencyResolver.getOneRequired('ratings-persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new ReviewsCommandSet_1.ReviewsCommandSet(this);
        return this._commandSet;
    }
    getReviews(correlationId, filter, paging, sorting, callback) {
        this._reviewsPersistence.getPageByFilter(correlationId, filter, paging, callback);
    }
    getReviewById(correlationId, reviewId, callback) {
        this._reviewsPersistence.getOneById(correlationId, reviewId, (err, review) => {
            callback(err, review);
        });
    }
    getPartyReview(correlationId, partyId, productId, callback) {
        this._reviewsPersistence.getPageByFilter(correlationId, pip_services3_commons_node_3.FilterParams.fromValue({
            party_id: partyId,
            product_id: productId
        }), null, (err, page) => {
            let review = page && page.data.length > 0 ? page.data[0] : null;
            if (callback)
                callback(err, review);
        });
    }
    getProductRating(correlationId, productId, callback) {
        this._ratingsPersistence.getOneById(correlationId, productId, callback);
    }
    submitReview(correlationId, review, callback) {
        var _a;
        let rating;
        review.id = (_a = review.id) !== null && _a !== void 0 ? _a : pip_services3_commons_node_1.IdGenerator.nextLong();
        review.create_time = new Date(Date.now());
        review.update_time = new Date(Date.now());
        async.series([
            (callback) => {
                this._reviewsPersistence.create(correlationId, review, (err, review) => {
                    callback(err);
                });
            },
            (callback) => {
                this._ratingsPersistence.increment(correlationId, review.product_id, review.rating, (err, data) => {
                    rating = data;
                    callback(err);
                });
            },
        ], (err) => {
            callback(err, rating);
        });
    }
    updateReview(correlationId, review, callback) {
        let oldRating = 0;
        let rating;
        async.series([
            (callback) => {
                this._reviewsPersistence.getOneById(correlationId, review.id, (err, data) => {
                    if (err != null || data == null) {
                        err = new pip_services3_commons_node_1.NotFoundException(correlationId, 'NOT_FOUND', 'Review ' + review.id + ' was not found');
                        callback(err);
                        return;
                    }
                    oldRating = data.rating;
                    callback(err);
                });
            },
            (callback) => {
                this._ratingsPersistence.decrement(correlationId, review.product_id, oldRating, (err, data) => {
                    callback(err);
                });
            },
            (callback) => {
                review.update_time = new Date(Date.now());
                this._reviewsPersistence.update(correlationId, review, (err, data) => {
                    callback(err);
                });
            },
            (callback) => {
                this._ratingsPersistence.increment(correlationId, review.product_id, review.rating, (err, data) => {
                    rating = data;
                    callback(err);
                });
            },
        ], (err) => {
            callback(err, rating);
        });
    }
    reportHelpful(correlationId, reviewId, partyId, callback) {
        let review;
        async.series([
            (callback) => {
                this._reviewsPersistence.getOneById(correlationId, reviewId, (err, data) => {
                    review = data;
                    callback(err);
                });
            },
            (callback) => {
                var _a;
                review.update_time = new Date(Date.now());
                review.helpful_count = ((_a = review.helpful_count) !== null && _a !== void 0 ? _a : 0) + 1;
                this._reviewsPersistence.update(correlationId, review, (err, data) => {
                    callback(err);
                });
            }
        ], (err) => {
            callback(err, review);
        });
    }
    reportAbuse(correlationId, reviewId, partyId, callback) {
        let review;
        async.series([
            (callback) => {
                this._reviewsPersistence.getOneById(correlationId, reviewId, (err, data) => {
                    review = data;
                    callback(err);
                });
            },
            (callback) => {
                var _a;
                review.update_time = new Date(Date.now());
                review.abuse_count = ((_a = review.abuse_count) !== null && _a !== void 0 ? _a : 0) + 1;
                this._reviewsPersistence.update(correlationId, review, (err, data) => {
                    callback(err);
                });
            }
        ], (err) => {
            callback(err, review);
        });
    }
    deleteReviewById(correlationId, reviewId, callback) {
        let rating;
        let review;
        async.series([
            (callback) => {
                this._reviewsPersistence.deleteById(correlationId, reviewId, (err, data) => {
                    review = data;
                    callback(err);
                });
            },
            (callback) => {
                this._ratingsPersistence.decrement(correlationId, review.product_id, review.rating, (err, data) => {
                    rating = data;
                    callback(err);
                });
            },
        ], (err) => {
            callback(err, rating);
        });
    }
}
exports.ReviewsController = ReviewsController;
ReviewsController._defaultConfig = pip_services3_commons_node_1.ConfigParams.fromTuples('dependencies.persistence', 'pip-services-reviews:persistence:*:*:1.0');
//# sourceMappingURL=ReviewsController.js.map