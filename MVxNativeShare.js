//=============================================================================
// MVxNativeShare.js
// ver 1.0
//=============================================================================

/*:ja
 * @target MV
 * @plugindesc [MV向け]ゲーム画面スクリーンショットとテキストのシェア
 * @author waff
 * @url https://github.com/waffs702/mvz_plugins
 *
 * @help MVxNativeShare.js
 *
 * このプラグインは、ゲーム画面のスクリーンショットと任意のテキストを
 * SNSでシェアするためのコマンドを提供します。
 * このプラグインは、RPGツクールMV/ツクールMZプロジェクトを
 * iOS/Androidアプリ化することを前提としています。
 * 
 * このプラグインを動作させるためには、MZxNativeCore.jsが必要です。
 * このプラグインは、RPGツクールMV向けです。MZでは動作を保証しません。
 * 
 * 次の手順で使用してください。
 *  1. プラグインコマンド 「MZxNativeShare X Y」を呼び出します。
 *      X には、1または0を指定します。1を指定するとスクリーンショット撮影します。0を指定するとスクリーンショットは撮影しません。
 *      Y には、シェアするテキストの変数番号を指定します。
 *      例.  MZxNativeShare 1 105
 *      ゲーム中のスクリーンショット撮影し、シェアするテキストは105番の変数に格納されている文字列を使用します。
 */

(() => {
  Graphics._createRenderer = function() {
    PIXI.dontSayHello = true;
    var width = this._width;
    var height = this._height;
    var options = {
      view: this._canvas,
      preserveDrawingBuffer: true, // 追加
    };
    try {
        switch (this._rendererType) {
        case 'canvas':
            this._renderer = new PIXI.CanvasRenderer(width, height, options);
            break;
        case 'webgl':
            this._renderer = new PIXI.WebGLRenderer(width, height, options);
            break;
        default:
            this._renderer = PIXI.autoDetectRenderer(width, height, options);
            break;
        }

        if(this._renderer && this._renderer.textureGC)
            this._renderer.textureGC.maxIdle = 1;

    } catch (e) {
        this._renderer = null;
    }
  };

  const pluginName = 'MVxNativeShare';
  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;

  Game_Interpreter.prototype.pluginCommand = (command, args) => {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command !== pluginName) {
      return; 
    }

    const isTakeScreenshot = (Number(args[0]) === 1);
    const shareTextVariable = Number(args[1]);
    let base64Data = '';
    if (isTakeScreenshot) {
      const imageData = Graphics._canvas.toDataURL('image/jpeg');
      base64Data = imageData.replace('data:image/jpeg;base64,', '');
    }
    let shareText = '';
    if (typeof $gameVariables._data[shareTextVariable] !== 'undefined') {
      shareText = String($gameVariables._data[shareTextVariable]);
    }
    if (MVZxNativeManager.isAndroid()) {
      const handler = MVZxNativeManager.AndroidHandler();
      handler.shareSNS(shareText, base64Data);
      return;
    }
    if (MVZxNativeManager.isiOS()) {
      const handler = MVZxNativeManager.iOSHandler();
      const params = { k:'', t:shareText, i:base64Data };
      handler.shareSNS.postMessage(JSON.stringify(params));
      return;
    }
  };

})();
