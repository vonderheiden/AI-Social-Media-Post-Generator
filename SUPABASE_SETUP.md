# Supabase Configuration for Testing

## Disable Email Confirmation (For Testing Only)

To allow users to sign up without email confirmation:

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/pkibhlyvjtzikvyjmrdm
2. Navigate to **Authentication** → **Providers** → **Email**
3. Scroll down to **Email Confirmation**
4. **Uncheck** "Enable email confirmations"
5. Click **Save**

## Alternative: Use Auto-Confirm for Testing

Or you can enable auto-confirm:

1. Go to **Authentication** → **Settings**
2. Under **Email Auth**, enable "Confirm email" = OFF

## Check Site URL

Make sure your site URL is configured:

1. Go to **Authentication** → **URL Configuration**
2. Add your Render URL: `https://ai-social-media-post-generator-tpwg.onrender.com`
3. Add to **Redirect URLs**: `https://ai-social-media-post-generator-tpwg.onrender.com/**`

## Current Status

- ✓ Supabase project created
- ✓ Auth tables configured
- ⚠️ Email confirmation needs to be disabled for testing
- ⚠️ Site URL needs to be added
