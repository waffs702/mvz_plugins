//=============================================================================
// MZxNativeShare.js
// ver 1.0
//=============================================================================

/*:ja
 * @target MZ
 * @plugindesc [MZ向け]ゲーム画面スクリーンショットとテキストのシェア
 * @author waff
 * @url https://github.com/waffs702/mvz_plugins
 *
 * @help MZxNativeShare.js
 *
 * このプラグインは、ゲーム画面のスクリーンショットと任意のテキストを
 * SNSでシェアするためのコマンドを提供します。
 * このプラグインは、RPGツクールMV/ツクールMZプロジェクトを
 * iOS/Androidアプリ化することを前提としています。
 * 
 * このプラグインを動作させるためには、MVZxNativeCore.jsが必要です。
 * 
 * 
 * 次の手順で使用してください。
 *  1. プラグインコマンド「SNSシェア」を呼び出します。
 * 
 * @command share
 * @text SNSシェア
 * @desc ゲーム画面のスクリーンショットと撮影し、
 * 任意のテキストと撮影した画像をSNSへシェアします。
 * 
 * @arg isTakeScreenshot
 * @type boolean
 * @default true
 * @text スクリーンショット撮影
 * @desc OFFにすると、ゲーム画面のスクリーンショットを撮影しません
 * 
 * @arg shareTextVariable
 * @type variable
 * @default 0
 * @text シェアするテキストの変数番号
 * @desc シェアするテキストを格納する変数番号
 */

(() => {
  Graphics._createPixiApp = function() {
    try {
      this._setupPixi();
      this._app = new PIXI.Application({
        view: this._canvas,
        autoStart: false,
        preserveDrawingBuffer: true, // 追加
      });
      this._app.ticker.remove(this._app.render, this._app);
      this._app.ticker.add(this._onTick, this);
    } catch (e) {
      this._app = null;
    }
  };

  const pluginName = 'MZxNativeShare';
  PluginManager.registerCommand(pluginName, 'share', (args) => {
    const isTakeScreenshot = (args.isTakeScreenshot === 'true');
    const shareTextVariable = Number(args.shareTextVariable);

    let base64Data = '';
    if (isTakeScreenshot) {
      const imageData = Graphics._app.renderer.extract.base64();
      base64Data = imageData.replace('data:image/png;base64,', '');
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
  });

})();
