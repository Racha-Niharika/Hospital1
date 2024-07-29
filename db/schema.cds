namespace com.satinfotech.hospital;
using {cuid,managed } from '@sap/cds/common';

entity Hospital : managed {
     key ID : UUID;
    @title: 'HospitalID'
    hospital_id: String;
    @title: 'Hospital Name'
    hospital_name: String(20) ;
    @title: 'Address'
    address: String(20);
    @title: 'no of doctors'
    no_of_doctors: Integer;
    @title: 'no of patients'
    no_of_patients: Integer ;
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
