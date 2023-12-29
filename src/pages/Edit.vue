<template>
  <div id="app" class="mdc-d-flex-col">
    <md-toolbar id="toolbar" class="md-primary">
      <div class="mdc-max-content-wrapper">
        <div class="md-toolbar-section-start">
          <h2 class="md-title"><a href="/" style="color: white">票知</a></h2>
        </div>
        <div class="md-toolbar-section-end"></div>
      </div>
    </md-toolbar>

    <section v-if="hasRequiredData" id="section-list" class="section mdc-d-flex-center">
      <md-list v-for="record in records" :key="record.token" class="md-double-line mdc-w-100">
        <md-subheader>{{ record.date }}</md-subheader>

        <md-list-item @click.stop="edit(record)">
          <md-checkbox v-model="record.isChecked" class="md-primary"></md-checkbox>

          <div class="md-list-item-text">
            <span>{{ record.startStation }} ~ {{ record.endStation }}</span>
            <span>{{ record.startTime }} ~ {{ record.endTime }}</span>
          </div>

          <div class="md-list-item-text">
            <span>票源：{{ sourceToString(record.source) }}</span>
            <span>票數：{{ record.count }}</span>
          </div>
          <md-button class="md-icon-button md-list-action" @click.stop="edit(record)">
            <md-icon>edit</md-icon>
          </md-button>
        </md-list-item>
      </md-list>
    </section>
    <section v-else class="section mdc-d-flex-center">
      <md-empty-state
        md-icon="sentiment_very_dissatisfied"
        md-label="出了一點問題"
        md-description="透過信中的連結，才能正常使用這頁面喔"
      >
        <md-button class="md-primary md-raised" href="/">回到票知首頁</md-button>
      </md-empty-state>
    </section>

    <section v-if="hasRequiredData && isShowRecords" class="section mdc-d-flex">
      <md-button class="md-raised md-primary mdc-w-100" :disabled="!isSaveBtnEnable" @click="save">儲存</md-button>
    </section>

    <md-dialog :md-active.sync="isEditDialogShow" :md-fullscreen="false">
      <md-dialog-title
        >{{ editingRecord.date }} {{ editingRecord.startStation }}~{{ editingRecord.endStation }}</md-dialog-title
      >
      <md-dialog-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-50 md-xsmall-size-100">
            <TimeSelect label="時間最早的車票" :time.sync="editingRecord.startTime" @update:time="resetFormError" />
          </div>
          <div class="md-layout-item md-size-50 md-xsmall-size-100">
            <TimeSelect
              label="時間最晚的車票"
              :time.sync="editingRecord.endTime"
              :upper.sync="editingRecord.startTime"
              :start-time-after-end-time-error="isStatTimeAfterEndTime"
              @update:time="resetFormError"
            />
          </div>
          <div class="md-layout-item md-size-100">
            <md-field>
              <label for="count">票數(全票)</label>
              <md-select id="count" v-model="editingRecord.count" name="count">
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
          <div class="md-layout-item md-size-100">
            <!-- web是預設要選擇的，不能夠取消 -->
            <md-switch v-model="editingRecord.source.web" class="md-primary" disabled>網頁</md-switch>
            <md-switch v-model="editingRecord.source.app" class="md-primary">App</md-switch>
          </div>
        </div>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="isEditDialogShow = false">取消</md-button>
        <md-button class="md-primary" @click="confirm">確定</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>
<script>
import { PopupState } from '@/components/Popup.vue';
import TimeSelect from '@/components/TimeSelect.vue';
import { getUserRecords, resubscribeRecord, updateUserRecords, verifyRecord } from '@/libs/firebase';

const Action = {
  Verify: 'verify',
  Resubscribe: 'resubscribe'
};

export default {
  name: 'Edit',
  components: {
    TimeSelect
  },
  data: () => ({
    hasRequiredData: false,
    isShowRecords: false,
    // userToken
    ut: null,
    // recordToken
    rt: null,
    // action
    at: null,
    records: [],
    isEditDialogShow: false,
    // 被選擇、正在被編輯的record的reference
    selectedRecord: null,
    // 正在被編輯的record的clone
    editingRecord: {
      date: '',
      startTime: null,
      endTime: null,
      startStation: '',
      endStation: '',
      count: 1,
      source: {
        web: true,
        app: false
      },
      isCanceled: false
    },
    isStatTimeAfterEndTime: false
  }),
  computed: {
    isSaveBtnEnable() {
      return this.records.some((record) => record.isChecked);
    }
  },
  async created() {
    const urlParams = new URLSearchParams(window.location.search);
    this.ut = urlParams.get('ut');
    this.rt = urlParams.get('rt');
    this.at = urlParams.get('at');

    const hasActionParam = this.at === Action.Verify || this.at === Action.Resubscribe;

    // 有rt就會有at，不會有ut
    if (this.ut === null && this.rt != null && hasActionParam) {
      this.hasRequiredData = true;
      this.$bus.$emit('popup:message', {
        state: PopupState.Loading,
        title: hasActionParam ? '驗證中' : '資料載入中'
      });

      let result = null;

      if (this.at === Action.Verify) {
        const { data } = await verifyRecord(this.rt);
        result = data;
      } else if (this.at === Action.Resubscribe) {
        const { data } = await resubscribeRecord(this.rt);
        result = data;
      }

      if (result.isOk) {
        this.$bus.$emit('popup:message', { state: PopupState.Success, title: '驗證成功', msg: result.message });
      } else {
        this.$bus.$emit('popup:message', { state: PopupState.Error, title: '驗證失敗', msg: result.message });
        console.error(result.message, result.error);
      }
    }
    // 只有ut，沒有其他的
    else if (this.ut != null && this.rt === null && this.at === null) {
      this.hasRequiredData = true;
      this.isShowRecords = true;
      this.loadUserData();
    } else {
      this.hasRequiredData = false;
    }
  },
  methods: {
    resetFormError() {
      this.isStatTimeAfterEndTime = false;
    },
    edit(recordObj) {
      this.resetFormError();
      for (const key in recordObj) {
        this.editingRecord[key] = recordObj[key];
      }
      this.selectedRecord = recordObj;
      this.isEditDialogShow = true;
    },
    confirm() {
      this.isStatTimeAfterEndTime = this.editingRecord.startTime >= this.editingRecord.endTime;
      if (this.isStatTimeAfterEndTime) {
        return;
      }
      for (const key in this.editingRecord) {
        this.selectedRecord[key] = this.editingRecord[key];
      }
      this.isEditDialogShow = false;
      // 下面這行的意義等於: this.selectedRecord.isChecked = true，因為是deep obj attr，所以要用set
      this.$set(this.selectedRecord, 'isChecked', true);
      // 透過reference把原本的record object.isChecked 設定為true之後，reset selectedRecord
      this.selectedRecord = null;
    },
    async save() {
      this.$bus.$emit('popup:message', { state: PopupState.Loading });
      const obj = {};
      for (const record of this.records) {
        if (record.isChecked) {
          obj[`${record.date}#${record.startStation}~${record.endStation}`] = {
            startTime: record.startTime,
            endTime: record.endTime,
            count: record.count,
            source: record.source,
            updatedAt: new Date()
          };
        }
      }

      const { data: result } = await updateUserRecords(this.ut, obj);

      if (result.isOk) {
        this.$bus.$emit('popup:message', { state: PopupState.Success, title: '更新成功', msg: result.message });
      } else {
        this.$bus.$emit('popup:message', { state: PopupState.Error, title: '更新失敗', msg: result.message });
        console.error(result.message, result.error);
      }
    },
    async loadUserData() {
      try {
        const { data: result } = await getUserRecords(this.ut);
        if (result.isOk) {
          this.records = result.data.records;
        } else {
          this.$bus.$emit('popup:message', { state: PopupState.Error, title: '驗證失敗', msg: result.message });
          console.error(result.message, result.error);
        }
      } catch (error) {
        console.error(error);
      }
    },
    sourceToString(source) {
      const sourceList = [];
      if (source.web) sourceList.push('網頁');
      if (source.app) sourceList.push('APP');
      return sourceList.join('/');
    }
  }
};
</script>
<style lang="scss">
#app,
body {
  height: 100%;
  min-height: 100dvh;
}

#toolbar .mdc-max-content-wrapper {
  padding: 0;
}

.section.mdc-d-flex-center {
  flex: 1;
}

#section-list {
  flex-direction: column;
  justify-content: flex-start;
}
</style>
