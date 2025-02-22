import { defaultEnvVars } from "../shared/constants";

function setDefaultEnvVars(defaults: { [key: string]: string }): void {
  for (const key in defaults) {
    if (defaults.hasOwnProperty(key)) {
      // 如果环境变量不存在或为空，则设置为默认值
      if (!process.env[key] || process.env[key] === '') {
        process.env[key] = defaults[key];
      }
    }
  }
}

export function ensureEnvVariables() {
  setDefaultEnvVars(defaultEnvVars);
}
