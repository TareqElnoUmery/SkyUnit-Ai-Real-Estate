'use client';

export default function ProjectsPage() {
  return (
    <div dir="rtl" style={{background: '#0a0e27', color: '#e8f4f8', minHeight: '100vh', padding: '2rem 0'}}>
      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'}}>
        <div style={{
          background: 'linear-gradient(135deg, #0a3f5e 0%, #2b9fd9 100%)',
          padding: '3rem 0',
          marginBottom: '2rem',
          textAlign: 'center',
          borderRadius: '12px'
        }}>
          <h1 style={{fontSize: '2.5rem', color: 'white', marginBottom: '0.5rem'}}>مشاريع مصر العقارية</h1>
          <p style={{fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)'}}>اطلع على أفضل الوحدات السكنية</p>
        </div>

        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          background: 'linear-gradient(135deg, rgba(11, 91, 168, 0.1), rgba(43, 159, 217, 0.1))',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid rgba(43, 159, 217, 0.5)',
          marginTop: '2rem'
        }}>
          <thead style={{ background: '#0b5ba8' }}>
            <tr>
              <th style={{color: 'white', padding: '1rem', textAlign: 'right', fontWeight: 'bold'}}>المشروع</th>
              <th style={{color: 'white', padding: '1rem', textAlign: 'right', fontWeight: 'bold'}}>المساحة</th>
              <th style={{color: 'white', padding: '1rem', textAlign: 'right', fontWeight: 'bold'}}>الغرف</th>
              <th style={{color: 'white', padding: '1rem', textAlign: 'right', fontWeight: 'bold'}}>الحمامات</th>
              <th style={{color: 'white', padding: '1rem', textAlign: 'right', fontWeight: 'bold'}}>السعر (ج.م)</th>
              <th style={{color: 'white', padding: '1rem', textAlign: 'right', fontWeight: 'bold'}}>الجدية (ج.م)</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{background: 'rgba(43, 159, 217, 0.05)'}}>
              <td style={{padding: '1rem', borderBottom: '1px solid rgba(43, 159, 217, 0.3)', color: '#4dbfe8', fontWeight: '600'}}>مشروع روضة العبور</td>
              <td style={{padding: '1rem', borderBottom: '1px solid rgba(43, 159, 217, 0.3)'}}>102 - 111</td>
              <td style={{padding: '1rem', borderBottom: '1px solid rgba(43, 159, 217, 0.3)'}}>3 - 3</td>
              <td style={{padding: '1rem', borderBottom: '1px solid rgba(43, 159, 217, 0.3)'}}>1 - 1</td>
              <td style={{padding: '1rem', borderBottom: '1px solid rgba(43, 159, 217, 0.3)', fontWeight: 'bold', color: '#2b9fd9'}}>1,244,400</td>
              <td style={{padding: '1rem', borderBottom: '1px solid rgba(43, 159, 217, 0.3)'}}>150,000</td>
            </tr>
            <tr>
              <td style={{padding: '1rem', borderBottom: '1px solid rgba(43, 159, 217, 0.3)', color: '#4dbfe8', fontWeight: '600'}}>مشروع الاسكان الحر (السويس)</td>
              <td style={{padding: '1rem', borderBottom: '1px solid rgba(43, 159, 217, 0.3)'}}>90 - 90</td>
              <td style={{padding: '1rem', borderBottom: '1px solid rgba(43, 159, 217, 0.3)'}}>3 - 3</td>
              <td style={{padding: '1rem', borderBottom: '1px solid rgba(43, 159, 217, 0.3)'}}>1 - 1</td>
              <td style={{padding: '1rem', borderBottom: '1px solid rgba(43, 159, 217, 0.3)', fontWeight: 'bold', color: '#2b9fd9'}}>1,089,000</td>
              <td style={{padding: '1rem', borderBottom: '1px solid rgba(43, 159, 217, 0.3)'}}>150,000</td>
            </tr>
            <tr style={{background: 'rgba(43, 159, 217, 0.05)'}}>
              <td style={{padding: '1rem', borderBottom: '1px solid rgba(43, 159, 217, 0.3)', color: '#4dbfe8', fontWeight: '600'}}>مشروع ظلال</td>
              <td style={{padding: '1rem', borderBottom: '1px solid rgba(43, 159, 217, 0.3)'}}>114 - 227</td>
              <td style={{padding: '1rem', borderBottom: '1px solid rgba(43, 159, 217, 0.3)'}}>2 - 3</td>
              <td style={{padding: '1rem', borderBottom: '1px solid rgba(43, 159, 217, 0.3)'}}>2 - 2</td>
              <td style={{padding: '1rem', borderBottom: '1px solid rgba(43, 159, 217, 0.3)', fontWeight: 'bold', color: '#2b9fd9'}}>3,066,600</td>
              <td style={{padding: '1rem', borderBottom: '1px solid rgba(43, 159, 217, 0.3)'}}>250,000</td>
            </tr>
            <tr>
              <td style={{padding: '1rem', color: '#4dbfe8', fontWeight: '600'}}>مشروع سكن مصر</td>
              <td style={{padding: '1rem'}}>106 - 133</td>
              <td style={{padding: '1rem'}}>3 - 3</td>
              <td style={{padding: '1rem'}}>1 - 1</td>
              <td style={{padding: '1rem', fontWeight: 'bold', color: '#2b9fd9'}}>1,234,900</td>
              <td style={{padding: '1rem'}}>150,000</td>
            </tr>
          </tbody>
        </table>

        <div style={{marginTop: '3rem', color: '#e8f4f8'}}>
          <h2 style={{fontSize: '1.5rem', marginBottom: '1rem'}}>معلومات إضافية</h2>
          <p style={{marginBottom: '0.5rem'}}>تاريخ فتح باب التقديم: <strong>الأحد 16 نوفمبر 2025</strong></p>
          <p>للمزيد من المعلومات زار <a href="https://reservations.realestate.gov.eg/ar/projects" style={{color: '#4dbfe8', textDecoration: 'none'}} target="_blank">ممونه مصر العقارية</a></p>
        </div>
      </div>
    </div>
  );
}
