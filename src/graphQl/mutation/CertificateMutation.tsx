import { gql } from "@apollo/client";

export const REGISTER_CERTIFICATE=gql`
mutation($certificate:CertificateInput){
    registerCertificate(certificate:$certificate)
}
`