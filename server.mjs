import { createServer } from 'http';
import next from 'next';
import dotenv from 'dotenv';

import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config();

// Auto-sync generated images to public folder
const imageMappings = [
  { src: 'C:\\Users\\welcome\\.gemini\\antigravity-ide\\brain\\08428e18-fe4a-48f9-9da2-fc4b02292b30\\about_hero_bg_1784807409708.png', dest: 'public/about-hero-bg.png' },
  { src: 'C:\\Users\\welcome\\.gemini\\antigravity-ide\\brain\\08428e18-fe4a-48f9-9da2-fc4b02292b30\\services_hero_bg_1784807420837.png', dest: 'public/services-hero-bg.png' },
  { src: 'C:\\Users\\welcome\\.gemini\\antigravity-ide\\brain\\08428e18-fe4a-48f9-9da2-fc4b02292b30\\contact_hero_bg_1784807432854.png', dest: 'public/contact-hero-bg.png' },
  { src: 'C:\\Users\\welcome\\.gemini\\antigravity-ide\\brain\\08428e18-fe4a-48f9-9da2-fc4b02292b30\\hero_bg_1_1784807445040.png', dest: 'public/hero-bg-1.png' },
  { src: 'C:\\Users\\welcome\\.gemini\\antigravity-ide\\brain\\08428e18-fe4a-48f9-9da2-fc4b02292b30\\hero_bg_2_1784807456220.png', dest: 'public/hero-bg-2.png' },
  { src: 'C:\\Users\\welcome\\.gemini\\antigravity-ide\\brain\\08428e18-fe4a-48f9-9da2-fc4b02292b30\\hero_bg_3_1784807467076.png', dest: 'public/hero-bg-3.png' },
];

for (const m of imageMappings) {
  try {
    if (fs.existsSync(m.src)) {
      fs.copyFileSync(m.src, path.resolve(m.dest));
    }
  } catch (e) {}
}

const port = process.env.PORT || 7016;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        createServer(async (req, res) => {
            if (req.url.startsWith("/api/auth/")) {
                return handle(req, res);
            }
            handle(req, res);
        }).listen(port, (err) => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('Error starting server:', err);
        process.exit(1);
    });
