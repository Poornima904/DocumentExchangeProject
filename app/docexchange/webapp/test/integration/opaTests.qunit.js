sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'docexchange/test/integration/FirstJourney',
		'docexchange/test/integration/pages/PODetailsList',
		'docexchange/test/integration/pages/PODetailsObjectPage'
    ],
    function(JourneyRunner, opaJourney, PODetailsList, PODetailsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('docexchange') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThePODetailsList: PODetailsList,
					onThePODetailsObjectPage: PODetailsObjectPage
                }
            },
            opaJourney.run
        );
    }
);