export const PHRASES = {
  tech: {
    label: "Tech English",
    labelJa: "テック英語",
    subcategories: {
      github: {
        label: "GitHub",
        labelJa: "GitHub操作",
        phrases: [
          {
            id: "tech-github-001",
            en: "This pull request has merge conflicts.",
            ja: "このプルリクエストにはマージの競合があります。",
            words: [
              { word: "This", meaning: "この" },
              { word: "pull request", meaning: "プルリクエスト", note: "変更をマージする依頼" },
              { word: "has", meaning: "〜がある" },
              { word: "merge", meaning: "マージ", note: "ブランチを統合すること" },
              { word: "conflicts", meaning: "競合・コンフリクト", note: "同じ箇所が両方で変更されている状態" }
            ],
            context: "GitHubのPR画面で、自動マージできない競合が発生しているときに表示されるメッセージ",
            difficulty: 2,
            tags: ["github", "merge", "conflict", "pull-request"]
          },
          {
            id: "tech-github-002",
            en: "Fork this repository to your account.",
            ja: "このリポジトリをあなたのアカウントにフォークしてください。",
            words: [
              { word: "Fork", meaning: "フォークする", note: "他人のリポジトリを自分のアカウントにコピーすること" },
              { word: "this", meaning: "この" },
              { word: "repository", meaning: "リポジトリ", note: "コードを管理する保管場所" },
              { word: "to", meaning: "〜へ" },
              { word: "your", meaning: "あなたの" },
              { word: "account", meaning: "アカウント" }
            ],
            context: "オープンソースプロジェクトに貢献する際、まずリポジトリを自分のアカウントにコピーする操作",
            difficulty: 1,
            tags: ["github", "fork", "repository"]
          },
          {
            id: "tech-github-003",
            en: "Create a new branch from main.",
            ja: "mainから新しいブランチを作成してください。",
            words: [
              { word: "Create", meaning: "作成する" },
              { word: "a new", meaning: "新しい" },
              { word: "branch", meaning: "ブランチ", note: "開発の分岐点。機能ごとに作るのが一般的" },
              { word: "from", meaning: "〜から" },
              { word: "main", meaning: "mainブランチ", note: "以前はmasterと呼ばれていたデフォルトブランチ" }
            ],
            context: "新しい機能開発やバグ修正を始めるときに、mainブランチを元にして新しいブランチを切る操作",
            difficulty: 1,
            tags: ["github", "branch", "git"]
          },
          {
            id: "tech-github-004",
            en: "Push your changes to the remote repository.",
            ja: "変更をリモートリポジトリにプッシュしてください。",
            words: [
              { word: "Push", meaning: "プッシュする", note: "ローカルの変更をサーバーに送信すること" },
              { word: "your", meaning: "あなたの" },
              { word: "changes", meaning: "変更" },
              { word: "to", meaning: "〜へ" },
              { word: "the remote", meaning: "リモートの", note: "GitHub上のサーバー側" },
              { word: "repository", meaning: "リポジトリ" }
            ],
            context: "ローカルでコミットした変更をGitHubなどのリモートサーバーに反映させる操作",
            difficulty: 1,
            tags: ["github", "git", "push", "remote"]
          },
          {
            id: "tech-github-005",
            en: "This commit has been reverted.",
            ja: "このコミットは取り消されました。",
            words: [
              { word: "This", meaning: "この" },
              { word: "commit", meaning: "コミット", note: "変更を記録する単位" },
              { word: "has been", meaning: "〜されました（完了）", note: "現在完了の受動態" },
              { word: "reverted", meaning: "取り消された・リバートされた", note: "変更を元に戻すこと" }
            ],
            context: "問題のあるコミットをgit revertで打ち消したあと、GitHubに表示されるメッセージ",
            difficulty: 2,
            tags: ["github", "git", "revert", "commit"]
          },
          {
            id: "tech-github-006",
            en: "Squash and merge this pull request.",
            ja: "このプルリクエストをスカッシュしてマージしてください。",
            words: [
              { word: "Squash", meaning: "スカッシュ", note: "複数のコミットを1つにまとめること" },
              { word: "and", meaning: "そして" },
              { word: "merge", meaning: "マージする", note: "ブランチを統合すること" },
              { word: "this", meaning: "この" },
              { word: "pull request", meaning: "プルリクエスト" }
            ],
            context: "GitHubのPRマージボタンのオプション。複数コミットを1つにまとめてからマージする方法",
            difficulty: 3,
            tags: ["github", "merge", "squash", "pull-request"]
          },
          {
            id: "tech-github-007",
            en: "Review the changes before merging.",
            ja: "マージする前に変更をレビューしてください。",
            words: [
              { word: "Review", meaning: "レビューする・確認する" },
              { word: "the changes", meaning: "変更内容" },
              { word: "before", meaning: "〜する前に" },
              { word: "merging", meaning: "マージすること" }
            ],
            context: "チームメンバーがコードをマージする前に確認をお願いするときの表現",
            difficulty: 1,
            tags: ["github", "review", "merge", "pull-request"]
          },
          {
            id: "tech-github-008",
            en: "This issue has been closed.",
            ja: "このissueはクローズされました。",
            words: [
              { word: "This", meaning: "この" },
              { word: "issue", meaning: "issue", note: "バグ報告や機能要望などを管理するチケット" },
              { word: "has been", meaning: "〜されました（完了）" },
              { word: "closed", meaning: "クローズされた・解決済みになった" }
            ],
            context: "GitHubのissueが解決されたり、議論が終了してクローズされたときに表示されるメッセージ",
            difficulty: 1,
            tags: ["github", "issue", "closed"]
          },
          {
            id: "tech-github-009",
            en: "Request a review from a team member.",
            ja: "チームメンバーにレビューをリクエストしてください。",
            words: [
              { word: "Request", meaning: "リクエストする・依頼する" },
              { word: "a review", meaning: "レビュー・確認" },
              { word: "from", meaning: "〜に対して" },
              { word: "a team member", meaning: "チームメンバー" }
            ],
            context: "PRを作成したあと、担当者にコードレビューを依頼するときの操作",
            difficulty: 1,
            tags: ["github", "review", "team", "pull-request"]
          },
          {
            id: "tech-github-010",
            en: "Check the workflow run status.",
            ja: "ワークフローの実行ステータスを確認してください。",
            words: [
              { word: "Check", meaning: "確認する" },
              { word: "the workflow", meaning: "ワークフロー", note: "GitHub Actionsの自動処理フロー" },
              { word: "run", meaning: "実行" },
              { word: "status", meaning: "ステータス・状態", note: "成功・失敗・実行中など" }
            ],
            context: "GitHub ActionsのCI/CDパイプラインが正常に動作しているか確認するときの表現",
            difficulty: 2,
            tags: ["github", "actions", "ci-cd", "workflow"]
          },
          {
            id: "tech-github-011",
            en: "Resolve the merge conflicts.",
            ja: "マージの競合を解決してください。",
            words: [
              { word: "Resolve", meaning: "解決する" },
              { word: "the merge", meaning: "マージの" },
              { word: "conflicts", meaning: "競合・コンフリクト", note: "同じファイルの同じ行が両方で変更された状態" }
            ],
            context: "PRをマージしようとしたときにコンフリクトが発生し、手動で解決を求められる場面",
            difficulty: 2,
            tags: ["github", "merge", "conflict", "git"]
          },
          {
            id: "tech-github-012",
            en: "The build has failed.",
            ja: "ビルドが失敗しました。",
            words: [
              { word: "The build", meaning: "ビルド", note: "ソースコードをコンパイル・テストする処理" },
              { word: "has", meaning: "〜した（完了）" },
              { word: "failed", meaning: "失敗した" }
            ],
            context: "GitHub ActionsなどのCIで、テストやビルドが失敗したときに表示されるメッセージ",
            difficulty: 1,
            tags: ["github", "actions", "build", "ci-cd"]
          },
          {
            id: "tech-github-013",
            en: "Clone the repository to your local machine.",
            ja: "リポジトリをローカルマシンにクローンしてください。",
            words: [
              { word: "Clone", meaning: "クローンする", note: "リモートのリポジトリをローカルにコピーすること" },
              { word: "the repository", meaning: "リポジトリ" },
              { word: "to", meaning: "〜へ" },
              { word: "your", meaning: "あなたの" },
              { word: "local machine", meaning: "ローカルマシン", note: "自分のパソコン" }
            ],
            context: "GitHubのリポジトリページにある「Code」ボタンから作業を始めるときの最初のステップ",
            difficulty: 1,
            tags: ["github", "git", "clone", "local"]
          },
          {
            id: "tech-github-014",
            en: "Add a description to your pull request.",
            ja: "プルリクエストに説明を追加してください。",
            words: [
              { word: "Add", meaning: "追加する" },
              { word: "a description", meaning: "説明文・概要" },
              { word: "to", meaning: "〜に" },
              { word: "your", meaning: "あなたの" },
              { word: "pull request", meaning: "プルリクエスト" }
            ],
            context: "PRを作成するとき、変更内容や目的をレビュアーに伝えるための説明を書くよう促す場面",
            difficulty: 1,
            tags: ["github", "pull-request", "documentation"]
          },
          {
            id: "tech-github-015",
            en: "Enable GitHub Actions for this repository.",
            ja: "このリポジトリのGitHub Actionsを有効にしてください。",
            words: [
              { word: "Enable", meaning: "有効にする" },
              { word: "GitHub Actions", meaning: "GitHub Actions", note: "GitHubのCI/CD自動化サービス" },
              { word: "for", meaning: "〜のために" },
              { word: "this", meaning: "この" },
              { word: "repository", meaning: "リポジトリ" }
            ],
            context: "新しいリポジトリでCI/CDパイプラインを設定するときに、GitHub Actionsを初めて有効化する操作",
            difficulty: 2,
            tags: ["github", "actions", "ci-cd", "settings"]
          }
        ]
      },
      errors: {
        label: "Error Messages",
        labelJa: "エラーメッセージ",
        phrases: [
          {
            id: "tech-errors-001",
            en: "Access denied. You do not have permission to perform this action.",
            ja: "アクセスが拒否されました。このアクションを実行する権限がありません。",
            words: [
              { word: "Access", meaning: "アクセス" },
              { word: "denied", meaning: "拒否された" },
              { word: "You do not have", meaning: "あなたは〜を持っていない" },
              { word: "permission", meaning: "権限・許可" },
              { word: "to perform", meaning: "〜を実行する" },
              { word: "this action", meaning: "このアクション・この操作" }
            ],
            context: "WindowsやLinuxで、管理者権限が必要な操作をしようとしたときに表示されるエラー",
            difficulty: 2,
            tags: ["error", "permission", "windows", "security"]
          },
          {
            id: "tech-errors-002",
            en: "The file is being used by another process.",
            ja: "このファイルは別のプロセスによって使用されています。",
            words: [
              { word: "The file", meaning: "このファイル" },
              { word: "is being used", meaning: "使用されている（進行中）", note: "現在進行形の受動態" },
              { word: "by", meaning: "〜によって" },
              { word: "another", meaning: "別の" },
              { word: "process", meaning: "プロセス", note: "実行中のプログラム" }
            ],
            context: "Windowsでファイルを削除・移動しようとしたとき、別のアプリが同じファイルを開いている場合に表示されるエラー",
            difficulty: 2,
            tags: ["error", "windows", "file", "process"]
          },
          {
            id: "tech-errors-003",
            en: "Connection timed out. Please try again later.",
            ja: "接続がタイムアウトしました。後でもう一度お試しください。",
            words: [
              { word: "Connection", meaning: "接続" },
              { word: "timed out", meaning: "タイムアウトした", note: "一定時間内に応答がなかった状態" },
              { word: "Please", meaning: "〜してください" },
              { word: "try again", meaning: "もう一度試す" },
              { word: "later", meaning: "後で" }
            ],
            context: "ウェブブラウザやアプリがサーバーに接続しようとして、一定時間内に応答がなかった場合に表示されるエラー",
            difficulty: 1,
            tags: ["error", "network", "timeout", "internet"]
          },
          {
            id: "tech-errors-004",
            en: "Not enough disk space to complete the operation.",
            ja: "操作を完了するためのディスク容量が不足しています。",
            words: [
              { word: "Not enough", meaning: "十分でない・不足している" },
              { word: "disk space", meaning: "ディスクの空き容量" },
              { word: "to complete", meaning: "〜を完了するために" },
              { word: "the operation", meaning: "操作・処理" }
            ],
            context: "ファイルのコピーやインストール中に、ストレージの空き容量が足りなくなったときに表示されるエラー",
            difficulty: 2,
            tags: ["error", "disk", "storage", "windows"]
          },
          {
            id: "tech-errors-005",
            en: "This application has stopped responding.",
            ja: "このアプリケーションは応答していません。",
            words: [
              { word: "This", meaning: "この" },
              { word: "application", meaning: "アプリケーション" },
              { word: "has stopped", meaning: "〜しなくなった（完了）" },
              { word: "responding", meaning: "応答すること", note: "ユーザーの操作に反応すること" }
            ],
            context: "Windowsでアプリがフリーズし、タスクバーに「応答なし」と表示される状態のときのシステムメッセージ",
            difficulty: 2,
            tags: ["error", "windows", "crash", "application"]
          },
          {
            id: "tech-errors-006",
            en: "The certificate is not trusted.",
            ja: "この証明書は信頼されていません。",
            words: [
              { word: "The certificate", meaning: "証明書", note: "ウェブサイトの身元を証明するSSL/TLS証明書" },
              { word: "is not", meaning: "〜ではない" },
              { word: "trusted", meaning: "信頼された", note: "ブラウザが安全と認識していない状態" }
            ],
            context: "ブラウザでHTTPSサイトにアクセスしたとき、証明書が無効・期限切れ・自己署名の場合に表示されるエラー",
            difficulty: 2,
            tags: ["error", "security", "ssl", "browser", "certificate"]
          },
          {
            id: "tech-errors-007",
            en: "Failed to establish a secure connection.",
            ja: "安全な接続を確立できませんでした。",
            words: [
              { word: "Failed to", meaning: "〜することに失敗した" },
              { word: "establish", meaning: "確立する・構築する" },
              { word: "a secure", meaning: "安全な" },
              { word: "connection", meaning: "接続" }
            ],
            context: "ブラウザやアプリがHTTPS通信を試みたが、SSL/TLSハンドシェイクに失敗したときのエラー",
            difficulty: 3,
            tags: ["error", "security", "ssl", "network", "https"]
          },
          {
            id: "tech-errors-008",
            en: "An unexpected error has occurred.",
            ja: "予期しないエラーが発生しました。",
            words: [
              { word: "An", meaning: "ひとつの（不定冠詞）" },
              { word: "unexpected", meaning: "予期しない・想定外の" },
              { word: "error", meaning: "エラー" },
              { word: "has occurred", meaning: "発生しました（完了）" }
            ],
            context: "システムが想定外の状態になったとき、原因が特定できない場合にアプリやOSが表示する汎用エラーメッセージ",
            difficulty: 1,
            tags: ["error", "generic", "crash", "application"]
          },
          {
            id: "tech-errors-009",
            en: "The requested resource was not found.",
            ja: "要求されたリソースが見つかりませんでした。",
            words: [
              { word: "The requested", meaning: "要求された" },
              { word: "resource", meaning: "リソース", note: "ファイル、ページ、APIエンドポイントなど" },
              { word: "was not found", meaning: "見つからなかった", note: "HTTPの404エラーに相当" }
            ],
            context: "存在しないURLにアクセスしたり、削除されたファイルにアクセスしようとしたときの404系エラー",
            difficulty: 2,
            tags: ["error", "404", "http", "network"]
          },
          {
            id: "tech-errors-010",
            en: "You need to restart your computer to apply changes.",
            ja: "変更を適用するためにコンピューターを再起動する必要があります。",
            words: [
              { word: "You need to", meaning: "〜する必要があります" },
              { word: "restart", meaning: "再起動する" },
              { word: "your computer", meaning: "あなたのコンピューター" },
              { word: "to apply", meaning: "〜を適用するために" },
              { word: "changes", meaning: "変更" }
            ],
            context: "Windowsのアップデートやドライバーのインストール後に、設定を有効にするために再起動を促すメッセージ",
            difficulty: 1,
            tags: ["error", "windows", "restart", "update"]
          },
          {
            id: "tech-errors-011",
            en: "The service is temporarily unavailable.",
            ja: "このサービスは一時的に利用できません。",
            words: [
              { word: "The service", meaning: "サービス" },
              { word: "is", meaning: "〜です" },
              { word: "temporarily", meaning: "一時的に" },
              { word: "unavailable", meaning: "利用できない・使用不可", note: "HTTPの503エラーに相当" }
            ],
            context: "サーバーが過負荷・メンテナンス中のときに表示されるHTTP 503エラーや、APIからのレスポンスメッセージ",
            difficulty: 2,
            tags: ["error", "503", "http", "server", "maintenance"]
          },
          {
            id: "tech-errors-012",
            en: "Invalid username or password.",
            ja: "ユーザー名またはパスワードが正しくありません。",
            words: [
              { word: "Invalid", meaning: "無効な・正しくない" },
              { word: "username", meaning: "ユーザー名" },
              { word: "or", meaning: "または" },
              { word: "password", meaning: "パスワード" }
            ],
            context: "ログインフォームで認証情報が間違っているときに表示されるエラーメッセージ",
            difficulty: 1,
            tags: ["error", "auth", "login", "security"]
          },
          {
            id: "tech-errors-013",
            en: "The operation was cancelled by the user.",
            ja: "操作はユーザーによってキャンセルされました。",
            words: [
              { word: "The operation", meaning: "操作・処理" },
              { word: "was cancelled", meaning: "キャンセルされた（受動態）" },
              { word: "by", meaning: "〜によって" },
              { word: "the user", meaning: "ユーザー" }
            ],
            context: "ファイルのコピーやダウンロードなどの処理を、ユーザー自身がキャンセルボタンで中断したときのメッセージ",
            difficulty: 1,
            tags: ["error", "cancelled", "windows", "operation"]
          },
          {
            id: "tech-errors-014",
            en: "This file type is not supported.",
            ja: "このファイル形式はサポートされていません。",
            words: [
              { word: "This", meaning: "この" },
              { word: "file type", meaning: "ファイル形式・ファイルの種類", note: ".mp4、.avif など拡張子で判断される" },
              { word: "is not", meaning: "〜ではない" },
              { word: "supported", meaning: "サポートされている・対応している" }
            ],
            context: "アプリが対応していないファイル形式を開こうとしたときに表示されるエラーメッセージ",
            difficulty: 1,
            tags: ["error", "file", "format", "compatibility"]
          },
          {
            id: "tech-errors-015",
            en: "Unable to connect to the network.",
            ja: "ネットワークに接続できません。",
            words: [
              { word: "Unable to", meaning: "〜することができない" },
              { word: "connect", meaning: "接続する" },
              { word: "to", meaning: "〜に" },
              { word: "the network", meaning: "ネットワーク" }
            ],
            context: "Wi-Fiがオフになっていたり、ルーターに問題があるときにOSやアプリが表示するエラーメッセージ",
            difficulty: 1,
            tags: ["error", "network", "wifi", "internet"]
          }
        ]
      },
      bios: {
        label: "BIOS & Boot",
        labelJa: "BIOS・起動",
        phrases: [
          {
            id: "tech-bios-001",
            en: "Press any key to boot from CD or DVD.",
            ja: "CDまたはDVDから起動するには任意のキーを押してください。",
            words: [
              { word: "Press", meaning: "押す" },
              { word: "any key", meaning: "任意のキー", note: "どのキーでも可" },
              { word: "to boot", meaning: "起動するために", note: "boot = コンピューターを起動すること" },
              { word: "from", meaning: "〜から" },
              { word: "CD or DVD", meaning: "CDまたはDVD" }
            ],
            context: "WindowsのインストールメディアをセットしてPCを起動したとき、光学ドライブから起動するか確認するBIOSのメッセージ",
            difficulty: 1,
            tags: ["bios", "boot", "windows", "install"]
          },
          {
            id: "tech-bios-002",
            en: "Operating system not found.",
            ja: "オペレーティングシステムが見つかりません。",
            words: [
              { word: "Operating system", meaning: "オペレーティングシステム", note: "Windows、macOS、Linuxなどのこと" },
              { word: "not found", meaning: "見つからない" }
            ],
            context: "ブートドライブが接続されていない、または破損しているときにBIOSが表示するエラーメッセージ",
            difficulty: 2,
            tags: ["bios", "boot", "error", "os"]
          },
          {
            id: "tech-bios-003",
            en: "CMOS battery low.",
            ja: "CMOSバッテリーの残量が低下しています。",
            words: [
              { word: "CMOS", meaning: "CMOS", note: "BIOSの設定や時刻を保持するための小さなメモリチップ" },
              { word: "battery", meaning: "バッテリー・電池" },
              { word: "low", meaning: "低い・残量が少ない" }
            ],
            context: "マザーボード上のボタン電池（CR2032など）が消耗してきたときに起動時に表示される警告。BIOSの日時設定がリセットされる原因にもなる",
            difficulty: 3,
            tags: ["bios", "hardware", "battery", "warning"]
          },
          {
            id: "tech-bios-004",
            en: "Boot device not found. Please install an operating system.",
            ja: "起動デバイスが見つかりません。オペレーティングシステムをインストールしてください。",
            words: [
              { word: "Boot device", meaning: "ブートデバイス", note: "OSが入っているHDD/SSD/USBなど" },
              { word: "not found", meaning: "見つからない" },
              { word: "Please install", meaning: "〜をインストールしてください" },
              { word: "an operating system", meaning: "オペレーティングシステム" }
            ],
            context: "新品のストレージや、OSが削除されたドライブからPCを起動しようとしたときに表示されるBIOSメッセージ",
            difficulty: 2,
            tags: ["bios", "boot", "error", "os", "storage"]
          },
          {
            id: "tech-bios-005",
            en: "Entering BIOS setup utility.",
            ja: "BIOSセットアップユーティリティに入ります。",
            words: [
              { word: "Entering", meaning: "〜に入る・起動する" },
              { word: "BIOS", meaning: "BIOS", note: "Basic Input/Output Systemの略。起動時の基本設定を管理するファームウェア" },
              { word: "setup utility", meaning: "セットアップユーティリティ", note: "設定を変更するためのプログラム" }
            ],
            context: "電源投入後にF2やDelキーを押すと表示される、BIOS設定画面に移行するときのメッセージ",
            difficulty: 2,
            tags: ["bios", "setup", "firmware", "boot"]
          },
          {
            id: "tech-bios-006",
            en: "Save changes and exit.",
            ja: "変更を保存して終了します。",
            words: [
              { word: "Save", meaning: "保存する" },
              { word: "changes", meaning: "変更" },
              { word: "and", meaning: "そして" },
              { word: "exit", meaning: "終了する" }
            ],
            context: "BIOS設定画面で設定を変更したあと、変更を確定してBIOSを終了するときのメニュー項目",
            difficulty: 1,
            tags: ["bios", "settings", "exit"]
          },
          {
            id: "tech-bios-007",
            en: "System memory has been changed.",
            ja: "システムメモリが変更されました。",
            words: [
              { word: "System memory", meaning: "システムメモリ", note: "RAM（ランダムアクセスメモリ）のこと" },
              { word: "has been", meaning: "〜されました（完了）" },
              { word: "changed", meaning: "変更された" }
            ],
            context: "RAMを増設・交換してPCを起動したときに、BIOSが新しいメモリ構成を検出して表示するメッセージ",
            difficulty: 2,
            tags: ["bios", "ram", "hardware", "memory"]
          },
          {
            id: "tech-bios-008",
            en: "Secure Boot is enabled.",
            ja: "セキュアブートが有効になっています。",
            words: [
              { word: "Secure Boot", meaning: "セキュアブート", note: "信頼されたOSしか起動できないようにするセキュリティ機能" },
              { word: "is enabled", meaning: "有効になっている" }
            ],
            context: "Windows 11の要件でもあるセキュアブートが有効な状態を示すBIOSの表示。Linuxをデュアルブートする際に無効化が必要なことがある",
            difficulty: 3,
            tags: ["bios", "security", "boot", "windows11"]
          },
          {
            id: "tech-bios-009",
            en: "Press F2 to enter setup.",
            ja: "F2キーを押してセットアップに入ってください。",
            words: [
              { word: "Press", meaning: "押す" },
              { word: "F2", meaning: "F2キー", note: "多くのメーカーでBIOS起動に使用されるキー（DelやF12の場合もある）" },
              { word: "to enter", meaning: "〜に入るために" },
              { word: "setup", meaning: "セットアップ・設定画面" }
            ],
            context: "PC起動直後、Windowsが起動する前に表示される、BIOS設定画面に入るためのガイダンス",
            difficulty: 1,
            tags: ["bios", "setup", "boot", "keyboard"]
          },
          {
            id: "tech-bios-010",
            en: "Disk boot failure. Insert system disk and press Enter.",
            ja: "ディスクの起動に失敗しました。システムディスクを挿入してEnterキーを押してください。",
            words: [
              { word: "Disk boot failure", meaning: "ディスクの起動失敗" },
              { word: "Insert", meaning: "挿入する・セットする" },
              { word: "system disk", meaning: "システムディスク", note: "OSが入ったディスクまたは起動可能なメディア" },
              { word: "and press Enter", meaning: "そしてEnterキーを押す" }
            ],
            context: "ブート可能なディスクが見つからないときに古いBIOSが表示するエラーメッセージ。フロッピー時代から続く古典的なメッセージ",
            difficulty: 2,
            tags: ["bios", "boot", "error", "disk", "legacy"]
          }
        ]
      },
      claude: {
        label: "Programming & AI",
        labelJa: "プログラミング・AI",
        phrases: [
          {
            id: "tech-claude-001",
            en: "Install the extension from the marketplace.",
            ja: "マーケットプレイスから拡張機能をインストールしてください。",
            words: [
              { word: "Install", meaning: "インストールする" },
              { word: "the extension", meaning: "拡張機能", note: "VS Codeなどのエディタに追加できる機能プラグイン" },
              { word: "from", meaning: "〜から" },
              { word: "the marketplace", meaning: "マーケットプレイス", note: "VS Code Extensions Marketplaceなど" }
            ],
            context: "VS CodeやChrome拡張機能など、エディタやブラウザのプラグインをインストールするときの表現",
            difficulty: 1,
            tags: ["vscode", "extension", "marketplace", "ide"]
          },
          {
            id: "tech-claude-002",
            en: "The API rate limit has been exceeded.",
            ja: "APIのレート制限を超えました。",
            words: [
              { word: "The API", meaning: "API", note: "Application Programming Interface。外部サービスのインターフェース" },
              { word: "rate limit", meaning: "レート制限", note: "一定時間内のリクエスト上限数" },
              { word: "has been exceeded", meaning: "超えられました・超過しました", note: "現在完了の受動態" }
            ],
            context: "GitHub API、OpenAI API、Claude APIなど外部APIへのリクエストが多すぎて制限に達したときのエラー",
            difficulty: 3,
            tags: ["api", "error", "rate-limit", "claude", "openai"]
          },
          {
            id: "tech-claude-003",
            en: "Initialize the project with default settings.",
            ja: "デフォルト設定でプロジェクトを初期化してください。",
            words: [
              { word: "Initialize", meaning: "初期化する", note: "npm init、git initなど最初のセットアップをすること" },
              { word: "the project", meaning: "プロジェクト" },
              { word: "with", meaning: "〜を使って" },
              { word: "default settings", meaning: "デフォルト設定・既定の設定" }
            ],
            context: "npm init -y やcreate-react-appなど、プロジェクトの雛形を作成するコマンドの説明文",
            difficulty: 1,
            tags: ["programming", "project", "setup", "npm"]
          },
          {
            id: "tech-claude-004",
            en: "Compile the source code and run the tests.",
            ja: "ソースコードをコンパイルしてテストを実行してください。",
            words: [
              { word: "Compile", meaning: "コンパイルする", note: "ソースコードを実行可能な形式に変換すること" },
              { word: "the source code", meaning: "ソースコード" },
              { word: "and", meaning: "そして" },
              { word: "run", meaning: "実行する" },
              { word: "the tests", meaning: "テスト" }
            ],
            context: "TypeScriptやJavaのような言語で、コードをビルドしてからテストスイートを実行するCI/CDの手順",
            difficulty: 2,
            tags: ["programming", "compile", "test", "ci-cd"]
          },
          {
            id: "tech-claude-005",
            en: "Debug the application in development mode.",
            ja: "開発モードでアプリケーションをデバッグしてください。",
            words: [
              { word: "Debug", meaning: "デバッグする", note: "バグを探して修正すること" },
              { word: "the application", meaning: "アプリケーション" },
              { word: "in", meaning: "〜で" },
              { word: "development mode", meaning: "開発モード", note: "本番環境と異なり、詳細なログやデバッグツールが使えるモード" }
            ],
            context: "本番用ではなく開発環境でアプリを起動し、ブレークポイントやログを使って問題を調査するときの表現",
            difficulty: 2,
            tags: ["programming", "debug", "development", "mode"]
          },
          {
            id: "tech-claude-006",
            en: "The dependency has been deprecated.",
            ja: "この依存パッケージは非推奨になりました。",
            words: [
              { word: "The dependency", meaning: "依存パッケージ・ライブラリ", note: "package.jsonに記載された外部ライブラリ" },
              { word: "has been", meaning: "〜になりました（完了）" },
              { word: "deprecated", meaning: "非推奨になった", note: "将来削除予定で、別の方法への移行を推奨される状態" }
            ],
            context: "npmやpipでインストールしたパッケージが非推奨になったときに表示されるnpm audit等の警告メッセージ",
            difficulty: 3,
            tags: ["programming", "npm", "package", "deprecated"]
          },
          {
            id: "tech-claude-007",
            en: "Check the documentation for more details.",
            ja: "詳細についてはドキュメントを確認してください。",
            words: [
              { word: "Check", meaning: "確認する" },
              { word: "the documentation", meaning: "ドキュメント・公式ドキュメント", note: "READMEやAPIリファレンスなど" },
              { word: "for", meaning: "〜のために" },
              { word: "more details", meaning: "詳細・詳しい情報" }
            ],
            context: "エラーメッセージやREADMEで、詳しい情報は公式ドキュメントを参照するよう案内する定番フレーズ",
            difficulty: 1,
            tags: ["programming", "documentation", "reference"]
          },
          {
            id: "tech-claude-008",
            en: "Set the environment variable before running.",
            ja: "実行する前に環境変数を設定してください。",
            words: [
              { word: "Set", meaning: "設定する" },
              { word: "the environment variable", meaning: "環境変数", note: "OSレベルで設定する変数。APIキーや設定値を安全に管理するために使う" },
              { word: "before", meaning: "〜する前に" },
              { word: "running", meaning: "実行すること" }
            ],
            context: "APIキー（OPENAI_API_KEY等）や設定値を.envファイルや export コマンドで設定してからアプリを起動するよう指示するREADMEの一節",
            difficulty: 2,
            tags: ["programming", "environment", "variable", "security", "dotenv"]
          },
          {
            id: "tech-claude-009",
            en: "The function returns a promise.",
            ja: "この関数はPromiseを返します。",
            words: [
              { word: "The function", meaning: "この関数" },
              { word: "returns", meaning: "〜を返す" },
              { word: "a promise", meaning: "Promise", note: "非同期処理の結果を表すJavaScriptオブジェクト。async/awaitと組み合わせて使う" }
            ],
            context: "JavaScriptのAPIドキュメントやコードレビューで、非同期関数がPromiseを返すことを説明するときの表現",
            difficulty: 2,
            tags: ["javascript", "promise", "async", "programming"]
          },
          {
            id: "tech-claude-010",
            en: "Parse the JSON response from the API.",
            ja: "APIからのJSONレスポンスを解析してください。",
            words: [
              { word: "Parse", meaning: "解析する・パースする", note: "文字列データを構造化されたデータに変換すること" },
              { word: "the JSON response", meaning: "JSONレスポンス", note: "APIが返すJSON形式のデータ" },
              { word: "from", meaning: "〜から" },
              { word: "the API", meaning: "API" }
            ],
            context: "fetchやaxiosでAPIを叩いたあと、受け取ったJSONデータをJavaScriptオブジェクトに変換するときの説明",
            difficulty: 2,
            tags: ["programming", "json", "api", "javascript", "fetch"]
          }
        ]
      },
      install: {
        label: "Install & Update",
        labelJa: "インストール・アップデート",
        phrases: [
          {
            id: "tech-install-001",
            en: "Do you want to allow this app to make changes to your device?",
            ja: "このアプリがデバイスに変更を加えることを許可しますか？",
            words: [
              { word: "Do you want to", meaning: "〜しますか？（確認）" },
              { word: "allow", meaning: "許可する" },
              { word: "this app", meaning: "このアプリ" },
              { word: "to make changes", meaning: "変更を加えること" },
              { word: "to your device", meaning: "あなたのデバイスに" }
            ],
            context: "WindowsのUAC（ユーザーアカウント制御）ダイアログ。管理者権限が必要なインストーラーを実行したときに表示される",
            difficulty: 2,
            tags: ["windows", "uac", "install", "permission", "dialog"]
          },
          {
            id: "tech-install-002",
            en: "Accept the license agreement to continue.",
            ja: "続行するにはライセンス契約に同意してください。",
            words: [
              { word: "Accept", meaning: "同意する・承諾する" },
              { word: "the license agreement", meaning: "ライセンス契約", note: "EULA（エンドユーザー使用許諾契約）とも呼ばれる" },
              { word: "to continue", meaning: "続行するために" }
            ],
            context: "ソフトウェアのインストーラーで、使用条件への同意を求める画面に表示されるメッセージ",
            difficulty: 1,
            tags: ["install", "license", "eula", "agreement"]
          },
          {
            id: "tech-install-003",
            en: "Choose the installation directory.",
            ja: "インストール先のディレクトリを選択してください。",
            words: [
              { word: "Choose", meaning: "選択する" },
              { word: "the installation", meaning: "インストール先の" },
              { word: "directory", meaning: "ディレクトリ・フォルダ", note: "ソフトウェアをインストールする場所" }
            ],
            context: "インストーラーでインストール先フォルダを指定するステップ。デフォルトはC:\\Program Filesなど",
            difficulty: 1,
            tags: ["install", "directory", "path", "setup"]
          },
          {
            id: "tech-install-004",
            en: "The update will be installed when you restart.",
            ja: "再起動時にアップデートがインストールされます。",
            words: [
              { word: "The update", meaning: "アップデート・更新" },
              { word: "will be installed", meaning: "インストールされます（未来の受動態）" },
              { word: "when", meaning: "〜するときに" },
              { word: "you restart", meaning: "あなたが再起動したとき" }
            ],
            context: "WindowsUpdateやアプリのアップデートがダウンロード完了し、次回再起動時に適用されることを知らせるメッセージ",
            difficulty: 2,
            tags: ["update", "restart", "windows", "install"]
          },
          {
            id: "tech-install-005",
            en: "Would you like to install the recommended updates?",
            ja: "推奨のアップデートをインストールしますか？",
            words: [
              { word: "Would you like to", meaning: "〜しますか？（丁寧な確認）" },
              { word: "install", meaning: "インストールする" },
              { word: "the recommended", meaning: "推奨された" },
              { word: "updates", meaning: "アップデート・更新" }
            ],
            context: "WindowsUpdateやソフトウェアのアップデートマネージャーが、推奨アップデートを適用するか確認するダイアログ",
            difficulty: 1,
            tags: ["update", "windows", "install", "recommended"]
          },
          {
            id: "tech-install-006",
            en: "This app needs to be updated.",
            ja: "このアプリをアップデートする必要があります。",
            words: [
              { word: "This app", meaning: "このアプリ" },
              { word: "needs to be", meaning: "〜される必要がある" },
              { word: "updated", meaning: "アップデートされた" }
            ],
            context: "アプリストアやソフトウェアが古いバージョンであることを検知し、更新を促すときのメッセージ",
            difficulty: 1,
            tags: ["update", "app", "notification", "install"]
          },
          {
            id: "tech-install-007",
            en: "Download and install the latest version.",
            ja: "最新バージョンをダウンロードしてインストールしてください。",
            words: [
              { word: "Download", meaning: "ダウンロードする" },
              { word: "and install", meaning: "そしてインストールする" },
              { word: "the latest version", meaning: "最新バージョン" }
            ],
            context: "ソフトウェアのサポートページや通知で、新しいバージョンへの更新を促すときの表現",
            difficulty: 1,
            tags: ["download", "install", "update", "version"]
          },
          {
            id: "tech-install-008",
            en: "The installation has been completed successfully.",
            ja: "インストールが正常に完了しました。",
            words: [
              { word: "The installation", meaning: "インストール" },
              { word: "has been completed", meaning: "完了しました（完了の受動態）" },
              { word: "successfully", meaning: "正常に・問題なく" }
            ],
            context: "ソフトウェアのインストーラーが最終ステップを終えたあとに表示される完了メッセージ",
            difficulty: 1,
            tags: ["install", "complete", "success", "setup"]
          },
          {
            id: "tech-install-009",
            en: "Restart is required to finish the update.",
            ja: "アップデートを完了するには再起動が必要です。",
            words: [
              { word: "Restart", meaning: "再起動" },
              { word: "is required", meaning: "が必要です・要求されます" },
              { word: "to finish", meaning: "〜を完了するために" },
              { word: "the update", meaning: "アップデート" }
            ],
            context: "Windowsのシステムアップデートやドライバーの更新が完了し、変更を有効にするために再起動を要求するメッセージ",
            difficulty: 1,
            tags: ["restart", "update", "windows", "required"]
          },
          {
            id: "tech-install-010",
            en: "Do you want to keep your existing settings?",
            ja: "既存の設定を保持しますか？",
            words: [
              { word: "Do you want to", meaning: "〜しますか？" },
              { word: "keep", meaning: "保持する・そのままにする" },
              { word: "your existing", meaning: "あなたの既存の・現在の" },
              { word: "settings", meaning: "設定" }
            ],
            context: "ソフトウェアを再インストールまたはアップグレードするとき、以前の設定を引き継ぐかどうか確認するダイアログ",
            difficulty: 1,
            tags: ["install", "settings", "upgrade", "migration"]
          }
        ]
      }
    }
  },
  tourism: {
    label: "Tourism English",
    labelJa: "観光英語",
    subcategories: {
      directions: {
        label: "Giving Directions",
        labelJa: "道案内",
        phrases: [
          {
            id: "tourism-directions-001",
            en: "Go straight and turn left at the traffic light.",
            ja: "まっすぐ進んで、信号を左に曲がってください。",
            words: [
              { word: "Go straight", meaning: "まっすぐ進む" },
              { word: "and", meaning: "そして" },
              { word: "turn left", meaning: "左に曲がる" },
              { word: "at", meaning: "〜で" },
              { word: "the traffic light", meaning: "信号機" }
            ],
            context: "観光客に道を教えるときの基本的な表現。京都の街は碁盤の目状なので使いやすい",
            difficulty: 1,
            tags: ["directions", "navigation", "kyoto", "basic"]
          },
          {
            id: "tourism-directions-002",
            en: "It's about a ten minute walk from here.",
            ja: "ここから徒歩約10分です。",
            words: [
              { word: "It's about", meaning: "約〜です" },
              { word: "a ten minute", meaning: "10分の", note: "minute(s) walkのように「時間 + 名詞 + walk」の形で使う" },
              { word: "walk", meaning: "徒歩・歩いて行く距離" },
              { word: "from here", meaning: "ここから" }
            ],
            context: "目的地までの距離を時間で伝えるときの定番フレーズ",
            difficulty: 1,
            tags: ["directions", "distance", "walking", "kyoto"]
          },
          {
            id: "tourism-directions-003",
            en: "Take the subway to Kyoto Station.",
            ja: "地下鉄で京都駅まで行ってください。",
            words: [
              { word: "Take", meaning: "〜に乗る", note: "交通機関に乗るときはtakeを使う" },
              { word: "the subway", meaning: "地下鉄", note: "京都は烏丸線と東西線がある" },
              { word: "to", meaning: "〜まで" },
              { word: "Kyoto Station", meaning: "京都駅" }
            ],
            context: "京都市内で地下鉄を使って移動する方法を案内するときの表現",
            difficulty: 1,
            tags: ["directions", "subway", "kyoto", "station", "transport"]
          },
          {
            id: "tourism-directions-004",
            en: "Cross the bridge and you'll see it on your right.",
            ja: "橋を渡ると右手に見えます。",
            words: [
              { word: "Cross", meaning: "渡る・横切る" },
              { word: "the bridge", meaning: "橋" },
              { word: "and", meaning: "そうすれば" },
              { word: "you'll see it", meaning: "見えます・見つかります" },
              { word: "on your right", meaning: "右手に・右側に" }
            ],
            context: "鴨川などの橋を渡って目的地に向かうよう案内するときの表現",
            difficulty: 1,
            tags: ["directions", "bridge", "navigation", "kyoto"]
          },
          {
            id: "tourism-directions-005",
            en: "It's right next to the convenience store.",
            ja: "コンビニのすぐ隣です。",
            words: [
              { word: "It's", meaning: "それは〜です" },
              { word: "right", meaning: "ちょうど・すぐ", note: "ここでは「まさに」という強調の意味" },
              { word: "next to", meaning: "〜の隣に" },
              { word: "the convenience store", meaning: "コンビニ", note: "日本ではセブン、ファミマ、ローソンなどのこと" }
            ],
            context: "日本のコンビニは至る所にあるので、ランドマークとして使いやすい。観光客にも通じやすい目印",
            difficulty: 1,
            tags: ["directions", "landmark", "convenience-store", "kyoto"]
          },
          {
            id: "tourism-directions-006",
            en: "Go through the torii gate and follow the path.",
            ja: "鳥居をくぐって、道に沿って進んでください。",
            words: [
              { word: "Go through", meaning: "〜をくぐる・〜を通り抜ける" },
              { word: "the torii gate", meaning: "鳥居", note: "神社の入り口にある朱色の門。英語でもtorii gateで通じる" },
              { word: "and", meaning: "そして" },
              { word: "follow", meaning: "〜に沿って進む・〜に従う" },
              { word: "the path", meaning: "道・参道" }
            ],
            context: "伏見稲荷大社などの神社への行き方を案内するときの表現。torii gateはそのまま英語として使われる",
            difficulty: 2,
            tags: ["directions", "shrine", "torii", "fushimi-inari", "kyoto"]
          },
          {
            id: "tourism-directions-007",
            en: "Take the number 205 bus from this bus stop.",
            ja: "このバス停から205番のバスに乗ってください。",
            words: [
              { word: "Take", meaning: "〜に乗る" },
              { word: "the number 205 bus", meaning: "205番のバス", note: "京都市バス205系統。金閣寺・四条河原町などを結ぶ主要路線" },
              { word: "from", meaning: "〜から" },
              { word: "this bus stop", meaning: "このバス停" }
            ],
            context: "京都市バスを使った観光案内。205番は金閣寺や四条烏丸などを循環する京都観光に便利な路線",
            difficulty: 1,
            tags: ["directions", "bus", "transport", "kyoto", "205"]
          },
          {
            id: "tourism-directions-008",
            en: "Get off at the next stop.",
            ja: "次の停留所で降りてください。",
            words: [
              { word: "Get off", meaning: "降りる", note: "バスや電車から降りるときはget offを使う" },
              { word: "at", meaning: "〜で" },
              { word: "the next stop", meaning: "次の停留所・次の駅" }
            ],
            context: "バスや電車の中で、観光客に降りる場所を教えるときの表現",
            difficulty: 1,
            tags: ["directions", "bus", "train", "transport", "kyoto"]
          },
          {
            id: "tourism-directions-009",
            en: "You can see it from here.",
            ja: "ここから見えますよ。",
            words: [
              { word: "You can", meaning: "〜することができます" },
              { word: "see it", meaning: "それが見える" },
              { word: "from here", meaning: "ここから" }
            ],
            context: "目的地やランドマークが現在地から既に見えている場合に使う表現。清水寺の舞台など高台から見える景色の案内に便利",
            difficulty: 1,
            tags: ["directions", "navigation", "sightseeing", "kyoto"]
          },
          {
            id: "tourism-directions-010",
            en: "Walk along this street until you reach the river.",
            ja: "川に着くまでこの通りに沿って歩いてください。",
            words: [
              { word: "Walk along", meaning: "〜に沿って歩く" },
              { word: "this street", meaning: "この通り" },
              { word: "until", meaning: "〜するまで" },
              { word: "you reach", meaning: "あなたが着く・到達する" },
              { word: "the river", meaning: "川", note: "京都では鴨川や桂川のこと" }
            ],
            context: "鴨川や高瀬川などを目印に道案内するときの表現",
            difficulty: 1,
            tags: ["directions", "walking", "river", "kamo", "kyoto"]
          },
          {
            id: "tourism-directions-011",
            en: "It's on the second floor of that building.",
            ja: "あの建物の2階にあります。",
            words: [
              { word: "It's on", meaning: "〜にあります" },
              { word: "the second floor", meaning: "2階", note: "英米では1階をground floorと呼び、2階がsecond floorになることに注意" },
              { word: "of", meaning: "〜の" },
              { word: "that building", meaning: "あの建物" }
            ],
            context: "ショッピングモールや複合施設内のレストランや観光案内所などの場所を教えるときの表現",
            difficulty: 1,
            tags: ["directions", "building", "floor", "indoor", "kyoto"]
          },
          {
            id: "tourism-directions-012",
            en: "Turn right at the intersection.",
            ja: "交差点を右に曲がってください。",
            words: [
              { word: "Turn right", meaning: "右に曲がる" },
              { word: "at", meaning: "〜で" },
              { word: "the intersection", meaning: "交差点" }
            ],
            context: "道案内の基本フレーズ。京都の碁盤の目状の道路で特に使いやすい表現",
            difficulty: 1,
            tags: ["directions", "navigation", "basic", "kyoto"]
          },
          {
            id: "tourism-directions-013",
            en: "Go down this hill and you'll find it.",
            ja: "この坂を下るとありますよ。",
            words: [
              { word: "Go down", meaning: "下る・降りる" },
              { word: "this hill", meaning: "この坂・この丘" },
              { word: "and", meaning: "そうすれば" },
              { word: "you'll find it", meaning: "見つかります・あります" }
            ],
            context: "清水寺や伏見稲荷など、坂道が多い京都の観光地で道案内するときの表現",
            difficulty: 1,
            tags: ["directions", "hill", "navigation", "kyoto", "kiyomizudera"]
          },
          {
            id: "tourism-directions-014",
            en: "It's behind the main hall.",
            ja: "本堂の裏にあります。",
            words: [
              { word: "It's behind", meaning: "〜の裏にあります・〜の後ろにあります" },
              { word: "the main hall", meaning: "本堂・メインホール", note: "寺院のメインとなる建物。金堂とも呼ばれる" }
            ],
            context: "寺社仏閣の境内で、本堂の裏側にある庭園や茶室などへの案内に使う表現",
            difficulty: 1,
            tags: ["directions", "temple", "navigation", "kyoto"]
          },
          {
            id: "tourism-directions-015",
            en: "Take the exit on your left.",
            ja: "左側の出口をご利用ください。",
            words: [
              { word: "Take", meaning: "〜を使う・〜を通る" },
              { word: "the exit", meaning: "出口" },
              { word: "on your left", meaning: "左側の・あなたの左の" }
            ],
            context: "地下鉄やバスの駅で、どの出口を使えばよいか案内するときの表現。京都駅の複数出口案内にも使える",
            difficulty: 1,
            tags: ["directions", "exit", "station", "subway", "kyoto"]
          }
        ]
      },
      recommend: {
        label: "Recommendations",
        labelJa: "おすすめ案内",
        phrases: [
          {
            id: "tourism-recommend-001",
            en: "I highly recommend visiting Fushimi Inari early in the morning.",
            ja: "伏見稲荷は朝早く訪れることを強くお勧めします。",
            words: [
              { word: "I highly recommend", meaning: "強くお勧めします", note: "highly = 強く。recommendだけより強い推薦" },
              { word: "visiting", meaning: "訪れること" },
              { word: "Fushimi Inari", meaning: "伏見稲荷大社" },
              { word: "early in the morning", meaning: "朝早くに" }
            ],
            context: "伏見稲荷の千本鳥居は昼間は混雑するため、早朝訪問を勧めるときの表現",
            difficulty: 2,
            tags: ["recommend", "fushimi-inari", "kyoto", "morning", "shrine"]
          },
          {
            id: "tourism-recommend-002",
            en: "Kinkaku-ji is beautiful especially in autumn.",
            ja: "金閣寺は特に秋に美しいです。",
            words: [
              { word: "Kinkaku-ji", meaning: "金閣寺", note: "正式名称は鹿苑寺。金箔に覆われた3層の楼閣が有名" },
              { word: "is beautiful", meaning: "美しい" },
              { word: "especially", meaning: "特に" },
              { word: "in autumn", meaning: "秋に" }
            ],
            context: "京都屈指の観光スポット、金閣寺の秋の紅葉シーズンの美しさを伝えるときの表現",
            difficulty: 1,
            tags: ["recommend", "kinkakuji", "kyoto", "autumn", "temple"]
          },
          {
            id: "tourism-recommend-003",
            en: "You should try matcha ice cream at this shop.",
            ja: "このお店で抹茶アイスクリームを食べてみるべきです。",
            words: [
              { word: "You should try", meaning: "〜してみるべき・〜を試してみて", note: "should = 強い推奨" },
              { word: "matcha", meaning: "抹茶", note: "英語でもmatchaで通じる" },
              { word: "ice cream", meaning: "アイスクリーム" },
              { word: "at this shop", meaning: "このお店で" }
            ],
            context: "京都の抹茶グルメを観光客に勧めるときの表現。錦市場や祇園の抹茶専門店などで使える",
            difficulty: 1,
            tags: ["recommend", "food", "matcha", "kyoto", "sweets"]
          },
          {
            id: "tourism-recommend-004",
            en: "The bamboo grove in Arashiyama is a must-see.",
            ja: "嵐山の竹林は必見です。",
            words: [
              { word: "The bamboo grove", meaning: "竹林" },
              { word: "in Arashiyama", meaning: "嵐山の" },
              { word: "is a must-see", meaning: "必見です・絶対見るべきです", note: "must-see = 見逃せない場所・もの" }
            ],
            context: "嵐山の竹林を観光客に勧めるときの表現。must-seeは観光案内でよく使う定番表現",
            difficulty: 1,
            tags: ["recommend", "arashiyama", "bamboo", "kyoto", "must-see"]
          },
          {
            id: "tourism-recommend-005",
            en: "Nishiki Market is a great place for local food.",
            ja: "錦市場は地元の食べ物を楽しむのに最適な場所です。",
            words: [
              { word: "Nishiki Market", meaning: "錦市場", note: "「京の台所」と呼ばれる四条烏丸近くの食の市場" },
              { word: "is a great place", meaning: "最適な場所・素晴らしい場所" },
              { word: "for", meaning: "〜のための" },
              { word: "local food", meaning: "地元の食べ物・郷土料理" }
            ],
            context: "「京の台所」と呼ばれる錦市場を観光客に紹介するときの表現",
            difficulty: 1,
            tags: ["recommend", "nishiki", "market", "food", "kyoto"]
          },
          {
            id: "tourism-recommend-006",
            en: "Kiyomizu-dera has an amazing view of the city.",
            ja: "清水寺からは街の素晴らしい眺めが楽しめます。",
            words: [
              { word: "Kiyomizu-dera", meaning: "清水寺" },
              { word: "has", meaning: "〜があります" },
              { word: "an amazing view", meaning: "素晴らしい眺め" },
              { word: "of the city", meaning: "街の・市街地の" }
            ],
            context: "清水寺の舞台から見える京都市街の眺めを観光客に伝えるときの表現",
            difficulty: 1,
            tags: ["recommend", "kiyomizudera", "view", "kyoto", "temple"]
          },
          {
            id: "tourism-recommend-007",
            en: "The best time to see cherry blossoms is early April.",
            ja: "桜を見るベストな時期は4月初旬です。",
            words: [
              { word: "The best time", meaning: "最良の時期・ベストシーズン" },
              { word: "to see", meaning: "〜を見るための" },
              { word: "cherry blossoms", meaning: "桜", note: "英語でもsakuraで通じることが多い" },
              { word: "is early April", meaning: "4月初旬です" }
            ],
            context: "京都の桜の見頃を外国人観光客に伝えるときの表現。円山公園や哲学の道が有名",
            difficulty: 1,
            tags: ["recommend", "sakura", "cherry-blossom", "spring", "kyoto"]
          },
          {
            id: "tourism-recommend-008",
            en: "You can rent a kimono near Gion.",
            ja: "祇園近くで着物をレンタルできます。",
            words: [
              { word: "You can", meaning: "〜することができます" },
              { word: "rent", meaning: "レンタルする・借りる" },
              { word: "a kimono", meaning: "着物", note: "英語でもkimonoで通じる" },
              { word: "near Gion", meaning: "祇園の近くで" }
            ],
            context: "祇園や東山エリアに多い着物レンタル店を観光客に紹介するときの表現",
            difficulty: 1,
            tags: ["recommend", "kimono", "gion", "culture", "kyoto"]
          },
          {
            id: "tourism-recommend-009",
            en: "Nara is just a short train ride from Kyoto.",
            ja: "奈良は京都から電車で少しのところにあります。",
            words: [
              { word: "Nara", meaning: "奈良" },
              { word: "is just", meaning: "ちょうど〜です・たった〜です" },
              { word: "a short train ride", meaning: "短い電車の旅・電車で少し", note: "rideは乗り物に乗ること" },
              { word: "from Kyoto", meaning: "京都から" }
            ],
            context: "京都から近鉄やJRで45分程度の奈良へのデイトリップを勧めるときの表現",
            difficulty: 1,
            tags: ["recommend", "nara", "daytrip", "transport", "kyoto"]
          },
          {
            id: "tourism-recommend-010",
            en: "I suggest taking a walk along the Philosopher's Path.",
            ja: "哲学の道を散歩することをお勧めします。",
            words: [
              { word: "I suggest", meaning: "〜をお勧めします・〜を提案します" },
              { word: "taking a walk", meaning: "散歩すること" },
              { word: "along", meaning: "〜に沿って" },
              { word: "the Philosopher's Path", meaning: "哲学の道", note: "銀閣寺から南禅寺近くまで続く疏水沿いの小道" }
            ],
            context: "京都の哲学の道（銀閣寺〜南禅寺）の散歩を勧めるときの表現。桜や紅葉の季節に特に人気",
            difficulty: 2,
            tags: ["recommend", "philosophers-path", "walking", "ginkakuji", "kyoto"]
          }
        ]
      },
      conversation: {
        label: "Tourist Conversation",
        labelJa: "観光客との会話",
        phrases: [
          {
            id: "tourism-conversation-001",
            en: "Welcome to Kyoto! How can I help you?",
            ja: "京都へようこそ！何かお手伝いできますか？",
            words: [
              { word: "Welcome to", meaning: "〜へようこそ" },
              { word: "Kyoto", meaning: "京都" },
              { word: "How can I help you?", meaning: "何かお手伝いできますか？", note: "接客・対応の定番フレーズ" }
            ],
            context: "観光案内所や宿泊施設のフロントで、訪れた観光客に最初に声をかけるときの挨拶",
            difficulty: 1,
            tags: ["conversation", "greeting", "welcome", "kyoto", "tourism"]
          },
          {
            id: "tourism-conversation-002",
            en: "Are you looking for something?",
            ja: "何かお探しですか？",
            words: [
              { word: "Are you looking for", meaning: "〜をお探しですか？・〜を探していますか？", note: "look for = 探す" },
              { word: "something?", meaning: "何か" }
            ],
            context: "地図を見て迷っているような観光客に声をかけるときの表現",
            difficulty: 1,
            tags: ["conversation", "help", "tourist", "kyoto"]
          },
          {
            id: "tourism-conversation-003",
            en: "Where are you from?",
            ja: "どちらのご出身ですか？",
            words: [
              { word: "Where", meaning: "どこ" },
              { word: "are you from?", meaning: "〜のご出身ですか？", note: "出身地を尋ねる定番フレーズ" }
            ],
            context: "観光客と会話を始めるときによく使われる質問。訪問者の国に応じて説明を調整できる",
            difficulty: 1,
            tags: ["conversation", "small-talk", "nationality", "tourist"]
          },
          {
            id: "tourism-conversation-004",
            en: "How long are you staying in Kyoto?",
            ja: "京都にはどのくらい滞在されますか？",
            words: [
              { word: "How long", meaning: "どのくらいの期間" },
              { word: "are you staying", meaning: "滞在していますか？・滞在する予定ですか？" },
              { word: "in Kyoto?", meaning: "京都に" }
            ],
            context: "観光客の滞在期間を確認することで、どのくらい観光スポットを回れるかアドバイスできる",
            difficulty: 1,
            tags: ["conversation", "stay", "duration", "kyoto", "tourism"]
          },
          {
            id: "tourism-conversation-005",
            en: "Do you need a map?",
            ja: "地図はご入り用ですか？",
            words: [
              { word: "Do you need", meaning: "〜が必要ですか？" },
              { word: "a map?", meaning: "地図" }
            ],
            context: "観光案内所やホテルのフロントで、観光客に地図を渡すときの一言",
            difficulty: 1,
            tags: ["conversation", "map", "tourist", "help", "kyoto"]
          },
          {
            id: "tourism-conversation-006",
            en: "The train station is that way.",
            ja: "電車の駅はあちらです。",
            words: [
              { word: "The train station", meaning: "電車の駅・鉄道駅" },
              { word: "is", meaning: "〜にあります" },
              { word: "that way", meaning: "あちら・あの方向", note: "指差しと一緒に使うことが多い" }
            ],
            context: "道に迷った観光客に、駅の方向を簡単に教えるときの表現",
            difficulty: 1,
            tags: ["conversation", "directions", "station", "transport", "kyoto"]
          },
          {
            id: "tourism-conversation-007",
            en: "Have a great time in Kyoto!",
            ja: "京都を楽しんでください！",
            words: [
              { word: "Have a great time", meaning: "楽しい時間を過ごす・楽しんでください", note: "Enjoy your stay!と同様の別れの挨拶" },
              { word: "in Kyoto!", meaning: "京都で" }
            ],
            context: "観光客を見送るときや、会話の締めくくりに使う別れの挨拶",
            difficulty: 1,
            tags: ["conversation", "farewell", "greeting", "kyoto", "tourism"]
          },
          {
            id: "tourism-conversation-008",
            en: "Would you like me to take a photo for you?",
            ja: "写真を撮りましょうか？",
            words: [
              { word: "Would you like me to", meaning: "〜しましょうか？", note: "丁寧に申し出るときの定番表現" },
              { word: "take a photo", meaning: "写真を撮る" },
              { word: "for you?", meaning: "あなたのために" }
            ],
            context: "一人で写真を撮ろうとしている観光客に撮影を申し出るときの丁寧な表現",
            difficulty: 2,
            tags: ["conversation", "photo", "kindness", "tourist", "kyoto"]
          },
          {
            id: "tourism-conversation-009",
            en: "This area is famous for its temples.",
            ja: "このエリアはお寺で有名です。",
            words: [
              { word: "This area", meaning: "このエリア・この地域" },
              { word: "is famous for", meaning: "〜で有名です", note: "be famous for = 〜で有名" },
              { word: "its temples", meaning: "お寺・寺院" }
            ],
            context: "東山エリアや嵐山など、寺社が集まる観光地を紹介するときの表現",
            difficulty: 1,
            tags: ["conversation", "temples", "history", "culture", "kyoto"]
          },
          {
            id: "tourism-conversation-010",
            en: "You can buy tickets at that machine.",
            ja: "あの機械でチケットを買えます。",
            words: [
              { word: "You can buy", meaning: "〜を買うことができます" },
              { word: "tickets", meaning: "チケット・乗車券" },
              { word: "at that machine", meaning: "あの機械で", note: "券売機のこと" }
            ],
            context: "電車やバスの乗り方がわからない観光客に、券売機を指して乗車券の購入方法を教えるときの表現",
            difficulty: 1,
            tags: ["conversation", "ticket", "machine", "transport", "kyoto"]
          },
          {
            id: "tourism-conversation-011",
            en: "The last train leaves at eleven thirty.",
            ja: "最終電車は11時30分に出ます。",
            words: [
              { word: "The last train", meaning: "最終電車・終電" },
              { word: "leaves", meaning: "出発する・発車する" },
              { word: "at eleven thirty", meaning: "11時30分に" }
            ],
            context: "観光客に終電の時間を知らせるときの表現。京都市内の終電は路線によって異なるが、深夜0時前後が多い",
            difficulty: 1,
            tags: ["conversation", "train", "time", "transport", "kyoto"]
          },
          {
            id: "tourism-conversation-012",
            en: "There is free Wi-Fi at the station.",
            ja: "駅には無料Wi-Fiがあります。",
            words: [
              { word: "There is", meaning: "〜があります" },
              { word: "free Wi-Fi", meaning: "無料Wi-Fi" },
              { word: "at the station", meaning: "駅に" }
            ],
            context: "インターネット接続を探している観光客に、駅の無料Wi-Fiを案内するときの表現",
            difficulty: 1,
            tags: ["conversation", "wifi", "internet", "station", "kyoto"]
          },
          {
            id: "tourism-conversation-013",
            en: "Be careful, the street is very narrow here.",
            ja: "気をつけてください、ここは道が非常に狭いです。",
            words: [
              { word: "Be careful", meaning: "気をつけてください・注意して" },
              { word: "the street", meaning: "通り・道" },
              { word: "is very narrow", meaning: "非常に狭い" },
              { word: "here", meaning: "ここは・この辺りは" }
            ],
            context: "祇園の路地や錦市場など、人が多く道幅が狭い場所で観光客に注意を促すときの表現",
            difficulty: 1,
            tags: ["conversation", "safety", "street", "narrow", "kyoto", "gion"]
          },
          {
            id: "tourism-conversation-014",
            en: "You can pay with credit card here.",
            ja: "ここではクレジットカードで払えます。",
            words: [
              { word: "You can pay", meaning: "〜で支払うことができます" },
              { word: "with credit card", meaning: "クレジットカードで" },
              { word: "here", meaning: "ここでは" }
            ],
            context: "キャッシュレス決済が使えるかどうか確認する観光客に、クレジットカードが使える旨を伝えるときの表現",
            difficulty: 1,
            tags: ["conversation", "payment", "credit-card", "cashless", "kyoto"]
          },
          {
            id: "tourism-conversation-015",
            en: "Enjoy your trip!",
            ja: "旅を楽しんでください！",
            words: [
              { word: "Enjoy", meaning: "楽しむ・エンジョイする" },
              { word: "your trip!", meaning: "あなたの旅を", note: "tripは短期の旅行。journeyは長旅のニュアンス" }
            ],
            context: "観光客を見送るときや別れ際に使う、最も一般的な旅の締めくくりの挨拶",
            difficulty: 1,
            tags: ["conversation", "farewell", "greeting", "tourism", "kyoto"]
          }
        ]
      }
    }
  }
};
