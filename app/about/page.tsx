'use client';

export default function AboutPage() {
  return (
    <div dir="rtl" style={{background: '#0a0e27', color: '#e8f4f8', minHeight: '100vh', padding: '2rem 0'}}>
      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'}}>
        <h1 style={{fontSize: '2.5rem', marginBottom: '1rem', color: '#4dbfe8'}}>من نحن</h1>
        <p style={{fontSize: '1.1rem', marginBottom: '2rem'}}>SkyUnit AI - منصة تحليل ذكية لسوق العقارات المصري</p>
        <p>نحن نستخدم الذكاء الاصطناعي والتحليل المتقدم لتقديم رؤى حقيقية عن سوق العقارات المصري.</p>
      </div>
    </div>
  );
}
