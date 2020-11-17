<a href="https://github.com/stevejkang/covid19-qrcode"><img src="https://raw.githubusercontent.com/stevejkang/emoji-for-readme/master/emoji/face-with-medical-mask.png" align="right" width="90" height="90" /></a>

# covid19-qrcode

  Get a temporary QR-code, which to use to entrance public facilities using the NAVER QR-CheckIn service.    
  집합시설 출입을 위한 대한민국 전자출입명부 QR 체크인에 사용되는 QR 이미지를 빠르게 추출합니다.

  [![Last Commit](https://img.shields.io/github/last-commit/stevejkang/covid19-qrcode.svg)](https://github.com/stevejkang/covid19-qrcode/commits)

  <details>
  <summary><b>📌 IMPORTANT NOTICE</b></summary>

  ```
  이 프로젝트는 네이버에서 제공하는 "집합시설 출입을 위한 QR 체크인 기능"을 이용하였습니다. 
  네이버와 무관한 프로젝트로 언제든 지원이 중단될 수 있습니다. 
  개인적으로 집합시설 이용시 오랜 조작 등으로 생기는 불편함을 느껴 이를 간소화하고자 만들게 된 프로젝트입니다. 
  다양한 방향으로의 악용을 막고자 코드상으로 API 호출할 수 있는 형태로 제작했음에도, 
  누구나 사용할 수 있는 주소(서비스)를 제공하는 것이 아닌 오픈소스로만 공유하며, 
  사용함에 있어 모든 책임은 전적으로 사용하는 개인에 있습니다. 

  * 이 프로젝트는, 최초에 네이버 QR 체크인 단계 중 하나인 "개인정보 수집 및 제공에 동의" 과정을 
  headless로 생략하고 동의한 것으로 간주합니다. 

  * 이 프로젝트는 2FA, 혹은 기타 로그인을 검증하기 위한 수단을 사용하거나 필요로하는 경우 
  예상치 못한 오류가 발생할 수 있습니다. 
  ```
  </details>

---

## How To Use?

  1. `app/controllers/qr.controllers.ts`에서 `YOUR_ID`와 `YOUR_PASSWORD`를 본인의 설정에 맞춰 업데이트합니다.
  ```ts
  // ...
  router.get('/', (request: Request, response: Response) => {
    getQrCode({
      id: 'YOUR_ID',
      password: 'YOUR_PASSWORD'
    }).then((qrCodeResult) => {
  // ...    
  ```

  2. `npm run build`로 실행합니다. 이때 해당 서버로 외부에서 접속이 가능해야하며, 포트는 `3000`이 기본 값입니다. 상황에 따라 [pm2](https://www.npmjs.com/package/pm2), [forever](https://www.npmjs.com/package/forever)를 사용하여 실행할 수 있습니다.
  ```bash
  $ npm i
  $ npm run build
  ```

  3. `<YOUR_HOST>:3000/qr`을 iOS Shotcuts 앱에 등록합니다. (템플릿으로 [바로 시작하기](https://www.icloud.com/shortcuts/dd2a9958597b4a6095dce4ac4e0247f7))

  <img src="https://imgur.com/bf7nfmO.png" width="224" height="480"/><br/>

  iOS 14부터 지원하는 위젯으로 만들어 사용하면 아래처럼 홈 화면에서 바로 QR 코드를 얻을 수 있습니다.

  ![Giphy](https://media.giphy.com/media/Pij6wCRRInlq0dMOGQ/giphy.gif)

## Troubleshooting

- `...chrome-linux/chrome: error while loading shared libraries: xxxxxxx.so: cannot open shared object file: No such file or directory` on AWS EC2 ubuntu

  ```bash
  $ sudo apt-get install gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm-dev libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
  ```
  Reference [here](https://techoverflow.net/2018/06/05/how-to-fix-puppetteer-error-while-loading-shared-libraries-libx11-xcb-so-1-cannot-open-shared-object-file-no-such-file-or-directory/)

## License

  MIT

## Author

  stevejkang <iam@juneyoung.io>

> [![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fstevejkang%2Fcovid19-qrcode)](https://github.com/stevejkang/covid19-qrcode)
