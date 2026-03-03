/**
 * set-env.js
 * Runs before `ng build` on Vercel (and any CI/CD).
 * Reads SUPABASE_URL and SUPABASE_ANON_KEY from process.env
 * and writes the real values into environment.prod.ts so they
 * get compiled into the production bundle.
 */

const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'src', 'environments', 'environment.prod.ts');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const resendApiKey = process.env.RESEND_API_KEY || '';

if (!supabaseUrl) {
  console.error('\n[set-env] ERROR: SUPABASE_URL environment variable is not set.\n');
  process.exit(1);
}

if (!supabaseAnonKey) {
  console.error('\n[set-env] ERROR: SUPABASE_ANON_KEY environment variable is not set.\n');
  process.exit(1);
}

const content = `export const environment = {
  production: true,
  supabaseUrl: '${supabaseUrl}',
  supabaseAnonKey: '${supabaseAnonKey}',
  resendApiKey: '${resendApiKey}',
};
`;

fs.writeFileSync(targetPath, content, { encoding: 'utf8' });
console.log('[set-env] environment.prod.ts written successfully.');
