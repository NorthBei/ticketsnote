<template>
  <div>
    <form id="tickets-form" @submit.prevent="onSubmit">
      <md-card>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-100">
              <p class="mdc-text-p"><b>起訖站</b></p>
            </div>
            <div class="md-layout-item md-size-45">
              <md-field :class="getValidationClass('station.start')">
                <label for="startStation">起點</label>
                <md-select id="startStation" v-model="form.station.start">
                  <md-option value="南港" selected>南港</md-option>
                  <md-option value="台北">台北</md-option>
                  <md-option value="板橋">板橋</md-option>
                  <md-option value="桃園">桃園</md-option>
                  <md-option value="新竹">新竹</md-option>
                  <md-option value="苗栗">苗栗</md-option>
                  <md-option value="台中">台中</md-option>
                  <md-option value="彰化">彰化</md-option>
                  <md-option value="雲林">雲林</md-option>
                  <md-option value="嘉義">嘉義</md-option>
                  <md-option value="台南">台南</md-option>
                  <md-option value="左營">左營</md-option>
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item md-size-10 mdc-d-flex-center">~</div>
            <div class="md-layout-item md-size-45">
              <md-field :class="getValidationClass('station.end')">
                <label for="endStation">終點</label>
                <md-select id="endStation" v-model="form.station.end">
                  <md-option value="南港">南港</md-option>
                  <md-option value="台北">台北</md-option>
                  <md-option value="板橋">板橋</md-option>
                  <md-option value="桃園">桃園</md-option>
                  <md-option value="新竹">新竹</md-option>
                  <md-option value="苗栗">苗栗</md-option>
                  <md-option value="台中">台中</md-option>
                  <md-option value="彰化">彰化</md-option>
                  <md-option value="雲林">雲林</md-option>
                  <md-option value="嘉義">嘉義</md-option>
                  <md-option value="台南">台南</md-option>
                  <md-option value="左營">左營</md-option>
                </md-select>
                <span v-if="!$v.form.station.end.startStationNotAsSameAsEndStation" class="md-error"
                  >起點和終點站不能一樣啦!!</span
                >
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-100">
              <p class="mdc-text-p"><b>車票資訊</b></p>
            </div>
            <div class="md-layout-item md-size-50">
              <md-datepicker v-model="form.date" :md-disabled-dates="disabledDates">
                <label>日期</label>
              </md-datepicker>
            </div>
            <div class="md-layout-item md-size-50">
              <TimeSelect
                label="時間最早的車票"
                :time.sync="form.time.start"
                :upper.sync="todayTimeUpper"
                :gap="24"
                :empty-error="$v.form.time.end.$dirty && !$v.form.time.start.required"
                @update:time="resetEndTime"
              />
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-50">
              <md-field>
                <label for="count">票數(全票)</label>
                <md-select id="count" v-model="form.count">
                  <md-option value="1">1</md-option>
                  <md-option value="2">2</md-option>
                  <md-option value="3">3</md-option>
                  <md-option value="4">4</md-option>
                  <md-option value="5">5</md-option>
                  <md-option value="6">6</md-option>
                  <md-option value="7">7</md-option>
                  <md-option value="8">8</md-option>
                  <md-option value="9">9</md-option>
                  <md-option value="10">10</md-option>
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item md-size-50">
              <TimeSelect
                label="時間最晚的車票"
                :time.sync="form.time.end"
                :upper.sync="form.time.start"
                :empty-error="$v.form.time.end.$dirty && !$v.form.time.end.required"
                :start-time-after-end-time-error="$v.form.time.end.$dirty && !$v.form.time.end.startTimeBeforeEndTime"
              />
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-100">
              <p class="mdc-text-p"><b>票源</b></p>
              <div>
                高鐵的票源分為「網頁」與「App」2種，舉例來說，班次A在高鐵App上雖然有票可以購買，但在網頁上可能已經售完了。
              </div>
            </div>
            <div class="md-layout-item md-size-100">
              <!-- web是預設要選擇的，不能夠取消 -->
              <md-switch v-model="form.source.web" class="md-primary" disabled>網頁</md-switch>
              <md-switch v-model="form.source.app" class="md-primary">App</md-switch>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-100">
              <md-field :class="getValidationClass('email')">
                <label>通知Email</label>
                <md-input v-model="form.email"></md-input>
                <span class="md-suffix">@gmail.com</span>
                <span class="md-helper-text">因為其他Email服務可能會漏信，暫時只支援Gmail</span>
                <span v-if="!$v.form.email.required" class="md-error">mail不能空白啦！不然收不到通知喔</span>
                <span v-else-if="!$v.form.email.format" class="md-error">抓到囉，Email格式不對喔！</span>
              </md-field>
            </div>
          </div>
          <div class="md-body-2 mdc-mt-1" style="color: #3d2e86">{{ ticketsNotifyRuleToString }}</div>
        </md-card-content>
        <md-card-actions>
          <md-button class="mdc-small-fullbutton md-raised md-primary" type="submit">確定</md-button>
        </md-card-actions>
      </md-card>
    </form>

    <md-dialog :md-active.sync="recaptcha.isExpire" :md-fullscreen="false" :md-click-outside-to-close="false">
      <md-dialog-title>閒置太久囉</md-dialog-title>
      <md-dialog-content>按下OK，重新整理頁面吧～</md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="reloadPage">OK</md-button>
      </md-dialog-actions>
    </md-dialog>

    <vue-recaptcha
      ref="invisibleRecaptcha"
      badge="none"
      size="invisible"
      :sitekey="recaptcha.siteKey"
      @verify="onVerify"
      @expired="onExpired"
    >
    </vue-recaptcha>
  </div>
</template>
<script>
import dateFormat from 'dateformat';
import get from 'lodash/get';
import { VueRecaptcha } from 'vue-recaptcha';
import { required } from 'vuelidate/lib/validators';

import { PopupState } from '@/components/Popup.vue';
import TimeSelect from '@/components/TimeSelect.vue';
// import gtm from '@/libs/gtm';
import { getTaipeiTime, isToday } from '@/libs/day';
import { addRecord } from '@/libs/firebase';
import storage, { key } from '@/libs/storage';

// copy from https://www.regextester.com/19
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const gmailPostfix = '@gmail.com';

export default {
  name: 'TicketsForm',
  components: {
    VueRecaptcha,
    TimeSelect
  },
  data: () => ({
    form: {
      station: {
        start: '南港',
        end: '左營'
      },
      date: null,
      time: {
        start: null,
        end: null
      },
      count: 1,
      source: {
        web: true,
        app: false
      },
      email: ''
    },
    todayTimeUpper: null,
    recaptcha: {
      siteKey: import.meta.env.VITE_GOOGLE_RECAPTCHA_SITE_KEY,
      isExpire: false
    }
  }),
  computed: {
    ticketsNotifyRuleToString() {
      const startTime = this.form.time.start ? this.form.time.start : 'A時間';
      const endTime = this.form.time.end ? this.form.time.end : 'B時間';
      const email = this.form.email ? this.form.email : '___';
      const date = this.form.date ? dateFormat(this.form.date, 'yyyy-mm-dd') : '某日期';
      const startStation = this.form.station.start ? this.form.station.start : 'X站';
      const endStation = this.form.station.end ? this.form.station.end : 'Y站';

      return `如果有發現${startStation}到${endStation}的列車，在${date}的${startTime} ~ ${endTime}之間，有${this.form.count}張可以購買的高鐵票，票知就會寄信到${email}${gmailPostfix}通知你！`;
    }
  },
  watch: {
    'form.date'(date) {
      this.time = { start: null, end: null };
      this.todayTimeUpper = isToday(date) ? dateFormat(getTaipeiTime(), 'HH:MM') : null;
    }
  },
  created() {
    const userEmail = storage.get(key.userEmail);
    if (userEmail) {
      this.form.email = userEmail.replace(gmailPostfix, '');
    }
    this.form.date = getTaipeiTime();
  },
  validations() {
    return {
      form: {
        station: {
          start: { required },
          end: { required, startStationNotAsSameAsEndStation: (value, station) => station.start !== station.end }
        },
        date: { required },
        time: {
          start: { required },
          end: {
            required,
            startTimeBeforeEndTime: (value, time) =>
              time.start === null && time.end === null ? true : time.start < time.end
          }
        },
        count: { required },
        source: {
          web: { required },
          app: { required }
        },
        email: { required, format: (value) => emailRegex.test(`${value}${gmailPostfix}`) }
      }
    };
  },
  methods: {
    getValidationClass(fieldName) {
      const field = get(this.$v.form, fieldName);
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        };
      }
    },
    disabledDates(date) {
      const now = getTaipeiTime();
      // 時間上限：昨天
      const upperLimit = now.setDate(now.getDate() - 1);
      // 時間下限：28天後
      const lowerLimit = now.setDate(now.getDate() + 28);

      return upperLimit > date.getTime() || date.getTime() > lowerLimit;
    },
    onSubmit() {
      this.$v.$touch();

      if (this.$v.$invalid) return;
      this.$refs.invisibleRecaptcha.execute();
    },
    resetEndTime() {
      this.form.time.end = null;
    },
    resetForm() {
      this.form.station = { start: '南港', end: '左營' };
      this.form.date = this.getTaipeiTime();
      this.form.time = { start: null, end: null };
      this.form.count = 1;
      this.form.source = { web: true, app: false };
    },
    async onVerify() {
      this.$bus.$emit('popup:message', { state: PopupState.Loading, title: '資料正在傳送~' });
      storage.set(key.userEmail, `${this.form.email}${gmailPostfix}`);
      const { data: result } = await addRecord(
        `${this.form.email}${gmailPostfix}`,
        this.form.date,
        this.form.time,
        this.form.station,
        this.form.count,
        this.form.source
      );
      // gtm.formSubmit(this.date, this.time, this.station, this.count, this.source, result.isOk);

      if (result.isOk) {
        this.$bus.$emit('popup:message', {
          state: PopupState.Success,
          title: '完成哩',
          msg: '快去你的信箱收信吧！<br />要記得點信中的連結才能收到通知喔'
        });
        this.resetForm();
      } else {
        this.$bus.$emit('popup:message', { state: PopupState.Error, title: '出了點問題', msg: result.msg });
      }

      this.$refs.invisibleRecaptcha.reset();
    },
    onExpired() {
      this.recaptcha.isExpire = true;
    },
    reloadPage() {
      window.location.reload();
    }
  }
};
</script>
<style lang="scss">
@import '@/styles/variables';

/* hide the datepicker clear button */
#tickets-form .md-datepicker > .md-button {
  display: none;
}

@media screen and (max-width: $md-breakpoint-small) {
  #tickets-form .mdc-small-fullbutton {
    width: 100%;
    height: 45px;
  }
}
</style>
