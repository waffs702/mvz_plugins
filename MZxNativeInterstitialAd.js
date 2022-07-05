//=============================================================================
// MZxNativeInterstitialAd.js
// ver 1.1
//=============================================================================

/*:ja
 * @target MZ
 * @plugindesc [MZ向け]インタースティシャル広告の表示
 * @author waff
 * @url https://github.com/waffs702/mvz_plugins
 *
 * @help MZxNativeInterstitialAd.js
 *
 * このプラグインは、インタースティシャル広告を表示し、
 * 広告の終了時にコモンイベントを呼び出すコマンドを提供します。
 * このプラグインは、RPGツクールMV/ツクールMZプロジェクトを
 * iOS/Androidアプリ化することを前提としています。
 * 
 * このプラグインを動作させるためには、MVZxNativeCore.jsが必要です。
 * 
 * 
 * 次の手順で使用してください。
 *  1. プラグインコマンド「インタースティシャル広告の表示」を呼び出します。
 *  2. 広告表示成功コモンイベントは、インタースティシャル広告が正常に表示され、
 *  ユーザが広告の閉じるボタンなどをタップして広告を閉じた後に呼び出されます。
 *  例えば、次のシーンに移動する、ゲームを再開などのイベントを実装します。
 *  3. 広告表示失敗コモンイベントは、広告の表示が失敗したときに呼び出されます。
 *  広告の表示に成功したとき/失敗したときで分岐させることができますが、
 *  特に意識しないのであれば、
 *  2. 広告表示成功コモンイベントと同じコモンイベント番号を指定してください。
 * 
 * 
 * @command show
 * @text インタースティシャル広告の表示
 * @desc 広告表示成功コモンイベントは、インタースティシャル広告が正常に表示され、
 *  ユーザが広告の閉じるボタンなどをタップして広告を閉じた後に呼び出されます。
 *  例えば、次のシーンに移動する、ゲームを再開などのイベントを実装します。
 * 
 *  広告表示失敗コモンイベントは、広告の表示が失敗したときに呼び出されます。
 *  広告の表示に成功したとき/失敗したときで分岐させることができますが、
 *  特に意識しないのであれば、
 *  広告表示成功コモンイベントと同じコモンイベント番号を指定してください。
 * 
 * @arg succeededCommonEventId
 * @type common_event
 * @default 0
 * @text 広告表示成功コモンイベント番号
 * @desc インタースティシャル広告の表示が成功して広告が閉じられたときに呼び出すコモンイベント番号
 * 
 * @arg failedShowCommonEventId
 * @type common_event
 * @default 0
 * @text 広告表示失敗コモンイベント番号
 * @desc インタースティシャル広告の表示が失敗したときに呼び出すコモンイベント番号
 */

(() => {
  const pluginName = 'MZxNativeInterstitialAd';
  PluginManager.registerCommand(pluginName, 'show', (args) => {
    const succeededCommonEventId = Number(args.succeededCommonEventId);
    const failedShowCommonEventId = Number(args.failedShowCommonEventId);

    const callbackKey = 'showInterstitialAd';
    MVZxNativeManager.setCallback(callbackKey, (result) => {
      if (result === 'onFailed') {
        if (failedShowCommonEventId) $gameTemp.reserveCommonEvent(failedShowCommonEventId);
        return;
      }

      if (result === 'onSucceeded') {
        if (succeededCommonEventId) $gameTemp.reserveCommonEvent(succeededCommonEventId);
        return;
      }
    });

    if (MVZxNativeManager.isAndroid()) {
      const handler = MVZxNativeManager.AndroidHandler();
      handler.showInterstitialAd(callbackKey);
      return;
    }
    if (MVZxNativeManager.isiOS()) {
      const handler = MVZxNativeManager.iOSHandler();
      const params = { k:callbackKey };
      handler.showInterstitialAd.postMessage(JSON.stringify(params));
    }
  });

})();
