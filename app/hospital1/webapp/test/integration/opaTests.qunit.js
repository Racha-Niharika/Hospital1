sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'hospital1/test/integration/FirstJourney',
		'hospital1/test/integration/pages/HospitalList',
		'hospital1/test/integration/pages/HospitalObjectPage'
    ],
    function(JourneyRunner, opaJourney, HospitalList, HospitalObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('hospital1') + '/index.html'
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