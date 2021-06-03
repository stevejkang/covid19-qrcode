import puppeteer from 'puppeteer';

export interface INaverCredential {
  id: string;
  password: string;
}

export interface IQrResult {
  isSuccess: boolean;
  result: string;
}

const MOBILE_VERIFICATION_REQUIRED = '네이버 휴대전화 인증';
const POLICY_AGREEMENT_REQUIRED = '집합시설 출입을 위한 QR 체크인';

export async function getQrCode(
  credential: INaverCredential,
 ): Promise<IQrResult> {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();

  const { id, password } = credential;

  await page.goto('https://nid.naver.com/nidlogin.login');

  await page.evaluate((id: string, password: string) => {
    (<HTMLInputElement>document.querySelector('#id')).value = id;
    (<HTMLInputElement>document.querySelector('#pw')).value = password;
  }, id, password);

  await page.click('.btn_global');
  await page.waitForNavigation();

  // TODO: Login Exception (incorrect password or captcha)

  await page.goto('https://nid.naver.com/login/privacyQR?term=on');

  const actionRequiredTextElement = await page.$("#content > .top_copy > .title");
  if (actionRequiredTextElement) {
    const actionRequiredText = await page.evaluate(element => element.textContent, actionRequiredTextElement);
    if (actionRequiredText === POLICY_AGREEMENT_REQUIRED) {
      await page.evaluate(() => {
        (<HTMLInputElement>document.getElementById('check1')).click();
        (<HTMLButtonElement>document.getElementById('done')).click();
      });
      await page.waitForNavigation();
    } else if (actionRequiredText === MOBILE_VERIFICATION_REQUIRED) {
      return {
        isSuccess: false,
        result: 'Mobile Verification Is Required. Check Via Browser.',
      };
    }
  }

  await page.waitForSelector('#qrImage');
  const qrImageElement = await page.$('#qrImage');

  const qrImage = qrImageElement ? await qrImageElement.screenshot({ encoding: "base64" }) : null;

  return {
    isSuccess: !!qrImage,
    result: !!qrImage ? qrImage : 'Unknown Error',
  };
}
