sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'ui5/cc/courses/test/integration/FirstJourney',
		'ui5/cc/courses/test/integration/pages/CoursesList',
		'ui5/cc/courses/test/integration/pages/CoursesObjectPage',
		'ui5/cc/courses/test/integration/pages/Courses_BooksObjectPage'
    ],
    function(JourneyRunner, opaJourney, CoursesList, CoursesObjectPage, Courses_BooksObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('ui5/cc/courses') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheCoursesList: CoursesList,
					onTheCoursesObjectPage: CoursesObjectPage,
					onTheCourses_BooksObjectPage: Courses_BooksObjectPage
                }
            },
            opaJourney.run
        );
    }
);