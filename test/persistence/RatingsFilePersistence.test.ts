import { ConfigParams } from 'pip-services3-commons-node';

import { RatingsFilePersistence } from '../../src/persistence/RatingsFilePersistence';
import { RatingsPersistenceFixture } from './RatingsPersistenceFixture';

suite('RatingsFilePersistence', ()=> {
    let persistence: RatingsFilePersistence;
    let fixture: RatingsPersistenceFixture;
    
    setup((done) => {
        persistence = new RatingsFilePersistence('./data/ratings.test.json');

        fixture = new RatingsPersistenceFixture(persistence);

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