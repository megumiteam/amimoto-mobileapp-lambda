var AWS = require('aws-sdk');
AWS.config.update({region: 'ap-northeast-1'});

module.exports.respond = function(event, cb) {
  console.log(event.instance_id);
  var ec2 = new AWS.EC2();
  var params = {
        InstanceId:event.instance_id,
        InstanceType:{Value:event.instance_type}
      };
 
  ec2.modifyInstanceAttribute(params, function(err, data) {
    if (err){ 
      console.log(err, err.stack);
    } else {
      return cb(null, JSON.stringify(data)); 
    }
  });
};