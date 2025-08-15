import { configs as tsConfigs } from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';


export default [
  ...tsConfigs.recommended,
  ...reactPlugin.configs.recommended,
  // Add more plugins/configs as needed
];
