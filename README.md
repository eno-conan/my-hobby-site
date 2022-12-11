This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
--legacy-peer-deps
https://mui.com/material-ui/icons/
- [ESLintを無視(next.config.jsに記載)](https://nextjs.org/docs/api-reference/next.config.js/ignoring-eslint)
- [react-form-errorMessage表示](https://react-hook-form.com/api/useformstate/errormessage)


### React・Next
- [1度だけ変更されるstateにはuseStateよりuseReducerを使う](https://zenn.dev/spacemarket/articles/9eb80496fa5fe6?s=09)
- [RHF：ネストフォーム](https://zenn.dev/maro12/articles/7d011d3dfed5d4#%E8%A8%98%E4%BA%8B%E3%81%AE%E6%A6%82%E8%A6%81)
- [22/12/08:Each child in a list should have a unique "key" propへの対応](https://dev.classmethod.jp/articles/avoiding-warningeach-child-in-a-list-should-have-a-unique-key-prop-in-react-apps-is-called-and-not-on-the-side-do-it-on-the-caller/)
- [22/12/11:クエリパラメータを使って別ページへ：一番シンプル](https://qiita.com/syu_ikeda/items/9f3c2f041a1031651c61)
- [22/12/11:クエリパラメータを使って別ページへ：エラーハンドリングあり](https://abillyz.com/mamezou/studies/410)
- [22/12/11：クエリパラメータを隠したい](https://stackoverflow.com/questions/70484870/how-to-hide-query-params-from-the-url-while-using-router-push)
- [22/12/11：画面ローディングの実装](https://fumidzuki.com/knowledge/5013/)
- [22/12/11：画面ローディングが必要な間、図示](https://deecode.net/?p=1891)
- [22/12/11：API Reference/ next/router](https://zenn.dev/unreact/articles/nextjs-next-router#%E3%81%93%E3%81%AE%E8%A8%98%E4%BA%8B%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)
- [getServerSidePropsのエラーハンドリング](https://zenn.dev/takepepe/articles/nextjs-error-handling)

### Material UI
- [Headerを共通化](https://www.to-r.net/media/next-meta-tags/)
- [Gridの使い方、V1,2の2種類あるらしい](https://weblion303.net/1236)
- [Grid、marginやPaddingの使い型](https://smartdevpreneur.com/mui-grid-spacing-padding-and-margin-a-styling-guide/)
- [Card、省略を適用する](https://qiita.com/kazufoot21/items/b381f4b9c4f44fa97aee)
- [Typograpyの資料](https://mui.com/material-ui/api/typography/)
- [動的フォーム](https://note.com/note_fumi/n/naa2d4f16133b)
- [SelectのときにdefaultValueを設定しないと表示されるエラー](https://stackoverflow.com/questions/60813040/materialui-select-set-value-is-always-out-of-range)
- [記録の一覧表示に使用できそう?](https://mui.com/material-ui/react-stack/)
- [22/12/05：待機状態のUI](https://zenn.dev/kii/articles/progress-indicator-ui)
- [22/12/05：How to Create a MUI Grid Container with Full Width and Height](https://smartdevpreneur.com/how-to-create-a-mui-grid-container-with-full-width-and-height/)
- [22/12/11：material-table-next版](https://www.npmjs.com/package/material-table-next)
- [22/12/11：material-table-next参考になった記事](https://zenn.dev/kazu777/articles/51b08d9238617a#%E3%83%87%E3%83%A2)
- [22/12/11：material-table-nextテーブルカラーを変更する](https://github.com/mbrn/material-table/issues/169)
- [22/12/11:ClassNameがフロントとバックで違うよ、って警告対応](https://zenn.dev/nbr41to/articles/c0c691653e3d55#.babelrc-%E3%82%92%E4%BD%9C%E6%88%90)
- [デザインの勉強になりそう](https://m2.material.io/design/layout/responsive-layout-grid.html#grid-customization)

### POST
- [POSTデータ登録(fetch)](https://qiita.com/legokichi/items/801e88462eb5c84af97d)
- [POSTデータ登録(axios)](https://qiita.com/kaikusakari/items/1da54c021c19a03df5b2)

### Zod
- [Zodユースケース](https://zenn.dev/kaz_z/articles/how-to-use-zod)
- [機能一通り紹介](https://zenn.dev/uttk/articles/bd264fa884e026#.parse())
- [Error Handling Basic](https://tech.every.tv/entry/2022/03/31/170000)

### Prisma
- [planetScaleを始める](https://zenn.dev/nbr41to/articles/adabca83b2e6ea)
- [データ取得の方法あれこれ](https://qiita.com/koffee0522/items/92be1826f1a150bfe62e)
- [migraiotnプチブック](https://zenn.dev/thirosue/books/49a4ee418743ed/viewer/57d161)
- [seed.ts使うまでの準備](https://www.prisma.io/docs/guides/database/seed-database)
- [seed.tsの記載例](https://github.com/prisma/prisma-examples/blob/latest/typescript/graphql/prisma/seed.ts)
- [22/12/10：特定項目だけ取得](https://www.prisma.io/docs/concepts/components/prisma-client/select-fields)
- [22/12/09：長い文字列を登録したい1](https://zenn.dev/ikekyo/scraps/f6c87fbfd3bf9d)
- [22/12/09：長い文字列を登録したい2](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#mysql)
- [22/12/10：There are already 10 instances of Prisma Client actively running修正](https://zenn.dev/kanasugi/articles/368d0b39c94daf)
- [22/12/10：単体試験](https://www.prisma.io/docs/guides/testing/unit-testing)
- [22/12/11：prisma、orderBy](https://www.howtographql.com/typescript-helix/10-filtering-pagination-and-sorting/)
- [22/12/11：prisma、orderBy](https://github.com/prisma/prisma/issues/11104)

### markdown
- [入力とプレビュー：22/12/04](https://qiita.com/t_okkan/items/0a3318f90ee6c4468f82#%E3%83%9E%E3%83%BC%E3%82%AF%E3%83%80%E3%82%A6%[…]l%E3%81%AB%E5%A4%89%E6%8F%9B%E3%81%99%E3%82%8B)→これが一番よかった
- [使いそうなライブラリが載っていた：22/12/04](https://zenn.dev/rinka/articles/b260e200cb5258)
- [エラー対応：22/12/04](https://stackoverflow.com/questions/65646007/next-js-dompurify-sanitize-shows-typeerror-dompurify-webpack-imported-module)
- [ReferenceError: navigator is not defined対応](https://qiita.com/akki-memo/items/bd14d9af5dc1be8e04c9)
- [Next.js + react-markdownでローカルのmarkdownをSSG](https://zenn.dev/asazutaiga/articles/be2a8a5f428a38)
- [markdownの入力](https://qiita.com/t_okkan/items/0a3318f90ee6c4468f82)
- [職務経歴書：mdからpdfへ](https://zenn.dev/ryo_kawamata/articles/resume-on-github)


### others
- [22/12/04:表示ページのパスを取得1](https://www.delftstack.com/ja/howto/react/react-get-current-url/)
- [22/12/04:表示ページのパスを取得2](https://dev-k.hatenablog.com/entry/how-to-access-the-window-object-in-nextjs-dev-k)
- [realTimeSearch](https://yutaro-blog.net/2022/03/21/react-search/#index_id0)
- [リンクを別タブで開く(Next13で挙動が変わったらしい)](https://qiita.com/syu_ikeda/items/86f6ad0ddfe8c5e1686b)

### file management
- [publicDirにおいたファイルを画面からダウンロードする](https://reactgo.com/react-download-file-on-button-click/)
- [アップロードしたファイルの中身を取得したい](https://ja.javascript.info/file)

### aws
- [ドラッグ&ドロップでファイルアップロード](https://zenn.dev/jinwatanabe/articles/66c712e44661d9#aws-sdk)

```bash
npm run dev
# or
yarn dev
```
