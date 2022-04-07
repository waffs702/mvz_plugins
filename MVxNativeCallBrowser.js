//=============================================================================
// MVxNativeCallBrowser.js
// ver 1.0
//=============================================================================

/*:ja
 * @target MV
 * @plugindesc [MV向け]ブラウザの起動
 * @author waff
 * @url https://github.com/waffs702/mvz_plugins
 *
 * @help MVxNativeCallBrowser.js
 *
 * このプラグインは、ブラウザを起動し、指定のURLへアクセスするためのコマンドを提供します。
 * このプラグインは、RPGツクールMV/ツクールMZプロジェクトを
 * iOS/Androidアプリ化することを前提としています。
 * 
 * このプラグインを動作させるためには、MZxNativeCore.jsが必要です。
 * このプラグインは、RPGツクールMV向けです。MZでは動作を保証しません。
 * 
 * 次の手順で使用してください。
 *  1. プラグインコマンド MVxNativeCallBrowser X 」を呼び出します。
 *      X には、アクセス先のURLを指定します。
 */

(() => {
  const pluginName = 'MVxNativeCallBrowser';
  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;

  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.apply(this, arguments);
    if (command === pluginName) {
      this.pluginCommandMVxNativeCallBrowser(command, args);
    }
  };

  Game_Interpreter.prototype.pluginCommandMVxNativeCallBrowser = function(command, args) {
    const url = String(args[0]) || '';
    if (MVZxNativeManager.isAndroid()) {
      const handler = MVZxNativeManager.AndroidHandler();
      handler.callBrowser(url);
      return;
    }
    if (MVZxNativeManager.isiOS()) {
      const handler = MVZxNativeManager.iOSHandler();
      const params = { k:'', url };
      handler.callBrowser.postMessage(JSON.stringify(params));
      return;
    }
  };

})();
