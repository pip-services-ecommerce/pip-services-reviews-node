import { ConfigParams } from 'pip-services3-commons-node';
import { JsonFilePersister } from 'pip-services3-data-node';
import { ReviewsMemoryPersistence } from './ReviewsMemoryPersistence';
import { ReviewV1 } from '../data/version1/ReviewV1';
export declare class ReviewsFilePersistence extends ReviewsMemoryPersistence {
    protected _persister: JsonFilePersister<ReviewV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
