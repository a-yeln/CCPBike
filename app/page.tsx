import React, { useState, useEffect } from 'react';
นำเข้า {
  กิจกรรม, แผนภูมิแท่ง 3, เครื่องหมายดอลลาร์, ผู้ใช้, เลเยอร์, ​​ประแจ, รถบรรทุก, ข้อความไฟล์
  ชิลด์อะเลิร์ต, พลัส, เครื่องพิมพ์, ตรวจสอบ, อะเลิร์ลไทรแองเกิล, X, ค้นหา, ดวงตา
  ตัวเลื่อน, ปฏิทิน, ลูกศรชี้ไปทางขวา, บันทึก, โทรศัพท์, โลก, กล้อง
} จาก 'lucide-react';

ส่งออกฟังก์ชันเริ่มต้น CCPBikeMasterERPv11() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userRole, setUserRole] = useState('Owner');
  const [showCalc, setShowCalc] = useState(false);

  // การตั้งค่า
  const [shopSettings, setShopSettings] = useState({
    ชื่อร้าน: 'CCP Bike'
    สโลแกน: 'สตาร์ทเครื่องยนต์ของคุณ สตาร์ทตำนานของคุณ'
    ที่อยู่: '168/9 ถนนบางนา-ตราด กม.12 ต.บางพลีใหญ่ อ.บางพลี จ.สมุทรปราการ 10540',
    เบอร์โทรศัพท์: '081-924-5588 / 089-998-7766'
    คำนำหน้าใบแจ้งหนี้: 'CCP-2026-',
    logoUrl: 'https://i.ibb.co/L8xT7R4/ccp-logo.jpg',
    jpyRate: 0.2350,
    idrRate: 0.0022
  });

  // การจัดการสถานะสำหรับข้อมูล
  const [ลูกค้า, setCustomers] = useState([
    { id: 'CUST-101', name: 'คุณอนันต์ชัยเจริญ (เชียงใหม่)', company: 'อนันต์สยามสปอร์ตจำกัด', TaxId: '0105564098211', โทรศัพท์: '081-889-0112', ประเทศ: 'ไทย', ที่อยู่: '88/12 ถ.นิมมานเหกมินท์ ต.สุเทพ อ.เมือง จ.เชียงใหม่' }
  ]);

  const [vehicles, setVehicles] = useState([
    { id: 'BIKE-01', bikeCode: 'BIKE-2026-01', model: 'Honda CB400SF Hyper VTEC Revo', ปี: 2019, สี: 'แดง-ขาว', แชสซี No: 'NC42-1904821', engineNo: 'NC42E-2104821', costThb: 169200, ขายราคาThb: 239000, สถานะ: 'แพ็กรอส่ง', isCompleted: false, checklist: ['คีย์หลัก 2 ดอก', 'คู่มือบริการ'] }
  ]);

  const [workshopStages, setWorkshopStages] = useState([
    { id: 'STG-01', vehicleId: 'BIKE-01', stageName: ' เช็กรถแรกเข้า', note: 'เครื่องยนต์ปกติระบบไฟคอมเพล็กซ์', image: [] }
  ]);

  const [mechanicLogs, setMechanicLogs] = useState([
    { id: 'LOG-01', date: '2026-10-18', vehicleId: 'BIKE-01', mechanicName: 'ช่างสมชาย', detail: 'น้ำมันเครื่องเปลี่ยน Motul 300V และเช็กลมยาง' }
  ]);

  const [ธุรกรรม, setTransactions] = useState([
    { id: 'TX-01', วันที่: '2026-10-18', ประเภท: 'income', บัญชี: 'KBANK (THB)', amountThb: 116500, หมวดหมู่: 'รับชำระเงินงวดรถ' }
  ]);

  // สถานะแบบฟอร์ม
  const [custForm, setCustForm] = useState({ name: '', company: '', taxId: '', phone: '', country: ' ไทย', address: '' });

  const handleAddCustomer = (e) => {
    e.preventDefault();
    หาก (!custForm.name) ให้ส่งคืนค่า;
    setCustomers([...customers, { id: `CUST-${Date.now()}`, ...custForm }]);
    setCustForm({ name: '', company: '', taxId: '', phone: '', country: 'ไทย', address: '' });
  };

  const handleImageUpload = (e, callback) => {
    const file = e.target.files[0];
    ถ้า (ไฟล์) {
      const reader = new FileReader();
      reader.onloadend = () => callback(reader.result);
      reader.readAsDataURL(file);
    }
  };

  กลับ (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <header className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <img src={shopSettings.logoUrl} alt="โลโก้" className="w-10 h-10 rounded border border-amber-500/50 object-cover" />
          <div>
            <h1 className="font-bold text-white text-base leading-none">{shopSettings.shopName}</h1>
            <p className="text-[10px] text-slate-400 mt-0.5">{shopSettings.tagline}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <select value={userRole} onChange={(e) => setUserRole(e.target.value)} className="bg-slate-800 text-amber-400 font-bold px-2 py-1 rounded">
            <option value="Owner">กรีซ (เจ้าของ)</option>
            <option value="Admin">💼 แอดมิน (ผู้ดูแลระบบ)</option>
            <option value="ช่างเครื่อง">ช่าง (ช่างเครื่อง)</option>
          </select>
          {userRole !== 'ช่าง' และ (
            <button onClick={() => setShowCalc(!showCalc)} className="bg-amber-500 text-slate-950 font-bold px-3 py-1.5 rounded">
              🧮 เครื่องคำนวณกำไร
            </button>
          )}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-slate-900 border-r border-slate-800 p-3 space-y-1">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full text-left p-2.5 rounded text-xs font-semibold ${activeTab === 'dashboard' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:bg-slate-800'}`}>แดชบอร์ด (Dashboard)</button>
          <button onClick={() => setActiveTab('customers')} className={`w-full text-left p-2.5 rounded text-xs font-semibold ${activeTab === 'customers' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:bg-slate-800'}`}>ข้อความ & Statement</button>
          <button onClick={() => setActiveTab('workshop')} className={`w-full text-left p-2.5 ปัดเศษ text-xs font-semibold ${activeTab === 'workshop' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:bg-slate-800'}`}>งานช่าง & แพ็คส่ง</button>
          <button onClick={() => setActiveTab('settings')} className={`w-full text-left p-2.5 rounded text-xs font-semibold ${activeTab === 'settings' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:bg-slate-800'}`}>⚙️ ตั้งค่าระบบ</button>
        </aside>

        <main className="flex-1 p-6 overflow-y-auto space-y-6">
          {activeTab === 'แดชบอร์ด' และ (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white"> ช่วยให้ธุรกิจ</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-900 p-4 rounded border border-slate-800"><span className="text-xs text-slate-400">รถ</span><div className="text-2xl font-bold text-amber-400">{vehicles.length} </div></div>
                <div className="bg-slate-900 p-4 rounded border border-slate-800"><span className="text-xs text-slate-400">ไคลเอนต์</span><div className="text-2xl font-bold text-emerald-400">{customers.length} รายการ</div></div>
                <div className="bg-slate-900 p-4 rounded border border-slate-800"><span className="text-xs text-slate-400">รายงานช่าง</span><div className="text-2xl font-bold text-sky-400">{mechanicLogs.length} บันทึก</div></div>
              </div>
            </div>
          )}

          {activeTab === 'ลูกค้า' และ (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">ลูกค้า & ใบแจ้งยอด</h2>
              <form onSubmit={handleAddCustomer} className="bg-slate-900 p-4 rounded border border-slate-800 space-y-2 text-xs max-w-md">
                <span className="font-bold text-amber-400 block">+รองรับลูกค้าใหม่</span>
                <input type="text" placeholder="ชื่อลูกค้า" value={custForm.name} onChange={e => setCustForm({...custForm, name: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white" />
                <input type="text" placeholder="หมายเลขโทรศัพท์" value={custForm.phone} onChange={e => setCustForm({...custForm, phone: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white" />
                <button type="submit" className="w-full bg-amber-500 text-slate-950 font-bold p-2 rounded">ส่ง</button>
              </form>
              <div className="space-y-2">
                {customers.map(c => (
                  <div key={c.id} className="bg-slate-900 p-3 rounded border border-slate-800 text-xs">
                    <strong className="text-white block">{c.name}</strong>
                    <span className="text-slate-400">{c.phone} | {c.country}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'workshop' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">งานช่างและบำรุงรักษา</h2>
              <div className="bg-slate-900 p-4 rounded border border-slate-800 text-xs space-y-3">
                <span className="font-bold text-white block"> ไดอารี่ประจำวันของช่าง (พร้อมพิธีกรรมรูป)</span>
                {mechanicLogs.map(l => (
                  <div key={l.id} className="bg-slate-950 p-3 rounded border border-slate-800 space-y-1">
                    <span className="text-slate-400">{l.date} | {l.mechanicName}</span>
                    <p className="text-white">{l.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'การตั้งค่า' และ (
            <div className="space-y-4 text-xs max-w-md">
              <h2 className="text-xl font-bold text-white"> ติดตั้งระบบ & การยอมรับร้าน</h2>
              <div className="bg-slate-900 p-4 rounded border border-slate-800 space-y-3">
                <label className="block text-slate-400">การเข้าชมรูปภาพโลโก้ร้าน:</label>
                <input type="file" accept="image/*" onChange={e => handleImageUpload(e, img => setShopSettings({...shopSettings, logoUrl: img}))} className="w-full bg-slate-950 p-2 rounded text-slate-300" />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
