/*

Copyright 2008-2014 Clipperz Srl - All rights reserved.

This file is part of Clipperz's Javascript Crypto Library.

The Javascript Crypto Library provides web developers with an extensive 
and efficient set of cryptographic functions.
For further information about its features and functionalities please
refer to https://clipperz.is

* The Javascript Crypto Library is free software: you can redistribute
  it and/or modify it under the terms of the BSD 3-Clause License
  as published by the Free Software Foundation.

* You should have received a copy of the BSD 3-Clause License
  along with the Javascript Crypto Library in the LICENSE.TXT file. 
  If not, see <http://www.gnu.org/licenses/>.

*/


if (typeof YAHOO == 'undefined') { YAHOO = {}; };
if (typeof YAHOO.util == 'undefined') { YAHOO.util = {}; };
if (typeof YAHOO.util.Dom == 'undefined') { YAHOO.util.Dom = {}; };

YAHOO.extend = function(subc, superc, overrides) {
	var F = function() {};
	F.prototype=superc.prototype;
	subc.prototype=new F();
	subc.prototype.constructor=subc;
	subc.superclass=superc.prototype;
	if (superc.prototype.constructor == Object.prototype.constructor) {
		superc.prototype.constructor=superc;
	}

	if (overrides) {
		for (var i in overrides) {
			subc.prototype[i]=overrides[i];
		}
	}
};

YAHOO.override = function(origclass, overrides){
	if(overrides){
		var p = origclass.prototype;
		for(var method in overrides){
			p[method] = overrides[method];
		}
	}
};

YAHOO.extendX = function(subclass, superclass, overrides){
	YAHOO.extend(subclass, superclass);
	subclass.override = function(o){
		YAHOO.override(subclass, o);
	};
	if(!subclass.prototype.override){
		subclass.prototype.override = function(o){
			for(var method in o){
				this[method] = o[method];
			}  
		};
	}
	if(overrides){
		subclass.override(overrides);
	};
	
};

YAHOO.util.Dom.get = function(el) {
	if (!el) { return null; } // nothing to work with
	
	if (typeof el != 'string' && !(el instanceof Array) ) { // assuming HTMLElement or HTMLCollection, so pass back as is
		return el;
	}
	
	if (typeof el == 'string') { // ID
		return document.getElementById(el);
	}
	else { // array of ID's and/or elements
		var collection = [];
	for (var i = 0, len = el.length; i < len; ++i) {
		collection[collection.length] = YAHOO.util.Dom.get(el[i]);
	}
	
		return collection;
	}
	
	return null; // safety, should never happen
};

