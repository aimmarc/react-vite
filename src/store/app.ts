import { useState } from 'react';
import { createGlobalStore } from 'hox';
import settings from '@/settings.json';
import { StorageConst } from '@/common/constant/storage';
import { ThemeMode } from '@/common/enums/theme';

export interface IAppStore {
	settings: Record<string, any>;
	darkMode: boolean;
}

export const [useAppStore, getAppStore] = createGlobalStore(() => {
	const [appStore, setAppStore] = useState<IAppStore>({
		settings,
		darkMode:
			localStorage.getItem(StorageConst.ARCO_THEME) === ThemeMode.DARK,
	});

	function setDarkMode(isDarkMode = false) {
		localStorage.setItem(
			StorageConst.ARCO_THEME,
			isDarkMode ? ThemeMode.DARK : ThemeMode.LIGHT
		);
		setAppStore({
			...appStore,
			darkMode: isDarkMode,
		});
	}

	return {
		appStore,
		setAppStore,
		setDarkMode,
	};
});
