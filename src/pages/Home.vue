<template>
  <div id="app">
    <md-toolbar id="toolbar">
      <div class="mdc-max-content-wrapper">
        <div class="md-toolbar-section-start">
          <img id="logo" src="@/assets/ticketsnote.svg" alt="票知Logo" />
          <h2 class="md-title">票知</h2>
        </div>
        <div class="md-toolbar-section-end">
          <md-button v-scroll-to="'#section-feature'">功能介紹</md-button>
          <md-button @click="isShowQA = true">Ｑ&amp;A</md-button>
        </div>
      </div>
    </md-toolbar>
    <section id="section-primary" class="section">
      <div class="md-layout md-gutter md-alignment-center mdc-max-content-wrapper">
        <div id="block-text" class="md-layout-item md-size-50 md-small-size-100">
          <h1 class="mdc-text-lv1">
            <strong
              >票知，幫你找到被釋出的高鐵票<span class="md-xsmall-hide">，讓你不再與任何一張票擦肩而過</span>。</strong
            >
          </h1>
          <p class="mdc-text-p">常常沒搶到高鐵票，只好瘋狂不定時檢查有沒有票釋出嗎？</p>
          <p class="mdc-text-p">花了許多時間查票，但卻還是找不到票嗎？</p>
          <p class="mdc-text-p">現在，就讓票知來幫你解決這些問題吧！</p>
        </div>
        <div id="block-form" class="md-layout-item md-size-50 md-small-size-100 mdc-small-mt-3">
          <TicketsForm />
        </div>
      </div>
    </section>
    <section id="section-feature" class="section">
      <div class="md-layout md-gutter md-alignment-center mdc-max-content-wrapper mdc-small-flex-col-reverse">
        <div class="md-layout-item md-size-50 md-small-size-100 mdc-small-text-center">
          <h3 class="mdc-text-lv3">發現被釋出的車票</h3>
          <p class="mdc-text-p">票知會定期向高鐵訂票系統查詢目前哪些班次還有票，在發現你想要的車票時馬上通知你！</p>
        </div>
        <div class="md-layout-item md-size-50 md-small-size-100 mdc-text-center">
          <img alt="Find the released tickets" src="@/assets/feature1.png" class="mdc-small-mb-3" />
        </div>
      </div>
      <div class="md-layout md-gutter md-alignment-center mdc-max-content-wrapper">
        <div class="md-layout-item md-size-50 md-small-size-100 mdc-text-center">
          <img alt="Find the released tickets" src="@/assets/feature2.png" class="mdc-small-mt-3 mdc-small-mb-3" />
        </div>
        <div class="md-layout-item md-size-50 md-small-size-100 mdc-small-text-center">
          <h3 class="mdc-text-lv3">省下您的寶貴時間</h3>
          <p class="mdc-text-p">填寫好表單之後，只要等待通知就行哩，不用再花時間與力氣瘋狂查票了。</p>
        </div>
      </div>
    </section>
    <md-divider></md-divider>
    <section id="section-steps" class="section">
      <div class="md-layout md-gutter md-alignment-center mdc-max-content-wrapper">
        <div class="md-layout-item md-size-100 mdc-text-center">
          <h3 class="mdc-text-lv3">瞭解運作方式</h3>
          <p class="md-subheading">4個步驟，找到你想要的車票</p>
        </div>
      </div>
      <div class="md-layout md-gutter md-alignment-top-left mdc-max-content-wrapper">
        <div class="md-layout-item md-size-25 md-medium-size-50 md-xsmall-size-100 item">
          <img src="@/assets/outline-create-24px.svg" alt="" />
          <h4>1.填寫好表單，送出吧！</h4>
          <p>首先先選起點&amp;終點站，別忘了還有日期、時間、票數和Email！</p>
        </div>
        <div class="md-layout-item md-size-25 md-medium-size-50 md-xsmall-size-100 item">
          <img src="@/assets/outline-check-24px.svg" alt="" />
          <h4>2.檢查收到驗證信了沒</h4>
          <p>送出表單後，我們會寄一封驗證信到給你，點開裡頭的驗證連結，接著就可以躺在床上滑手機，等待通知囉~</p>
        </div>
        <div class="md-layout-item md-size-25 md-medium-size-50 md-xsmall-size-100 item">
          <img src="@/assets/outline-notifications_none-24px.svg" alt="" />
          <h4>3.發現有票釋出囉！</h4>
          <p>票知只要發現你想要的時段內有高鐵票釋出，就會馬上寄信通知你，讓你在第一時間去搶高鐵票！</p>
        </div>
        <div class="md-layout-item md-size-25 md-medium-size-50 md-xsmall-size-100 item">
          <img src="@/assets/outline-flash_on-24px.svg" alt="" />
          <h4>4.手刀搶票搶起來！</h4>
          <p>快去高鐵的訂票系統把想要的票搶到手，錯過就是悲哀，別跟票擦身而過！</p>
        </div>
      </div>
      <div class="md-layout md-gutter md-alignment-center mdc-max-content-wrapper">
        <div class="md-layout-item md-size-100 mdc-text-center">
          <md-button v-scroll-to="'#section-primary'" class="md-raised md-primary cta-button">我想試用看看！</md-button>
        </div>
      </div>
    </section>
    <md-divider></md-divider>
    <section id="section-notice" class="section">
      <div class="md-layout md-gutter md-alignment-center mdc-max-content-wrapper">
        <div class="md-layout-item md-size-100 mdc-text-center">
          <h3 class="mdc-text-lv3">注意事項</h3>
          <p class="md-subheading">使用時有下列幾點要注意喔</p>
        </div>
      </div>
      <div class="md-layout md-gutter md-alignment-top-left mdc-max-content-wrapper">
        <div class="md-layout-item md-size-15 md-medium-size-5 md-xsmall-size-100"></div>
        <div class="md-layout-item md-size-70 md-medium-size-90 md-xsmall-size-100">
          <ol>
            <li>
              <p>【服務規定】為避免服務被濫用，票知限制每組Email在同日期時，相同起訖點的紀錄只能有唯一一筆。</p>
              <p>
                舉例來說，如果你已經成功登記了「2020/01/01 台北～左營 12:00 ~
                15:00」的車票通知，你就無法再登記「2020/01/01 台北～左營 16:00 ~ 19:00」的記錄，不過可以登記「2020/01/01
                左營～台北 12:00 ~ 15:00」的車票通知。
              </p>
            </li>
            <li>
              <p>
                【驗證身分】為了避免有人惡意填寫別的人信箱，每次填完表單後，我們將會寄一封驗證信給你，要點開信中的開通連結，票知才會在找到票時寄信通知你喔~
              </p>
            </li>
            <li>
              <p>
                【訂閱通知】當你開通服務後，每當票知找到票，就會寄通知信告訴你！不過為了避免打擾你，票知在每3封通知信的「第三封信」中，會附上「續訂車票通知」的連結，如果想繼續收到通知，點開連結就能繼續收到通知哩；反之，如果不想再收到通知就不用按囉!
              </p>
            </li>
            <li>
              <p>
                【額度限制】因為資源有限，為了讓其他人也能順利找到想要的車票，每組Email在一個月內只能登記3次不同的行程，若有需要更高的使用額度，或是有其他需求，歡迎直接連絡我們喔！
              </p>
            </li>
          </ol>
        </div>
      </div>
      <div class="md-layout-item md-size-15 md-medium-size-5 md-xsmall-size-100"></div>
    </section>
    <section id="section-witness" class="section">
      <div class="md-layout md-gutter md-alignment-center mdc-max-content-wrapper">
        <div class="md-layout-item md-size-100 mdc-text-lv1 mdc-text-center">
          已經有
          <span>20000</span>
          人，透過票知尋找釋出的高鐵票
        </div>
      </div>
    </section>
    <section id="section-cta" class="section">
      <div class="md-layout md-gutter md-alignment-center mdc-max-content-wrapper">
        <div class="md-layout-item md-size-100 mdc-text-center">
          <h3 class="mdc-text-lv3">立即開始使用</h3>
          <p class="md-subheading">馬上填寫表單，與大家一起使用票知，找到你需要的高鐵票。</p>
          <md-button v-scroll-to="'#section-primary'" class="md-raised md-primary cta-button"
            >我要尋找高鐵票！</md-button
          >
        </div>
      </div>
    </section>
    <footer id="footer">
      <div class="md-layout md-gutter md-alignment-top-left">
        <div class="md-layout-item md-size-33 md-small-size-50 md-xsmall-size-100 mdc-d-flex">
          <img id="logo" src="@/assets/ticketsnote-white.svg" alt="票知Logo" />
          <div class="mdc-d-flex-col mdc-ml-1">
            <span>票知</span>
            <span>TicketsNote</span>
          </div>
        </div>
        <div class="md-layout-item md-size-33 md-small-size-50 md-xsmall-size-100 mdc-xsmall-mt-3">
          <div class="title">聯絡我們</div>
          <p>contact@ticketsnote.com</p>
          <p><a href="" target="_blank" rel="noopener noreferrer">給我們建議與意見</a></p>
        </div>
        <div class="md-layout-item md-size-33 md-small-size-50 md-xsmall-size-100"></div>
      </div>
      <md-divider class="divider"></md-divider>
      <div class="mdc-text-center">Copyright © 2019 TicketsNote All rights reserved</div>
    </footer>
    <md-speed-dial v-scroll-to="'#toolbar'" class="md-bottom-right md-fixed" md-direction="bottom">
      <md-speed-dial-target class="md-primary">
        <md-icon>expand_less</md-icon>
      </md-speed-dial-target>
    </md-speed-dial>
    <md-dialog :md-active.sync="isShowQA">
      <md-dialog-title>票知 Q&amp;A</md-dialog-title>
      <md-dialog-content>
        <h5 class="mdc-text-p">Q1：使用票知需要付費嗎？</h5>
        <p>
          Ａ：票知目前提供大家免費使用！但如果未來維運成本太高負荷不了，會再考慮將轉為付費使用，或是推出其他付費功能。
        </p>
        <h5 class="mdc-text-p">Q2：我需要註冊帳號才能使用票知嗎？</h5>
        <p>Ａ：不用喔，現在沒有任何會員機制，只要填寫表格之後直接送出就可以哩。</p>
        <h5 class="mdc-text-p">Q3：票知可以幫我自動查票，那麼可以幫我自動訂票嗎？</h5>
        <p>Ａ：目前沒有提供自動訂票的功能耶QQ。</p>
        <h5 class="mdc-text-p">Q4：什麼時候才會通知有票啊？我很急著要訂怎麼辦？</h5>
        <p>
          Ａ：票知只要發現有票，就會馬上寄信通知你！但是因為是要等到高鐵票有人釋出，所以確切時間並沒有辦法掌握，如果很急的話，可能要考慮搭乘其他交通工具囉。
        </p>
        <h5 class="mdc-text-p">Q5：通知的Email信箱只能使用Gmail嗎？</h5>
        <p>Ａ：由於測試起來，Gmail的收信功能最穩定，因為怕其他Email服務出現漏信的情況，所以暫時只開放填寫Gmail喔。</p>
        <h5 class="mdc-text-p">Q6：票種有優惠票可以選嗎？預設都是全票欸</h5>
        <p>
          Ａ：目前只有提供全票的選項喔，如果大家都需要選擇票種的功能，未來會再開發，覺得這功能很有幫助的話，點下面的按鈕，填個表單告訴我吧！
        </p>
        <md-button class="md-raised md-primary mdc-mh-0 mdc-mb-1">我有話想說!</md-button>
        <h5 class="mdc-text-p">Q7：我沒收到驗證信或是通知信怎麼辦？</h5>
        <p>Ａ：可以去垃圾信件區找看看呦，說不定它不小心被吃進去了！</p>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="isShowQA = false">OK</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import TicketsForm from '@/components/TicketsForm.vue';

export default {
  name: 'Home',
  components: {
    TicketsForm
  },
  data: () => ({
    isShowQA: false
  }),
  mounted() {
    // 因為在 TicketsForm 這個 component 中的 datepicker 在使用上可以透過打字輸入字串，手機版按下去會跳出鍵盤
    // 所以想要把 datepicker 的 input element 改成 readonly，讓鍵盤不會跳出
    // 但因為無法透過 this.$refs.datepicker.$refs.input.readonly = true
    // 去直接更改 datepicker 的 child component 的狀態，所以只好透過操作DOM處理QQ
    const inputs = document.querySelectorAll('.md-datepicker input');
    inputs.forEach((element) => element.setAttribute('readonly', 'readonly'));
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.section {
  padding: 100px 0;
}

.cta-button {
  transform: scale(1.2);
}

#toolbar .mdc-max-content-wrapper {
  padding: 0;
}

#logo {
  height: 40px;
}

#section-primary {
  /* background-image: linear-gradient(40deg,#2e5bff 0%,#2effda 100%); */
  @include bg-gradient();
  color: white;
  padding: 60px 0;

  .mdc-text-lv1 {
    margin-bottom: 1rem;
  }
}

@media screen and (max-width: $md-breakpoint-xsmall) {
  #section-primary,
  #section-primary .mdc-max-content-wrapper {
    padding: 0;
  }

  #block-text {
    padding: 60px 10%;
    @include bg-gradient();
  }

  #block-form {
    margin: 0;
    padding: 0;
  }
}

#section-feature {
  /*
  background: #24126a;
  background: #1e1e68;
  color: white;
  */

  .md-layout-item img {
    max-width: 400px;
    width: 100%;
  }
}

#section-steps {
  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-top: 3rem;

    img {
      height: 40px;
      border: 3px solid;
      border-radius: 50%;
      padding: 20px;
      box-sizing: content-box;
    }

    h4 {
      margin-bottom: 0px;
    }

    p {
      width: 80%;
    }
  }

  .cta-button {
    margin-top: 55px;
  }
}

#section-notice {
  .md-subheading {
    margin-bottom: 40px;
  }
}

#section-witness {
  background-image: linear-gradient(40deg, #3d2e86 20%, #191933 100%);
  color: white;
}

#footer {
  background-color: #151515;
  color: white;
  padding: 60px 10% 25px;

  .title {
    font-size: 1rem;
    font-weight: bold;
    position: relative;

    &::before {
      content: '';
      height: 100%;
      background: white;
      width: 3px;
      position: absolute;
      left: -15px;
    }
  }

  .divider {
    background: white;
    margin: 25px auto;
  }

  a {
    color: inherit;
    text-decoration: underline;
  }
}
</style>
