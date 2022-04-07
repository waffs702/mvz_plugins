//=============================================================================
// MZxNativeCallBrowser.js
// ver 1.0
//=============================================================================

/*:ja
 * @target MZ
 * @plugindesc ブラウザの起動
 * @author waff
 * @url https://github.com/waffs702/mvz_plugins
 *
 * @help MZxNativeCallBrowser.js
 *
 * このプラグインは、ブラウザを起動し、指定のURLへアクセスするためのコマンドを提供します。
 * このプラグインは、RPGツクールMV/ツクールMZプロジェクトを
 * iOS/Androidアプリ化することを前提としています。
 * 
 * このプラグインを動作させるためには、MVZxNativeCore.jsが必要です。
 * 
 * 
 * 次の手順で使用してください。
 *  1. プラグインコマンド「ブラウザ起動」を呼び出します。
 * 
 * @command callBrowser
 * @text ブラウザ起動
 * @desc ブラウザを起動し、指定のURLへアクセスします。
 * 
 * @arg url
 * @text アクセス先URL
 * @default 
 * @desc 
 */

(() => {
  const pluginName = 'MZxNativeCallBrowser';

  PluginManager.registerCommand(pluginName, 'callBrowser', (args) => {
    const url = String(args.url) || '';
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
  });
})();