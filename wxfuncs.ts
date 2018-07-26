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

    /**
     * 本机sdk版本与目标sdk版本比较
     * 小于返回-1，大于返回1，相等返回0
     */
    compareSDKVersion(targetVersion:string)
    {
        return this.compareVersion(this.wxGetSystemInfo().SDKVersion, targetVersion);
    }

    /**
     * 本机微信版本与目标微信版本比较
     * 小于返回-1，大于返回1，相等返回0
     */
    compareWechatVersion(targetVersion:string)
    {
        return this.compareVersion(this.wxGetSystemInfo().version, targetVersion);
    }

    /**
     * v1小于v2返回-1，v1大于v2返回1，相同返回0
     */
    compareVersion(_v1:string, _v2:string) 
    {
        const v1 = _v1.split('.');
        const v2 = _v2.split('.');
        const len = Math.max(v1.length, v2.length);
      
        while (v1.length < len) 
        {
            v1.push('0');
        }
        while (v2.length < len) 
        {
            v2.push('0');
        }
        for (let i = 0; i < len; i++) 
        {
            const num1 = parseInt(v1[i]);
            const num2 = parseInt(v2[i]);
      
            if (num1 > num2) 
            {
                return 1;
            } 
            else if (num1 < num2) 
            {
                return -1;
            }
        }
        return 0;
    }
}

export const wxFunc = new WxFunc();
