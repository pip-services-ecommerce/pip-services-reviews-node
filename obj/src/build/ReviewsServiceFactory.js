"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsServiceFactory = void 0;
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const ReviewsMongoDbPersistence_1 = require("../persistence/ReviewsMongoDbPersistence");
const ReviewsFilePersistence_1 = require("../persistence/ReviewsFilePersistence");
const ReviewsMemoryPersistence_1 = require("../persistence/ReviewsMemoryPersistence");
const RatingsMemoryPersistence_1 = require("../persistence/RatingsMemoryPersistence");
const RatingsFilePersistence_1 = require("../persistence/RatingsFilePersistence");
const RatingsMongoDbPersistence_1 = require("../persistence/RatingsMongoDbPersistence");
const ReviewsController_1 = require("../logic/ReviewsController");
const ReviewsHttpServiceV1_1 = require("../services/version1/ReviewsHttpServiceV1");
class ReviewsServiceFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(ReviewsServiceFactory.ReviewsMemoryPersistenceDescriptor, ReviewsMemoryPersistence_1.ReviewsMemoryPersistence);
        this.registerAsType(ReviewsServiceFactory.ReviewsFilePersistenceDescriptor, ReviewsFilePersistence_1.ReviewsFilePersistence);
        this.registerAsType(ReviewsServiceFactory.ReviewsMongoDbPersistenceDescriptor, ReviewsMongoDbPersistence_1.ReviewsMongoDbPersistence);
        this.registerAsType(ReviewsServiceFactory.RatingsMemoryPersistenceDescriptor, RatingsMemoryPersistence_1.RatingsMemoryPersistence);
        this.registerAsType(ReviewsServiceFactory.RatingsFilePersistenceDescriptor, RatingsFilePersistence_1.RatingsFilePersistence);
        this.registerAsType(ReviewsServiceFactory.RatingsMongoDbPersistenceDescriptor, RatingsMongoDbPersistence_1.RatingsMongoDbPersistence);
        this.registerAsType(ReviewsServiceFactory.ControllerDescriptor, ReviewsController_1.ReviewsController);
        this.registerAsType(ReviewsServiceFactory.HttpServiceDescriptor, ReviewsHttpServiceV1_1.ReviewsHttpServiceV1);
    }
}
exports.ReviewsServiceFactory = ReviewsServiceFactory;
ReviewsServiceFactory.Descriptor = new pip_services3_commons_node_1.Descriptor("pip-services-reviews", "factory", "default", "default", "1.0");
ReviewsServiceFactory.ReviewsMemoryPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-reviews", "persistence", "memory", "reviews", "1.0");
ReviewsServiceFactory.ReviewsFilePersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-reviews", "persistence", "file", "reviews", "1.0");
ReviewsServiceFactory.ReviewsMongoDbPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-reviews", "persistence", "mongodb", "reviews", "1.0");
ReviewsServiceFactory.RatingsMemoryPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-reviews", "persistence", "memory", "ratings", "1.0");
ReviewsServiceFactory.RatingsFilePersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-reviews", "persistence", "file", "ratings", "1.0");
ReviewsServiceFactory.RatingsMongoDbPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-reviews", "persistence", "mongodb", "ratings", "1.0");
ReviewsServiceFactory.ControllerDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-reviews", "controller", "default", "*", "1.0");
ReviewsServiceFactory.HttpServiceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-reviews", "service", "http", "*", "1.0");
//# sourceMappingURL=ReviewsServiceFactory.js.map