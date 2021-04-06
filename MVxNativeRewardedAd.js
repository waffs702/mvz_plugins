//=============================================================================
// MVxNativeRewardedAd.js
// ver 1.0
//=============================================================================

/*:ja
 * @target MV
 * @plugindesc リワード広告の再生
 * @author waff
 * @url https://github.com/waffs702/mvz_plugins
 *
 * @help MVxNativeRewardedAd.js
 *
 * このプラグインは、リワード広告の再生を呼び出し、
 * 広告の終了時にコモンイベントを呼び出すコマンドを提供します。
 * このプラグインは、RPGツクールMV/ツクールMZプロジェクトを
 * iOS/Androidアプリ化することを前提としています。
 * 
 * このプラグインを動作させるためには、MVZxNativeCore.jsが必要です。
 * このプラグインは、RPGツクールMV向けです。MZでは動作を保証しません。
 * 
 * 
 * 次の手順で使用してください。
 *  1. プラグインコマンド「MVxNativeRewardedAd X Y Z」を呼び出します。
 *    X には「報酬受取コモンイベント」のコモンイベント番号を指定してください。
 *    Y には「失敗コモンイベント」のコモンイベント番号を指定してください。
 *    Z には「キャンセルコモンイベント」のコモンイベント番号を指定してください。
 *    例.  MVxNativeRewardedAd 12 13 14
 *        報酬受取コモンイベントを12番のコモンイベントに指定
 *        失敗コモンイベントを13番のコモンイベントに指定
 *        キャンセルコモンイベントを14番のコモンイベントに指定
 *  2. 報酬受取コモンイベントには、例えばゴールドを増やす/HPを回復するなど
 *  を実装します。
 *  3. 失敗コモンイベントは動画の再生に失敗したときのイベントを実装します。
 *  読み込みがまだ完了していない場合は失敗コモンイベントが呼び出されます。
 *  例えば、「しばらく待ってから再度お試しください。」などのメッセージを
 *  表示させると良いです。
 *  4. キャンセルコモンイベントは動画の再生を途中でキャンセルしたときの
 *  イベントを実装します。
 * 
 */

(() => {
  const pluginName = 'MVxNativeRewardedAd';
  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;

  Game_Interpreter.prototype.pluginCommand = (command, args) => {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command !== pluginName) {
      return; 
    }

    const rewardedCommonEventId = Number(args[0]);
    const failedShowCommonEventId = Number(args[1]);
    const canceldShowCommonEventId = Number(args[2]);

    const callbackKey = 'showRewardedAd';
    MVZxNativeManager.setCallback(callbackKey, (result) => {
      // replay bgm
      $gameSystem.replayBgm();

      if (result === 'onCanceled') {
        if (canceldShowCommonEventId) $gameTemp.reserveCommonEvent(canceldShowCommonEventId);
        return;
      }

      if (result === 'onFailed') {
        if (failedShowCommonEventId) $gameTemp.reserveCommonEvent(failedShowCommonEventId);
        return;
      }

      if (result === 'onRewarded') {
        if (rewardedCommonEventId) $gameTemp.reserveCommonEvent(rewardedCommonEventId);
        return;
      }
    });

    // save bgm
    $gameSystem.saveBgm();
    AudioManager.stopAll();

    if (MVZxNativeManager.isAndroid()) {
      const handler = MVZxNativeManager.AndroidHandler();
      handler.showRewardedAd(callbackKey);
      return;
    }
    if (MVZxNativeManager.isiOS()) {
      const handler = MVZxNativeManager.iOSHandler();
      const params = { k:callbackKey };
      handler.showRewardedAd.postMessage(JSON.stringify(params));
    }
  };

})();
