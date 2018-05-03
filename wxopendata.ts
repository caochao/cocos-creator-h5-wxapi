declare const wx;

interface KVData
{
    key:string;
    value:string;
}

//改动后需同步改动 项目根目录/subdomain/consts.js
export const enum WxOpenDataKeys
{
    Grade = "grade",
}

//改动后需同步改动 项目根目录/subdomain/consts.js
export const enum WxDomainAction
{
    FetchFriend = 1,
    FetchGroup = 2,
    Paging = 3,
}

export interface WxDomainMessage
{
    action:WxDomainAction;
    data?:any;       //https://developers.weixin.qq.com/minigame/dev/document/open-api/context/OpenDataContext.postMessage.html
}


class WxOpenData
{
    wxSetUserCloudStorage(kvDatas:KVData[])
    {
        wx.setUserCloudStorage({
            KVDataList:kvDatas,
            success:res => {
                console.log("setUserCloudStorage success", res);
            },
            fail:res => {
                console.log("setUserCloudStorage fail", res);
            },
        });
    }

    wxPostMessageToSubDomain(msgObj:WxDomainMessage)
    {
        const openDataContext = wx.getOpenDataContext();
        openDataContext.postMessage(msgObj);
    }

    wxGetSharedCanvas()
    {
        const openDataContext = wx.getOpenDataContext();
        return openDataContext.canvas;
    }
}

export const wxOpenData = new WxOpenData();
