let ReviewsProcess = require('../obj/src/container/ReviewsProcess').ReviewsProcess;

try {
    new ReviewsProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
