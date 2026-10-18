import React, { useState, useRef } from 'react';
นำเข้า { Activity, Edit3,
  แผนภูมิแท่ง 3, เครื่องหมายดอลลาร์, ผู้ใช้, เลเยอร์, ​​ประแจ, รถบรรทุก, ข้อความไฟล์
  ShieldAlert, Plus, Printer, Check, AlertTriangle, X, QrCode, Search, Download, Eye, Lock, ArrowRightLeft, CreditCard, RefreshCw, Filter
} จาก 'lucide-react';

ส่งออกฟังก์ชัน CCPBikeCompleteMasterERP() เริ่มต้น {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'customers' | 'vehicles' | 'bids' | 'workshop' | 'logistics' | 'finance' | 'invoices' | 'claims' | 'auditLog'>('dashboard');
  const [userRole, setUserRole] = useState<'Owner' | 'Admin' | 'Mechanic'>('Owner'); // ตัวอย่างการสลับบทบาท
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // --- สถานะบันทึกการตรวจสอบ (บันทึกกิจกรรมระบบ) (สำหรับเจ้าของเท่านั้น) ---
  const [auditLogs, setAuditLogs] = useState([
    { id: 'LOG-110', timestamp: '2026-10-18 14:10:00', user: 'คุณอนันต์ (เจ้าของ)', action: '[FINANCE] บันทึกโอนหนี้ FX', module: 'การเงิน 3 สกุล', รายละเอียด: 'แลกเงิน THB -> JPY (¥500,000 JPY @ 0.2320) เข้าบัญชี MUFG', อุปกรณ์: 'MacBook Pro (สำนักงานเจ้าของ)' },
    { id: 'LOG-109', timestamp: '2026-10-18 14:02:15', user: 'ช่างสมชาย (Mechanic)', action: '[UPDATE]งานบันทึกงานช่าง', module: 'งานช่าง & อะไหล่', detail: 'แก้ไขการเบิกโซ่และสถานะ Pass [BIKE-01]', อุปกรณ์: 'Tablet #01 (อู่พัฒนาการ)' },
    { id: 'LOG-108', timestamp: '2026-10-18 13:45:00', user: 'คุณอนันต์ (เจ้าของ)', action: '[CLAIM] ชาร์จม CCP รับจบ', module: 'ระบบเคลม', รายละเอียด: 'อนุมัติซับพอร์ตถังน้ำมันบุบ ฿15,000 [BIKE-01]', อุปกรณ์: 'MacBook Pro (สำนักงานเจ้าของ)' },
    { id: 'LOG-107', timestamp: '2026-10-18 12:30:22', user: 'แอดมินหมิว (Admin)', action: '[INVOICE] เดลของสมาชิก', module: 'ข้อมูลส่วนบุคคล', detail: 'สร้างลิฟต์ INV-202610-008 เพียง ฿113,840', device: 'PC-Admin-02' },
    { id: 'LOG-106', timestamp: '2026-10-18 11:15:10', user: 'แอดมินหมิว (Admin)', action: '[CREATE]ต่อลูกค้าใหม่', module: 'ลูกค้า & Statement', detail: 'ลงทะเบียนคุณอนันต์ ชัยเจริญ (วงเงิน ฿500,000)', อุปกรณ์: 'PC-Admin-02' },
    { id: 'LOG-105', timestamp: '2026-10-18 10:00:00', user: 'ช่างสมชาย (ช่างเครื่อง)', action: '[INTAKE] บันทึกรับรถแยกชิ้น', module: 'สต็อกรถ', รายละเอียด: 'สแกน QR Code รับในส่วนของ BIKE-01 (3 ชิ้น)', อุปกรณ์: 'Tablet #01 (อู่พัฒนาการ)' },
  ]);

  // ตัวจัดการรายการแก้ไข
  const [editingItem, setEditingItem] = useState<any>(null);

  // ฟังก์ชันตัวช่วยในการบันทึกบันทึกการตรวจสอบ
  const addAuditLog = (action: string, moduleName: string, detail: string) => {
    const newLog = {
      id: `LOG-${Date.now().toString().slice(-3)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      ผู้ใช้: userRole === 'เจ้าของ' ? 'คุณอนันต์ (Owner)' : userRole === 'Admin' ? 'แอดมินหมิว (Admin)' : 'ช่างสมชาย (ช่างเครื่อง)',
      การกระทำ: การกระทำ
      โมดูล: ชื่อโมดูล,
      รายละเอียด: รายละเอียด
      อุปกรณ์: userRole === 'ช่างเครื่อง' ? 'Tablet #01 (อู่พัฒนาการ)' : 'MacBook Pro (Owner Office)'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // --- สถานะของฟอร์ม ---
  // 1. สถานะแบบฟอร์มลูกค้า
  const [custForm, setCustForm] = useState({
    ชื่อ: '', ชื่อบริษัท: '', เลขประจำตัวผู้เสียภาษี: '', ประเทศ: 'ไทย', โทรศัพท์: '', Line ID: '', WhatsApp: '', อีเมล: '', วงเงินเครดิต: 100000 บาท
  });

  // 2. การลงทะเบียนยานพาหนะและแบบฟอร์มหลายชิ้นของรัฐ
  const [vehForm, setVehForm] = useState({
    bikeCode: 'BIKE-09', make: 'Yamaha', modelName: 'Z900RS / SR400', year: 2023, chassisNumber: 'RN39-001234',
    ต้นทุน (เยน): 680000, อัตราแลกเปลี่ยน (เยน/ธันเบอร์): 0.2320, ค่าจัดส่ง (ธันเบอร์): 35000, กำไรเป้าหมาย (ธันเบอร์): 45000
    serviceType: 'นำเข้าประมูลอัตโนมัติ',
    hasRegistrationDocs: true,
    docType: 'ใบยกเลิกทะเบียนญี่ปุ่น (Massho - 抹消証明書)',
    หมายเลขเอกสาร: 'JP-2026-998812'
    docStatus: 'เอกสารอนุรักษ์',
    จำนวนชิ้นขาเข้า: 3
    รายละเอียดชิ้นส่วน: [
      { pieceNo: 1, name: 'ตัวรถ + เต็มรูปแบบ', qrCode: 'BIKE-09-P1' },
      { pieceNo: 2, name: 'ชุดแฟริ่งแยก + ท่อแต่ง', qrCode: 'BIKE-09-P2' },
      { pieceNo: 3, name: 'ล้อแม็ก + อะไหล่สำรอง', qrCode: 'BIKE-09-P3' }
    ]
  });

  // 3. แบบฟอร์มขอเสนอราคาประมูลของญี่ปุ่น (รัฐ)
  const [bidForm, setBidForm] = useState({
    customerId: 'CUST-001 (คุณอนันต์)',desiredModel: 'Honda CB400SF Revo', maxBidJpy: 550000, maxBidThb: 127600,
    AuctionHouse: 'BDS Kanto', วันที่ประมูล: '2026-10-25', หมายเหตุ: 'เกรด 4.5 ขึ้นไปตามปกติเดิม'
  });

  // 4. แบบฟอร์มบันทึกการซ่อมบำรุงและช่างยนต์ (รัฐ)
  const [workForm, setWorkForm] = useState({
    vehicleId: 'BIKE-01 (Honda CB400SF)', mechanicName: 'ช่างสมศักดิ์', workStage: '2. ล้าง/ประกอบ',
    logDetail: 'ถอดล้างฮาร์ดแวร์และเปลี่ยนถ่ายน้ำมันเครื่องสังเคราะห์ 100%',
    partsReplaced: 'ไส้กรองน้ำมันเครื่อง, หัวเทียน NGK x4', partsCostThb: 2800, testDriveStatus: 'Pass'
  });

  // 5. แบบฟอร์มการขนส่งหลายขาของรัฐ
  const [shippingLegs, setShippingLegs] = useState([
    { legName: 'Leg 1: LANประมูล BDS -> โกดัง Yokohama', Carrier: 'Lanna Moto Japan', mode: 'ทางบก', costJpy: 25000, costThb: 5800, status: 'เก็บข้อมูล' },
    { legName: 'Leg 2: โกดัง Yokohama -> ท่าเรือแหลมฉบัง', Carrier: 'Ocean Liner Transport', mode: 'ทางเรือประมง', costJpy: 120000, costThb: 27840, status: 'ยังคงเดินทาง' },
    { legName: 'Leg 3: ท่าเรือแหลมฉบัง -> อู่ CCP Bike', Carrier: 'สยามนุกูลรถสไลด์', mode: 'ทางบก', costJpy: 0, costThb: 4500, status: 'รอการดำเนินการ' }
  ]);

  // 6. สถานะและตัวกรองธุรกรรมทางการเงินหลายสกุลเงิน
  const [ธุรกรรม, setTransactions] = useState([
    { id: 'TX-001', ประเภท: 'income', หมวดหมู่: 'ชำระค่างวด/มัดจำ', บัญชีธนาคาร: 'KBANK THB', จำนวน: 50000, สกุลเงิน: 'THB', exchangeRateToThb: 1.0, amountThb: 50000, slipUrl: 'https://example.com/lip1.jpg', vehicleRef: 'BIKE-01', customerRef: 'CUST-001 คุณอนันต์', note: 'รับมัดจำสั่งประมูล Honda CB400SF', date: '2026-10-18 11:30' },
    { id: 'TX-002', type: 'expense', category: 'ค่าประมูลรถชนะ', accountBank: 'MUFG JPY', amount: 680000, currency: 'JPY', exchangeRateToThb: 0.2320, amountThb: 157760, slipUrl: 'https://example.com/lip2.jpg', vehicleRef: 'BIKE-01', customerRef: 'BDS Kanto', note: 'เหรียญประมูลรถชนะ BDS Kanto', date: '2026-10-17 15:45' },
    { id: 'TX-003', type: 'expense', category: 'ค่าขนส่งเรือคอนเทนเนอร์', accountBank: 'MUFG JPY', amount: 120000, currency: 'JPY', exchangeRateToThb: 0.2320, amountThb: 27840, slipUrl: 'https://example.com/lip3.jpg', vehicleRef: 'BIKE-01', customerRef: 'Ocean Liner', note: 'ชำระค่าตู้เรือคอนเทนเนอร์ Leg 2', date: '2026-10-16 09:20' },
    { id: 'TX-004', ประเภท: 'income', หมวดหมู่: 'ค่าบริการฝากแพ็ก', accountBank: 'BCA IDR', amount: 25000000, currency: 'IDR', exchangeRateToThb: 0.0022, amountThb: 55000, slipUrl: 'https://example.com/lip4.jpg', vehicleRef: 'BIKE-08', customerRef: 'PT Nusantara Moto', note: 'ชำระค่าบริการรับฝากแพ็กและลังไม้ส่งออก', date: '2026-10-15 14:10' },
    { id: 'TX-005', type: 'fx_transfer', category: 'น้ำพุเงิน FX', accountBank: 'KBANK THB -> MUFG JPY', amount: 116000, currency: 'THB', exchangeRateToThb: 0.2320, amountThb: 116000, slipUrl: 'https://example.com/lip5.jpg', vehicleRef: 'SYSTEM', customerRef: 'MUFG Bank Japan', note: ' โอนสาธารณะเงิน THB เป็น JPY ¥500,000 เข้าคลังญี่ปุ่น (กำไร FX +฿1,200)', วันที่: '2026-10-14 10:00' }
  ]);

  const [financeFilterType, setFinanceFilterType] = useState<string>('all');
  const [financeFilterCurrency, setFinanceFilterCurrency] = useState<string>('all');

  // สถานะฟอร์มสำหรับโมดอลธุรกรรมใหม่
  const [transForm, setTransForm] = useState({
    ประเภทธุรกรรม: 'รายได้', หมวดหมู่: 'ชำระค่างวด/มัดจำ', บัญชีธนาคาร: 'KBANK THB',
    amount: 50000, currency: 'THB', exchangeRateToThb: 1.0, slipUrl: '', vehicleRef: 'BIKE-01', customerRef: 'CUST-001', หมายเหตุ: 'มัดจำสั่งประมูล'
  });

  // สถานะฟอร์มสำหรับโมดอลการโอนเงินตราต่างประเทศใหม่
  const [fxForm, setFxForm] = useState({
    จากบัญชี: 'KBANK THB', ไปยังบัญชี: 'MUFG JPY',
    amountOut: 116000, currencyOut: 'THB', fxRate: 0.2320, amountInReceived: 500000, currencyIn: 'JPY'
    fxGainLossThb: 1200, slipUrl: '', note: 'สำหรับเงินสำรองคลังประมูลญี่ปุ่น'
  });

  // สถานะฟอร์มสำหรับการแก้ไขธุรกรรม
  const [editTransForm, setEditTransForm] = useState<any>(null);

  // 7. ระบบสร้างใบแจ้งหนี้สองภาษา
  const [invForm, setInvForm] = useState({
    ใบแจ้งหนี้No: 'INV-202610-008', customerName: 'คุณอนันต์ ชัยเจริญ', vehicleCode: 'BIKE-01 (Honda CB400SF)',
    ภาษา: 'TH/EN', วันที่ออก: '2026-10-18', วันครบกำหนด: '2026-10-25'
    รายการ: [
      { description: 'ราคารถชนะประมูล (Auction Winning Price - Honda CB400SF)', amountThb: 104400 },
      { description: 'ค่าบริการขนส่งเคลียร์ภายนอก (นำเข้าโลจิสติกส์ & ศุลกากร)', amountThb: 38140 },
      { description: 'ค่าบริการบำรุงรักษา/เปลี่ยนอะไหล่ (ศูนย์ซ่อมและอะไหล่)', amountThb: 3500 }
    ]
    ภาษีมูลค่าเพิ่มร้อยละ: 7, ส่วนลด: 2000 บาท, เงินมัดจำที่ชำระ: 30000 บาท
  });

  // 8. แบบฟอร์มการเรียกร้องค่าสินไหมทดแทน CCP ของรัฐ
  const [claimForm, setClaimForm] = useState({
    vehicleId: 'BIKE-01', legOrigin: 'Leg 2: ขนส่งทางเรือ', DamageDetail: 'ถังน้ำมันมีรอยบุบระหว่างขนส่งในตู้คอนเทนเนอร์',
    absorbedAmountThb: 15000, targetProfitThb: 50000, minProfitFloorThb: 20000, ownerPassword: ''
  });

  // การคำนวณทางการเงินที่ได้มา
  const totalIncomeThb = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amountThb, 0);
  const totalExpenseThb = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amountThb, 0);
  const netProfitFinanceThb = totalIncomeThb - totalExpenseThb;

  const currentProfitAfterClaim = claimForm.targetProfitThb - claimForm.absorbedAmountThb;
  const profitReductionPercent = ((claimForm.absorbedAmountThb / claimForm.targetProfitThb) * 100).toFixed(1);
  const isProfitBelowFloor = currentProfitAfterClaim < claimForm.minProfitFloorThb;

  const invoiceSubtotal = invForm.items.reduce((sum, item) => sum + item.amountThb, 0);
  const invoiceVat = (invoiceSubtotal * invForm.vatPercent) / 100;
  const invoiceTotal = invoiceSubtotal + invoiceVat - invForm.discountThb - invForm.depositPaidThb;

  // ฟังก์ชันส่งออกภาพอิโมจิเดี่ยว
  const invoicePreviewRef = useRef<HTMLDivElement>(null);
  
  const handleExportInvoiceAsImage = () => {
    const invoiceEl = document.getElementById('printable-invoice-container');
    ถ้า (!invoiceEl) {
      alert('ไม่พบเรื่องราวนี้!');
      กลับ;
    }
    
    พยายาม {
      const htmlContent = invoiceEl.outerHTML;
      const blob = new Blob([`
        <!DOCTYPE html>
        <html>
        <หัว>
          <meta charset="utf-8">
          <title>${invForm.invoiceNo}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <สไตล์>
            body { background: #0f172a; color: #f8fafc; font-family: sans-serif; padding: 20px; }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
        </html>
      `], { type: 'text/html;charset=utf-8' });
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${invForm.invoiceNo}_Preview.html`;
      document.body.appendChild(link);
      ลิงก์.คลิก();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      addAuditLog('[INVOICE]', 'บันทึก', `บันทึกไฟล์รูปภาพอธิษฐาน ${invForm.invoiceNo} พร้อมลายน้ำ`);
      alert(`📸 บันทึกไฟล์รูปภาพ/รีวิวอธิษฐาน ${invForm.invoiceNo} พร้อมลายน้ำได้เลย!`);
    } catch (err) {
      alert(`📸 บันทึกไฟล์รูปภาพเพื่อเป็นส่วนหนึ่ง!`);
    }
  };

  // ตรรกะการทำธุรกรรมที่ผ่านการกรอง
  const filteredTransactions = transactions.filter(t => {
    ถ้า (financeFilterType !== 'all' และ t.type !== financeFilterType) ให้คืนค่า false;
    หาก financeFilterCurrency ไม่ใช่ 'all' และ t.currency ไม่ใช่ financeFilterCurrency ให้คืนค่า false
    ส่งคืนค่าจริง;
  });

  กลับ (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-4 md:p-6">
      {/* ส่วนหัวด้านบน */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="bg-orange-600 text-white font-black text-xl px-3 py-1 rounded-xl shadow-lg shadow-orange-600/30">CCP</div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">CCP BIKE (Japan Auction Import ERP)</h1>
              <p className="text-xs text-slate-400">ระบบตรวจสอบร้านและนำเข้ารถประมูลญี่ปุ่นครบวงจร</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* สาธิตการสลับบทบาท */}
          <div className="flex items-center bg-slate-800 p-1 rounded-lg border border-slate-700 text-xs mr-2">
            <span className="text-slate-400 px-2">สิทธิ์:</span>
            <button onClick={() => setUserRole('Owner')} className={`px-2.5 py-1 rounded-md font-semibold transition ${userRole === 'Owner' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:text-white'}`}>เจ้าของ</button>
            <button onClick={() => setUserRole('Admin')} className={`px-2.5 py-1 rounded-md font-semibold transition ${userRole === 'Admin' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>Admin</button>
            <button onClick={() => setUserRole('Mechanic')} className={`px-2.5 py-1 rounded-md font-semibold transition ${userRole === 'Mechanic' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'}`}>ช่าง</button>
          </div>

          <button onClick={() => setActiveModal('claimModal')} className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 transition">
            <ShieldAlert className="w-4 h-4" /> 🛡️ เคลม CCP รับจบ
          </button>
        </div>
      </header>

      {/* แท็บนำทาง */}
      <nav className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 border-b border-slate-800 text-xs">
        {[
          { id: 'dashboard', label: 'ระบบ', ไอคอน: BarChart3 },
          { id: 'ลูกค้า', ป้ายกำกับ: 'ลูกค้า & ใบแจ้งยอด', ไอคอน: ผู้ใช้ },
          { id: 'vehicles', label: 'สต็อกรถ & เอกสาร', ไอคอน: Layers },
          { id: 'bids', label: 'ขอประมูลญี่ปุ่น', ไอคอน: FileText },
          { id: 'workshop', label: 'งานช่าง & อะไหล่', ไอคอน: ประแจ },
          { id: 'logistics', label: 'ขนส่ง Multi-Leg', icon: Truck },
          { id: 'finance', label: 'การเงิน 3 ในส่วน', ไอคอน: DollarSign },
          { id: 'invoices', label: ' ร้องขอ (TH/EN)', icon: FileText },
          { id: 'claims', ป้ายกำกับ: 'ระบบเซลล์ม & Risk Matrix', ไอคอน: ShieldAlert },
          { id: 'auditLog', ป้ายกำกับ: 'บันทึกการตรวจสอบ (ประวัติการใช้งาน)', ไอคอน: ล็อค }
        ].map(tab => {
          const Icon = tab.icon;
          กลับ (
            <ปุ่ม
              คีย์={แท็บ.id}
              onClick={() => {
                ถ้า tab.id เป็น 'auditLog' และ userRole ไม่ใช่ 'Owner' {
                  alert('🔒 Access Denied: สำหรับเจ้าของร้าน (เจ้าของ) สิทธิ์ที่มีสิทธิ์เข้าดูบันทึกการตรวจสอบ');
                  กลับ;
                }
                setActiveTab(tab.id as any);
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                activeTab === tab.id ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              } ${tab.id === 'auditLog' && userRole !== 'Owner' ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Icon className="w-3.5 h-3.5" /> {tab.label}
              {tab.id === 'auditLog' && <Lock className="w-3 h-3 text-amber-400 ml-0.5" />}
            </button>
          );
        })}
      </nav>

      {/* --- เนื้อหาแท็บหลัก --- */}
      {/* 1. ภาพรวมแดชบอร์ด */}
      {activeTab === 'แดชบอร์ด' และ (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl">
              <span className="text-xs text-slate-400"> เงินสดรวม 3 ดอลลาร์ (เทียบเท่าบาท)</span>
              <div className="text-2xl font-bold text-emerald-400 mt-1">฿ 1,845,200.00</div>
              <div className="text-xs text-slate-400 mt-2 flex justify-between">
                <span>1.2 ล้านบาท</span>
                <span>JPY: ¥2.5M</span>
                <span>IDR: Rp150M</span>
              </div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl">
              <span className="text-xs text-slate-400">กำไรจากอัตราแลกเปลี่ยนจริง (Realized FX)</span>
              <div className="text-2xl font-bold text-amber-400 mt-1">+ ฿ 34,250.00</div>
              <span className="text-xs text-emerald-400 mt-2 block">↑ ได้อานิสงส์ค่าเงิน JPY อ่อนตัว</span>
            </div>
            <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl">
              <span className="text-xs text-slate-400">สต็อกรถระหว่างนำเข้า / ในอู่</span>
              <div className="text-2xl font-bold text-blue-400 mt-1">12 </div>
              <span className="text-xs text-slate-400 mt-2 block">อยู่ในเรือ 4 คัน | ในอู่ 8 คัน</span>
            </div>
            <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl">
              <span className="text-xs text-slate-400">ตำนานพอร์ตซับเคลม (CCP รับจบ)</span>
              <div className="text-2xl font-bold text-rose-400 mt-1">฿ 18,500.00</div>
              <span className="text-xs text-rose-400/80 mt-2 block">กำไรสะสม -2.8%</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. แท็บลูกค้า */}
      {activeTab === 'ลูกค้า' และ (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2"><Users className="w-4 h-4 text-blue-400" /> รายการลูกค้า & คำชี้แจง</h2>
            <button onClick={() => setActiveModal('newCustomer')} className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1">
              <Plus className="w-4 h-4" /> +ต่อลูกค้าใหม่
            </button>
          </div>
          <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
            <div>
              <div className="font-bold text-white text-sm">คุณอนันต์ ชัยเจริญ</div>
              <div className="text-slate-400"> ประเทศ: ไทย | โทร: 081-998-7766 | LINE: anan_c</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-emerald-400 font-bold"> วงเงินเครดิต: ฿ 500,000</div>
                <div className="text-slate-400">ยอดค้างชำระ: ฿ 113,840</div>
              </div>
              <ปุ่ม
                onClick={() => {
                  setEditingItem({ id: 'CUST-001', name: 'คุณอนันต์ชัยเจริญ', companyName: '', TaxId: '105560000', country: 'ไทย', phone: '081-998-7766', lineId: 'anan_c', whatsapp: '', email: 'anan@gmail.com', creditLimitThb: 500000 });
                  setActiveModal('editCustomer');
                }}
                className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" />สร้าง
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. แท็บสต็อกยานพาหนะ */}
      {activeTab === 'ยานพาหนะ' และ (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-white flex items-center gap-2"><Layers className="w-4 h-4 text-emerald-400" /> สต็อกรถ & เอกสารทะเบียน</h2>
            <button onClick={() => setActiveModal('newVehicle')} className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1">
              <Plus className="w-4 h-4" /> + ลงทะเบียนรถใหม่
            </button>
          </div>
          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-3 text-xs">
            <div className="flex justify-between items-start">
              <div>
                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-[10px] font-bold">BIKE-01</span>
                <div className="font-bold text-white text-base mt-1">Honda CB400SF Hyper VTEC Revo ( ปี 2022)</div>
                <div className="text-slate-400 font-mono">แชสซี: NC42-1900123 | เครื่องยนต์: NC42E-1900</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg font-bold">พร้อมขาย</span>
                <ปุ่ม
                  onClick={() => {
                    setEditingItem({ bikeCode: 'BIKE-01', ยี่ห้อ: 'Honda', ชื่อรุ่น: 'CB400SF Hyper VTEC Revo', ปี: 2022, หมายเลขแชสซี: 'NC42-1900123', costJpy: 550000, exchangeRateJpyThb: 0.2320, shippingCostThb: 38140, targetProfitThb: 50000, hasRegistrationDocs: true, docType: 'ใบยกเลิกทะเบียนญี่ปุ่น (Massho)', docNumber: 'JP-889900', docStatus: 'กรอกเอกสาร' });
                    setActiveModal('editVehicle');
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />สร้าง
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. แท็บการเสนอราคาประมูลในญี่ปุ่น */}
      {activeTab === 'bids' && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2"><FileText className="w-4 h-4 text-blue-400" /> คำขอ & ประมูลญี่ปุ่น (BDS / USS)</h2>
            <button onClick={() => setActiveModal('newBid')} className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1">
              <Plus className="w-4 h-4" /> + สร้างคำขอประมูล
            </button>
          </div>
          <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
            <div>
              <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded text-[10px] font-bold">รอวันประมูล (2026-10-25)</span>
              <div className="font-bold text-white text-sm mt-1">Honda CB400SF Revo (BDS Kanto)</div>
              <div className="text-slate-400">ลูกค้า: คุณอนันต์ | ขอบเขตการต่อสู้: ¥550,000 JPY (฿127,600 THB)</div>
            </div>
            <ปุ่ม
              onClick={() => alert('แก้ไขคำขอประมูลตอนนี้')}
              className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" />สร้าง
            </button>
          </div>
        </div>
      )}

      {/* 5. แท็บเวิร์กช็อป */}
      {activeTab === 'workshop' && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2"><Wrench className="w-4 h-4 text-amber-400" /> งานช่าง & บันทึกเบิกอะไหล่</h2>
            <button onClick={() => setActiveModal('newWorkshop')} className="bg-amber-600 hover:bg-amber-500 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1">
              <Plus className="w-4 h-4" /> + บันทึกงานช่าง
            </button>
          </div>
          <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
            <div>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-[10px] font-bold">2. ล้าง/ประกอบ</span>
              <div className="font-bold text-white text-sm mt-1">BIKE-01 (Honda CB400SF) - ช่างสมศักดิ์</div>
              <div className="text-slate-400">อะไหล่ที่เปลี่ยน: ไส้กรองน้ำมันเครื่อง, หัวเทียน NGK x4 (ค่าอะไหล่ ฿2,800)</div>
            </div>
            <ปุ่ม
              onClick={() => alert(' แก้ไขบันทึกงานช่างที่สมบูรณ์')}
              className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" />สร้าง
            </button>
          </div>
        </div>
      )}

      {/* 6. แท็บโลจิสติกส์ */}
      {activeTab === 'โลจิสติกส์' และ (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-bold text-white flex items-center gap-2"><Truck className="w-4 h-4 text-purple-400" /> ขนส่ง Multi-Leg Shipping</h2>
            <button onClick={() => setActiveModal('newShippingLeg')} className="bg-purple-600 hover:bg-purple-500 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1">
              <Plus className="w-4 h-4" /> +เน้นช่วงขนส่ง (ขา)
            </button>
          </div>
          <div className="space-y-2">
            {shippingLegs.map((leg, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs">
                <div>
                  <div className="font-semibold text-white">{leg.legName}</div>
                  <div className="text-slate-400">ยังคงเป็น: {leg.carrier} | ต่อไป: {leg.mode}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-bold text-emerald-400">฿ {leg.costThb.toLocaleString()} {leg.costJpy > 0 && `(¥${leg.costJpy.toLocaleString()})`}</div>
                    <span className="text-[10px] px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded">{leg.status}</span>
                  </div>
                  <ปุ่ม
                    onClick={() => alert('แก้ไขรายการขนส่งได้เลย')}
                    className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 px-2 py-1 rounded text-[11px] flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" />โดดเด่น
                  </button>
                </div>
              </div>
            ))}
            <div className="p-3 bg-slate-800/90 rounded-xl border border-slate-700 flex justify-between items-center text-xs font-bold">
              <span className="text-slate-300">รวมยอดค่าจัดส่งทุกขา (Auto-Sum Total Shipping):</span>
              <span className="text-amber-400 text-sm">฿ {shippingLegs.reduce((acc, curr) => acc + curr.costThb, 0).toLocaleString()} THB</span>
            </div>
          </div>
        </div>
      )}

      {/* 7. แท็บการเงินแบบครบวงจร */}
      {activeTab === 'การเงิน' และ (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 space-y-6">
          {/* ส่วนหัวและแถบการดำเนินการด้านการเงิน */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-400" /> การเงิน & บัญชี 3 เดือน (THB / JPY / IDR)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">คุณสามารถดูประวัติและประวัติความเป็นมาของการเงินทุกสกุล</p>
            </div>
            
            <div className="flex items-center gap-2">
              <ปุ่ม
                onClick={() => setActiveModal('newFxTransfer')}
                className="bg-purple-600 hover:bg-purple-500 text-white text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition font-semibold shadow"
              >
                <ArrowRightLeft className="w-4 h-4" /> 🔀 โอนย้าย / แลกเงิน FX
              </button>
              <ปุ่ม
                onClick={() => setActiveModal('newTransaction')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition font-semibold shadow"
              >
                <Plus className="w-4 h-4" /> + บันทึกรายรับ/รายจ่าย
              </button>
            </div>
          </div>

          {/* ตารางสรุปบัญชี */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-900/80 border border-emerald-500/30 rounded-xl space-y-2">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span className="flex items-center gap-1"><CreditCard className="w-3.5 h-3.5 text-emerald-400" /> บัญชีเงินบาท (THB)</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-bold">KBANK / SCB</span>
              </div>
              <div className="text-xl font-bold text-white">฿ 1,250,000.00</div>
              <div className="text-[11px] text-slate-400"> เงินสดไทย & บัญชีในประเทศ</div>
            </div>

            <div className="p-4 bg-slate-900/80 border border-blue-500/30 rounded-xl space-y-2">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span className="flex items-center gap-1"><CreditCard className="w-3.5 h-3.5 text-blue-400" /> บัญชีเยนญี่ปุ่น (JPY)</span>
                <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded font-bold">MUFG Bank</span>
              </div>
              <div className="text-xl font-bold text-blue-400">2,850,000 เยน</div>
              <div className="text-[11px] text-slate-400">หยาบคาย ฿ 661,200 บาท (เรท 0.2320)</div>
            </div>

            <div className="p-4 bg-slate-900/80 border border-purple-500/30 rounded-xl space-y-2">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span className="flex items-center gap-1"><CreditCard className="w-3.5 h-3.5 text-purple-400" /> บัญชีรูเปียห์ (IDR)</span>
                <span className="text-[10px] bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded font-bold">BCA อินโดนีเซีย</span>
              </div>
              <div className="text-xl font-bold text-purple-400">185,000,000 รูเปียห์</div>
              <div className="text-[11px] text-slate-400">หยาบคาย ฿ 407,000 บาท (เรท 0.0022)</div>
            </div>

            <div className="p-4 bg-slate-900/80 border border-amber-500/30 rounded-xl space-y-2">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span className="flex items-center gap-1"><RefreshCw className="w-3.5 h-3.5 text-amber-400" /> กำไรอัตราแลกเปลี่ยน (Realized FX)</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-bold">เรียลไทม์</span>
              </div>
              <div className="text-xl font-bold text-amber-400">+ ฿ 34,250.00</div>
              <div className="text-[11px] text-emerald-400"> กำไรสะสมจากส่วนต่างค่าเงิน</div>
            </div>
          </div>

          {/* แถบตัวกรองแบบโต้ตอบ */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400 font-semibold">อื้ม:</span>
              
              <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700">
                {[
                  { id: 'all', ป้ายกำกับ: 'ทั้งหมด' },
                  { id: 'รายได้', ป้ายกำกับ: 'รายรับ' },
                  { id: 'expense', label: 'รายจ่าย' },
                  { id: 'fx_transfer', label: ' โอนย้าย FX' }
                ].map(f => (
                  <ปุ่ม
                    คีย์={f.id}
                    onClick={() => setFinanceFilterType(f.id)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
                      financeFilterType === f.id ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-slate-400">การรักษา:</span>
              <เลือก
                ค่า = {financeFilterCurrency}
                onChange={e => setFinanceFilterCurrency(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg p-1.5 focus:outline-none"
              >
                <option value="all">ทุก ๆ ตาราง (THB/JPY/IDR)</option>
                <option value="THB">บาทไทย (THB)</option>
                <option value="JPY">เยนญี่ปุ่น (JPY)</option>
                <option value="IDR">รูเปียห์ห์ประธานาธิบดี (IDR)</option>
              </select>
            </div>
          </div>

          {/* บัตรรายการธุรกรรม */}
          <div className="space-y-3">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">ไม่พบรายการใดที่ได้รับการยอมรับ</div>
            ) : (
              filteredTransactions.map(tx => (
                <div key={tx.id} className="p-4 bg-slate-900/70 rounded-xl border border-slate-800 hover:border-slate-700 transition space-y-2">
                  <div className="flex justify-between items-start text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          tx.type === 'income' ? 'bg-emerald-500/20 text-emerald-400' :
                          tx.type === 'expense' ? 'bg-rose-500/20 text-rose-400' : 'bg-purple-500/20 text-purple-400'
                        }`}>
                          {tx.type === 'รายได้' ? 'รายรับ (รายรับ)' : tx.type === 'รายจ่าย' ? 'รายจ่าย (ค่าใช้จ่าย)' : ' โอนย้าย FX (โอน)'}
                        </span>
                        <span className="text-slate-400 font-mono">{tx.id}</span>
                        <span className="text-slate-500">| {tx.date}</span>
                      </div>
                      <div className="font-bold text-white text-sm">{tx.note}</div>
                      <div className="text-slate-400 flex items-center gap-3 text-[11px]">
                        <span> หมวดหมู่: <strong className="text-slate-200">{tx.category}</strong></span>
                        <span>บัญชี: <strong className="text-slate-200">{tx.accountBank}</strong></span>
                        <span>อ้างอิง: <strong className="text-slate-200">{tx.vehicleRef} / {tx.customerRef}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className={`font-bold text-base ${
                          tx.type === 'income' ? 'text-emerald-400' : tx.type === 'expense' ? 'text-rose-400' : 'text-purple-400'
                        }`}>
                          {tx.type === 'income' ? '+' : tx.type === 'expense' ? '-' : ''}
                          {tx.currency === 'THB' ? ` ฿ ${tx.amount.toLocaleString()}` :
                           tx.currency === 'JPY' ? ` ¥ ${tx.amount.toLocaleString()}` : ` Rp ${tx.amount.toLocaleString()}`} {tx.currency}
                        </div>
                        {tx.currency !== 'THB' && (
                          <div className="text-[10px] text-slate-400">
                            ≈ ฿ {tx.amountThb.toLocaleString()} THB (เรท {tx.exchangeRateToThb})
                          </div>
                        )}
                      </div>

                      <ปุ่ม
                        onClick={() => {
                          setEditTransForm(tx);
                          setActiveModal('editTransaction');
                        }}
                        className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1 shadow"
                      >
                        <Edit3 className="w-3.5 h-3.5" />สร้าง
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 8. แท็บใบแจ้งหนี้พร้อมปุ่มส่งออกรูปภาพอิโมจิเดี่ยว */}
      {activeTab === 'ใบแจ้งหนี้' และ (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" /> ร้องขอสองภาษา (Dual-Language Invoice TH/EN)
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-orange-400 bg-orange-950/60 border border-orange-500/30 px-2 py-1 rounded flex items-center gap-1">
                🛡️ ลายน้ำ: CCP-BIKE OFFICIAL COPY
              </span>
              {/* ปุ่มอิโมจิเดี่ยวตามคำขอของผู้ใช้ */}
              <ปุ่ม
                onClick={handleExportInvoiceAsImage}
                title=" บันทึกไดอารี่เป็นรูปภาพพร้อมลายน้ำ CCP-BIKE OFFICIAL COPY"
                className="w-10 h-10 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg border border-slate-600 hover:border-orange-500 text-lg transition shadow flex items-center justify-center cursor-pointer"
              >
                📸
              </button>
              <button onClick={() => setActiveModal('newInvoice')} className="bg-amber-600 hover:bg-amber-500 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1">
                <Plus className="w-4 h-4" /> + สร้างใหม่
              </button>
            </div>
          </div>

          {/* ช่องแสดงตัวอย่างใบแจ้งหนี้ที่พิมพ์ได้ */}
          <div id="printable-invoice-container" ref={invoicePreviewRef} className="relative overflow-hidden bg-slate-950 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 text-slate-200">
            {/* ตราประทับลายน้ำแบบไดนามิก - สำเนาอย่างเป็นทางการของ CCP-BIKE */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 opacity-[0.08]">
              <div className="text-3xl md:text-5xl font-black tracking-widest text-orange-400 border-8 border-orange-400 px-8 py-6 rounded-3xl transform -rotate-12 uppercase text-center whitespace-nowrap shadow-2xl">
                สำเนาอย่างเป็นทางการของ CCP-BIKE
              </div>
            </div>
            {/* ส่วนหัวของใบแจ้งหนี้ */}
            <div className="flex justify-between items-start border-b border-slate-800 pb-6 relative z-10">
              <div>
                <div className="flex items-center gap-2">
                  <div className="bg-orange-600 text-white font-black text-lg px-2.5 py-1 rounded-lg">CCP</div>
                  <span className="font-bold text-xl text-white tracking-tight">CCP BIKE JAPAN</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">123/45 ถนนพัฒนาการสวนหลวงเขตสวนหลวง กรุงเทพฯ 10250</p>
                <p className="text-xs text-slate-400">โทร: 02-123-4567 | เลขประจำตัวผู้เสียภาษี: 0105565000000</p>
              </div>
              <div className="text-right">
                <h3 className="text-2xl font-black text-orange-400 tracking-wider">ใบแจ้งหนี้</h3>
                <p className="text-xs text-slate-400">สมุนไพร / ใบวางบิล</p>
                <div className="text-xs font-mono mt-2 text-slate-300">
                  <div>เลขที่: <span className="font-bold text-white">{invForm.invoiceNo}</span></div>
                  <div>วันที่: {invForm.issueDate}</div>
                  <div> กำหนดชำระ: {invForm.dueDate}</div>
                </div>
              </div>
            </div>

            {/* ข้อมูลลูกค้า */}
            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 flex justify-between text-xs relative z-10">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">ลูกค้า / ลูกค้า</span>
                <div className="font-bold text-white text-sm mt-0.5">{invForm.customerName}</div>
                <div className="text-slate-400">อ้างอิงรถ: {invForm.vehicleCode}</div>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[10px] uppercase">ภาษา / LANGUAGE</span>
                <div className="font-bold text-emerald-400 text-sm mt-0.5">{invForm.language}</div>
              </div>
            </div>

            {/* ตารางรายการ */}
            <div className="overflow-x-auto relative z-10">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-3"></th>
                    <th className="p-3">รายการ / DESCRIPTION</th>
                    <th className="p-3 text-right">การถ่าย (บาท)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {invForm.items.map((item, i) => (
                    <tr key={i}>
                      <td className="p-3 text-slate-400 font-mono">{i + 1}</td>
                      <td className="p-3 text-slate-200 font-medium">{item.description}</td>
                      <td className="p-3 text-right font-bold text-white">฿ {item.amountThb.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* สรุปการคำนวณ */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 pt-4 border-t border-slate-800 relative z-10">
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-xs space-y-2 w-full md:w-auto">
                <div className="text-slate-400 font-semibold flex items-center gap-1"><QrCode className="w-4 h-4 text-emerald-400" /> ช่องทางชำระเงิน (พร้อมเพย์ / โอนเงินผ่านธนาคาร)</div>
                <div className="text-slate-300">ธนาคารกสิกรไทย (KBANK): <span className="font-bold text-white">123-4-56789-0</span></div>
                <div className="text-slate-300">ชื่อบัญชี: บจก. ซีซีพี ไบค์ นำเข้ามอเตอร์ไซค์</div>
              </div>

              <div className="w-full md:w-72 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>รวมเป็นเงิน (ผลรวมย่อย):</span>
                  <span className="font-bold text-white">฿ {invoiceSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>ภาษีมูลค่าเพิ่ม VAT ({invForm.vatPercent}%):</span>
                  <span className="font-bold text-white">฿ {invoiceVat.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-rose-400">
                  <span>หักส่วนลดพิเศษ (ส่วนลด):</span>
                  <span className="font-bold">- ฿ {invForm.discountThb.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-blue-400">
                  <span>หักเงินมัดจำแล้ว (ชำระเงินมัดจำแล้ว):</span>
                  <span className="font-bold">- ฿ {invForm.depositPaidThb.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-slate-700 flex justify-between text-sm font-bold text-emerald-400">
                  <span> ยอดชำระสุทธิ (Total Due):</span>
                  <span className="text-base">฿ {invoiceTotal.toLocaleString()} THB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 9. แท็บการเรียกร้องและความเสี่ยง */}
      {activeTab === 'claims' && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-white flex items-center gap-2"><ShieldAlert className="w-4 h-4 text-rose-400" /> ระบบมือถือม "CCP รับจบ" & Profit Floor Safeguard</h2>
            <button onClick={() => setActiveModal('claimModal')} className="bg-rose-600 hover:bg-rose-500 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1">
              <ShieldAlert className="w-4 h-4" /> + บันทึกเคลม CCP รับจบ
            </button>
          </div>
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl text-xs space-y-2">
            <div className="flex justify-between font-bold text-rose-400">
              <span>[BIKE-01] อาหารจาน: เจลน้ำมันมีรอยบุบระหว่างขนส่งในตู้</span>
              <span>ยอด CCP รับจบ: ฿ 15,000 บาท</span>
            </div>
            <p className="text-slate-400">ยังคงมีกำไรสุทธิคงเหลือจริง: <span className="text-emerald-400 font-bold">฿ 35,000 THB</span> (ลดลง -30.0% จากกลุ่มเป้าหมายเดิม ฿50,000)</p>
          </div>
        </div>
      )}

      {/* 10. แท็บบันทึกการตรวจสอบ (สำหรับเจ้าของเท่านั้น) */}
      {activeTab === 'auditLog' && userRole === 'Owner' && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-400" /> Audit Log (ประวัติบันทึกกิจกรรมย้อนหลัง)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">แสดงประวัติวันและเวลาของผู้ใช้อุปกรณ์ดำเนินการที่มีการปรับปรุง/แก้ไขได้ทั้งหมด (สิทธิ์เจ้าของเท่านั้น)</p>
            </div>
            <span className="px-2.5 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs rounded-lg font-mono font-bold">
              🔒 สำหรับเจ้าของเท่านั้น
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-3">วัน-เวลา (ประทับเวลา)</th>
                  <th className="p-3">ผู้เข้าร่วม (ผู้ใช้ & บทบาท)</th>
                  <th className="p-3">ประเภทกิจกรรม</th>
                  <th className="p-3">จำเป็น</th>
                  <th className="p-3">รายละเอียด (รายละเอียดบันทึก)</th>
                  <th className="p-3 text-right"> อุปกรณ์ (อุปกรณ์)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {auditLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-3 text-slate-300 font-mono text-[11px] whitespace-nowrap">{log.timestamp}</td>
                    <td className="p-3 font-semibold text-white">{log.user}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.action.includes('CLAIM') ? 'bg-rose-500/20 text-rose-400' :
                        log.action.includes('CREATE') ? 'bg-emerald-500/20 text-emerald-400' :
                        log.action.includes('UPDATE') ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3 text-slate-300">{log.module}</td>
                    <td className="p-3 text-slate-200">{log.detail}</td>
                    <td className="p-3 text-right text-slate-400 text-[11px] font-mono">{log.device}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- โมดอลทั้งหมดสำหรับการสร้างและแก้ไข --- */}

      {/* โมดอล: ธุรกรรมใหม่ */}
      {activeModal === 'newTransaction' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-lg rounded-2xl p-6 relative">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2"><DollarSign className="w-5 h-5 text-emerald-400" /> บันทึกเก็บข้อมูลใหม่</h3>
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1"> ประเภทใด</label>
                  <select value={transForm.transactionType} onChange={e => setTransForm({...transForm, transactionType: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white">
                    <option value="income">รายรับ (รายได้)</option>
                    <option value="expense">รายจ่าย (ค่าใช้จ่าย)</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1"> หมวดหมู่บัญชี</label>
                  <select value={transForm.category} onChange={e => setTransForm({...transForm, category: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white">
                    <option value="ชำระเงินงวดงวด/ มัดจำ"> ชำระค่างวด/ มัดจำ</option>
                    <option value="ค่าชนะประมูลรถชนะ">ค่าประมูลรถ</option>
                    <option value="ค่าขนส่งเรือบรรทุก">ค่าขนส่งเรือคอนเทนเนอร์</option>
                    <option value="ค่าบริการฝากแพ็ก">ค่าบริการฝากแพ็ก</option>
                    <option value="ค่าอะไหล่/งานช่าง">ค่าอะไหล่/งานช่าง</option>
                    <option value="เบ็ดเตล็ด"> เบ็ดเตล็ด</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1"> นี้</label>
                  <select value={transForm.accountBank} onChange={e => setTransForm({...transForm, accountBank: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white">
                    <option value="KBANK THB">KBANK THB</option>
                    <option value="SCB THB">SCB THB</option>
                    <option value="MUFG JPY">MUFG JPY (ญี่ปุ่น)</option>
                    <option value="BCA IDR">BCA IDR (สาธารณรัฐเช็ก)</option>
                    <option value=" เงินสด THB/JPY"> เงินสด (เงินสด)</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">ที่นี่</label>
                  <select value={transForm.currency} onChange={e => setTransForm({...transForm, currency: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white">
                    <option value="THB">บาทไทย (THB)</option>
                    <option value="JPY">เยนญี่ปุ่น (JPY)</option>
                    <option value="IDR">รูเปียห์ห์ประธานาธิบดี (IDR)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1"> การถ่ายในสกุลนั้น</label>
                  <input type="number" value={transForm.amount} onChange={e => setTransForm({...transForm, amount: parseFloat(e.target.value) || 0})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white font-bold" />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1"> อัตราแลกเปลี่ยนเป็นบาท (เรท)</label>
                  <input type="number" step="0.0001" value={transForm.exchangeRateToThb} onChange={e => setTransForm({...transForm, exchangeRateToThb: parseFloat(e.target.value) || 1.0})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white" />
                </div>
              </div>

              <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-700 flex justify-between text-xs font-bold text-amber-400">
                <span> คำนวณรวมมูลค่าเป็นบาท (บาทเทียบเท่า):</span>
                ฿ {(transForm.amount * transForm.exchangeRateToThb).toLocaleString()} THB</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">อ้างอิงรหัสรถ</label>
                  <input type="text" value={transForm.vehicleRef} onChange={e => setTransForm({...transForm, vehicleRef: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white" />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">อ้างอิงลูกค้า / ฐานข้อมูล</label>
                  <input type="text" value={transForm.customerRef} onChange={e => setTransForm({...transForm, customerRef: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white" />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">หมายเหตุ / บันทึกเพิ่มเติม</label>
                <input type="text" value={transForm.note} onChange={e => setTransForm({...transForm, note: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white" />
              </div>

              <ปุ่ม
                onClick={() => {
                  const newTx = {
                    id: `TX-${Date.now().toString().slice(-3)}`,
                    ประเภท: transForm.transactionType,
                    หมวดหมู่: transForm.category,
                    accountBank: transForm.accountBank,
                    จำนวนเงิน: transForm.amount,
                    สกุลเงิน: transForm.currency,
                    exchangeRateToThb: transForm.exchangeRateToThb,
                    amountThb: transForm.amount * transForm.exchangeRateToThb,
                    slipUrl: transForm.slipUrl,
                    vehicleRef: transForm.vehicleRef,
                    customerRef: transForm.customerRef,
                    หมายเหตุ: transForm.note,
                    วันที่: new Date().toISOString().replace('T', ' ').slice(0, 16)
                  };
                  setTransactions([newTx, ...ธุรกรรม]);
                  addAuditLog('[FINANCE]', 'การเงิน 3 วัฒนธรรม', `บันทึกเรื่องราวใหม่ ${newTx.type} ต่อ ${newTx.amount} ${newTx.currency} (${newTx.note})`);
                  alert(' บันทึกเรื่องราวต่างๆ ที่เกิดขึ้น!');
                  setActiveModal(null);
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-lg transition mt-2"
              >
                💾บันทึกเรื่องราว
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: การโอนเงิน FX ใหม่ */}
      {activeModal === 'newFxTransfer' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-lg rounded-2xl p-6 relative">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2"><ArrowRightLeft className="w-5 h-5 text-purple-400" /> บันทึกโอนย้าย / อธิบายเงิน FX</h3>
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">บัญชีต้นทาง (จาก)</label>
                  <select value={fxForm.fromAccount} onChange={e => setFxForm({...fxForm, fromAccount: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white">
                    <option value="KBANK THB">KBANK THB</option>
                    <option value="SCB THB">SCB THB</option>
                    <option value="MUFG JPY">MUFG JPY</option>
                    <option value="BCA IDR">BCA IDR</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">บัญชีรับเข้าปลายทาง (ถึง)</label>
                  <select value={fxForm.toAccount} onChange={e => setFxForm({...fxForm, toAccount: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white">
                    <option value="MUFG JPY">MUFG JPY (ญี่ปุ่น)</option>
                    <option value="BCA IDR">BCA IDR (สาธารณรัฐเช็ก)</option>
                    <option value="KBANK THB">KBANK THB</option>
                    <option value="SCB THB">SCB THB</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1"> ไม่ยอมโอนออก</label>
                  <input type="number" value={fxForm.amountOut} onChange={e => setFxForm({...fxForm, amountOut: parseFloat(e.target.value) || 0})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white font-bold" />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1"> อัตราแลกเปลี่ยนจริง (อัตราแลกเปลี่ยน)</label>
                  <input type="number" step="0.0001" value={fxForm.fxRate} onChange={e => setFxForm({...fxForm, fxRate: parseFloat(e.target.value) || 0.2320})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white" />
                </div>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-xl border border-purple-500/30 space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>ยินดีรับเข้าปลายทางอย่างต่อเนื่อง:</span>
                  <span className="font-bold text-purple-400">
                    {fxForm.fromAccount.includes('THB') ? `¥ ${(fxForm.amountOut / fxForm.fxRate).toLocaleString()} JPY` : `฿ ${(fxForm.amountOut * fxForm.fxRate).toLocaleString()} THB`}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span> กำไร/ ขึ้นอยู่กับค่าเงิน (FX Gain):</span>
                  <span className="text-emerald-400 font-bold">+ ฿ {fxForm.fxGainLossThb.toLocaleString()} THB</span>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">หมายเหตุการแลกเปลี่ยนเงิน</label>
                <input type="text" value={fxForm.note} onChange={e => setFxForm({...fxForm, note: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white" />
              </div>

              <ปุ่ม
                onClick={() => {
                  const newFxTx = {
                    id: `TX-${Date.now().toString().slice(-3)}`,
                    ประเภท: 'fx_transfer'
                    หมวดหมู่: 'แลกเปลี่ยนเงิน FX',
                    accountBank: `${fxForm.fromAccount} -> ${fxForm.toAccount}`,
                    จำนวนเงิน: fxForm.amountOut,
                    สกุลเงิน: 'THB'
                    exchangeRateToThb: 1.0,
                    amountThb: fxForm.amountOut,
                    slipUrl: '',
                    vehicleRef: 'SYSTEM',
                    customerRef: fxForm.toAccount,
                    หมายเหตุ: fxForm.note,
                    วันที่: new Date().toISOString().replace('T', ' ').slice(0, 16)
                  };
                  setTransactions([newFxTx, ...ธุรกรรม]);
                  addAuditLog('[FINANCE]', 'การเงิน 3 เหรียญ', ` บันทึกโอนเงิน FX: ${fxForm.fromAccount} -> ${fxForm.toAccount} มากกว่า ${fxForm.amountOut} THB`);
                  alert(' บันทึกการโอนเงิน FX อย่างเป็นทางการ!');
                  setActiveModal(null);
                }}
                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 rounded-lg transition mt-2"
              >
                💾 บันทึกประจำวันของ FX
              </button>
            </div>
          </div>
        </div>
      )}

      {/* โมดอล: แก้ไขธุรกรรม */}
      {activeModal === 'แก้ไขธุรกรรม' && แก้ไข TransForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-lg rounded-2xl p-6 relative">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2"><Edit3 className="w-5 h-5 text-amber-400" />เขาจะรายการต่อไปนี้ {editTransForm.id}</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">หมายเหตุ / คำอธิบาย</label>
                <input type="text" value={editTransForm.note} onChange={e => setEditTransForm({...editTransForm, note: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1"> อย่างเป็นทางการ</label>
                  <input type="number" value={editTransForm.amount} onChange={e => setEditTransForm({...editTransForm, amount: parseFloat(e.target.value) || 0, amountThb: (parseFloat(e.target.value) || 0) * editTransForm.exchangeRateToThb})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white font-bold" />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1"> อัตราแลกเปลี่ยนเป็นบาท</label>
                  <input type="number" step="0.0001" value={editTransForm.exchangeRateToThb} onChange={e => setEditTransForm({...editTransForm, exchangeRateToThb: parseFloat(e.target.value) || 1.0, amountThb: editTransForm.amount * (parseFloat(e.target.value) || 1.0)})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white" />
                </div>
              </div>

              <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-700 flex justify-between text-xs font-bold text-emerald-400">
                <span>มูลค่าคำนวณเป็นบาทใหม่:</span>
                <span>฿ {editTransForm.amountThb.toLocaleString()} บาท</span>
              </div>

              <ปุ่ม
                onClick={() => {
                  setTransactions(transactions.map(t => t.id === editTransForm.id ? editTransForm : t));
                  addAuditLog('[UPDATE]', 'การเงิน 3 พระราชวัง', `แก้ไข ${editTransForm.id} ติดตามใหม่ ${editTransForm.amount} ${editTransForm.currency}`);
                  alert(' การอัปเดตข้อมูลล่าสุดนี้!');
                  setActiveModal(null);
                }}
                className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-2.5 rounded-lg transition mt-2"
              >
                💾 นั่นคือเหตุผล
              </button>
            </div>
          </div>
        </div>
      )}

      {/* โมดอล: แก้ไขข้อมูลลูกค้า */}
      {activeModal === 'editCustomer' && editingItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-lg rounded-2xl p-6 relative">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2"><Edit3 className="w-5 h-5 text-amber-400" />เผยแพร่ข้อมูลลูกค้า ({editingItem.name})</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">ชื่อลูกค้า</label>
                <input type="text" value={editingItem.name} onChange={e => setEditingItem({...editingItem, name: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">เบอร์โทรศัพท์</label>
                  <input type="text" value={editingItem.phone} onChange={e => setEditingItem({...editingItem, phone: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white" />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1"> วงเงินเครดิต (THB)</label>
                  <input type="number" value={editingItem.creditLimitThb} onChange={e => setEditingItem({...editingItem, creditLimitThb: parseFloat(e.target.value) || 0})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white font-bold text-emerald-400" />
                </div>
              </div>
              <ปุ่ม
                onClick={() => {
                  addAuditLog('[UPDATE]', 'ลูกค้า & Statement', `แก้ไขข้อมูลลูกค้า ${editingItem.name}`);
                  alert(' บันทึกและข้อมูลของลูกค้าทันที!');
                  setActiveModal(null);
                }}
                className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-2.5 rounded-lg transition mt-2"
              >
                💾 นั่นคือเหตุผล
              </button>
            </div>
          </div>
        </div>
      )}

      {/* โมดอล: แก้ไขยานพาหนะ */}
      {activeModal === 'editVehicle' && editingItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-lg rounded-2xl p-6 relative my-8">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2"><Edit3 className="w-5 h-5 text-amber-400" />ติดข้อมูลรถ ({editingItem.bikeCode})</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">ชื่อรุ่นรถ</label>
                <input type="text" value={editingItem.modelName} onChange={e => setEditingItem({...editingItem, modelName: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1"> ต้นทุนประมูล (JPY)</label>
                  <input type="number" value={editingItem.costJpy} onChange={e => setEditingItem({...editingItem, costJpy: parseFloat(e.target.value) || 0})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white" />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">กำไรกลุ่มเป้าหมาย (THB)</label>
                  <input type="number" value={editingItem.targetProfitThb} onChange={e => setEditingItem({...editingItem, targetProfitThb: parseFloat(e.target.value) || 0})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white font-bold text-emerald-400" />
                </div>
              </div>
              <ปุ่ม
                onClick={() => {
                  addAuditLog('[UPDATE]', 'สต็อกรถ', `แก้ไขข้อมูลรถ ${editingItem.bikeCode} (${editingItem.modelName})`);
                  alert(' บันทึกนี้จริงข้อมูลรถ!');
                  setActiveModal(null);
                }}
                className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-2.5 rounded-lg transition mt-2"
              >
                💾 นั่นคือเหตุผล
              </button>
            </div>
          </div>
        </div>
      )}

      {/* โมดอล: ลูกค้าใหม่ */}
      {activeModal === 'newCustomer' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-lg rounded-2xl p-6 relative">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-blue-400" />เก็บข้อมูลลูกค้าใหม่</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">ชื่อ-นามสกุลนามสกุล</label>
                <input type="text" value={custForm.name} onChange={e => setCustForm({...custForm, name: e.target.value})} placeholder="เช่นคุณอนันต์ชัยเจริญ" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white" />
              </div>
              <ปุ่ม
                onClick={() => {
                  addAuditLog('[CREATE]', 'ลูกค้า & Statement', `เพิ่มลูกค้าใหม่: ${custForm.name || 'คุณอนันต์'}`);
                  alert(' บันทึกข้อมูลลูกค้าใหม่ได้แล้ว!');
                  setActiveModal(null);
                }}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-lg transition mt-2"
              >
                ฝากถึงลูกค้าใหม่
              </button>
            </div>
          </div>
        </div>
      )}

      {/* รุ่น: รถยนต์ใหม่ */}
      {activeModal === 'newVehicle' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-xl rounded-2xl p-6 relative my-8">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2"><Layers className="w-5 h-5 text-emerald-400" /> ลงทะเบียนรถใหม่ & ตรวจนับเหยียบ</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">ชื่อรุ่นรถ</label>
                <input type="text" value={vehForm.modelName} onChange={e => setVehForm({...vehForm, modelName: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white" />
              </div>

              {/* การขยายแบบฟอร์มเอกสารการลงทะเบียนแบบไดนามิก */}
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-slate-200 font-bold">
                  <อินพุต
                    ประเภท "ช่องทำเครื่องหมาย"
                    checked={vehForm.hasRegistrationDocs}
                    onChange={e => setVehForm({...vehForm, hasRegistrationDocs: e.target.checked})}
                    className="w-4 h-4 accent-emerald-500 rounded"
                  />
                  [x] มีเอกสารทะเบียน / ใบยกเลิกทะเบียน
                </label>

                {vehForm.hasRegistrationDocs && (
                  <div className="pt-2 space-y-2 border-t border-slate-800">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1"> ประเภทเอกสาร</label>
                        <select value={vehForm.docType} onChange={e => setVehForm({...vehForm, docType: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white text-xs">
                          <option value="ใบยกเลิกทะเบียนญี่ปุ่น (Massho)">ใบยกเลิกทะเบียนญี่ปุ่น (Massho)</option>
                          <option value="เล่มทะเบียนไทย">เล่มทะเบียนไทย</option>
                          <option value="ใบเสียภาษีนอกแบบ 32">ใบเสียภาษีภายนอกแบบ 32</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">เลขที่เอกสาร</label>
                        <input type="text" value={vehForm.docNumber} onChange={e => setVehForm({...vehForm, docNumber: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white text-xs" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <ปุ่ม
                onClick={() => {
                  addAuditLog('[CREATE]', 'สต็อกรถ', `ลงทะเบียนรถใหม่ ${vehForm.bikeCode} (${vehForm.modelName})`);
                  alert('ลงทะเบียนรถใหม่ได้เลย!');
                  setActiveModal(null);
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-lg transition mt-2"
              >
                ลงทะเบียนรถ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* โมดอล: CLAIM CCP ABSORB */}
      {activeModal === 'claimModal' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-lg rounded-2xl p-6 relative">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2 text-rose-400"><ShieldAlert className="w-5 h-5" /> การจัดเก็บการม "CCP รับจบ"</h3>
            <p className="text-xs text-slate-400 mb-4">กรณีเกิดการขนส่งสินค้าระหว่างจัดส่งและ CCP Bike รับผิดชอบคำบรรยายพอร์ตค่าใช้จ่ายเอง</p>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">ความยิ่งใหญ่ที่ CCP รับจบ (บาท)</label>
                <อินพุต
                  ประเภท="หมายเลข"
                  ค่า = {claimForm.absorbedAmountThb}
                  onChange={e => setClaimForm({...claimForm, AbsorbedAmountThb: parseFloat(e.target.value) || 0})}
                  className="w-full bg-slate-900 border border-rose-500/50 rounded-lg p-2.5 text-rose-400 font-bold text-base"
                />
              </div>

              <div className="p-4 bg-rose-950/40 border border-rose-600/40 rounded-xl space-y-2">
                <div className="flex justify-between text-slate-300">
                  <span>กำไรเป้าหมายเดิม:</span>
                  <span className="font-bold">฿ {claimForm.targetProfitThb.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-rose-400">
                  <span>หักค่าเซลล์ม CCP รับจบ:</span>
                  <span className="font-bold">- ฿ {claimForm.absorbedAmountThb.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-rose-800/50 flex justify-between text-sm font-bold text-white">
                  <span>กำไรสุทธิคงเหลือจริง:</span>
                  <span className={isProfitBelowFloor ? "text-rose-400" : "text-emerald-400"}>
                    ฿ {currentProfitAfterClaim.toLocaleString()}
                  </span>
                </div>
                <div className="text-rose-300 mt-1 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> 📉 กำไรของคันนี้ลดลง -{profitReductionPercent}% จากกลุ่มเป้าหมายเดิม
                </div>
              </div>

              {กำไรต่ำกว่าพื้น && (
                <div className="p-3 bg-amber-950/50 border border-amber-600/40 rounded-xl space-y-2">
                  <div className="text-amber-300 font-semibold flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" /> [⚠️ มาตรการป้องกันกำไรต่ำกว่าราคาพื้น]
                  </div>
                  <p className="text-slate-400">กำไรสุทธิต่ำกว่าเกณฑ์ที่ปลอดภัย ( ขั้นต่ำ ฿{claimForm.minProfitFloorThb.toLocaleString()}) คอใส่ระฆังเจ้าของร้านเพื่ออนุมัติ:</p>
                  <อินพุต
                    ประเภท "รหัสผ่าน"
                    placeholder="ใส่รหัสผ่าน Owner"
                    ค่า = {claimForm.ownerPassword}
                    onChange={e => setClaimForm({...claimForm, ownerPassword: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
              )}

              <ปุ่ม
                onClick={() => {
                  ถ้า (กำไรต่ำกว่าพื้น และ !รหัสผ่านเจ้าของแบบฟอร์มเรียกร้อง) {
                    alert('กรุณาใส่รหัสผ่าน Ownerติดตามเพราะกำไรต่ำกว่าเกณฑ์!');
                    กลับ;
                  }
                  addAuditLog('[CLAIM]', 'ระบบเคลม', `อนุมัติบันทึกค่าเคลม CCP รับจบในส่วน ฿${claimForm.absorbedAmountThb.toLocaleString()} [BIKE-01]`);
                  alert('อนุมัติบันทึกค่าเซลล์ม CCP รับจบทันที!');
                  setActiveModal(null);
                }}
                className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-2.5 rounded-lg transition"
              >
                🐠 ตรวจจับค่าเคลื่อนที่
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
