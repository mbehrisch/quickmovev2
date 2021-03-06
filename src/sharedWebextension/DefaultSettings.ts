/*!
Copyright 2018-2019 Brummolix (AutoarchiveReloaded, https://github.com/Brummolix/AutoarchiveReloaded )

 This file is part of AutoarchiveReloaded.

    AutoarchiveReloaded is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    AutoarchiveReloaded is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with AutoarchiveReloaded.  If not, see <http://www.gnu.org/licenses/>.
*/

import { AccountSettings, GlobalSettings, Settings } from '../sharedAll/interfaces';

export class DefaultSettings {
    public getDefaultAccountSettings(): AccountSettings {
        return {
            bArchiveOther: false,
            daysOther: 360,
            bArchiveMarked: false,
            daysMarked: 360,
            bArchiveTagged: false,
            daysTagged: 360,
            bArchiveUnread: false,
            daysUnread: 360,
        };
    }

    public convertPartialSettings(partialSettings: { [key: string]: any }): Settings {
        const defaultSettings: Settings = this.getDefaultSettings();
        const concatedSettings: Settings = this.deepMerge(defaultSettings, partialSettings);

        //use defaultSettings for all accounts, too
        for (const accountId in concatedSettings.accountSettings) {
            if (concatedSettings.accountSettings.hasOwnProperty(accountId)) {
                const accountSetting = concatedSettings.accountSettings[accountId];
                concatedSettings.accountSettings[accountId] = this.deepMerge(
                    this.getDefaultAccountSettings(),
                    accountSetting,
                );
            }
        }

        return concatedSettings;
    }

    /* eslint-disable */
	private deepMerge<T extends { [key: string]: any }>(defaultValues: T, valuesToMerge: { [key: string]: any }): T {
		if (valuesToMerge === undefined || valuesToMerge === null) {
			return defaultValues;
		}

		const clone: any = Object.assign({}, defaultValues);
		for (const key in valuesToMerge) {
			if (valuesToMerge.hasOwnProperty(key)) {
				const elem: any = valuesToMerge[key];
				if (elem !== undefined && elem !== null) {
					//do not use Object.keys here, as TB 64 gives keys also for strings and even numbers
					if (typeof elem !== "object") {
						clone[key] = elem;
					} else {
						clone[key] = this.deepMerge(clone[key], elem);
					}
				}
			}
		}

		return clone;
	}
	/* eslint-enable */

    private getDefaultSettings(): Settings {
        return {
            globalSettings: this.getDefaultGlobalSettings(),
            accountSettings: {},
        };
    }

    private getDefaultGlobalSettings(): GlobalSettings {
        return {
            archiveType: 'manual',
            enableInfoLogging: false,
        };
    }
}
