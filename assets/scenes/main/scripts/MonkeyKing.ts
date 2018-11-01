// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

export const ENUM_STATE = {
    RUN: 0,
    JUMP: 1,
    DOWN: 2,
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class MonkeyKing extends cc.Component {
    @property(cc.AudioClip)
    private acJump: cc.AudioClip = null;

    @property(cc.AudioClip)
    private acDown: cc.AudioClip = null;

    private _state = ENUM_STATE.RUN;

    public get state() {
        return this._state
    }

    public jump() {
        if (this._state !== ENUM_STATE.RUN) return;
        this._state = ENUM_STATE.JUMP;

        cc.audioEngine.play(this.acJump, false, 1);
        this.node.runAction(
            cc.sequence(
                cc.jumpBy(1, cc.v2(0, 0), 100, 1),
                cc.callFunc(() => this._state = ENUM_STATE.RUN),
            ),
        );
    }

    public down() {
        if (this._state !== ENUM_STATE.RUN) return;

        this._state = ENUM_STATE.DOWN;
        cc.audioEngine.play(this.acDown, false, 1);
        this.node.runAction(
            cc.sequence(
                cc.scaleTo(0.5, 0.5),
                cc.scaleTo(0.5, 1),
                cc.callFunc(() => this._state = ENUM_STATE.RUN),
            ),
        );
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {}

    // update (dt) {}
}
