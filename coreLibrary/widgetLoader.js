﻿/*global define, document, Modernizr */
/*jslint sloppy:true */
/** @license
| Version 10.2
| Copyright 2013 Esri
|
| Licensed under the Apache License, Version 2.0 (the "License");
| you may not use this file except in compliance with the License.
| You may obtain a copy of the License at
|
|    http://www.apache.org/licenses/LICENSE-2.0
|
| Unless required by applicable law or agreed to in writing, software
| distributed under the License is distributed on an "AS IS" BASIS,
| WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
| See the License for the specific language governing permissions and
| limitations under the License.
*/
//============================================================================================================================//
define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "widgets/appHeader/appHeader",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/Deferred",
    "dojo/promise/all",
    "dojo/i18n!nls/localizedStrings",
    "widgets/mapBookCollection/mapBookCollection",
    "dojo/domReady!"
    ],
function (declare, _WidgetBase, appHeader, array, lang, Deferred, all, nls, mapBookCollection) {

  
    return declare([_WidgetBase], {
        nls: nls,

        /**
        * load widgets specified in Header Widget Settings of configuration file
        *
        * @class
        * @name coreLibrary/widgetLoader
        */
        startup: function () {
            var widgets = {},
            deferredArray = [];
            //            var mapInstance = this._initializeMap();
            //            /**
            //            * create an object with widgets specified in Header Widget Settings of configuration file
            //            * @param {array} dojo.configData.AppHeaderWidgets Widgets specified in configuration file
            //            */
            array.forEach(dojo.appConfigData.AppHeaderWidgets, function (widgetConfig, index) {
                var deferred = new Deferred();
                widgets[widgetConfig.WidgetPath] = null;
                require([widgetConfig.WidgetPath], function (widget) {

                    widgets[widgetConfig.WidgetPath] = new widget({ map: widgetConfig.MapInstanceRequired ? mapInstance : undefined, title: widgetConfig.Title });

                    deferred.resolve(widgetConfig.WidgetPath);
                });
                deferredArray.push(deferred.promise);
            });
            all(deferredArray).then(lang.hitch(this, function () {
                try {
                    /**
                    * create application header
                    */
                    this._createApplicationHeader(widgets);

                } catch (ex) {
                alert(nls.errorMessages.widgetNotLoaded);
                }
            }));
        },

        /**
        * create map object
        * @return {object} Current map instance
        * @memberOf coreLibrary/widgetLoader
        */
        _initializeMap: function () {
            var map = new Map(),
               mapInstance = map.getMapInstance();
            return mapInstance;
        },

        /**
        * create application header
        * @param {object} widgets Contain widgets to be displayed in header panel
        * @memberOf coreLibrary/widgetLoader
        */
        _createApplicationHeader: function (widgets) {
            var MapBookCollection = new mapBookCollection();
            var applicationHeader = new appHeader();

        }

    });
});