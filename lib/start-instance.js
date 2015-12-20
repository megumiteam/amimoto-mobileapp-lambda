var AWS = require('aws-sdk');
AWS.config.update({region: 'ap-northeast-1'});

module.exports.respond = function(event, cb) {
  console.log(event.instance_id);
  var ec2 = new AWS.EC2();
  var params = {
        InstanceIds: [
            event.instance_id
        ]
    };
 
    ec2.startInstances(params, function(err, data) {
        if (err){ console.log(err, err.stack);
        } else {
            ec2.waitFor('instanceRunning', params, function(err, data) {
                if (err) {
                  console.log(err, err.stack);
                } else {
                  return cb(null, JSON.stringify(data)); 
                }
            });
        }
    });

};