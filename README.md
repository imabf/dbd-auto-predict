# Auto-Predict validation site

A static waitlist page to test whether Dead by Daylight streamers want an auto-resolving Twitch Prediction tool. **The product is not built.** No framework, no build step, no secrets in the repo.

## Files

- `index.html`, `style.css`, `app.js`: the page
- `favicon.svg`, `og-image.svg`, `og-image.png`: icon and share image (original shapes only)
- `outreach/`: Reddit post, streamer DMs, Discord message, tracking CSV

## Setup (you do this)

### 1. Connect the form (Formspree, free)
1. Go to formspree.io and sign up (free plan).
2. Click **New form**, name it "Auto-Predict waitlist", and set the notification email to the address you want.
3. Copy the form URL, which looks like `https://formspree.io/f/abcdwxyz`.
4. Open `app.js` and paste it into `CONFIG.formEndpoint`. It's a public URL, safe to commit.
5. In Formspree, under the form's **Settings**, enable the reCAPTCHA/spam filtering if you like. A honeypot field is already in the page.
6. Submit a test signup from the live page and check it lands in the Formspree **Submissions** tab.

Deletion requests use the same endpoint. They arrive with subject "DELETION REQUEST" and `request=delete`. When one arrives, delete that email's submissions in Formspree and reply to confirm.

### 2. Analytics (GoatCounter, free, no cookies)
1. Sign up at goatcounter.com and choose a site code, for example `autopredict`.
2. Put that code in `CONFIG.goatcounter` in `app.js`.
3. Visits show as page views. Signups appear under **Events** as `waitlist-signup`, and deletion requests as `waitlist-delete-request`. Compare visits against `waitlist-signup`.

### 3. Deploy to GitHub Pages
1. Create a new public GitHub repo and push this branch (merge it into `main` first).
2. Repo **Settings > Pages**, then source **Deploy from a branch**, branch `main`, folder `/ (root)`.
3. Wait a minute for the URL `https://YOUR-USERNAME.github.io/REPO/`.
4. In `index.html`, replace `YOUR-USERNAME/REPO` in the `og:image`, `og:url` and `twitter:image` tags with the real URL, then push again.
5. Check the share preview with a link-preview tool or by pasting the URL into Discord.

Nothing has been pushed or published yet.

## Decision rule

Run it for 7 days after you start outreach.

- **20+ real signups, or 5+ streamers saying they would try it:** build it.
- **Under 5 signups after 7 days:** stop.
- In between: your call. Talk to the people who replied and find out why they weren't more excited.

Count only real people. Your own test signups, friends doing you a favour and bots don't count. Log every outreach contact in `outreach/tracking.csv`.

## Phase 3 (feasibility spike)

Not started. It needs real screenshots of the DBD results screen (escaped / died / sacrificed, at a few resolutions and UI scales). Send those and the OpenCV/OCR test script will be built against them. Without real frames nothing can be claimed to work.

## Notes

- Commits use a placeholder git identity, so your personal email isn't in the history. Set your own `git config user.name/user.email` before further commits if you want credit.
- The footer disclaimer and the "in development" labels are required. Don't remove them.
