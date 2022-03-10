import { CertificateStatus } from "../enums/CertificateStatus"

export type CertifiedStudentInput={
    id:number
    studentId:number
    certificateId:number
    CertificateStatus:CertificateStatus
}