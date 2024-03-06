/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSProperties } from "react";
import QRCode from "react-qr-code";

export default function QrCode(props:{certificateId:number,style:CSSProperties}) {
  return (
    <div>
       <QRCode style={props.style} width={100} value={'localhost:/check-certificate/'+props.certificateId+''}/>
    </div>
  )
}
