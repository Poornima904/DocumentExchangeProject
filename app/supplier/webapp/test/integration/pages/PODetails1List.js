sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'supplier',
            componentId: 'PODetails1List',
            contextPath: '/PODetails1'
        },
        CustomPageDefinitions
    );
});