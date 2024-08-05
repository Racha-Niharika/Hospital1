sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'doctor/test/integration/FirstJourney',
		'doctor/test/integration/pages/HospitalList',
		'doctor/test/integration/pages/HospitalObjectPage',
		'doctor/test/integration/pages/DoctorObjectPage'
    ],
    function(JourneyRunner, opaJourney, HospitalList, HospitalObjectPage, DoctorObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('doctor') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheHospitalList: HospitalList,
					onTheHospitalObjectPage: HospitalObjectPage,
					onTheDoctorObjectPage: DoctorObjectPage
                }
            },
            opaJourney.run
        );
    }
);