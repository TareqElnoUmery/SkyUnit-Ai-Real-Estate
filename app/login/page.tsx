'use client';

export default function LoginPage() {
  return (
    <div dir="rtl" style={{background: '#0a0e27', color: '#e8f4f8', minHeight: '100vh', padding: '2rem 0', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{maxWidth: '400px', padding: '2rem', border: '1px solid #4dbfe8', borderRadius: '8px'}}>
        <h1 style={{fontSize: '1.8rem', marginBottom: '2rem', color: '#4dbfe8', textAlign: 'center'}}تسجيل دخول</h1>
        <form style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <input type="email" placeholder="البريد الإلكتروني" style={{padding: '0.75rem', background: '#1a1e3f', border: '1px solid #4dbfe8', color: '#e8f4f8'}} />
          <input type="password" placeholder="كلمة المرور" style={{padding: '0.75rem', background: '#1a1e3f', border: '1px solid #4dbfe8', color: '#e8f4f8'}} />
          <button type="submit" style={{padding: '0.75rem', background: '#4dbfe8', color: '#0a0e27', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer'}}دخول</button>
        </form>
      </div>
    </div>
  );
}
