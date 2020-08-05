# HTTP Protocol (version 1) <br/> Reviews Microservice

Reviews microservice implements a HTTP compatible API, that can be accessed on configured port.
All input and output data is serialized in JSON format. Errors are returned in [standard format]().

* [POST /v1/reviews/get_reviews](#operation1)
* [POST /v1/reviews/get_review_by_id](#operation2)
* [POST /v1/reviews/get_party_review](#operation3)
* [POST /v1/reviews/get_product_rating](#operation4)
* [POST /v1/reviews/submit_review](#operation5)
* [POST /v1/reviews/report_helpful](#operation6)
* [POST /v1/reviews/report_abuse](#operation7)
* [POST /v1/reviews/delete_review_by_id](#operation8)

## Operations

### <a name="operation1"></a> Method: 'POST', route '/v1/reviews/get_reviews'

Get purchase reviews by filter

**Request body:**
- filter: Object
    - id: string - (optional) unique review id
    - ids: string - (optional) list of unique review ids
    - product_id: string - (optional) review reference product id
    - party_id: string - (optional) review reference party id
    - full_review: boolean - (optional) 
- paging: Object
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result

**Response body:**
Page with retrieved reviews

### <a name="operation2"></a> Method: 'POST', route '/v1/reviews/get_review_by_id'

Get review by id

**Request body:**
- review_id: string - review id

**Response body:**
- review: ReviewV1 - finded review 

### <a name="operation3"></a> Method: 'POST', route '/v1/reviews/get_party_review'

Get a party review for a product

**Request body:**
- productId: string - product id
- partyId: string - party id

**Response body:**
- review: ReviewV1 - finded review 

### <a name="operation4"></a> Method: 'POST', route '/v1/reviews/get_product_rating'

Get product rating by product id

**Request body:**
- productId: string - product id

**Response body:**
- rating: RatingV1 - product rating 

### <a name="operation5"></a> Method: 'POST', route '/v1/reviews/submit_review'

Add new review

**Request body:** 
- review: ReviewV1 - params for creates new review

**Response body:**
- rating: RatingV1 - product rating for which the review was sent

### <a name="operation6"></a> Method: 'POST', route '/v1/reviews/report_helpful'

Increment helpful counter for review

**Request body:**
- reviewId: string - review id 
- partyId: string - party id

**Response body:**
- review: ReviewV1 - updated review  

### <a name="operation7"></a> Method: 'POST', route '/v1/reviews/report_abuse'

Increment abuse counter for review

**Request body:**
- reviewId: string - review id 
- partyId: string - party id

**Response body:**
- review: ReviewV1 - updated review  

### <a name="operation8"></a> Method: 'POST', route '/v1/reviews/delete_review_by_id'

Delete review by id

**Request body:**
- review_id: string - review id for delete

**Response body:**
- review: ReviewV1 - deleted review 

