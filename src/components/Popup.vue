<template>
  <md-dialog :md-active.sync="isShowPopup" :md-fullscreen="false" :md-click-outside-to-close="false">
    <md-dialog-title>{{ title }}</md-dialog-title>
    <md-dialog-content>
      <div v-show="isLoading" class="mdc-d-flex-center">
        <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
      </div>
      <div v-show="isSuccess" class="mdc-d-flex-col mdc-d-flex-center">
        <md-icon style="color: #41b883" class="md-size-3x">check_circle</md-icon>
        <p class="mdc-text-center" v-html="msg"></p>
      </div>
      <div v-show="isError" class="mdc-d-flex-col mdc-d-flex-center">
        <md-icon style="color: #f56c6c" class="md-size-3x">error</md-icon>
        <p class="mdc-text-center">{{ msg }}</p>
      </div>
    </md-dialog-content>
    <md-dialog-actions>
      <md-button v-if="!isLoading" class="md-primary" @click="closePopup">OK</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
export const PopupState = {
  None: 'none',
  Loading: 'loading',
  Success: 'success',
  Error: 'error'
};

export default {
  name: 'Popup',
  data: () => ({
    state: PopupState.None,
    title: '',
    msg: ''
  }),
  computed: {
    isShowPopup() {
      return this.state !== PopupState.None;
    },
    isLoading() {
      return this.state === PopupState.Loading;
    },
    isSuccess() {
      return this.state === PopupState.Success;
    },
    isError() {
      return this.state === PopupState.Error;
    }
  },
  created() {
    // 在 created 的時候在 Vue 底下註冊監聽 popup:message 事件
    this.$bus.$on('popup:message', ({ state = PopupState.None, title = '', msg = '' }) => {
      this.updateData(state, title, msg);
    });
  },
  beforeDestroy: function () {
    // component銷毀之前要註銷監聽事件
    this.$bus.$off('popup:message');
  },
  methods: {
    updateData(state, title, msg) {
      this.state = state;
      this.title = title;
      this.msg = msg;
    },
    closePopup() {
      this.state = PopupState.None;
    }
  }
};
</script>
