/**********************************************************************
 * Copyright (C) 2022 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ***********************************************************************/

import moment from 'moment';
import humanizeDuration from 'humanize-duration';
import type { VolumeInfo } from '../../../../main/src/plugin/api/volume-info';
import type { VolumeInfoUI } from './VolumeInfoUI';
import filesize from 'filesize';

export class VolumeUtils {
  getUptime(volumeInfo: VolumeInfo): string {
    if (!volumeInfo.CreatedAt) {
      return '';
    }

    // make it human friendly
    return `${this.humanizeUptime(volumeInfo.CreatedAt)} ago`;
  }

  getShortName(volumeInfo: VolumeInfo): string {
    // check if the name is 64 characters long and contains only hexa characters
    if (volumeInfo.Name.length === 64 && /^[0-9a-f]+$/.test(volumeInfo.Name)) {
      return volumeInfo.Name.substring(0, 12);
    }
    return volumeInfo.Name;
  }

  humanizeUptime(started: string): string {
    // get start time in ms
    const uptimeInMs = moment().diff(started);
    // make it human friendly
    return humanizeDuration(uptimeInMs, { round: true, largest: 1 });
  }

  getSize(volumeInfo: VolumeInfo): string {
    if (volumeInfo.UsageData?.Size) {
      return filesize(volumeInfo.UsageData?.Size, { roundingMethod: 'round' });
    }
    return '0 B';
  }

  refreshUptime(volumeInfoUI: VolumeInfoUI): string {
    if (!volumeInfoUI.created) {
      return '';
    }
    // make it human friendly
    return `${this.humanizeUptime(volumeInfoUI.created)} ago`;
  }

  getDriver(volumeInfo: VolumeInfo): string {
    return volumeInfo.Driver;
  }

  toVolumeInfoUI(volumeInfo: VolumeInfo): VolumeInfoUI {
    return {
      name: volumeInfo.Name,
      shortName: this.getShortName(volumeInfo),
      mountPoint: volumeInfo.Mountpoint,
      scope: volumeInfo.Scope,
      driver: this.getDriver(volumeInfo),
      created: volumeInfo.CreatedAt,
      humanCreationDate: this.getUptime(volumeInfo),
      humanSize: this.getSize(volumeInfo),
      engineId: volumeInfo.engineId,
      engineName: volumeInfo.engineName,
      selected: false,
      inUse: volumeInfo.UsageData?.RefCount > 0,
      containersUsage: volumeInfo.containersUsage,
    };
  }
}
