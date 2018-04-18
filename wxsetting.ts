declare const wx;

import * as utils from "../util"
import {wxTip} from "./wxtips"

export const enum WxScope {
    UserInfo = "scope.userInfo",
    Location = "scope.userLocation",
    Address = "scope.address",
    InvoiceTitle = "scope.invoiceTitle",
    WeRun = "scope.werun",
    Record = "scope.record",
    PhotoAlbum = "scope.writePhotosAlbum",
    Camera = "scope.camera",
}

const wxScopeName = {
    [WxScope.UserInfo]:"用户信息",
    [WxScope.Location]:"地理位置",
    [WxScope.Address]:"通讯地址",
    [WxScope.InvoiceTitle]:"发票抬头",
    [WxScope.WeRun]:"微信运动步数",
    [WxScope.Record]:"录音功能",
    [WxScope.PhotoAlbum]:"保存到相册",
    [WxScope.Camera]:"摄像头",
}

class WxSetting
{
    /**
     * successCb 有权限时的处理函数
     * failCb 无权限时的处理函数
     */
    checkSetting(scope:WxScope, successCb?:utils.handler, failCb?:utils.handler)
    {
        const openSetting = () => {
            wx.openSetting({
                success:resp => {
                    console.log("wx.openSetting", resp);
                    const hasScope = resp.authSetting[scope];
                    if(hasScope === false)
                    {
                        console.log("设置界面还是没授权。。。");
                        failCb ? failCb.exec() : showModal();
                        return;
                    }
                    successCb.exec();
                },
            });
        };

        const showModal = () => {
            wxTip.showModal("权限不足", `需要${wxScopeName[scope]}权限才能玩游戏哦~`, utils.gen_handler(() => {
                openSetting();
            }));
        };

        wx.getSetting({
            success:resp => {
                console.log("wx.getSetting", resp);
                const hasScope = resp.authSetting[scope];
                if(hasScope === true)
                {
                    // 用户已授权，可以直接调用相关 API
                    successCb.exec();
                    return;
                }
                if(hasScope === false)
                {
                    // 用户已拒绝授权，再调用相关 API 或者 wx.authorize 会失败，需要引导用户到设置页面打开授权开关
                    console.log("用户之前已拒绝授权，本次引导打开设置界面");
                    failCb ? failCb.exec() : showModal();
                    return;
                }
                // 未询问过用户授权，调用相关 API 或者 wx.authorize 会弹窗询问用户
                wx.authorize({
                    scope,
                    fail:resp => {
                        // iOS 和 Android 对于拒绝授权的回调 errMsg 没有统一，需要做一下兼容处理
                        console.log("wx.authorize fail", resp);
                        if(resp.errMsg.indexOf('auth deny') > -1 || resp.errMsg.indexOf('auth denied') > -1)
                        {
                            // 处理用户拒绝授权的情况
                            console.log("用户本次拒绝授权，引导打开设置界面");
                            failCb ? failCb.exec() : showModal();
                        }
                    },
                    success:resp => {
                       // 用户同意授权
                       successCb.exec();
                    },
                });
            },
        });
    }
}

export const wxSetting = new WxSetting();