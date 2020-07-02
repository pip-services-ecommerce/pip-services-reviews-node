// import { Factory } from 'pip-services3-components-node';
// import { Descriptor } from 'pip-services3-commons-node';

// import { ReviewsMongoDbPersistence } from '../persistence/ReviewsMongoDbPersistence';
// import { ReviewsFilePersistence } from '../persistence/ReviewsFilePersistence';
// import { ReviewsMemoryPersistence } from '../persistence/ReviewsMemoryPersistence';
// import { ReviewsController } from '../logic/ReviewsController';
// import { ReviewsHttpServiceV1 } from '../services/version1/ReviewsHttpServiceV1';

// export class ReviewsServiceFactory extends Factory {
// 	public static Descriptor = new Descriptor("pip-services-reviews", "factory", "default", "default", "1.0");
// 	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-reviews", "persistence", "memory", "*", "1.0");
// 	public static FilePersistenceDescriptor = new Descriptor("pip-services-reviews", "persistence", "file", "*", "1.0");
// 	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-reviews", "persistence", "mongodb", "*", "1.0");
// 	public static ControllerDescriptor = new Descriptor("pip-services-reviews", "controller", "default", "*", "1.0");
// 	public static HttpServiceDescriptor = new Descriptor("pip-services-reviews", "service", "http", "*", "1.0");
	
// 	constructor() {
// 		super();
// 		this.registerAsType(ReviewsServiceFactory.MemoryPersistenceDescriptor, ReviewsMemoryPersistence);
// 		this.registerAsType(ReviewsServiceFactory.FilePersistenceDescriptor, ReviewsFilePersistence);
// 		this.registerAsType(ReviewsServiceFactory.MongoDbPersistenceDescriptor, ReviewsMongoDbPersistence);
// 		this.registerAsType(ReviewsServiceFactory.ControllerDescriptor, ReviewsController);
// 		this.registerAsType(ReviewsServiceFactory.HttpServiceDescriptor, ReviewsHttpServiceV1);
// 	}
	
// }
