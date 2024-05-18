sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'hospital.hospital',
            componentId: 'HospitalList',
            contextPath: '/Hospital'
        },
        CustomPageDefinitions
    );
});