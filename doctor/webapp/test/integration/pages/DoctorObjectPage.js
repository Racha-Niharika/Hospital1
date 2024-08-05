sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'doctor',
            componentId: 'DoctorObjectPage',
            contextPath: '/Hospital/Doctor'
        },
        CustomPageDefinitions
    );
});