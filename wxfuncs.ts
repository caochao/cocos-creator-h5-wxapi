declare const wx;

interface WxLaunchOptions
{
    scene:number;    //场景值
    query:Object;    //启动参数
    isSticky:boolean;   //当前小游戏是否被显示在聊天顶部	
    shareTicket:string;
}

interface WxSystemInfo
{
    brand:string;
    model:string;
    pixelRatio:number;
    screenWidth:number;
    screenHeight:number;
    windowWidth:number;
    windowHeight:number;
    language:string;
    version:string;
    system:string;
    platform:string;
    fontSizeSetting:number;
    SDKVersion:string;
    benchmarkLevel:number;
    battery:number;
    wifiSignal:number;
}

class WxFunc
{
    wxGetLaunchOptions():WxLaunchOptions
    {
        return wx.getLaunchOptionsSync();
    }
    
    wxGetSystemInfo():WxSystemInfo
    {
        return wx.getSystemInfoSync();
    }
}

export const wxFunc = new WxFunc();
