# 有限会社老田硝子店 ウェブサイト

本番: https://inoshishi760en-beep.github.io/HP/

HTML / CSS / JavaScript の静的サイトです。ページの表示に npm パッケージや外部 JavaScript は不要です。フォント取得ができない場合は端末の日本語フォントを使用します。

## 編集・ローカル確認

Node.js が必要です。

```powershell
node scripts/build.mjs
node scripts/verify.mjs
node scripts/serve.mjs
```

プレビュー: http://127.0.0.1:4173/HP/

- ページ本文、共通ヘッダー・フッター、電話・LINE・受付時間: `scripts/build.mjs`
- デザイン・レスポンシブ対応: `css/style.css`
- モバイルメニュー・年表示: `js/script.js`
- 既存のプライバシーポリシー本文: `content/privacy.html`
- 画像: `assets/`。WebP は既存素材を軽量化したものです。掲載画像は施工実績ではなくイメージとして表示しています。

本文を更新したら build を実行し、生成された HTML と sitemap.xml も一緒にコミットしてください。HTML を直接編集すると、次回 build で上書きされます。

## 本番反映

既存の GitHub Pages 設定は `main` ブランチのルートディレクトリを公開します。通常のコミット・push で自動反映されます。GitHub Actions の `pages build and deployment` が成功したこと、および本番の表示を確認してください。

`service.html` / `company.html` / `contact.html` はディレクトリ内の新ページに転送します。JavaScript 有効時はクエリ・フラグメントも保持します。

公開先を変更する場合は `scripts/build.mjs` の `site`、404 の `/HP/`、`scripts/verify.mjs` の `base` を更新し、再ビルドしてください。

## ロールバック

今回の公開コミットを `git revert <コミットID>` で取り消して push すると、以前のサイトを再公開できます。履歴の強制上書きは不要です。

## 検証

`node scripts/verify.mjs` で内部リンク・画像・アンカー・受付時間・LINE URL・構造化データを検証します。デザイン変更時は、PC / タブレット / スマートフォンで表示と操作も確認してください。
