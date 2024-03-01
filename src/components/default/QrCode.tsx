import QRCode from "react-qr-code";

export default function QrCode(props:{certificateId:number}) {
  return (
    <div>
       <QRCode value={'localhost:/check-certificate/'+props.certificateId+''}/>
    </div>
  )
}
