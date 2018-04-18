declare const wx;

export interface WxLaunchOptions
{
    scene:number;    //场景值
    query:Object;    //启动参数
    isSticky:boolean;   //当前小游戏是否被显示在聊天顶部	
    shareTicket:string;
}

export const wxGetLaunchOptions:() => WxLaunchOptions = () =>
{
    return wx.getLaunchOptionsSync();
}