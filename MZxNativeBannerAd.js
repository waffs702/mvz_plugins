//=============================================================================
// MZxNativeBannerAd.js
// ver 1.0
//=============================================================================

/*:ja
 * @target MZ
 * @plugindesc [MZ向け]バナー広告表示
 * @author waff
 * @url https://github.com/waffs702/mvz_plugins
 *
 * @help MZxNativeBannerAd.js
 *
 * このプラグインは、バナー広告を呼び出すコマンドを提供します。
 * このプラグインは、RPGツクールMV/ツクールMZプロジェクトを
 * iOS/Androidアプリ化することを前提としています。
 * 
 * このプラグインを動作させるためには、MVZxNativeCore.jsが必要です。
 * 
 * 
 * 次の手順で使用してください。
 *  1. プラグインコマンド「バナー広告の表示」を呼び出します。 
 * 
 * @command show
 * @text バナー広告の表示
 * @desc バナー広告を表示します。
 * 
 */

(() => {
  const pluginName = 'MZxNativeBannerAd';
  PluginManager.registerCommand(pluginName, 'show', (args) => {
    
    const callbackKey = 'showBannerAd';

    if (MVZxNativeManager.isAndroid()) {
      const handler = MVZxNativeManager.AndroidHandler();
      handler.showBannerAd(callbackKey);
      return;
    }
    if (MVZxNativeManager.isiOS()) {
      const handler = MVZxNativeManager.iOSHandler();
      const params = { k:callbackKey };
      handler.showBannerAd.postMessage(JSON.stringify(params));
    }
  });

})();
