import { ConfigParams } from 'pip-services3-commons-node';

import { RatingsMemoryPersistence } from '../../src/persistence/RatingsMemoryPersistence';
import { RatingsPersistenceFixture } from './RatingsPersistenceFixture';

suite('RatingsMemoryPersistence', ()=> {
    let persistence: RatingsMemoryPersistence;
    let fixture: RatingsPersistenceFixture;
    
    setup((done) => {
        persistence = new RatingsMemoryPersistence();
        persistence.configure(new ConfigParams());
        
        fixture = new RatingsPersistenceFixture(persistence);
        
        persistence.open(null, done);
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