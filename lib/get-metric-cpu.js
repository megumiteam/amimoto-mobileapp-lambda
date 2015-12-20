var AWS = require('aws-sdk');
AWS.config.update({region: 'ap-northeast-1'});

function ISODateString(d){
  function pad(n){return n<10 ? '0'+n : n}
  return d.getUTCFullYear()+'-'
    + pad(d.getUTCMonth()+1)+'-'
    + pad(d.getUTCDate())+'T'
    + pad(d.getUTCHours())+':'
    + pad(d.getUTCMinutes())+':'
    + pad(d.getUTCSeconds())+'Z'
}
function getTimeStamp(d){
	var now = ISODateString(d);
	console.log(now);
	return now;
}

function getMetricStatics(event, cb) {
    var cloudwatch = new AWS.CloudWatch();
    var past       = new Date();
    past           = new Date(past.setHours(past.getHours() - 1));
    var now        = new Date();
    var endtime    = getTimeStamp(now);
    var starttime  = getTimeStamp(past);
    var params = {
                    EndTime: endtime,
                    MetricName: 'CPUUtilization',
                    Namespace: 'AWS/EC2',
                    Period: 300,
                    StartTime: starttime,
                    Statistics: [ 
                        'Average'
                    ],
                    Dimensions: [
                        {
                            Name: 'InstanceId',
                            Value: event.instance_id
                        }
                    ]
    };

    cloudwatch.getMetricStatistics(params, function(err, data) {
                    if (err) { 
                    	console.log(err, err.stack);
                    } else {
						return cb(null, JSON.stringify(data)); 
					}
    });
}

module.exports.respond = function(event, cb) {
	getMetricStatics(event, cb);
};
