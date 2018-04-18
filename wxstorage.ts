declare const wx;

class WxStorage  
{
    getStorageInfo()
    {
        return wx.getStorageInfoSync();
    }

    clearStorage()
    {
        wx.clearStorageSync();
    }

    get(key:string)
    {
        return wx.getStorageSync(key);
    }

    set(key:string, value:object|string)
    {
        wx.setStorageSync(key, value);
    }

    remove(key:string)
    {
        wx.removeStorageSync(key);
    }

    getInt(key:string)
    {
        const value = this.get(key);
        return value ? parseInt(value) : 0;
    }

    getJson(key:string)
    {
        const value = this.get(key);
        return value ? JSON.parse(value) : null;
    }
}

export const wxStorage = new WxStorage();