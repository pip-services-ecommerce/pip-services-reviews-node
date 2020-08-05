# <img src="https://github.com/pip-services/pip-services/raw/master/design/Logo.png" alt="Pip.Services Logo" style="max-width:30%"> <br/> Reviews microservice

This is Reviews microservice from Pip.Services library. 
It stores customer Reviews internally or in external PCI-complient service like Paypal

The microservice currently supports the following deployment options:
* Deployment platforms: Standalone Process, Seneca
* External APIs: HTTP/REST, Seneca
* Persistence: Flat Files, MongoDB

This microservice has no dependencies on other microservices.

<a name="links"></a> Quick Links:

* [Download Links](doc/Downloads.md)
* [Development Guide](doc/Development.md)
* [Configuration Guide](doc/Configuration.md)
* [Deployment Guide](doc/Deployment.md)
* Client SDKs
  - [Node.js SDK](https://github.com/pip-services/pip-clients-reviews-node)
* Communication Protocols
  - [HTTP Version 1](doc/HttpProtocolV1.md)
  - [Seneca Version 1](doc/SenecaProtocolV1.md)
  - [Lambda Version 1](doc/LambdaProtocolV1.md)

## Contract

Logical contract of the microservice is presented below. For physical implementation (HTTP/REST, Thrift, Seneca, Lambda, etc.),
please, refer to documentation of the specific protocol.

```typescript
class RatingV1 {
    public line1: string;
    public line2?: string;
    public city: string;
    public postal_code?: string;
    public postal_code?: string;
    public country_code: string; // ISO 3166-1
}

export class ReviewV1 implements IStringIdentifiable {
    public id: string;
    public product_id: string;
    public party_id: string;

    public create_time?: Date;
    public update_time?: Date;
    
    public rating: number;
    public testimonial?: string;
    public full_review?: boolean;    
 
    public helpful_count?: number;
    public abuse_count?: number;
}

interface IReviewsV1 {
    getReviews(correlationId: string, filter: FilterParams, paging: PagingParams, sorting: SortParams,
        callback: (err: any, page: DataPage<ReviewV1>) => void): void;

    getReviewById(correlationId: string, reviewId: string,
        callback: (err: any, review: ReviewV1) => void): void;

    getPartyReview(correlationId: string, partyId: string, productId: string,
        callback: (err: any, review: ReviewV1) => void): void;

    getProductRating(correlationId: string, productId: string,
        callback: (err: any, rating: RatingV1) => void): void;
        
    submitReview(correlationId: string, review: ReviewV1, 
        callback: (err: any, rating: RatingV1) => void): void;

    reportHelpful(correlationId: string, reviewId: string, partyId: string,
        callback: (err: any, review: ReviewV1) => void): void;

    reportAbuse(correlationId: string, reviewId: string, partyId: string,
        callback: (err: any, review: ReviewV1) => void): void;
            
    deleteReviewById(correlationId: string, reviewId: string,
        callback: (err: any, rating: RatingV1) => void): void;
}
```

## Download

Right now the only way to get the microservice is to check it out directly from github repository
```bash
git clone git@github.com:pip-services-ecommerce/pip-services-reviews-node.git
```

Pip.Service team is working to implement packaging and make stable releases available for your 
as zip downloadable archieves.

## Run

Add **config.yml** file to the root of the microservice folder and set configuration parameters.
As the starting point you can use example configuration from **config.example.yml** file. 

Example of microservice configuration
```yaml
- descriptor: "pip-services-container:container-info:default:default:1.0"
  name: "pip-services-reviews"
  description: "Reviews microservice"

- descriptor: "pip-services-commons:logger:console:default:1.0"
  level: "trace"

- descriptor: "pip-services-reviews:persistence:file:reviews:1.0"
  path: "./data/reviews.json"

- descriptor: "pip-services-reviews:persistence:file:ratings:1.0"
  path: "./data/ratings.json"

- descriptor: "pip-services-reviews:controller:default:default:1.0"

- descriptor: "pip-services-reviews:service:http:default:1.0"
  connection:
    protocol: "http"
    host: "0.0.0.0"
    port: 8080
```
 
For more information on the microservice configuration see [Configuration Guide](Configuration.md).

Start the microservice using the command:
```bash
node run
```

## Use

The easiest way to work with the microservice is to use client SDK. 
The complete list of available client SDKs for different languages is listed in the [Quick Links](#links)

If you use Node.js then you should add dependency to the client SDK into **package.json** file of your project
```javascript
{
    ...
    "dependencies": {
        ....
        "pip-clients-reviews-node": "^1.1.*",
        ...
    }
}
```

Inside your code get the reference to the client SDK
```javascript
var sdk = new require('pip-clients-reviews-node');
```

Define client configuration parameters that match configuration of the microservice external API
```javascript
// Client configuration
var config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};
```

Instantiate the client and open connection to the microservice
```javascript
// Create the client instance
var client = sdk.ReviewsHttpClientV1(config);

// Connect to the microservice
client.open(null, function(err) {
    if (err) {
        console.error('Connection to the microservice failed');
        console.error(err);
        return;
    }
    
    // Work with the microservice
    ...
});
```

Now the client is ready to perform operations
```javascript
// Create a new review
var review = {
    id: '1',
    party_id: '2',
    product_id: '1', 
    rating: 3,
    testimonial: 'No delivery to my country',
    full_review: false
};

client.submitReview(
    null,
    review,
    function (err, rating) {
        ...
    }
);
```

```javascript
// Get the list of reviews on 'time management' topic
client.getReviews(
    null,
    {
        party_id: '2',
        product_id: '1'
    },
    {
        total: true,
        skip: 0,
        take: 10
    },
    function(err, page) {
    ...    
    }
);
```    

## Acknowledgements

This microservice was created and currently maintained by *Denis Kuznetsov*.
