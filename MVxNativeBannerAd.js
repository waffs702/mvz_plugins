//=============================================================================
// MVxNativeBannerAd.js
// ver 1.0
//=============================================================================

/*:ja
 * @target MV
 * @plugindesc [MV向け]リワード広告の再生
 * @author waff
 * @url https://github.com/waffs702/mvz_plugins
 *
 * @help MVxNativeBannerAd.js
 *
 * このプラグインは、バナー広告を呼び出すコマンドを提供します。
 * このプラグインは、RPGツクールMV/ツクールMZプロジェクトを
 * iOS/Androidアプリ化することを前提としています。
 * 
 * このプラグインを動作させるためには、MVZxNativeCore.jsが必要です。
 * 
 * 
 * 次の手順で使用してください。
 *  1. プラグインコマンド「MVxNativeBannerAd」を呼び出します。
 * 
 */

(() => {
  const pluginName = 'MVxNativeBannerAd';
  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;

  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.apply(this, arguments);
    if (command === pluginName) {
      this.pluginCommandMVxNativeBannerAd(command, args);
    }
  };

  Game_Interpreter.prototype.pluginCommandMVxNativeBannerAd = function(command, args) {
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
  };

})();
