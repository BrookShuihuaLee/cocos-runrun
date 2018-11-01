// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import MonkeyKing from './MonkeyKing'

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {
    @property(cc.AudioClip)
    private acBg: cc.AudioClip = null;

    private _audioId: number = null;

    private get _compMonkeyKing() {
        return this.node.getChildByName('monkeyKing').getComponent('MonkeyKing') as MonkeyKing
    }

    private _handleTouchStart(e: cc.Event.EventTouch) {
        if (e.getLocationX() > cc.view.getVisibleSize().width / 2) this._compMonkeyKing.jump()
        else this._compMonkeyKing.down()
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._audioId = cc.audioEngine.play(this.acBg, true, .5);
        this.node.on(cc.Node.EventType.TOUCH_START, this._handleTouchStart, this);
    }

    start () {}

    // update (dt) {}

    onDestroy () {
        cc.audioEngine.stop(this._audioId);
        this.node.off(cc.Node.EventType.TOUCH_START, this._handleTouchStart);
    }
}
