"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_container_node_1 = require("pip-services3-container-node");
const ReviewsServiceFactory_1 = require("../build/ReviewsServiceFactory");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class ReviewsProcess extends pip_services3_container_node_1.ProcessContainer {
    constructor() {
        super("reviews", "Reviews microservice");
        this._factories.add(new ReviewsServiceFactory_1.ReviewsServiceFactory);
        this._factories.add(new pip_services3_rpc_node_1.DefaultRpcFactory);
    }
}
exports.ReviewsProcess = ReviewsProcess;
//# sourceMappingURL=ReviewsProcess.js.map