import { ConfigParams } from 'pip-services3-commons-node';

import { ReviewsFilePersistence } from '../../src/persistence/ReviewsFilePersistence';
import { ReviewsPersistenceFixture } from './ReviewsPersistenceFixture';

suite('ReviewsFilePersistence', ()=> {
    let persistence: ReviewsFilePersistence;
    let fixture: ReviewsPersistenceFixture;
    
    setup((done) => {
        persistence = new ReviewsFilePersistence('./data/reviews.test.json');

        fixture = new ReviewsPersistenceFixture(persistence);

        persistence.open(null, (err) => {
            persistence.clear(null, done);
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });
        
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Get with Filters', (done) => {
        fixture.testGetWithFilter(done);
    });

});