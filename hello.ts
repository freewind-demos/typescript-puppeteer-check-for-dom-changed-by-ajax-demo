import * as puppeteer from 'puppeteer';
import {Page} from "puppeteer";

async function correctWayToClickAndCheck(page: Page) {
  console.log('---------- correctWayToClickAndCheck ---------')
  await page.goto("http://localhost:8989/index.html");

  await page.click('#button');
  await page.waitForFunction(() => {
    const data = document.querySelector('#data');
    return data && data.innerHTML.length > 0;
  })
}

async function wrongWayToUseNetworkIdle2(page: Page) {
  console.log('---------- wrongWayToUseNetworkIdle2 --------------');
  await page.goto("http://localhost:8989/index.html");

  await Promise.all([
    page.click('#button'),
    page.waitForNavigation({waitUntil: 'networkidle2'}),
  ])
}

async function wrongWayToUseDomContentLoaded(page: Page) {
  console.log('---------- wrongWayToUseDomContentLoaded --------------');
  await page.goto("http://localhost:8989/index.html");

  await Promise.all([
    page.click('#button'),
    page.waitForNavigation({waitUntil: 'domcontentloaded'}),
  ])
}

async function wrongWayToUseLoad(page: Page) {
  console.log('---------- wrongWayToUseLoad --------------');
  await page.goto("http://localhost:8989/index.html");

  await Promise.all([
    page.click('#button'),
    page.waitForNavigation({waitUntil: 'load'}),
  ])
}


async function run() {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.setDefaultNavigationTimeout(2000);

  await correctWayToClickAndCheck(page);

  try {
    await wrongWayToUseDomContentLoaded(page);
  } catch (e) {
    console.log('Expect error thrown:')
    console.error(e);
  }

  try {
    await wrongWayToUseNetworkIdle2(page);
  } catch (e) {
    console.log('Expect error thrown:')
    console.error(e);
  }

  try {
    await wrongWayToUseLoad(page);
  } catch (e) {
    console.log('Expect error thrown:')
    console.error(e);
  }

  await browser.close();
}

run();
