declare const wx;

import {wxFunc} from "./wxfuncs"

export interface WxBannerAd
{
    onError:(cb:(err:any) => void) => void;
    onLoad:(cb:() => void) => void;
    onResize:(cb:(res) => void) => void;
    offError:(cb?:(err:any) => void) => void;
    offLoad:(cb?:() => void) => void;
    offResize:(cb?:(res) => void) => void;
    show:() => Promise<any>;
    hide:() => void;
    destroy:() => void;
    adUnitId:string;
    style;
}

class WxAd
{
    createBannerAd(adUnitId:string, left:number, top:number, width?:number, height?:number):WxBannerAd
    {
        if(wxFunc.compareSDKVersion("2.0.4") < 0)
        {
            return null;
        }
        return wx.createBannerAd({
            adUnitId,
            style: {
                left,
                top,
                width: width || 1,
                height: height || 1,
            }
        });
    }
}

export const wxAd = new WxAd();