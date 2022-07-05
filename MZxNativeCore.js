//=============================================================================
// MVZxNativeCore.js
// ver 1.0
//=============================================================================

/*:ja
 * @target MZ
 * @plugindesc [MZ/MV向け]iOS/Androidとの連携するための基本プラグイン
 * @author waff
 * @url https://github.com/waffs702/mvz_plugins
 *
 * @help MVZxNativeCore.js
 *
 * このプラグインは、RPGツクールMV/ツクールMZプロジェクトを
 * iOS/Androidアプリ化することを前提としています。
 * 
 * このプラグイン単体では特に動作しませんが、
 * 別途広告表示やTwitter投稿連携時に必要となる基本プラグインです。
 * 
 * プラグインパラメータのデプロイ環境は、
 * Android向けにデプロイメントする場合は、Androidを選択し、
 * iOS向けにデプロイメントする場合はiOSに切り替えるようにしてください。
 * 
 * @param env
 * @text デプロイ環境(Android/iOS)
 * @desc デプロイ環境(Android/iOS)を選択してください。
 * @default Android
 * @type select
 * @option Android
 * @option iOS
 *
 */

function MVZxNativeManager() {
  throw new Error('This is a static class');
}

MVZxNativeManager._callbacks = {};

MVZxNativeManager.env = function() {
  const parameters = PluginManager.parameters('MZxNativeCore');
  const env = parameters.env || 'Android';
  return env;
}

MVZxNativeManager.isAndroid = function() {
  return MVZxNativeManager.env() === 'Android';
}

MVZxNativeManager.isiOS = function() {
  return MVZxNativeManager.env() === 'iOS';
}

MVZxNativeManager.setCallback = function(key, callback) {
  MVZxNativeManager._callbacks[key] = callback;
}

MVZxNativeManager.removeCallback = function(key) {
  if (typeof MVZxNativeManager._callbacks[key] !== 'undefined') {
    delete MVZxNativeManager._callbacks[key];
  }
}

MVZxNativeManager.nativeCallback = function(arg, key) {
  if (typeof MVZxNativeManager._callbacks[key] !== 'undefined' && MVZxNativeManager._callbacks[key]) {
    MVZxNativeManager._callbacks[key](arg);
  }
};

MVZxNativeManager.AndroidHandler = function() {
  return window.MVZxAndroidHandlers;
}

MVZxNativeManager.iOSHandler = function() {
  return window.webkit.messageHandlers;
}