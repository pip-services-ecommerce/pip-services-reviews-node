// import { Descriptor } from 'pip-services3-commons-node';
// import { CommandableLambdaFunction } from 'pip-services3-aws-node';
// import { ReviewsServiceFactory } from '../build/ReviewsServiceFactory';

// export class ReviewsLambdaFunction extends CommandableLambdaFunction {
//     public constructor() {
//         super("reviews", "Reviews function");
//         this._dependencyResolver.put('controller', new Descriptor('pip-services-reviews', 'controller', 'default', '*', '*'));
//         this._factories.add(new ReviewsServiceFactory());
//     }
// }

// export const handler = new ReviewsLambdaFunction().getHandler();