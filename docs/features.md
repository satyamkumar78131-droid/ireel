# Feature scope

## Abhi (phase 1)

| Feature | Backend | Frontend |
|---|---|---|
| Video list | `backend/src/videos` | `pages/Home.jsx` |
| Video watching (streaming) | `videos/routes.js` (Range support) | `components/VideoPlayer.jsx` |
| Watch progress | `library/routes.js` (`PUT /progress/:id`) | VideoPlayer resume + save |
| Continue Watching | `GET /api/library/continue-watching` | Home section |
| Saved Collections | `library/routes.js` (`/collections`) | Saved page (baad me) |
| Dark / Light mode | - | `theme/ThemeContext.jsx`, `index.css` |

## Baad me (phase 2+)

- Auth aur user accounts
- Video upload aur processing
- Autoplay settings
- Data saver (low-bitrate quality)
- Content recommendations
- Parental / restricted content controls
- Community guidelines aur reporting
- Admin dashboard
- Video download (authorized offline viewing)
- Creator monetization