import {unzip} from 'react-native-zip-archive';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import {ItemType} from './types';

export const ZIP_EXTRACT_DIR = RNFS.CachesDirectoryPath + '/zip_contents';

export async function downloadZip(url: string): Promise<string> {
  const result = await RNFetchBlob.config({
    fileCache: true,
  }).fetch(
    'GET',
    url,
    // 'https://github.com/jacdebug/aab1fa/archive/refs/heads/master.zip',
  );

  return result.path();
}

export async function extract(zipFilePath: string, to: string) {
  await unzip(zipFilePath, to);
}

export async function getRepo(zipExtractDir: string) {
  const files = await RNFS.readDir(zipExtractDir);

  // support only git zip format and must constain top level dir
  if (files?.[0]?.isDirectory() == false) {
    throw new Error('Zip not supported');
  }

  return {
    name: files?.[0]?.name,
    path: files?.[0]?.path,
  };
}

export async function getSites(repo: string) {
  const entries = await RNFS.readDir(repo);
  const sites = [];

  for (const entry of entries) {
    const {name, path} = entry;
    const isDir = entry.isDirectory();
    const isSkipped = path.endsWith('/hooks') || path.endsWith('/info');

    if (isDir && !isSkipped) {
      sites.push({
        name,
        path,
      });
    }
  }

  return sites;
}

export async function getSiteSections(site: string) {
  const entries = await RNFS.readDir(site);
  const sections = [];

  for (const entry of entries) {
    const {name, path} = entry;
    const isDir = entry.isDirectory();

    if (isDir) {
      sections.push({
        name,
        path,
      });
    }
  }

  return sections;
}

export async function getLogins(section: string) {
  const entries = await RNFS.readDir(section);
  const logins = [];

  for (const entry of entries) {
    const {name, path} = entry;
    const isFile = entry.isFile();

    if (isFile) {
      logins.push({
        name,
        path,
      });
    }
  }

  return logins;
}

export function addItemKey(list: ItemType[]) {
  return Array(30) // extra items for testing scrolling
    .fill(0)
    .flatMap(_ => list)
    .map((e, i) => ({
      ...e,
      name: e.name + ' ' + i,
      key: i,
    }));
}

// async function temp() {
// const path = await downloadZip();
// await extract(path, ZIP_EXTRACT_DIR);
// const repo = await getRepo(ZIP_EXTRACT_DIR);
// const sites = await getSites(repo.path);
// const sections = await getSiteSections(sites[0].path);
// const logins = await getLogins(sections[0].path);
// console.log({logins});
// const rawContent = await RNFS.readFile(logins[0].path, 'base64');
// let decrypted;
// try {
//   decrypted = await OpenPGP.decrypt(rawContent, privateKey, passphrase);
// } catch (e) {
//   console.log(e);
// }
// console.log(logins, decrypted);
//   }
