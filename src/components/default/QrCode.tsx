/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSProperties } from "react";
import QRCode from "react-qr-code";

export default function QrCode(props:{certificateId:number,style:CSSProperties,url:string}) {
  return (
    <div>
       <QRCode style={props.style} value={props.url+props.certificateId+''}/>
    </div>
  )
}
