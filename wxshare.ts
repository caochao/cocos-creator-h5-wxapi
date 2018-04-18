declare const wx;

import * as utils from "../util";

class WxShare
{
    share(title:string, query?:string, imageUrl?:string, successCb?:utils.handler, failCb?:utils.handler)
    {
        wx.shareAppMessage({
            title:title,
            imageUrl:"res/raw-assets/Texture/llx/llk_board.png",
            query,
            success:(shareTickets:string[], groupMsgInfos:any[]) => {
                console.log("转发成功", shareTickets, groupMsgInfos);
                successCb && successCb.exec();
            },
            fail:resp => {
                console.log("转发失败");
                failCb && failCb.exec();
            },
        });
    }
}

export const wxShare = new WxShare();