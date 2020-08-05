import { IReferences } from 'pip-services3-commons-node';
import { ProcessContainer } from 'pip-services3-container-node';

import { ReviewsServiceFactory } from '../build/ReviewsServiceFactory';
import { DefaultRpcFactory } from 'pip-services3-rpc-node';

export class ReviewsProcess extends ProcessContainer {

    public constructor() {
        super("reviews", "Reviews microservice");
        this._factories.add(new ReviewsServiceFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}
