let ReviewsLambdaFunction = require('../obj/src/container/ReviewsLambdaFunction').ReviewsLambdaFunction;

module.exports = new ReviewsLambdaFunction().getHandler();