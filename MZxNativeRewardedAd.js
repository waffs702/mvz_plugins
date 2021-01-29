//=============================================================================
// MZxNativeRewardedAd.js
// ver 0.8
//=============================================================================

/*:ja
 * @target MZ
 * @plugindesc リワード広告の再生
 * @author waff
 * @url https://github.com/waffs702/mvz_plugins
 *
 * @help MZxNativeRewardedAd.js
 *
 * このプラグインは、リワード広告の再生を呼び出し、
 * 広告の終了時にコモンイベントを呼び出すコマンドを提供します。
 * このプラグインは、RPGツクールMV/ツクールMZプロジェクトを
 * iOS/Androidアプリ化することを前提としています。
 * 
 * このプラグインを動作させるためには、MVZxNativeCore.jsが必要です。
 * 
 * 
 * 次の手順で使用してください。
 *  1. プラグインコマンド「リワード広告の表示」を呼び出します。
 *  2. 報酬受取コモンイベントには、例えばゴールドを増やす/HPを回復するなど
 *  を実装します。
 *  3. 失敗コモンイベントは動画の再生に失敗したときのイベントを実装します。
 *  読み込みがまだ完了していない場合は失敗コモンイベントが呼び出されます。
 *  例えば、「しばらく待ってから再度お試しください。」などのメッセージを
 *  表示させると良いです。
 *  4. キャンセルコモンイベントは動画の再生を途中でキャンセルしたときの
 *  イベントを実装します。
 * 
 * 
 * @command show
 * @text リワード広告の表示
 * @desc 報酬受取コモンイベントには、例えば報酬として、ゴールドを増やす/HPを回復する/アイテムを増やすなどを実装します。
 * 失敗コモンイベントは動画の再生に失敗したときのイベントを実装します。
 * 読み込みがまだ完了していない場合は失敗コモンイベントが呼び出されます。
 * 例えば、「しばらく待ってから再度お試しください。」などのメッセージを
 * 表示させると良いです。
 * キャンセルコモンイベントは動画の再生を途中でキャンセルしたときのイベントを実装します。
 * 
 * @arg rewardedCommonEventId
 * @type common_event
 * @default 0
 * @text 報酬受取コモンイベント番号
 * @desc リワード広告の再生が完了して報酬を受け取る際に呼び出すコモンイベント番号
 * 
 * @arg failedShowCommonEventId
 * @type common_event
 * @default 0
 * @text 失敗コモンイベント番号
 * @desc リワード広告の再生が失敗したときに呼び出すコモンイベント番号
 * 
 * @arg canceldShowCommonEventId
 * @type common_event
 * @default 0
 * @text キャンセルコモンイベント番号
 * @desc リワード広告の再生をキャンセルしたときに呼び出すコモンイベント番号
 */

(() => {
  const pluginName = 'MZxNativeRewardedAd';
  PluginManager.registerCommand(pluginName, 'show', (args) => {
    const rewardedCommonEventId = Number(args.rewardedCommonEventId);
    const failedShowCommonEventId = Number(args.failedShowCommonEventId);
    const canceldShowCommonEventId = Number(args.canceldShowCommonEventId);

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
  });

})();
