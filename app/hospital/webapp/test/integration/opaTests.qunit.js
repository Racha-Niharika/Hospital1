sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'hospital/hospital/test/integration/FirstJourney',
		'hospital/hospital/test/integration/pages/HospitalList',
		'hospital/hospital/test/integration/pages/HospitalObjectPage'
    ],
    function(JourneyRunner, opaJourney, HospitalList, HospitalObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('hospital/hospital') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheHospitalList: HospitalList,
					onTheHospitalObjectPage: HospitalObjectPage
                }
            },
            opaJourney.run
        );
    }
);