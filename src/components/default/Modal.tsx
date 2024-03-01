import { Close } from "@mui/icons-material";
import { FC, ReactNode } from "react"

type modalContent = {
    id: string,
    title: string,
    titleIcon?: ReactNode,
    titleBarClass?: string,
    modalClass?: string,
    children?: ReactNode,
    actionBtn:ReactNode,
    closeBtnColor?:string,
}
export const Modal: FC<modalContent> = (item) => {
    const defaultModalClass=item.modalClass==''?"modal-dialog modal-dialog-scrollable modal-dialog-centered modal-md":"modal-dialog modal-dialog-scrollable modal-dialog-centered "+item.modalClass;
    const defaultCloseBtnClass=item.closeBtnColor==''?"btn text-white":"btn "+item.closeBtnColor;
    
    return (
        <div className="modal fade" id={item.id} data-bs-backdrop="static" data-bs-keyboard="false" style={{ maxHeight: '95%', marginTop: '5%' }}
            role="dialog" aria-labelledby="modalTitleId" aria-hidden="false" >
            <div className={defaultModalClass} role="document" >
                <div className="modal-content rounded-0 bg-white ">
                    <div className={"modal-header sticky-top top-0 "+item.titleBarClass}style={{ zIndex: 3 }}>
                        <h5 className="modal-title fw-bold" id="modalTitleId">{item.titleIcon}<b>{item.title}</b></h5>
                        <button type="button" className={defaultCloseBtnClass} data-bs-dismiss="modal" aria-label="Close" ><Close/></button>
                    </div>
                    <div className="overflow-auto">
                        {item.children}
                    </div>
                    <div className="modal-footer">
                        {item.actionBtn}
                    </div>
                </div>
            </div>
        </div>

    )
}