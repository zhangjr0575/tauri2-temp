/**
 * 软件更新
 */
import { check } from '@tauri-apps/plugin-updater';
export { relaunch } from '@tauri-apps/plugin-process';

const PLATFORM = window.__TAURI_OS_PLUGIN_INTERNALS__ ? window.__TAURI_OS_PLUGIN_INTERNALS__.platform : 'web';

/**
 * 比较两个版本号, 不支持非数字版本号
 * @param {string} v1 版本号1
 * @param {string} v2 版本号2
 * 
 * @returns { 0 | -1 | 1 } 0表示版本号相同, -1表示v1 < v2, 1表示v1 > v2
 */
export function compareVersion(v1, v2) {
    const _v1 = v1.split("."), _v2 = v2.split("."), length = Math.max(_v1.length, _v2.length);

    for (let i = 0; i < length; i++) {
        const _num1 = Number(_v1[i] || 0), _num2 = Number(_v2[i] || 0);

        if (_num1 < _num2) return -1;
        if (_num1 > _num2) return 1;
    }
    return 0;
}

/**
 * 检查是否有最新版本
 * 
 * @returns {Promise<void | string>}
 */
export async function checkUpdate() {
    if (PLATFORM == "web") throw TypeError('Currently, the web platform is not supported');

    const update = await check();

    if (update && compareVersion(update.currentVersion, update.version) == -1) {
        window.__TAURI_UPDATE = update;

        return update.version;
    }
}

/**
 * 安装更新, 
 * 
 * @param {(info: {total: Number; downloaded: Number; progress: Number}) => void} progressCallback 安装进度回调函数
 * @returns {Promise<void>}
 */
export async function installUpdate(progressCallback) {
    if (PLATFORM == "web") throw TypeError('Currently, the web platform is not supported');

    if (!window.__TAURI_UPDATE) throw TypeError('Please call checkUpdate first and then use it');

    const info = { total: 0, downloaded: 0, progress: 0 };

    return new Promise((resolve, reject) => {
        window.__TAURI_UPDATE.downloadAndInstall(({ event, data }) => {
            switch (event) {
                case 'Started':
                    info.total = data.contentLength || 0;
                    break;
                case 'Progress':
                    info.downloaded += data.chunkLength;
                    info.progress = Math.min(100, Math.round((info.downloaded / info.total) * 100));

                    typeof progressCallback === "function" && progressCallback(info);
                    break;
                case 'Finished':
                    info.progress = 100;
                    info.downloaded = info.total;

                    typeof progressCallback === "function" && progressCallback(info);
                    resolve();
                    break;
            }
        }).catch(reject);
    });
}