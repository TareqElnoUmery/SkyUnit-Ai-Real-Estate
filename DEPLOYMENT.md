DEPLOYMENT.md# SkyUnit AI - نشر على skyunitai.site 🚀

## 📋 خطوات النشر الكاملة

### المرحلة 1️⃣: إعدادات Railway

#### الخطوة 1: تحديث قائمة المتطلبات
```bash
# تأكد من وجود package.json مع المتطلبات التالية:
npm install next react react-dom framer-motion three @react-three/fiber @react-three/drei @react-three/postprocessing
```

#### الخطوة 2: إضافة ملف Railway.json
أضف في جذر المشروع:
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm run start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 5
  }
}
```

#### الخطوة 3: عدّل next.config.js
```javascript
// next.config.js
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['*'],
  },
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ]
      }
    ]
  }
}
```

---

### المرحلة 2️⃣: ربط الدومين skyunitai.site

#### الخطوة 1: في Railway Dashboard
1. اذهب إلى **Settings** > **Domains**
2. اضغط على **Add Custom Domain**
3. أدخل: `skyunitai.site`
4. سيظهر لك **Railway Provided Domain**

#### الخطوة 2: تحديث DNS على مزود الدومين
عند مزود الدومين (GoDaddy, NameCheap, etc):

```
اذهب إلى DNS Settings
أضف CNAME Record:
  Name: @ (أو skyunitai.site)
  Value: [Railway Domain]
  TTL: 3600

أو أضف A Record:
  Name: @
  Value: [Railway IP]
  TTL: 3600
```

#### الخطوة 3: تفعيل HTTPS
1. في Railway > Domains
2. اختر الدومين
3. فعّل **Auto HTTPS** (تلقائي عادة)
4. سينتظر Railway التحقق (عادة 5-10 دقائق)

---

### المرحلة 3️⃣: متغيرات البيئة

#### أضف في Railway > Variables:
```
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://skyunitai.site
NEXT_PUBLIC_APP_NAME=SkyUnit AI
NEXT_PUBLIC_DOMAIN=skyunitai.site
```

---

### المرحلة 4️⃣: اختبار الموقع

#### اختبر الروابط التالية:
```
✅ https://skyunitai.site
✅ https://www.skyunitai.site
✅ https://skyunitai.site/api/health (إن وجد)
```

#### تحقق من:
- [ ] تحميل الصفحة بشكل صحيح
- [ ] أيقونات ورسومات تظهر بشكل صحيح
- [ ] الحركات والـ 3D animations تعمل
- [ ] الأداء جيد (< 3 ثواني)
- [ ] SSL شهادة آمنة (🔒)
- [ ] Mobile responsive

---

### المرحلة 5️⃣: تحسينات الأداء

#### أضف صورة meta وملف robots.txt

**public/robots.txt:**
```
User-agent: *
Allow: /
Sitemap: https://skyunitai.site/sitemap.xml
Disallow: /admin
```

**أضف في app/layout.tsx:**
```tsx
export const metadata = {
  title: 'SkyUnit AI - تحليل سوق العقارات المصري',
  description: 'منصة ذكية لتحليل سوق العقارات باستخدام الذكاء الاصطناعي',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    url: 'https://skyunitai.site',
    title: 'SkyUnit AI',
    description: 'منصة ذكية لتحليل سوق العقارات',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      }
    ],
  },
}
```

---

### المرحلة 6️⃣: المراقبة والصيانة

#### في Railway Dashboard:
1. **Monitoring** - راقب الـ CPU والـ Memory
2. **Logs** - تحقق من رسائل الأخطاء
3. **Deployments** - شاهد نسخة التطبيق المنشورة

#### أوامر مفيدة:
```bash
# بناء محلي
npm run build

# اختبار محلي
npm run dev

# push للإنتاج
git push origin main
```

---

### المرحلة 7️⃣: الميزات الإضافية

#### 1. إعادة التوجيه من www
إضافة redirect في next.config.js:
```javascript
async redirects() {
  return [
    {
      source: '/:path*',
      destination: 'https://skyunitai.site/:path*',
      permanent: true,
    },
  ]
}
```

#### 2. صيانة مجدولة
أضف cron job في Railway (اختياري):
```yaml
schedules:
  - name: health-check
    cron: '0 * * * *'  # كل ساعة
    command: 'curl https://skyunitai.site/api/health'
```

#### 3. CDN و صور محسّنة
```tsx
import Image from 'next/image'

// استخدم Next.js Image Optimization
<Image
  src="/logo.png"
  alt="SkyUnit"
  width={300}
  height={300}
  priority
/>
```

---

## 📊 قائمة تحقق النشر

- [ ] تحديث package.json مع جميع المتطلبات
- [ ] إنشاء Railway account
- [ ] ربط GitHub repo بـ Railway
- [ ] إضافة custom domain skyunitai.site
- [ ] تحديث DNS على مزود الدومين
- [ ] فعيل HTTPS/SSL
- [ ] اختبار الموقع على الدومين الجديد
- [ ] أضف robots.txt و sitemap.xml
- [ ] قم بـ SEO optimization
- [ ] راقب الـ logs والـ errors
- [ ] ضع خطة صيانة دورية

---

## 🆘 استكشاف الأخطاء

### المشكلة: الدومين لا يعمل بعد 30 دقيقة
**الحل:**
- تحقق من DNS settings
- انتظر 24-48 ساعة لانتشار DNS
- جرب: `nslookup skyunitai.site`

### المشكلة: الصور/الرسوميات لا تظهر
**الحل:**
- تأكد من وجود الملفات في public/
- تحقق من الـ paths في الكود
- امسح الـ cache: `Ctrl+Shift+Delete`

### المشكلة: الموقع بطيء
**الحل:**
- فعّل caching: `Cache-Control: public, max-age=3600`
- استخدم Image Optimization
- قلل حجم الـ 3D models

---

**آخر تحديث:** December 2025
**الحالة:** ✅ جاهز للنشر
