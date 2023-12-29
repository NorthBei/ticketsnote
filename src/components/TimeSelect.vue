<template>
  <md-field :class="{ 'md-invalid': hasError }">
    <label>{{ label }}</label>
    <md-select ref="select" :value="time" @md-selected="selectTime">
      <md-option
        v-for="timeOption in timeOptions"
        v-show="!timeOption.isDisable"
        :key="timeOption.val"
        :value="timeOption.val"
        :disabled="timeOption.isDisable"
      >
        {{ timeOption.val }}
      </md-option>
    </md-select>
    <span v-if="emptyError" class="md-error">要選擇時間喔</span>
    <span v-else-if="startTimeAfterEndTimeError" class="md-error">結束時間要比開始時間晚啦！</span>
  </md-field>
</template>
<script>
const timeList = [
  { val: '00:00', h: 0, min: 0, isDisable: false },
  { val: '00:30', h: 0, min: 30, isDisable: false },
  { val: '01:00', h: 1, min: 0, isDisable: false },
  { val: '06:00', h: 6, min: 0, isDisable: false },
  { val: '06:30', h: 6, min: 30, isDisable: false },
  { val: '07:00', h: 7, min: 0, isDisable: false },
  { val: '07:30', h: 7, min: 30, isDisable: false },
  { val: '08:00', h: 8, min: 0, isDisable: false },
  { val: '08:30', h: 8, min: 30, isDisable: false },
  { val: '09:00', h: 9, min: 0, isDisable: false },
  { val: '09:30', h: 9, min: 30, isDisable: false },
  { val: '10:00', h: 10, min: 0, isDisable: false },
  { val: '10:30', h: 10, min: 30, isDisable: false },
  { val: '11:00', h: 11, min: 0, isDisable: false },
  { val: '11:30', h: 11, min: 30, isDisable: false },
  { val: '12:00', h: 12, min: 0, isDisable: false },
  { val: '12:30', h: 12, min: 30, isDisable: false },
  { val: '13:00', h: 13, min: 0, isDisable: false },
  { val: '13:30', h: 13, min: 30, isDisable: false },
  { val: '14:00', h: 14, min: 0, isDisable: false },
  { val: '14:30', h: 14, min: 30, isDisable: false },
  { val: '15:00', h: 15, min: 0, isDisable: false },
  { val: '15:30', h: 15, min: 30, isDisable: false },
  { val: '16:00', h: 16, min: 0, isDisable: false },
  { val: '16:30', h: 16, min: 30, isDisable: false },
  { val: '17:00', h: 17, min: 0, isDisable: false },
  { val: '17:30', h: 17, min: 30, isDisable: false },
  { val: '18:00', h: 18, min: 0, isDisable: false },
  { val: '18:30', h: 18, min: 30, isDisable: false },
  { val: '19:00', h: 19, min: 0, isDisable: false },
  { val: '19:30', h: 19, min: 30, isDisable: false },
  { val: '20:00', h: 20, min: 0, isDisable: false },
  { val: '20:30', h: 20, min: 30, isDisable: false },
  { val: '21:00', h: 21, min: 0, isDisable: false },
  { val: '21:30', h: 21, min: 30, isDisable: false },
  { val: '22:00', h: 22, min: 0, isDisable: false },
  { val: '22:30', h: 22, min: 30, isDisable: false },
  { val: '23:00', h: 23, min: 0, isDisable: false },
  { val: '23:30', h: 23, min: 30, isDisable: false },
  { val: '23:59', h: 23, min: 59, isDisable: false }
];

export default {
  name: 'TimeSelect',
  props: {
    label: {
      type: String,
      default: '標籤',
      required: true
    },
    time: {
      validator: function (value) {
        // 沒有值的時候是null，有值的時候是type是string
        return value === null || typeof value === 'string';
      },
      required: true
    },
    upper: {
      type: String,
      default: null
    },
    gap: {
      type: Number,
      default: 3
    },
    emptyError: {
      type: Boolean,
      default: false,
      required: false
    },
    startTimeAfterEndTimeError: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {};
  },
  computed: {
    timeOptions() {
      // deep clone original timeList
      const times = JSON.parse(JSON.stringify(timeList));

      if (this.upper) {
        const [h, min] = this.upper.split(':');
        // 上界不包含(如果上界時間是10:00，10:00是disabled的)
        const upper = { h: parseInt(h), min: parseInt(min) };
        // 下界包含(如果下界時間是13:00，13:00不是disabled的)
        const lower = { h: parseInt(h) + this.gap, min: parseInt(min) + 1 };

        for (const time of times) {
          if (time.h < upper.h || time.h > lower.h) {
            time.isDisable = true;
          } else if (time.h === upper.h && time.min <= upper.min) {
            time.isDisable = true;
          } else if (time.h === lower.h && time.min > lower.min) {
            time.isDisable = true;
          }
        }
      }

      return times;
    },
    hasError() {
      return this.emptyError || this.startTimeAfterEndTimeError;
    }
  },
  methods: {
    selectTime(newTime) {
      this.$emit('update:time', newTime);
    }
  }
};
</script>
<style lang="scss" scoped></style>
