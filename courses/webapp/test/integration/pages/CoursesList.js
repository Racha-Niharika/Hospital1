sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'ui5.cc.courses',
            componentId: 'CoursesList',
            contextPath: '/Courses'
        },
        CustomPageDefinitions
    );
});