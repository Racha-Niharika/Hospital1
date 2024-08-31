using {com.satinfotech.hospital as db} from '../db/schema';
service hospital {  
    entity Books as projection on db.Books{
        @UI.Hidden: true
        ID,
        *
    };
    entity Courses as projection on db.Courses{
        @UI.Hidden: true
        ID,
        *
    };
   entity Hospital as projection on db.Hospital{
        @UI.Hidden: true
        ID,
        *
    };
    entity Doctor as projection on db.Doctor{
        
        @UI.Hidden: true
        ID,
        *
    };
    action DownloadTemplate() returns String;
    action UploadData() returns Boolean;
    action fileUpload(mimeType: String, fileName: String, fileContent: String, fileExtension: String) returns Boolean;
    action downloadFile() returns {
        fileContent: String;
        fileName: String;
        mimeType: String;
        fileExtension: String;
    };
  //function DownloadTemplate() returns Binary;
};

annotate hospital.Courses with @odata.draft.enabled;
annotate hospital.Hospital with @odata.draft.enabled;
annotate hospital.Hospital with @(
    UI.LineItem: [
        
        {
            Label: 'hospital_id',
            Value: hospital_id
        },
        {
            Label: 'hospital_name',
            Value: hospital_name
        },
        {
            Label: 'address',
            Value: address
        },
        {
            Label: 'no_of_doctors',
            Value: no_of_doctors
        },
         {
            Label: 'no_of_patients',
            Value: no_of_patients
        }

        
    ],
    UI.FieldGroup #hospital: {
        $Type: 'UI.FieldGroupType',
        Data: [
             {
            Label: 'hospital_id',
            Value: hospital_id
        },
        {
            Label: 'hospital_name',
            Value: hospital_name
        },
        {
            Label: 'address',
            Value: address
        },
        {
            Label: 'no_of_doctors',
            Value: no_of_doctors
        },
         {
            Label: 'no_of_patients',
            Value: no_of_patients
        }

        ]
    },
    UI.Facets: [
        {
            $Type: 'UI.ReferenceFacet',
            ID: 'hospitalFacet',
            Label: 'hospital Facets',
            Target: '@UI.FieldGroup#hospital'
        }
        ,
        {
            $Type: 'UI.ReferenceFacet',
            ID: 'DoctorFacet',
            Label: 'Working Doctors',
            Target:'Doctor/@UI.LineItem',
            
        }
    ]
);
annotate hospital.Doctor with @(
    UI.LineItem:[
       
        {
            
            Label: 'name',
            Value: name

        },
         {
            Label: 'profession',
            Value:  profession
        },
        {
            Label: 'experience',
            Value: experience
        },
    ],
    UI.FieldGroup #Doctor : {
        $Type : 'UI.FieldGroupType',
        Data : [
           
        {
            Label: 'name',
            Value: name
        },
         {
            Label: 'profession',
            Value: profession
        },
        {
            Label: 'experience',
            Value: experience
        },
         
       
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'DoctorFacet',
            Label : 'Doctors',
            Target : '@UI.FieldGroup#Doctor',
        },
    ],
);
annotate hospital.Courses with @(
    UI.LineItem: [
        {
            Label: 'code',
            Value: code
        },
        {
            Label: 'description',
            Value: description
        }
    ],
    UI.FieldGroup #product: {
        $Type: 'UI.FieldGroupType',
        Data: [
            {
                Label: 'code',
                Value: code
            },
            {
                Label: 'description',
                Value: description
            }
        ]
    },
    UI.Facets: [
        {
            $Type: 'UI.ReferenceFacet',
            ID: 'courseFacet',
            Label: 'course Facets',
            Target: '@UI.FieldGroup#product'
        },
        {
            $Type: 'UI.ReferenceFacet',
            ID: 'relatedBooksFacet',
            Label: 'Related books',
            Target:'Books/@UI.LineItem',
            
        }
    ]
);

annotate hospital.Books with @(
    UI.LineItem:[
       {
            Label: 'ID',
            Value: ID

        },
        {
            Label: 'bookname',
            Value: bookname

        },
         {
            Label: 'description',
            Value: description
        },
        {
            Label: 'ID',
            Value: ID
        },
    ],
    UI.FieldGroup #Books : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
            Label: 'ID',
            Value: ID

        },
        
        {
            Label: 'book name',
            Value: bookname
        },
         {
            Label: 'description',
            Value: description
        },
        {
            Label: 'ID',
            Value: ID
        },
         
       
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'ItemsFacet',
            Label : 'Items',
            Target : '@UI.FieldGroup#Books',
        },
    ],
);