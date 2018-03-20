PStack = {

	promises: {},
  calbacks: {},
  
  add: function( category, key ) {
   	if(!this.promises[category]){
    	this.promises[category] = {};
    }
    this.promises[category][key] = $.Deferred();    
  },

  resolve: function ( category, key ) {
    	for ( var c in this.promises ) {
      	if (!category || c == category ) {
          for ( var k in this.promises[c] ) {
      			if (!key || k == key ) {
            debugger
							this.promises[c][k].resolve();
            }
          }
        }
      }
  },
  
  reject: function ( category, key ) {
    	for ( var c in this.promises ) {
      	if (!category || c == category ) {
          for ( var k in this.promises[c] ) {
      			if (!key || k == key ) {
							this.promises[c][k].reject();
            }
          }
        }
      }
  },
  
  wait:function ( category, key, callback ) {
   	if(!this.callbacks){
    	this.callbacks = {};
    }
   	if(!this.callbacks[category]){
    	this.callbacks[category] = {};
    }
    this.callbacks[category][key] = callback;    
  
  
  	var promises = [];
    	for ( var c in this.promises ) {
      	if (!category || c == category ) {
          for ( var k in this.promises[c] ) {
      			if (!key || k == key ) {
							promises = this.promises[c][k];
            }
          }
        }
      }
    
  
  	function onComplete() {
    	for ( var c in this.callbacks ) {
      	if (!category || c == category ) {
          for ( var k in this.callbacks[c] ) {
      			if (!key || k == key && typeof this.callbacks[c][k] == 'function' ) {
							this.callbacks[c][k]();
            }
          }
        }
      }
    }
  	function onError() {
    	console.log('there was an error');
    }
    if ( promises.length > 0 ) {
    	$.when(promises).then(onComplete, onError);
    } else {
    	callback();
    }
  }

}

PStack.add('test1','aa');
PStack.add('test1','ab');
PStack.add('test1','ac');
PStack.wait('test1', 'aa', function(){console.log('ffffaaaa');});
//TTPromise.wait('test1', null, function(){console.log('ffff');});
PStack.resolve('test1','aa');
PStack.resolve('test1','ab');
PStack.resolve('test1','ac');


PStack.add('test1','aa');
PStack.wait('test1', null, function(){console.log('ffff');});
PStack.resolve('test1','aa');
