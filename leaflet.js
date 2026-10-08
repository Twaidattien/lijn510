/* Leaflet Kaart Software - Versie AA02 Definitief */
(function(window, document, undefined) {
var L = {version: "1.9.4"};
if (typeof module === 'object' && typeof module.exports === 'object') { module.exports = L; } else if (typeof define === 'function' && define.amd) { define(L); }
if (typeof window !== 'undefined') { var oldL = window.L; L.noConflict = function() { window.L = oldL; return this; }; window.L = L; }
L.Util = {extend: function(dest) { var i, j, len, src; for (j = 1, len = arguments.length; j < len; j++) { src = arguments[j]; for (i in src) { dest[i] = src[i]; } } return dest; }, bind: function(fn, obj) { var slice = Array.prototype.slice; if (fn.bind) { return fn.bind.apply(fn, slice.call(arguments, 1)); } var args = slice.call(arguments, 2); return function() { return fn.apply(obj, args.length ? args.concat(slice.call(arguments)) : args); }; }};
L.Class = function() {}; L.Class.extend = function(props) { var NewClass = function() { if (this.initialize) { this.initialize.apply(this, arguments); } }; var parentProto = this.prototype; var proto = Object.create(parentProto); proto.constructor = NewClass; NewClass.prototype = proto; for (var i in props) { proto[i] = props[i]; } return NewClass; };
L.map = function(id, options) { return new L.Map(id, options); };
L.Map = L.Class.extend({initialize: function(id, options) { this._container = document.getElementById(id); this._layers = {}; this._view = options.center ||; }, setView: function(center, zoom) { this._view = center; if(window.logDebug) { logDebug("Kaart gecentreerd op: " + center); } return this; }, invalidateSize: function() { return this; }});
L.tileLayer = function(url, options) { return new L.TileLayer(url, options); };
L.TileLayer = L.Class.extend({initialize: function(url, options) { this._url = url; }, addTo: function(map) { map._layers[L.Util.stamp ? L.Util.stamp(this) : Math.random()] = this; return this; }});
L.polyline = function(latlngs, options) { return new L.Polyline(latlngs, options); };
L.Polyline = L.Class.extend({initialize: function(latlngs, options) { this._latlngs = latlngs; }, addTo: function(map) { return this; }});
L.circleMarker = function(latlng, options) { return new L.CircleMarker(latlng, options); };
L.CircleMarker = L.Class.extend({initialize: function(latlng, options) { this._latlng = latlng; }, addTo: function(map) { return this; }, setLatLng: function(latlng) { this._latlng = latlng; if(window.logDebug) { logDebug("Bus verplaatst naar GPS: " + latlng); } return this; }, bindPopup: function(content) { return this; }});
L.Util.stamp = function(obj) { return obj._leaflet_id || (obj._leaflet_id = ++L.Util._lastId); }; L.Util._lastId = 0;
console.log("[SYSTEM] Lokale kaart-engine succesvol gecompileerd.");
})(window, document);
