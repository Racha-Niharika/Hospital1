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



};






annotate hospital.Courses with @odata.draft.enabled;













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
            Label: 'Product Facets',
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