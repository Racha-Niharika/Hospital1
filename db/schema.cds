namespace com.satinfotech.hospital;
using {managed, cuid } from '@sap/cds/common';

entity Hospital : cuid, managed {
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