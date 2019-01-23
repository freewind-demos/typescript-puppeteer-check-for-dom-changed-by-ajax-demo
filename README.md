TypeScript Puppeteer Check For DOM Changed by AJAX Demo
=======================================================

In single page application or updating DOM with ajax request, in order to make sure the operation is finished,
the correct way to do is to check and wait expected DOM directly, and the wrong way is to
use `page.waitForNavigation` since there is no navigation in this case.

```
npm install -g puppeteer
npm run server
npm run demo
```

Note: since puppeteer needs to download a very huge Chrome which makes the installation quite slow,
I prefer install puppeteer globally and link it to this project before running.
