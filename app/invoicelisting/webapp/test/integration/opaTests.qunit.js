sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'invoicelisting/test/integration/FirstJourney',
		'invoicelisting/test/integration/pages/PODetailsList',
		'invoicelisting/test/integration/pages/PODetailsObjectPage'
    ],
    function(JourneyRunner, opaJourney, PODetailsList, PODetailsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('invoicelisting') + '/index.html'
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