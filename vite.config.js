import vue from '@vitejs/plugin-vue2';
import path from 'path';
import EnvironmentPlugin from 'vite-plugin-environment';

export default {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [
    vue(),
    // ref: https://github.com/vuelidate/vuelidate/issues/1109
    EnvironmentPlugin({
      BUILD: 'web'
    })
  ]
};
