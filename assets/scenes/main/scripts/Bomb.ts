// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import MonkeyKing, { ENUM_STATE } from './MonkeyKing'

const {ccclass, property} = cc._decorator;

@ccclass
export default class Bomb extends cc.Component {
    @property(cc.AudioClip)
    private acLose: cc.AudioClip = null;

    private get _compMonkeyKing() {
        return this.node.getParent().getChildByName('monkeyKing').getComponent('MonkeyKing') as MonkeyKing
    }

    public judgeJump() {
        if (this._compMonkeyKing.state !== ENUM_STATE.JUMP) {
            cc.audioEngine.play(this.acLose, false, 1)
            cc.director.loadScene('main')
        }
    }

    public judgeDown() {
        if (this._compMonkeyKing.state !== ENUM_STATE.DOWN) {
            cc.audioEngine.play(this.acLose, false, 1)
            cc.director.loadScene('main')
        }
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.schedule(() => {
            this.getComponent(cc.Animation).play(Math.random() < 0.5 ? 'animBombLow' : 'animBombHigh')
        }, 4);
    }

    start () {}

    // update (dt) {}
}
