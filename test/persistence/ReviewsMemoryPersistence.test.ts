// import { ConfigParams } from 'pip-services3-commons-node';

// import { ReviewsMemoryPersistence } from '../../src/persistence/ReviewsMemoryPersistence';
// import { ReviewsPersistenceFixture } from './ReviewsPersistenceFixture';

// suite('ReviewsMemoryPersistence', ()=> {
//     let persistence: ReviewsMemoryPersistence;
//     let fixture: ReviewsPersistenceFixture;
    
//     setup((done) => {
//         persistence = new ReviewsMemoryPersistence();
//         persistence.configure(new ConfigParams());
        
//         fixture = new ReviewsPersistenceFixture(persistence);
        
//         persistence.open(null, done);
//     });
    
//     teardown((done) => {
//         persistence.close(null, done);
//     });
        
//     test('CRUD Operations', (done) => {
//         fixture.testCrudOperations(done);
//     });

//     test('Get with Filters', (done) => {
//         fixture.testGetWithFilter(done);
//     });

// });