//=============================================================================
// MVxNativeInterstitialAd.js
// ver 1.0
//=============================================================================

/*:ja
 * @target MZ
 * @plugindesc [MV向け]インタースティシャル広告の表示
 * @author waff
 * @url https://github.com/waffs702/mvz_plugins
 *
 * @help MVxNativeInterstitialAd.js
 *
 * このプラグインは、インタースティシャル広告を表示し、
 * 広告の終了時にコモンイベントを呼び出すコマンドを提供します。
 * このプラグインは、RPGツクールMV/ツクールMZプロジェクトを
 * iOS/Androidアプリ化することを前提としています。
 * 
 * このプラグインを動作させるためには、MVZxNativeCore.jsが必要です。
 * このプラグインは、RPGツクールMV向けです。MZでは動作を保証しません。
 * 
 * 次の手順で使用してください。
 *  1. プラグインコマンド「MVxNativeInterstitialAd X Y」を呼び出します。
 *    X には「広告表示成功コモンイベント」のコモンイベント番号を指定してください。
 *    Y には「広告表示失敗コモンイベント」のコモンイベント番号を指定してください。
 *    例.  MVxNativeInterstitialAd 15 16
 *        広告表示成功コモンイベントを15番のコモンイベントに指定
 *        広告表示失敗コモンイベントを16番のコモンイベントに指定
 *  2. 広告表示成功コモンイベントは、インタースティシャル広告が正常に表示され、
 *  ユーザが広告の閉じるボタンなどをタップして広告を閉じた後に呼び出されます。
 *  例えば、次のシーンに移動する、ゲームを再開などのイベントを実装します。
 *  3. 広告表示失敗コモンイベントは、広告の表示が失敗したときに呼び出されます。
 *  広告の表示に成功したとき/失敗したときで分岐させることができますが、
 *  特に意識しないのであれば、
 *  「2. 広告表示成功コモンイベント」と同じコモンイベント番号を指定してください。
 * 
 */

(() => {
  const pluginName = 'MVxNativeInterstitialAd';
  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;

  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.apply(this, arguments);
    if (command === pluginName) {
      this.pluginCommandMVxNativeInterstitialAd(command, args);
    }
  };

  Game_Interpreter.prototype.pluginCommandMVxNativeInterstitialAd = function(command, args) {
    const succeededCommonEventId = Number(args[0]);
    const failedShowCommonEventId = Number(args[1]);

    const callbackKey = 'showInterstitialAd';
    MVZxNativeManager.setCallback(callbackKey, (result) => {
      // replay bgm
      $gameSystem.replayBgm();

      if (result === 'onFailed') {
        if (failedShowCommonEventId) $gameTemp.reserveCommonEvent(failedShowCommonEventId);
        return;
      }

      if (result === 'onSucceeded') {
        if (succeededCommonEventId) $gameTemp.reserveCommonEvent(succeededCommonEventId);
        return;
      }
    });

    // save bgm
    $gameSystem.saveBgm();
    AudioManager.stopAll();

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
  };

})();
