import { Descriptor } from 'pip-services3-commons-node';
import { CommandableHttpService } from 'pip-services3-rpc-node';

export class ReviewsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/reviews');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-reviews', 'controller', 'default', '*', '1.0'));
    }
}