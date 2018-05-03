declare const wx;

import * as utils from '../util'
import {WxBaseParams} from './wxhttptask'

interface WxShareParams extends WxBaseParams
{
    title:string;
    query?:string;
    imageUrl?:string;
}

interface WxCaptureParams extends WxBaseParams
{
    x?:number;          //截取canvas的左上角横坐标
    y?:number;          //截取canvas的左上角纵坐标
    xpercent?:number;
    ypercent?:number;
    width?:number;
    height?:number;
    destWidth?:number;
    destHeight?:number;
    fileType?:string;
    quality?:number;
}

class WxShare
{
    //分享的图片宽高比5:4，这里的尺寸仅仅是因为我们其中一张分享图片宽度是344
    public ShareImgWidth = 344;
    public ShareImgHeight = 275;

    share(params:WxShareParams, successCb?:utils.handler, failCb?:utils.handler)
    {
        wx.shareAppMessage({
            title:params.title,
            imageUrl:params.imageUrl || "shareimg/bg02.png",
            query:params.query,
            success:res => {
                console.log("转发成功", res);
                successCb && successCb.exec(res.shareTickets, res.groupMsgInfos);
            },
            fail:resp => {
                console.log("转发失败");
                failCb && failCb.exec();
            },
        });
    }

    //截图并分享
    shareCanvas(params1:WxCaptureParams, params2:WxShareParams, canvas, successCb?:utils.handler, failCb?:utils.handler)
    {
        const x = params1.xpercent ? params1.xpercent * canvas.width : params1.x;
        const y = params1.ypercent ? params1.ypercent * canvas.height : params1.y;
        
        //toTempFilePath是wx api提供的方法
        canvas.toTempFilePath({
            x: x || 0,
            y: y || 0,
            width: params1.width || canvas.width,
            height: params1.height || canvas.height,
            destWidth: params1.destWidth || this.ShareImgWidth,
            destHeight: params1.destHeight || this.ShareImgHeight,
            fileType: params1.fileType || "jpg",
            quality: params1.quality || 1,
            success: res => {
                console.log('toTempFilePath success', res.tempFilePath);
                params2.imageUrl = res.tempFilePath;
                this.share(params2, successCb, failCb);
            },
            fail: res => {
                console.log('toTempFilePath fail', res);
            }
        });
    }
}

export const wxShare = new WxShare();