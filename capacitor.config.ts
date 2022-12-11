/// <reference types="@capacitor/local-notifications" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'b3.network.kiko.kikotalk',
  appName: 'KikoTalk',
  webDir: 'www',
  bundledWebRuntime: false,
	plugins: {
		LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF"
    },
	}
};

export default config;
