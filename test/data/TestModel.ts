let assert = require('chai').assert;

import { ReviewV1 } from "../../src/data/version1/ReviewV1";
import { RatingV1 } from "../../src";

export class TestModel {
    static createReview1(): ReviewV1 {
        return {
            id: '1',
            party_id: '1',
            product_id: '1', 
            rating: 0,
            full_review: true
        };
    }

    static createReview2(): ReviewV1 {
        return {
            id: '2',
            party_id: '2',
            product_id: '1', 
            rating: 3,
            testimonial: 'No delivery to my country',
            full_review: false
        };
    }

    static createReview3(): ReviewV1 {
        return {
            id: '3',
            party_id: '3',
            product_id: '1', 
            rating: 5,
            testimonial: 'Excellent goods. I will purchase more. Thank U!',
            full_review: true
        };
    }

    static assertEqualReviewV1(actual: ReviewV1, expected: ReviewV1) {
        assert.isNotNull(actual);
        assert.isNotNull(expected);

        assert.equal(actual.id, expected.id);
        assert.equal(actual.party_id, expected.party_id);
        assert.equal(actual.product_id, expected.product_id);
        assert.equal(actual.full_review, expected.full_review);
        assert.equal(actual.rating, expected.rating);
        assert.equal(actual.testimonial, expected.testimonial);
        assert.equal(actual.abuse_count, expected.abuse_count);
        assert.equal(actual.helpful_count, expected.helpful_count);
    }

    static createRating1(): RatingV1 {
        return {
            id: '1',
            rating_3_count: 1,
            total_count: 1
        }
    }

    static createRating2(): RatingV1 {
        return {
            id: '2',
            rating_1_count: 1,
            total_count: 1
        }
    }

    static createRating3(): RatingV1 {
        return {
            id: '3',
            rating_5_count: 1,
            total_count: 1  
        }
    }

    static assertEqualRatingV1(actual: RatingV1, expected: RatingV1) {
        assert.isNotNull(actual);
        assert.isNotNull(expected);

        assert.equal(actual.id, expected.id);
        assert.equal(actual.rating_0_count, expected.rating_0_count);
        assert.equal(actual.rating_1_count, expected.rating_1_count);
        assert.equal(actual.rating_2_count, expected.rating_2_count);
        assert.equal(actual.rating_3_count, expected.rating_3_count);
        assert.equal(actual.rating_4_count, expected.rating_4_count);
        assert.equal(actual.rating_5_count, expected.rating_5_count);
    }

}