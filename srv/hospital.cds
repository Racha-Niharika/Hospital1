using { com.satinfotech.hospital as db } from '../db/schema';
service hospital{
 entity Hospital as projection on db.Hospital{
        @UI.Hidden: true
        ID,
        *
    };

}
annotate hospital.Hospital with @odata.draft.enabled;
annotate hospital.Hospital with @(
    UI.LineItem: [
        {
            $Type : 'UI.DataField',
            Label:'HospitalID',
            Value : hospital_id
        },
        {
            $Type : 'UI.DataField',
            Value : hospital_name
        },
        {
            $Type : 'UI.DataField',
            Value : address
        },
        {
            $Type : 'UI.DataField',
            Value : no_of_doctors
        },
        {
            $Type : 'UI.DataField',
            Value : no_of_patients
        }
    ],  
);
annotate hospital.Hospital with @(       
    UI.FieldGroup #ProductInformation : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
            $Type : 'UI.DataField',
            
            Value : hospital_id
        },
        {
            $Type : 'UI.DataField',
            Value : hospital_name
        },
        {
            $Type : 'UI.DataField',
            Value : address
        },
        {
            $Type : 'UI.DataField',
            Value : no_of_doctors
        },
        {
            $Type : 'UI.DataField',
            Value : no_of_patients
        }
        
        ],
    },


    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'ProductInfoFacet',
            Label : 'Product Information',
            Target : '@UI.FieldGroup#ProductInformation',
        },
        
        
        
    ],    
);