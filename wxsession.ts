declare const wx;

import {wxConsts} from "./wxconsts"
import {wxStorage} from "./wxstorage"

class WxSession 
{
    get() 
    {
        return wxStorage.get(wxConsts.SESSION_KEY);
    }

    set(session:string) 
    {
        wxStorage.set(wxConsts.SESSION_KEY, session)
    }

    clear() 
    {
        wxStorage.remove(wxConsts.SESSION_KEY);
    }
}

export const wxSession = new WxSession();