var AWS = require('aws-sdk');
AWS.config.update({region: 'ap-northeast-1'});

module.exports.respond = function(event, cb) {

  var ec2 = new AWS.EC2();
  var params = {
      DryRun: false,
      InstanceIds: [event.instance_id]
  };

  ec2.describeInstances(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      return cb(null, JSON.stringify(data));
    }
  });
};
