// let _ = require('lodash');

// import { FilterParams } from 'pip-services3-commons-node';
// import { PagingParams } from 'pip-services3-commons-node';
// import { DataPage } from 'pip-services3-commons-node';
// import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';
// import { TagsProcessor } from 'pip-services3-commons-node';

// import { ReviewV1 } from '../data/version1/ReviewV1';
// import { IReviewsPersistence } from './IReviewsPersistence';

// export class ReviewsMemoryPersistence 
//     extends IdentifiableMemoryPersistence<ReviewV1, string> 
//     implements IReviewsPersistence {

//     constructor() {
//         super();
//     }

//     private contains(array1, array2) {
//         if (array1 == null || array2 == null) return false;
        
//         for (let i1 = 0; i1 < array1.length; i1++) {
//             for (let i2 = 0; i2 < array2.length; i2++)
//                 if (array1[i1] == array2[i1]) 
//                     return true;
//         }
        
//         return false;
//     }
    
//     private composeFilter(filter: FilterParams): any {
//         filter = filter || new FilterParams();
        
//         let id = filter.getAsNullableString('id');
//         let state = filter.getAsNullableString('state');
//         let customerId = filter.getAsNullableString('customer_id');
//         let saved = filter.getAsNullableBoolean('saved');
//         let ids = filter.getAsObject('ids');
                
//         // Process ids filter
//         if (_.isString(ids))
//             ids = ids.split(',');
//         if (!_.isArray(ids))
//             ids = null;
        
//         return (item) => {
//             if (id && item.id != id) 
//                 return false;
//             if (ids && _.indexOf(ids, item.id) < 0)
//                 return false;
//             if (state && item.state != state) 
//                 return false;
//             if (customerId && item.customer_id != customerId) 
//                 return false;
//             if (saved != null && item.saved != saved) 
//                 return false;
//             return true; 
//         };
//     }

//     public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
//         callback: (err: any, page: DataPage<ReviewV1>) => void): void {
//         super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
//     }

// }
