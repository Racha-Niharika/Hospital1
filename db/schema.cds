namespace com.satinfotech.hospital;
using {cuid } from '@sap/cds/common';

entity Hospital : cuid  {

    @title: 'HospitalID'
    hospital_id: String(5);
    @title: 'Hospital Name'
    hospital_name: String(20) ;
    @title: 'Address'
    address: String(20);
    @title: 'no of doctors'
    no_of_doctors: Integer;
    @title: 'no of patients'
    no_of_patients: Integer ;
    Doctor : Composition of many Doctor on Doctor.id=$self;
}
action fileUpload(
    mimeType: String,
    fileName: String,
    fileContent: String,
    fileExtension: String
) returns Boolean;
define action UploadData() returns Boolean;
entity Doctor : cuid {
     key ID : UUID;
     id:Association to Hospital;
    @title: 'name'
    name: String(50);
    @title: 'profession'
    profession: String(50);
    @title: 'experience'
    experience : String(50);
}
entity Courses : cuid {
    @title: 'Code'
    code: String(3);
    @title: 'Description'
    description: String(50);
    @title: 'Books'
    Books : Composition of many Books on Books.code=$self;
}
entity Books : cuid{
    key ID    : UUID;

    @title: 'Code'
    code: Association to Courses;
    
    bookname:String(20);
    @title: 'Description'
    description: String(20);
}
