# mvz_plugins

このプラグインは、RPGツクールMV/ツクールMZプロジェクトをiOS/Androidアプリ化することを前提としています。
* RPGツクールMV/RPGツクールMZで作成されたプロジェクトをAndroidアプリ化するためのAndroid Studio プロジェクト
https://github.com/waffs702/mv_to_android

* RPGツクールMV/RPGツクールMZで作成されたプロジェクトをiOSアプリ化するためのXcode プロジェクト
https://github.com/waffs702/mv_to_ios

Webブラウザ向け、Windows/Mac向けとしては動作しませんのでご注意ください。

## プラグイン一覧

| ファイル名 | 説明 | ツクールMV/MZ | バージョン |
|--------|--------|--------|--------|
| [MZxNativeCore.js](https://raw.githubusercontent.com/waffs702/mvz_plugins/main/MZxNativeCore.js) | 広告表示やTwitter投稿連携時に必要となる基本プラグイン | MV/MZ | 1.0 |
| --- | | | |
| [MVxNativeRewardedAd.js](https://raw.githubusercontent.com/waffs702/mvz_plugins/main/MVxNativeRewardedAd.js) | リワード広告の再生と報酬受け取りのコモンイベント設定プラグイン | MV向け | 1.1 |
| [MVxNativeInterstitialAd.js](https://raw.githubusercontent.com/waffs702/mvz_plugins/main/MVxNativeInterstitialAd.js) | インタースティシャル広告の表示と結果受取りのコモンイベント設定プラグイン | MV向け | 1.1 |
| [MVxNativeBannerAd.js](https://raw.githubusercontent.com/waffs702/mvz_plugins/main/MVxNativeBannerAd.js) | バナー広告表示プラグイン | MV向け | 1.0 |
| [MVxNativeShare.js](https://raw.githubusercontent.com/waffs702/mvz_plugins/main/MVxNativeShare.js) | ゲーム画面のスクリーンショットを撮影し、TwitterやFacebook等へのSNSシェアするプラグイン | MV向け | 1.0 |
| [MVxNativeCallBrowser.js](https://raw.githubusercontent.com/waffs702/mvz_plugins/main/MVxNativeCallBrowser.js) | ブラウザを起動し、指定のURLへアクセスするプラグイン | MV向け | 1.0 |
| --- | | | |
| [MZxNativeRewardedAd.js](https://raw.githubusercontent.com/waffs702/mvz_plugins/main/MZxNativeRewardedAd.js) | リワード広告の再生と報酬受け取りのコモンイベント設定プラグイン | MZ向け | 1.1 |
| [MZxNativeInterstitialAd.js](https://raw.githubusercontent.com/waffs702/mvz_plugins/main/MZxNativeInterstitialAd.js) | インタースティシャル広告の表示と結果受取りのコモンイベント設定プラグイン | MZ向け | 1.1 |
| [MZxNativeBannerAd.js](https://raw.githubusercontent.com/waffs702/mvz_plugins/main/MZxNativeBannerAd.js) | バナー広告表示プラグイン | MZ向け | 1.0 |
| [MZxNativeShare.js](https://raw.githubusercontent.com/waffs702/mvz_plugins/main/MZxNativeShare.js) | ゲーム画面のスクリーンショットを撮影し、TwitterやFacebook等へのSNSシェアするプラグイン | MZ向け | 1.0 |
| [MZxNativeCallBrowser.js](https://raw.githubusercontent.com/waffs702/mvz_plugins/main/MZxNativeCallBrowser.js) | ブラウザを起動し、指定のURLへアクセスするプラグイン | MZ向け | 1.0 |

## Tips

### RPGツクールMZにて、アプリを起動したのに画面が表示されない、BGMなどは再生される場合の対処の仕方

- SceneManager.isGameActive()という関数の中で、ブラウザがフォーカスされている状態でないと、Sceneが描画されないという仕様になっているようです。

```
SceneManager.isGameActive = function() {
    // [Note] We use "window.top" to support an iframe.
    try {
        return window.top.document.hasFocus();
    } catch (e) {
        // SecurityError
        return true;
    }
};
```

- 上記の実装を下記のように修正することで現象を回避できます。

```
SceneManager.isGameActive = function() {
    return true;
};
```
