declare const wx;

import * as utils from "../util"

class WxTip
{
    showModal(title:string, content:string, confirmCb?:utils.handler, cancelCb?:utils.handler, confirmText?:string, cancelText?:string) 
    {
        wx.showModal({
            title,
            content,
            showCancel:!!cancelText,
            cancelText:cancelText || "取消",
            confirmText:confirmText || "确定",
            success:resp => {
                console.log("wx.showModal成功", resp);
                if(resp.cancel)
                {
                    cancelCb && cancelCb.exec();
                }
                if(resp.confirm)
                {
                    confirmCb && confirmCb.exec();
                }
            },
            fail:resp => {
                console.log("wx.showModal失败", resp);
            },
        });
    }

    showToast(title:string, duration:number = 1000)
    {
        wx.showToast({
            title,
            icon:"none",
            duration: duration,
        });
    }
}

export const wxTip = new WxTip();