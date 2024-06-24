sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'supplier/test/integration/FirstJourney',
		'supplier/test/integration/pages/PODetails1List',
		'supplier/test/integration/pages/PODetails1ObjectPage'
    ],
    function(JourneyRunner, opaJourney, PODetails1List, PODetails1ObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('supplier') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThePODetails1List: PODetails1List,
					onThePODetails1ObjectPage: PODetails1ObjectPage
                }
            },
            opaJourney.run
        );
    }
);