sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'ui5.cc.courses',
            componentId: 'Courses_BooksObjectPage',
            contextPath: '/Courses/Books'
        },
        CustomPageDefinitions
    );
});