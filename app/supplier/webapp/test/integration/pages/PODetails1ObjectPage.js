sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'supplier',
            componentId: 'PODetails1ObjectPage',
            contextPath: '/PODetails1'
        },
        CustomPageDefinitions
    );
});