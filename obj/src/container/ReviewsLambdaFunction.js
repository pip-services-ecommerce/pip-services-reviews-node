"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_aws_node_1 = require("pip-services3-aws-node");
const ReviewsServiceFactory_1 = require("../build/ReviewsServiceFactory");
class ReviewsLambdaFunction extends pip_services3_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("reviews", "Reviews function");
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-reviews', 'controller', 'default', '*', '*'));
        this._factories.add(new ReviewsServiceFactory_1.ReviewsServiceFactory());
    }
}
exports.ReviewsLambdaFunction = ReviewsLambdaFunction;
exports.handler = new ReviewsLambdaFunction().getHandler();
//# sourceMappingURL=ReviewsLambdaFunction.js.map