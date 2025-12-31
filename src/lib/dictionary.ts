export type Locale = 'en' | 'ja';

const dictionary = {
  en: {
    nav: {
      home: "Home",
      games: "Games",
      animations: "Animations",
      characters: "Characters",
      confess: "Confess",
      sanctuary: "The Sanctuary",
      commissions: "Commissions",
      reviews: "Scripture",
    },
    home: {
      altar: "The Altar",
      creed: "Flip the switch to delve into the truth of the flesh.",
      worship: "WORSHIP",
      established: "Est. 2026",
    },
    ageGate: {
      title: "The Gate",
      subtitle: "Adult Content Warning",
      text1: "You are entering a sanctuary of <strong>Adult Content</strong>.",
      text2: "By entering, you confirm that you are at least <strong>18 years of age</strong> (or the age of majority in your jurisdiction) and consent to viewing sexually explicit material.",
      enter: "I Am 18+ (Enter)",
      leave: "Leave",
    },
    commissions: {
      title: "Private Indulgences",
      status_closed: "[ Commissions Closed ]",
      description: "The Artist is currently in deep prayer constructing the Temple. Private requests for flesh sculpting are suspended until further notice.",
      update_label: "Status Update",
      update_text: "Waitlist is full. Check back after the \"Fairway Queens\" launch.",
      button: "Request Access"
    },
    characters: {
      title: "The Congregation",
      subtitle: "Select a vessel to witness their corruption.",
      empty: "The altar is empty.",
      role_fallback: "Vessel of Sin" 
    },
    animations: {
      title: "Sacred Motion",
      subtitle: "Witness the flesh in motion.",
      iwara_link: "View Full Profile on Iwara ↗",
      empty: "The archive is silent.",
      check_iwara: "Check Iwara Directly",
      no_signal: "NO SIGNAL",
      available_4k: "/ 4K Available"
    },
    games: {
      title: "Unholy Games",
      subtitle: "Interactive worship.",
      empty: "No games found in the library.",
      status_fallback: "In Dev"
    },
    confess: {
      title: "Confessional",
      subtitle: "\"Confess your desires to me baby, Maybe they'll come true~!\" - Asmodeus",
      name_label: "Your Name (Optional)",
      name_placeholder: "Anonymous Sinner",
      character_label: "Who is involved?",
      desire_label: "Your Desire",
      desire_placeholder: "I want to see...",
      consent_public: "<span class=\"text-gold font-bold\">OPTIONAL:</span> Post this to the public \"Wall of Filth\" for others to vote on.",
      consent_future: "<span class=\"text-red-500 font-bold\">REQUIRED:</span> I consent to my idea possibly being used in future works.",
      submit: "Confess",
      submitting: "Transmitting Sin...",
      success: "Your sin has been recorded. Repent.",
      error_network: "Network error. The confessional is closed.",
      error_empty_chars: "No characters found in the archives."
    },
    game_detail: {
      not_found_title: "GAME NOT FOUND",
      not_found_desc: "Could not locate entry for",
      no_media: "No Media Available",
      features_label: "FEATURES:",
      play_prefix: "Play", // "Play [Status] Build"
      play_suffix: "Build",
      download_unavailable: "Download Unavailable",
      alpha_warning: "*Alpha requires Devotee Status"
    },
    animation_detail: {
      not_found_title: "Archive Not Found",
      not_found_desc: "The animation has been purged or does not exist:",
      return: "Return to Archives",
      locked_title: "PREMIUM SOURCE LOCKED",
      locked_desc_1: "This 4K 120FPS artifact requires Devotee status to view directly.",
      locked_desc_2: "Free users may view the compressed version on Iwara.",
      watch_iwara: "Watch on Iwara (1080p)",
      iwara_unavailable: "Iwara Link Unavailable",
      unlock_source: "Unlock 4K Source",
      master_file: "You are viewing the uncompressed master file"
    },
    character_detail: {
      not_found_title: "CHARACTER NOT FOUND",
      not_found_desc: "The vessel \"{slug}\" does not exist.",
      current_status: "Current Status",
      status_available: "Available for Corruption",
      role_fallback: "Vessel of Sin",
      desc_fallback: "No description recorded."
    },
    sanctuary: {
      title: "The Sanctuary",
      quote: "\"Only the devoted may witness the true form.\"",
      instruction: "Link your account to prove your devotion.",
      requirement: "*Requires active Tier 1+ Subscription"
    },
    confessional_about: {
      title: "About the Confessional",
      q1: "What is the confessional?",
      a1_intro: "The confessional is a place for you to submit:",
      a1_li1: "Things you want to happen to Bunny Nun",
      a1_li2: "Things you want Bunny Nun to do",
      a1_li3: "Really any sexual desires related to Bunny Nun",
      q2: "Why would I submit a confession?",
      a2: "To bask within your own lust and sins of course! But also you can think of this as Bunny's way of seeing what the audience wants. It's easier to please if you know the desires of the people~.",
      q3: "What are the rules and restrictions?",
      a3: "Anything goes. Links will not be clicked and pretty much any confession with a link will be ignored. Otherwise say whatever you want. The church wants you to relinquish your sins unto us.",
      q4: "Are the confessions anonymous?",
      a4: "Yes! The whole point of our confessional is anonymity. No one will know you said it.",
      q5: "Are the confessions private?",
      a5: "In a lot of cases no. You can mark them to not show on the confessions board, but they may still be used for a drawing, though most private confessions will simply echo into the void. If your private confession is used then Bunny really liked it~. We promise anonymity, not privacy. Let's all embrace our darkest desires together.",
      q6: "What is the confessions board?",
      a6: "The place for congregants to vote on which confessions they agree with. After review, the public confessions will be placed on the <a href=\"/confessional/confessions\" class=\"text-gold hover:underline\">confessions</a> page with the ability to be liked or disliked by users.",
      q7: "Will I see my confession on the confessions board?",
      a7: "Not immediately, and probably not exactly as you typed it. Confessions are curated and reworded but ultimately your main desires will be kept in tact. If you don't see your confession its either too similar to another one or too fucked up to make public and will be made into a private confession, be proud of that you filthy sinner~.",
      q8: "Why not just gather data from social media?",
      a8: "Because I want to hear your honest and rawest desires. Social media doesn't give you enough privacy, let Bunny know just what you want, be depraved."
    },
    confessional_board: {
      title: "Kneel and confess your unholiest desires."
    },
    reviews: {
      title: "The Holy Scripture",
      subtitle: "Detailed analysis of digital corruption.",
      read_more: "Read Review",
      verdict_label: "Church Verdict:",
      steam_link: "Acquire Artifact",
      empty: "The archives are currently empty.",
      back: "Return to Scripture",
      tags_label: "Sacred Labels:",
      filter_all: "All Artifacts",
    },
    ui: {
      delve_start: "Begin Delve",
      delve_stop: "Stop Delving",
      settings_filters: "Corruption Filters",
      coming_soon: "Coming soon...",
      integration_pending: "Integration Pending"
    }
  },
  ja: {
    nav: {
      home: "ホーム",
      games: "ゲーム",
      animations: "動画",
      characters: "登場人物",
      confess: "告解",
      sanctuary: "聖域",
      commissions: "依頼",
      reviews: "聖典",
    },
    home: {
      altar: "祭壇",
      creed: "スイッチを入れて、肉の真実を探求せよ。",
      worship: "崇拝",
      established: "2026年設立",
    },
    ageGate: {
      title: "境界線",
      subtitle: "成人向けコンテンツ警告",
      text1: "ここから先は<strong>成人向けコンテンツ</strong>が含まれる聖域です。",
      text2: "入場することで、あなたは<strong>18歳以上</strong>（または居住地域の成人年齢）であること、および性的描写を含む閲覧に同意したものとみなされます。",
      enter: "18歳以上です (入場)",
      leave: "立ち去る",
    },
    commissions: {
      title: "個人的な享楽",
      status_closed: "[ 依頼受付停止中 ]",
      description: "作家は現在、神殿の建立に向けた深い祈祷（開発）の最中です。肉体を刻む個人的な依頼は、追って通知があるまで停止されています。",
      update_label: "状況報告",
      update_text: "待機リストは満杯です。『Fairway Queens』のローンチ後に再度ご確認ください。",
      button: "アクセスを申請"
    },
    characters: {
      title: "信徒たち",
      subtitle: "器を選び、その堕落を目撃せよ。",
      empty: "祭壇は空です。",
      role_fallback: "罪の器"
    },
    animations: {
      title: "神聖な躍動",
      subtitle: "肉の躍動を目撃せよ。",
      iwara_link: "Iwaraプロフィールへ ↗",
      empty: "アーカイブは沈黙しています。",
      check_iwara: "Iwaraを直接確認する",
      no_signal: "信号なし",
      available_4k: "/ 4K版あり"
    },
    games: {
      title: "冒涜的な遊戯",
      subtitle: "インタラクティブな崇拝。",
      empty: "ライブラリにゲームが見つかりません。",
      status_fallback: "開発中"
    },
    confess: {
      title: "告解室",
      subtitle: "「バニーに次に何が起こるべきか？彼女は支配するために生まれた女神か、それとも繁殖のための肉便器か？」",
      name_label: "あなたの名前（任意）",
      name_placeholder: "名もなき罪人",
      character_label: "関与する者は？",
      desire_label: "あなたの欲望",
      desire_placeholder: "私が見たいのは...",
      consent_public: "<span class=\"text-gold font-bold\">任意：</span> これを公開「汚物壁」に投稿し、他者の投票を受け付ける。",
      consent_future: "<span class=\"text-red-500 font-bold\">必須：</span> 私のアイデアが将来の作品に使用される可能性があることに同意します。",
      submit: "告白する",
      submitting: "罪を送信中...",
      success: "あなたの罪は記録されました。悔い改めなさい。",
      error_network: "通信エラー。告解室は閉ざされています。",
      error_empty_chars: "アーカイブにキャラクターが見つかりません。"
    },
    game_detail: {
      not_found_title: "ゲームが見つかりません",
      not_found_desc: "次のエントリは見つかりませんでした：",
      no_media: "メディアなし",
      features_label: "特徴:",
      play_prefix: "プレイ：", // Will look like "プレイ： [Status] ビルド"
      play_suffix: "ビルド",
      download_unavailable: "ダウンロード不可",
      alpha_warning: "※アルファ版にはDevoteeステータスが必要です"
    },
    animation_detail: {
      not_found_title: "アーカイブが見つかりません",
      not_found_desc: "指定された動画は削除されたか、存在しません：",
      return: "アーカイブに戻る",
      locked_title: "プレミアムソース ロック中",
      locked_desc_1: "この4K 120FPSのアーティファクトを直接視聴するには、Devoteeステータスが必要です。",
      locked_desc_2: "一般ユーザーはIwaraで圧縮版を視聴できます。",
      watch_iwara: "Iwaraで視聴 (1080p)",
      iwara_unavailable: "Iwaraリンク利用不可",
      unlock_source: "4Kソースを解除",
      master_file: "無圧縮マスターファイルを視聴中"
    },
    character_detail: {
      not_found_title: "キャラクターが見つかりません",
      not_found_desc: "器「{slug}」は存在しません。",
      current_status: "現在の状態",
      status_available: "堕落可能",
      role_fallback: "罪の器",
      desc_fallback: "記録なし"
    },
    sanctuary: {
      title: "聖域", // Seiiki
      quote: "「献身的な者のみが、真の姿を目撃する。」",
      instruction: "アカウントを連携し、信仰を証明せよ。",
      requirement: "※Tier 1以上のサブスクリプションが必要です"
    },
    confessional_about: {
      title: "告解室について",
      q1: "告解室とは何ですか？",
      a1_intro: "告解室は、以下のような事柄を提出する場所です：",
      a1_li1: "バニーシスターに起こってほしいこと",
      a1_li2: "バニーシスターにしてほしいこと",
      a1_li3: "バニーシスターに関連するあらゆる性的欲望",
      q2: "なぜ告白を送る必要があるのですか？",
      a2: "もちろん、あなた自身の欲望と罪に浸るためです！また、これは観衆が何を望んでいるかをバニーが知るための方法でもあります。人々の欲望を知っているほうが、悦ばせるのは簡単ですから～。",
      q3: "ルールや制限はありますか？",
      a3: "何でもありです。ただし、リンクはクリックされず、リンクを含む告白はほぼ無視されます。それ以外は何を言っても構いません。教会はあなたが罪を私たちに委ねることを望んでいます。",
      q4: "告白は匿名ですか？",
      a4: "はい！告解室の最大の目的は匿名性です。誰が言ったかは誰にも分かりません。",
      q5: "告白は非公開ですか？",
      a5: "多くの場合、いいえ。「掲示板に表示しない」設定は可能ですが、描画の題材として使用される場合があります。ただし、ほとんどの非公開告白は単に虚無へと響くだけでしょう。もしあなたの非公開告白が採用されたなら、バニーがそれをとても気に入ったということです～。私たちは匿名性を約束しますが、秘密性を約束するわけではありません。共に最も暗い欲望を受け入れましょう。",
      q6: "告解掲示板とは何ですか？",
      a6: "信徒たちがどの告白に同意するかを投票する場所です。審査後、公開された告白は<a href=\"/confessional/confessions\" class=\"text-gold hover:underline\">告解ページ</a>に掲載され、ユーザーによる評価（好き/嫌い）が可能になります。",
      q7: "自分の告白は掲示板に表示されますか？",
      a7: "すぐには表示されませんし、入力した通りとも限りません。告白は編集・リライトされますが、あなたの主な欲望は維持されます。もし表示されない場合は、他のものと似すぎているか、あるいは公開するにはあまりに常軌を逸しているため非公開にされたかのどちらかです。そのことを誇りに思いなさい、穢れた罪人よ～。",
      q8: "なぜSNSのコメントから集めないのですか？",
      a8: "あなたの正直で生々しい欲望を聞きたいからです。SNSでは十分なプライバシーが確保できません。バニーにあなたが本当に望むものを知らせてください、堕落なさい。",
    },
    confessional_board: {
      title: "跪いて、あなたの最も不浄な欲望を告白しなさい。"
    },
    reviews: {
      title: "聖なる記録",
      subtitle: "デジタルな堕落に関する詳細な分析。",
      read_more: "聖典を読む",
      verdict_label: "教会の判決:",
      steam_link: "アーティファクトを入手",
      empty: "現在、アーカイブは空です。",
      back: "聖典に戻る",
      tags_label: "聖なるラベル:",
      filter_all: "すべてのアーティファクト",
    },
    ui: {
      delve_start: "深淵へ", // "Into the Abyss"
      delve_stop: "深淵から戻る", // "Return from the Abyss"
      settings_filters: "堕落フィルター",
      coming_soon: "近日公開...",
      integration_pending: "統合準備中"
    }
  },
};

export const getDictionary = (lang: Locale) => dictionary[lang];