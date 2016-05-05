/* eslint no-irregular-whitespace: 0 */
import {removeTrackingImagesFromBody} from '../lib/main';

const testBody = `
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"><p>Hey Ben,</p><p>
I've noticed that we don't yet have an SLA in place with&nbsp;Nylas. Are you the right
person to be speaking with to make sure everything is set up on that end? If not,
could you please put me in touch with them, so that we can get you guys set up
correctly as soon as possible?</p><p>Thanks!</p><p>Gleb Polyakov</p><p>Head of
Business Development and Growth</p><img src="https://sdr.salesloft.com/email_trackers/8c8bea88-af43-4f66-bf78-a97ad73d7aec/open.gif" alt="" width="1" height="1">After Pixel

<br><br><signature>Sent from <a href="https://nylas.com/n1?ref=n1">Nylas N1</a>, the extensible, open source mail client.<br/></signature><div class="gmail_quote">
  On Apr 28 2016, at 2:14 pm, Ben Gotow (Careless) &lt;careless@foundry376.com&gt; wrote:
  <br>
  <blockquote class="gmail_quote"
    style="margin:0 0 0 .8ex;border-left:1px #ccc solid;padding-left:1ex;">
    <body>nother mailA<br /><br />Sent from <a href="https://link.nylas.com/link/b5djvgcuhj6i3x8nm53d0vnjm/local-a84ad76e-006b/0?redirect=https%3A%2F%2Fnylas.com%2Fn1%3Fref%3Dn1">Nylas N1</a>, the extensible, open source mail client.<br /><img width="0" height="0" style="border:0; width:0; height:0;" src="https://link.nylas.com/open/b5djvgcuhj6i3x8nm53d0vnjm/local-a84ad76e-006b" /><div>
  On Apr 28 2016, at 1:46 pm, Ben Gotow (Careless) &lt;careless@foundry376.com&gt; wrote:
  <br />
  <blockquote style="margin:0 0 0 .8ex;border-left:1px #ccc solid;padding-left:1ex;">
    Hi Ben this is just a test.<br /><br />Sent from <a href="https://link.nylas.com/link/b5djvgcuhj6i3x8nm53d0vnjm/local-aa39d95b-b883/0?redirect=https%3A%2F%2Fnylas.com%2Fn1%3Fref%3Dn1">Nylas N1</a>, the extensible, open source mail client.<br /><img width="0" height="0" style="border:0; width:0; height:0;" src="https://link.nylas.com/open/b5djvgcuhj6i3x8nm53d0vnjm/local-aa39d95b-b883" /><div>
  On Apr 26 2016, at 6:03 pm, Ben Gotow &lt;bengotow@gmail.com&gt; wrote:
  <br />
  <blockquote style="margin:0 0 0 .8ex;border-left:1px #ccc solid;padding-left:1ex;">
    <p>To test this, send https://www.google.com/search?q=test@example.com to yourself from a client that allows plaintext or html editing.</p>
<p><br />Ben Gotow<br />-----------------------------------<br /><a href="http://www.foundry376.com/">http://www.foundry376.com/</a><br />bengotow@gmail.com<br />540-250-2334</p>
  </blockquote>
</div>
  </blockquote>
</div></body>
  </blockquote>
</div>
`
const testBodyProcessed = `
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"><p>Hey Ben,</p><p>
I've noticed that we don't yet have an SLA in place with&nbsp;Nylas. Are you the right
person to be speaking with to make sure everything is set up on that end? If not,
could you please put me in touch with them, so that we can get you guys set up
correctly as soon as possible?</p><p>Thanks!</p><p>Gleb Polyakov</p><p>Head of
Business Development and Growth</p>After Pixel

<br><br><signature>Sent from <a href="https://nylas.com/n1?ref=n1">Nylas N1</a>, the extensible, open source mail client.<br/></signature><div class="gmail_quote">
  On Apr 28 2016, at 2:14 pm, Ben Gotow (Careless) &lt;careless@foundry376.com&gt; wrote:
  <br>
  <blockquote class="gmail_quote"
    style="margin:0 0 0 .8ex;border-left:1px #ccc solid;padding-left:1ex;">
    <body>nother mailA<br /><br />Sent from <a href="https://link.nylas.com/link/b5djvgcuhj6i3x8nm53d0vnjm/local-a84ad76e-006b/0?redirect=https%3A%2F%2Fnylas.com%2Fn1%3Fref%3Dn1">Nylas N1</a>, the extensible, open source mail client.<br /><div>
  On Apr 28 2016, at 1:46 pm, Ben Gotow (Careless) &lt;careless@foundry376.com&gt; wrote:
  <br />
  <blockquote style="margin:0 0 0 .8ex;border-left:1px #ccc solid;padding-left:1ex;">
    Hi Ben this is just a test.<br /><br />Sent from <a href="https://link.nylas.com/link/b5djvgcuhj6i3x8nm53d0vnjm/local-aa39d95b-b883/0?redirect=https%3A%2F%2Fnylas.com%2Fn1%3Fref%3Dn1">Nylas N1</a>, the extensible, open source mail client.<br /><div>
  On Apr 26 2016, at 6:03 pm, Ben Gotow &lt;bengotow@gmail.com&gt; wrote:
  <br />
  <blockquote style="margin:0 0 0 .8ex;border-left:1px #ccc solid;padding-left:1ex;">
    <p>To test this, send https://www.google.com/search?q=test@example.com to yourself from a client that allows plaintext or html editing.</p>
<p><br />Ben Gotow<br />-----------------------------------<br /><a href="http://www.foundry376.com/">http://www.foundry376.com/</a><br />bengotow@gmail.com<br />540-250-2334</p>
  </blockquote>
</div>
  </blockquote>
</div></body>
  </blockquote>
</div>
`

describe("TrackingPixelsExtension", () => {
  it("should splice tracking pixels", () => {
    expect(removeTrackingImagesFromBody(testBody)).toEqual(testBodyProcessed);
  });
});
