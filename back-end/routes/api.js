var express = require('express');
var router = express.Router();
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

/* GET users listing. */
router.get('/watson', function(req, res, next) {
  var naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2018-11-16',
    iam_apikey: process.env.WATSON_API_KEY,
    url:
      'https://gateway-wdc.watsonplatform.net/natural-language-understanding/api'
  });

  var parameters = {
    text: req.query.sentence,
    features: {
      keywords: {
        sentiment: true,
        emotion: true,
        limit: 3
      }
    }
  };

  naturalLanguageUnderstanding.analyze(parameters, function(err, response) {
    if (err) {
      res.send(err);
    } else {
      res.send(response);
    }
    // console.log(JSON.stringify(response, null, 2));
  });
});

module.exports = router;
