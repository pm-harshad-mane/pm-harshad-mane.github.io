importScripts('ajax.js');


onmessage = function(e) {
  console.log('Worker: Message received from main script');
  const result = e.data[0] * e.data[1];
  // if (isNaN(result)) {
  //   postMessage('Please write two numbers');
  // } else {
  //   const workerResult = 'Result: ' + result;
  //   console.log('Worker: Posting message back to main script');
  //   postMessage(workerResult);
  // }

  ajax("http://ssp.com/hello/?sum="+result, function(resp){
  	const workerResult = 'Result: ' + result;
    console.log('Worker: Posting message back to main script');
    postMessage(workerResult);
  });


}
