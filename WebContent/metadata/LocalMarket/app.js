function initAppCustom($rootScope) {

	$rootScope.data['cartToken'] = 0;

	$rootScope.initCart = function() {
		$rootScope.data['cartIndex'] = {};
		$rootScope.data['cartSize'] = undefined; // Initially undefined not zero
		$rootScope.data['cartAmt'] = 0;
		$rootScope.data['Cart'] = [];
	};
	
	$rootScope.initCart();
	
	$rootScope.addToCart = function(row) {
		
		var oldQty = $rootScope.data['cartIndex'][row.name];
		if(!oldQty){
			oldQty = 0;
			
			var item = angular.copy(row);
			item.qty = 1;
			item.amt = item.price * item.qty;
			$rootScope.data['cartAmt'] = $rootScope.data['cartAmt'] + item.amt;
			
			$rootScope.data['Cart'].push(item);
		}
		
		$rootScope.data['cartIndex'][row.name] = oldQty + 1;
		$rootScope.data['cartSize'] = ($rootScope.data['cartSize'] || 0 )+ 1;
	};
	
	$rootScope.saveCart = function(){
		
		$rootScope.data['cartToken'] = $rootScope.data['cartToken'] + 1;
		$rootScope.saveObject('Carts', {	
			"token_no" : $rootScope.data['cartToken'], 
			"qty" : $rootScope.data['cartSize'], 
			"amt" : $rootScope.data['cartAmt'],
			"type" : "Pending"
			});
		$rootScope.loadPage('summary');
		$rootScope.initCart();
	};
	
	$rootScope.processCart = function(row){
		row.type = "Complete";
		$rootScope.saveObject('Carts', row);
	};
	
}

window["LocalMarket"] = true;