declare const wx;

import * as utils from "../util"

export enum WxResponseType
{
    Success = 1,
    Fail = 2,
    Complete = 3,
}

export interface WxBaseParams
{
    success?:(resp) => void;
    fail?:(resp) => void;
    complete?:(resp) => void;
}

interface WxLoginParams extends WxBaseParams 
{
    timeout?:number;
}

interface WxUserInfoParams extends WxBaseParams 
{
    withCredentials?:boolean;
    lang?:string;
    timeout?:number;
}

interface WxRequestParams extends WxBaseParams 
{
    url:string;
    data?:any;
    header?:object;
    method?:string;
    dataType?:string;
    responseType?:string;
}

export type WxTaskParams = WxLoginParams|WxRequestParams|WxUserInfoParams;

export class WxTaskPool
{
    private pools:Map<WxTaskType, WxTask[]>;

    constructor()
    {
        this.pools = new Map();
    }

    get(taskType:WxTaskType)
    {
        const pool = this.pools.get(taskType);
        if(pool && pool.length)
        {
            const task = pool.pop();
            task.isInPool = false;
            return task;
        }
        return null;
    }

    put(taskType:WxTaskType, task:WxTask)
    {
        if(task.isInPool)
        {
            // console.log("already in pool");
            return;
        }
        let pool = this.pools.get(taskType);
        if(!pool)
        {
            pool = [];
            this.pools.set(taskType, pool);
        }
        task.isInPool = true;
        pool.push(task);
    }
}

export enum WxTaskType
{
    Login = "Loin",
    UserInfo = "UserInfo",
    Request = "Request",
}

export abstract class WxTask
{
    public isInPool:boolean;
    protected params:WxTaskParams;
    protected cb:utils.handler;
    protected datas:any[];
    private taskType:WxTaskType;

    constructor(taskType:WxTaskType)
    {
        this.taskType = taskType;
    }

    init(params:WxTaskParams, cb:utils.handler, ...datas)
    {
        this.isInPool = false;
        this.params = params;
        this.cb = cb;
        this.datas = datas;
    }

    exec()
    {
        this.params.success = resp => {
            this.cb.exec(this.taskType, this, WxResponseType.Success, resp, ...this.datas);
        };
        this.params.fail = resp => {
            this.cb.exec(this.taskType, this, WxResponseType.Fail, resp, ...this.datas);
        };
        // this.params.complete = resp => {
        //     this.cb.exec(this.taskType, this, WxResponseType.Complete, resp, ...this.datas);
        // }
    }
}

export class WxUserInfoTask extends WxTask
{
    exec()
    {
        super.exec();
        wx.getUserInfo(this.params);
    }
}

export class WxLoginTask extends WxTask
{
    exec()
    {
        super.exec();
        wx.login(this.params);
    }
}

export class WxRequestTask extends WxTask
{
    exec()
    {
        super.exec();
        wx.request(this.params);
    }
}