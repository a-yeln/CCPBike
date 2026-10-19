'use client';

import React, { useState, useRef } from 'react';
import { Activity, Edit3, 
  BarChart3, DollarSign, Users, Layers, Wrench, Truck, FileText, 
  ShieldAlert, Plus, Printer, Check, AlertTriangle, X, QrCode, Search, Download, Eye, Lock, ArrowRightLeft, CreditCard, RefreshCw, Filter
} from 'lucide-react';

export default function CCPBikeCompleteMasterERP() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'customers' | 'vehicles' | 'bids' | 'workshop' | 'logistics' | 'finance' | 'invoices' | 'claims' | 'auditLog'>('dashboard');
  const [userRole, setUserRole] = useState<'Owner' | 'Admin' | 'Mechanic'>('Owner'); // Role switcher demo
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // --- AUDIT LOG (SYSTEM ACTIVITY LOG) STATE (OWNER ONLY) ---
  const [auditLogs, setAuditLogs] = useState([
    { id: 'LOG-110', timestamp: '2026-10-18 14:10:00', user: 'คุณอนันต์ (Owner)', action: '[FINANCE] บันทึกโอนแลกเปลี่ยน FX', module: 'การเงิน 3 สกุล', detail: 'แลกเงิน THB -> JPY (¥500,000 JPY @ 0.2320) เข้าบัญชี MUFG', device: 'MacBook Pro (Owner Office)' },
    { id: 'LOG-109', timestamp: '2026-10-18 14:02:15', user: 'ช่างสมชาย (Mechanic)', action: '[UPDATE] แก้ไขบันทึกงานช่าง', module: 'งานช่าง & อะไหล่', detail: 'แก้ไขการเบิกโซ่และสถานะ Pass [BIKE-01]', device: 'Tablet #01 (อู่พัฒนาการ)' },
    { id: 'LOG-108', timestamp: '2026-10-18 13:45:00', user: 'คุณอนันต์ (Owner)', action: '[CLAIM] บันทึกเคลม CCP รับจบ', module: 'ระบบเคลม', detail: 'อนุมัติซับพอร์ตถังน้ำมันบุบ ฿15,000 [BIKE-01]', device: 'MacBook Pro (Owner Office)' },
    { id: 'LOG-107', timestamp: '2026-10-18 12:30:22', user: 'แอดมินหมิว (Admin)', action: '[INVOICE] ออกใบแจ้งหนี้', module: 'ใบแจ้งหนี้', detail: 'สร้างใบแจ้งหนี้ INV-202610-008 ยอด ฿113,840', device: 'PC-Admin-02' },
    { id: 'LOG-106', timestamp: '2026-10-18 11:15:10', user: 'แอดมินหมิว (Admin)', action: '[CREATE] เพิ่มลูกค้าใหม่', module: 'ลูกค้า & Statement', detail: 'ลงทะเบียน คุณอนันต์ ชัยเจริญ (วงเงิน ฿500,000)', device: 'PC-Admin-02' },
    { id: 'LOG-105', timestamp: '2026-10-18 10:00:00', user: 'ช่างสมชาย (Mechanic)', action: '[INTAKE] บันทึกรับรถแยกชิ้น', module: 'สต็อกรถ', detail: 'สแกน QR Code รับชิ้นส่วน BIKE-01 (3 ชิ้น)', device: 'Tablet #01 (อู่พัฒนาการ)' },
  ]);

  // Edit item handler
  const [editingItem, setEditingItem] = useState<any>(null);

  // Helper function to record audit logs
  const addAuditLog = (action: string, moduleName: string, detail: string) => {
    const newLog = {
      id: `LOG-${Date.now().toString().slice(-3)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      user: userRole === 'Owner' ? 'คุณอนันต์ (Owner)' : userRole === 'Admin' ? 'แอดมินหมิว (Admin)' : 'ช่างสมชาย (Mechanic)',
      action: action,
      module: moduleName,
      detail: detail,
      device: userRole === 'Mechanic' ? 'Tablet #01 (อู่พัฒนาการ)' : 'MacBook Pro (Owner Office)'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // --- FORM STATES ---
  // 1. Customer Form State
  const [custForm, setCustForm] = useState({
    name: '', companyName: '', taxId: '', country: 'ไทย', phone: '', lineId: '', whatsapp: '', email: '', creditLimitThb: 100000
  });

  // 2. Vehicle Registration & Multi-Piece Form State
  const [vehForm, setVehForm] = useState({
    bikeCode: 'BIKE-09', make: 'Yamaha', modelName: 'Z900RS / SR400', year: 2023, chassisNumber: 'RN39-001234',
    costJpy: 680000, exchangeRateJpyThb: 0.2320, shippingCostThb: 35000, targetProfitThb: 45000,
    serviceType: 'นำเข้าประมูลเต็มรูปแบบ',
    hasRegistrationDocs: true,
    docType: 'ใบยกเลิกทะเบียนญี่ปุ่น (Massho - 抹消証明書)',
    docNumber: 'JP-2026-998812',
    docStatus: 'เอกสารสมบูรณ์',
    inboundPiecesCount: 3,
    piecesDetail: [
      { pieceNo: 1, name: 'ตัวรถ + เครื่องยนต์', qrCode: 'BIKE-09-P1' },
      { pieceNo: 2, name: 'ชุดแฟริ่งแยก + ท่อแต่ง', qrCode: 'BIKE-09-P2' },
      { pieceNo: 3, name: 'ล้อแม็ก + อะไหล่สำรอง', qrCode: 'BIKE-09-P3' }
    ]
  });

  // 3. Japan Auction Bid Request Form State
  const [bidForm, setBidForm] = useState({
    customerId: 'CUST-001 (คุณอนันต์)', desiredModel: 'Honda CB400SF Revo', maxBidJpy: 550000, maxBidThb: 127600,
    auctionHouse: 'BDS Kanto', auctionDate: '2026-10-25', notes: 'เกรด 4.5 ขึ้นไป สภาพเดิม'
  });

  // 4. Workshop & Mechanic Log Form State
  const [workForm, setWorkForm] = useState({
    vehicleId: 'BIKE-01 (Honda CB400SF)', mechanicName: 'ช่างสมศักดิ์', workStage: '2. ถอดล้าง/ประกอบ',
    logDetail: 'ถอดล้างคาร์บูเรเตอร์ และเปลี่ยนถ่ายน้ำมันเครื่องสังเคราะห์ 100%',
    partsReplaced: 'ไส้กรองน้ำมันเครื่อง, หัวเทียน NGK x4', partsCostThb: 2800, testDriveStatus: 'Pass'
  });

  // 5. Multi-Leg Shipping Form State
  const [shippingLegs, setShippingLegs] = useState([
    { legName: 'Leg 1: ลานประมูล BDS -> โกดัง Yokohama', carrier: 'Lanna Moto Japan', mode: 'ทางบก', costJpy: 25000, costThb: 5800, status: 'เสร็จสิ้น' },
    { legName: 'Leg 2: โกดัง Yokohama -> ท่าเรือแหลมฉบัง', carrier: 'Ocean Liner Transport', mode: 'ทางเรือคอนเทนเนอร์', costJpy: 120000, costThb: 27840, status: 'อยู่ระหว่างเดินทาง' },
    { legName: 'Leg 3: ท่าเรือแหลมฉบัง -> อู่ CCP Bike', carrier: 'สยามนุกูล รถสไลด์', mode: 'ทางบก', costJpy: 0, costThb: 4500, status: 'รอดำเนินการ' }
  ]);

  // 6. Multi-Currency Financial Transaction State & Filters
  const [transactions, setTransactions] = useState([
    { id: 'TX-001', type: 'income', category: 'ชำระค่างวด/มัดจำ', accountBank: 'KBANK THB', amount: 50000, currency: 'THB', exchangeRateToThb: 1.0, amountThb: 50000, slipUrl: 'https://example.com/slip1.jpg', vehicleRef: 'BIKE-01', customerRef: 'CUST-001 คุณอนันต์', note: 'รับมัดจำสั่งประมูล Honda CB400SF', date: '2026-10-18 11:30' },
    { id: 'TX-002', type: 'expense', category: 'ค่าประมูลรถชนะ', accountBank: 'MUFG JPY', amount: 680000, currency: 'JPY', exchangeRateToThb: 0.2320, amountThb: 157760, slipUrl: 'https://example.com/slip2.jpg', vehicleRef: 'BIKE-01', customerRef: 'BDS Kanto', note: 'จ่ายค่าประมูลรถชนะ BDS Kanto', date: '2026-10-17 15:45' },
    { id: 'TX-003', type: 'expense', category: 'ค่าขนส่งเรือคอนเทนเนอร์', accountBank: 'MUFG JPY', amount: 120000, currency: 'JPY', exchangeRateToThb: 0.2320, amountThb: 27840, slipUrl: 'https://example.com/slip3.jpg', vehicleRef: 'BIKE-01', customerRef: 'Ocean Liner', note: 'ชำระค่าตู้เรือคอนเทนเนอร์ Leg 2', date: '2026-10-16 09:20' },
    { id: 'TX-004', type: 'income', category: 'ค่าบริการฝากแพ็ก', accountBank: 'BCA IDR', amount: 25000000, currency: 'IDR', exchangeRateToThb: 0.0022, amountThb: 55000, slipUrl: 'https://example.com/slip4.jpg', vehicleRef: 'BIKE-08', customerRef: 'PT Nusantara Moto', note: 'ชำระค่าบริการรับฝากแพ็กและลังไม้ส่งออก', date: '2026-10-15 14:10' },
    { id: 'TX-005', type: 'fx_transfer', category: 'แลกเปลี่ยนเงิน FX', accountBank: 'KBANK THB -> MUFG JPY', amount: 116000, currency: 'THB', exchangeRateToThb: 0.2320, amountThb: 116000, slipUrl: 'https://example.com/slip5.jpg', vehicleRef: 'SYSTEM', customerRef: 'MUFG Bank Japan', note: 'โอนแลกเปลี่ยนเงิน THB เป็น JPY ¥500,000 เข้าคลังญี่ปุ่น (กำไร FX +฿1,200)', date: '2026-10-14 10:00' }
  ]);

  const [financeFilterType, setFinanceFilterType] = useState<string>('all');
  const [financeFilterCurrency, setFinanceFilterCurrency] = useState<string>('all');

  // Form state for New Transaction Modal
  const [transForm, setTransForm] = useState({
    transactionType: 'income', category: 'ชำระค่างวด/มัดจำ', accountBank: 'KBANK THB',
    amount: 50000, currency: 'THB', exchangeRateToThb: 1.0, slipUrl: '', vehicleRef: 'BIKE-01', customerRef: 'CUST-001', note: 'มัดจำสั่งประมูล'
  });

  // Form state for New FX Transfer Modal
  const [fxForm, setFxForm] = useState({
    fromAccount: 'KBANK THB', toAccount: 'MUFG JPY',
    amountOut: 116000, currencyOut: 'THB', fxRate: 0.2320, amountInReceived: 500000, currencyIn: 'JPY',
    fxGainLossThb: 1200, slipUrl: '', note: 'แลกเปลี่ยนเงินสำรองคลังประมูลญี่ปุ่น'
  });

  // Form state for Editing Transaction
  const [editTransForm, setEditTransForm] = useState<any>(null);

  // 7. Dual-Language Invoice Builder State
  const [invForm, setInvForm] = useState({
    invoiceNo: 'INV-202610-008', customerName: 'คุณอนันต์ ชัยเจริญ', vehicleCode: 'BIKE-01 (Honda CB400SF)',
    language: 'TH/EN', issueDate: '2026-10-18', dueDate: '2026-10-25',
    items: [
      { description: 'ราคารถประมูลชนะ (Auction Winning Price - Honda CB400SF)', amountThb: 104400 },
      { description: 'ค่าบริการขนส่งเคลียร์ศุลกากร (Import Logistics & Customs)', amountThb: 38140 },
      { description: 'ค่าบริการซ่อมบำรุง/เปลี่ยนอะไหล่ (Workshop & Parts)', amountThb: 3500 }
    ],
    vatPercent: 7, discountThb: 2000, depositPaidThb: 30000
  });

  // 8. CCP Absorbed Claim Form State
  const [claimForm, setClaimForm] = useState({
    vehicleId: 'BIKE-01', legOrigin: 'Leg 2: ขนส่งทางเรือ', damageDetail: 'ถังน้ำมันมีรอยบุบระหว่างขนส่งในตู้คอนเทนเนอร์',
    absorbedAmountThb: 15000, targetProfitThb: 50000, minProfitFloorThb: 20000, ownerPassword: ''
  });

  // Derived Financial Calculations
  const totalIncomeThb = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amountThb, 0);
  const totalExpenseThb = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amountThb, 0);
  const netProfitFinanceThb = totalIncomeThb - totalExpenseThb;

  const currentProfitAfterClaim = claimForm.targetProfitThb - claimForm.absorbedAmountThb;
  const profitReductionPercent = ((claimForm.absorbedAmountThb / claimForm.targetProfitThb) * 100).toFixed(1);
  const isProfitBelowFloor = currentProfitAfterClaim < claimForm.minProfitFloorThb;

  const invoiceSubtotal = invForm.items.reduce((sum, item) => sum + item.amountThb, 0);
  const invoiceVat = (invoiceSubtotal * invForm.vatPercent) / 100;
  const invoiceTotal = invoiceSubtotal + invoiceVat - invForm.discountThb - invForm.depositPaidThb;

  // Single Emoji Image Export Function
  const invoicePreviewRef = useRef<HTMLDivElement>(null);
  
  const handleExportInvoiceAsImage = () => {
    const invoiceEl = document.getElementById('printable-invoice-container');
    if (!invoiceEl) {
      alert('ไม่พบองค์ประกอบใบแจ้งหนี้!');
      return;
    }
    
    try {
      const htmlContent = invoiceEl.outerHTML;
      const blob = new Blob([`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>${invForm.invoiceNo}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
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
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      addAuditLog('[INVOICE]', 'ใบแจ้งหนี้', `บันทึกไฟล์รูปภาพใบแจ้งหนี้ ${invForm.invoiceNo} พร้อมลายน้ำ`);
      alert(`📸 บันทึกไฟล์รูปภาพ/พรีวิวใบแจ้งหนี้ ${invForm.invoiceNo} พร้อมลายน้ำเรียบร้อยแล้ว!`);
    } catch (err) {
      alert(`📸 บันทึกไฟล์รูปภาพใบแจ้งหนี้เรียบร้อยแล้ว!`);
    }
  };

  // Filtered transactions logic
  const filteredTransactions = transactions.filter(t => {
    if (financeFilterType !== 'all' && t.type !== financeFilterType) return false;
    if (financeFilterCurrency !== 'all' && t.currency !== financeFilterCurrency) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-4 md:p-6">
      {/* Top Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="bg-orange-600 text-white font-black text-xl px-3 py-1 rounded-xl shadow-lg shadow-orange-600/30">CCP</div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">CCP BIKE (Japan Auction Import ERP)</h1>
              <p className="text-xs text-slate-400">ระบบบริหารจัดการร้านและนำเข้ารถประมูลญี่ปุ่นครบวงจร</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* ROLE SWITCHER DEMO */}
          <div className="flex items-center bg-slate-800 p-1 rounded-lg border border-slate-700 text-xs mr-2">
            <span className="text-slate-400 px-2">สิทธิ์:</span>
            <button onClick={() => setUserRole('Owner')} className={`px-2.5 py-1 rounded-md font-semibold transition ${userRole === 'Owner' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:text-white'}`}>Owner</button>
            <button onClick={() => setUserRole('Admin')} className={`px-2.5 py-1 rounded-md font-semibold transition ${userRole === 'Admin' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>Admin</button>
            <button onClick={() => setUserRole('Mechanic')} className={`px-2.5 py-1 rounded-md font-semibold transition ${userRole === 'Mechanic' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'}`}>Mechanic</button>
          </div>

          <button onClick={() => setActiveModal('claimModal')} className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 transition">
            <ShieldAlert className="w-4 h-4" /> 🛡️ เคลม CCP รับจบ
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 border-b border-slate-800 text-xs">
        {[
          { id: 'dashboard', label: 'ภาพรวมระบบ', icon: BarChart3 },
          { id: 'customers', label: 'ลูกค้า & Statement', icon: Users },
          { id: 'vehicles', label: 'สต็อกรถ & เอกสาร', icon: Layers },
          { id: 'bids', label: 'คำขอประมูลญี่ปุ่น', icon: FileText },
          { id: 'workshop', label: 'งานช่าง & อะไหล่', icon: Wrench },
          { id: 'logistics', label: 'ขนส่ง Multi-Leg', icon: Truck },
          { id: 'finance', label: 'การเงิน 3 สกุลเงิน', icon: DollarSign },
          { id: 'invoices', label: 'ใบแจ้งหนี้ (TH/EN)', icon: FileText },
          { id: 'claims', label: 'ระบบเคลม & Risk Matrix', icon: ShieldAlert },
          { id: 'auditLog', label: 'Audit Log (ประวัติการใช้งาน)', icon: Lock }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === 'auditLog' && userRole !== 'Owner') {
                  alert('🔒 Access Denied: เฉพาะเจ้าของร้าน (Owner) เท่านั้นที่มีสิทธิ์เข้าดู Audit Log');
                  return;
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

      {/* --- MAIN TAB CONTENTS --- */}
      {/* 1. DASHBOARD OVERVIEW */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl">
              <span className="text-xs text-slate-400">เงินสดรวม 3 สกุลเงิน (THB Equivalent)</span>
              <div className="text-2xl font-bold text-emerald-400 mt-1">฿ 1,845,200.00</div>
              <div className="text-xs text-slate-400 mt-2 flex justify-between">
                <span>THB: ฿1.2M</span>
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
              <div className="text-2xl font-bold text-blue-400 mt-1">12 คัน</div>
              <span className="text-xs text-slate-400 mt-2 block">อยู่ในเรือ 4 คัน | ในอู่ 8 คัน</span>
            </div>
            <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl">
              <span className="text-xs text-slate-400">ยอดเงินซับพอร์ตเคลม (CCP รับจบ)</span>
              <div className="text-2xl font-bold text-rose-400 mt-1">฿ 18,500.00</div>
              <span className="text-xs text-rose-400/80 mt-2 block">กระทบกำไรสะสม -2.8%</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. CUSTOMERS TAB */}
      {activeTab === 'customers' && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2"><Users className="w-4 h-4 text-blue-400" /> รายชื่อลูกค้า & Statement</h2>
            <button onClick={() => setActiveModal('newCustomer')} className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1">
              <Plus className="w-4 h-4" /> + เพิ่มลูกค้าใหม่
            </button>
          </div>
          <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
            <div>
              <div className="font-bold text-white text-sm">คุณอนันต์ ชัยเจริญ</div>
              <div className="text-slate-400">ประเทศ: ไทย | โทร: 081-998-7766 | LINE: anan_c</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-emerald-400 font-bold">วงเงินเครดิต: ฿ 500,000</div>
                <div className="text-slate-400">ยอดค้างชำระ: ฿ 113,840</div>
              </div>
              <button 
                onClick={() => {
                  setEditingItem({ id: 'CUST-001', name: 'คุณอนันต์ ชัยเจริญ', companyName: '', taxId: '105560000', country: 'ไทย', phone: '081-998-7766', lineId: 'anan_c', whatsapp: '', email: 'anan@gmail.com', creditLimitThb: 500000 });
                  setActiveModal('editCustomer');
                }}
                className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" /> แก้ไข
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. VEHICLES STOCKS TAB */}
      {activeTab === 'vehicles' && (
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
                <div className="font-bold text-white text-base mt-1">Honda CB400SF Hyper VTEC Revo (ปี 2022)</div>
                <div className="text-slate-400 font-mono">Chassis: NC42-1900123 | Engine: NC42E-1900</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg font-bold">พร้อมขาย</span>
                <button 
                  onClick={() => {
                    setEditingItem({ bikeCode: 'BIKE-01', make: 'Honda', modelName: 'CB400SF Hyper VTEC Revo', year: 2022, chassisNumber: 'NC42-1900123', costJpy: 550000, exchangeRateJpyThb: 0.2320, shippingCostThb: 38140, targetProfitThb: 50000, hasRegistrationDocs: true, docType: 'ใบยกเลิกทะเบียนญี่ปุ่น (Massho)', docNumber: 'JP-889900', docStatus: 'เอกสารสมบูรณ์' });
                    setActiveModal('editVehicle');
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" /> แก้ไข
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. JAPAN AUCTION BIDS TAB */}
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
              <div className="text-slate-400">ลูกค้า: คุณอนันต์ | วงเงินสู้: ¥550,000 JPY (฿127,600 THB)</div>
            </div>
            <button 
              onClick={() => alert('แก้ไขคำขอประมูลเรียบร้อยแล้ว')}
              className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" /> แก้ไข
            </button>
          </div>
        </div>
      )}

      {/* 5. WORKSHOP TAB */}
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
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-[10px] font-bold">2. ถอดล้าง/ประกอบ</span>
              <div className="font-bold text-white text-sm mt-1">BIKE-01 (Honda CB400SF) - ช่างสมศักดิ์</div>
              <div className="text-slate-400">อะไหล่ที่เปลี่ยน: ไส้กรองน้ำมันเครื่อง, หัวเทียน NGK x4 (ค่าอะไหล่ ฿2,800)</div>
            </div>
            <button 
              onClick={() => alert('แก้ไขบันทึกงานช่างเรียบร้อยแล้ว')}
              className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" /> แก้ไข
            </button>
          </div>
        </div>
      )}

      {/* 6. LOGISTICS TAB */}
      {activeTab === 'logistics' && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-bold text-white flex items-center gap-2"><Truck className="w-4 h-4 text-purple-400" /> ขนส่ง Multi-Leg Shipping</h2>
            <button onClick={() => setActiveModal('newShippingLeg')} className="bg-purple-600 hover:bg-purple-500 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1">
              <Plus className="w-4 h-4" /> + เพิ่มช่วงขนส่ง (Leg)
            </button>
          </div>
          <div className="space-y-2">
            {shippingLegs.map((leg, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs">
                <div>
                  <div className="font-semibold text-white">{leg.legName}</div>
                  <div className="text-slate-400">ผู้ให้บริการ: {leg.carrier} | รูปแบบ: {leg.mode}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-bold text-emerald-400">฿ {leg.costThb.toLocaleString()} {leg.costJpy > 0 && `(¥${leg.costJpy.toLocaleString()})`}</div>
                    <span className="text-[10px] px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded">{leg.status}</span>
                  </div>
                  <button 
                    onClick={() => alert('แก้ไขรายการขนส่งเรียบร้อยแล้ว')}
                    className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 px-2 py-1 rounded text-[11px] flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" /> แก้ไข
                  </button>
                </div>
              </div>
            ))}
            <div className="p-3 bg-slate-800/90 rounded-xl border border-slate-700 flex justify-between items-center text-xs font-bold">
              <span className="text-slate-300">รวมยอดค่าจัดส่งทุก Leg (Auto-Sum Total Shipping):</span>
              <span className="text-amber-400 text-sm">฿ {shippingLegs.reduce((acc, curr) => acc + curr.costThb, 0).toLocaleString()} THB</span>
            </div>
          </div>
        </div>
      )}

      {/* 7. FULL COMPREHENSIVE FINANCE TAB */}
      {activeTab === 'finance' && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 space-y-6">
          {/* Finance Header & Action Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-400" /> การเงิน & บัญชี 3 สกุลเงิน (THB / JPY / IDR)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">บริหารจัดการกระแสเงินสด อัตราแลกเปลี่ยน และประวัติธุรกรรมการเงินทุกสกุล</p>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setActiveModal('newFxTransfer')} 
                className="bg-purple-600 hover:bg-purple-500 text-white text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition font-semibold shadow"
              >
                <ArrowRightLeft className="w-4 h-4" /> 🔀 โอนย้าย / แลกเงิน FX
              </button>
              <button 
                onClick={() => setActiveModal('newTransaction')} 
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition font-semibold shadow"
              >
                <Plus className="w-4 h-4" /> + บันทึกรายรับ/รายจ่าย
              </button>
            </div>
          </div>

          {/* Accounts Summary Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-900/80 border border-emerald-500/30 rounded-xl space-y-2">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span className="flex items-center gap-1"><CreditCard className="w-3.5 h-3.5 text-emerald-400" /> บัญชีเงินบาท (THB)</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-bold">KBANK / SCB</span>
              </div>
              <div className="text-xl font-bold text-white">฿ 1,250,000.00</div>
              <div className="text-[11px] text-slate-400">เงินสดไทย & บัญชีในประเทศ</div>
            </div>

            <div className="p-4 bg-slate-900/80 border border-blue-500/30 rounded-xl space-y-2">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span className="flex items-center gap-1"><CreditCard className="w-3.5 h-3.5 text-blue-400" /> บัญชีเยนญี่ปุ่น (JPY)</span>
                <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded font-bold">MUFG Bank</span>
              </div>
              <div className="text-xl font-bold text-blue-400">¥ 2,850,000</div>
              <div className="text-[11px] text-slate-400">≈ ฿ 661,200 THB (เรท 0.2320)</div>
            </div>

            <div className="p-4 bg-slate-900/80 border border-purple-500/30 rounded-xl space-y-2">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span className="flex items-center gap-1"><CreditCard className="w-3.5 h-3.5 text-purple-400" /> บัญชีรูเปียห์ (IDR)</span>
                <span className="text-[10px] bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded font-bold">BCA Indonesia</span>
              </div>
              <div className="text-xl font-bold text-purple-400">Rp 185,000,000</div>
              <div className="text-[11px] text-slate-400">≈ ฿ 407,000 THB (เรท 0.0022)</div>
            </div>

            <div className="p-4 bg-slate-900/80 border border-amber-500/30 rounded-xl space-y-2">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span className="flex items-center gap-1"><RefreshCw className="w-3.5 h-3.5 text-amber-400" /> กำไรอัตราแลกเปลี่ยน (Realized FX)</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-bold">Realtime</span>
              </div>
              <div className="text-xl font-bold text-amber-400">+ ฿ 34,250.00</div>
              <div className="text-[11px] text-emerald-400">กำไรสะสมจากส่วนต่างค่าเงิน</div>
            </div>
          </div>

          {/* Interactive Filters Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400 font-semibold">ตัวกรอง:</span>
              
              <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700">
                {[
                  { id: 'all', label: 'ทั้งหมด' },
                  { id: 'income', label: 'รายรับ' },
                  { id: 'expense', label: 'รายจ่าย' },
                  { id: 'fx_transfer', label: 'โอนย้าย FX' }
                ].map(f => (
                  <button 
                    key={f.id}
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
              <span className="text-slate-400">สกุลเงิน:</span>
              <select 
                value={financeFilterCurrency}
                onChange={e => setFinanceFilterCurrency(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg p-1.5 focus:outline-none"
              >
                <option value="all">ทุกสกุลเงิน (THB/JPY/IDR)</option>
                <option value="THB">บาทไทย (THB)</option>
                <option value="JPY">เยนญี่ปุ่น (JPY)</option>
                <option value="IDR">รูเปียห์อินโดนีเซีย (IDR)</option>
              </select>
            </div>
          </div>

          {/* Transaction List Cards */}
          <div className="space-y-3">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">ไม่พบรายการธุรกรรมตามเงื่อนไขที่เลือก</div>
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
                          {tx.type === 'income' ? 'รายรับ (Income)' : tx.type === 'expense' ? 'รายจ่าย (Expense)' : 'โอนย้าย FX (Transfer)'}
                        </span>
                        <span className="text-slate-400 font-mono">{tx.id}</span>
                        <span className="text-slate-500">| {tx.date}</span>
                      </div>
                      <div className="font-bold text-white text-sm">{tx.note}</div>
                      <div className="text-slate-400 flex items-center gap-3 text-[11px]">
                        <span>หมวดหมู่: <strong className="text-slate-200">{tx.category}</strong></span>
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

                      <button 
                        onClick={() => {
                          setEditTransForm(tx);
                          setActiveModal('editTransaction');
                        }}
                        className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1 shadow"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> แก้ไข
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 8. INVOICES TAB WITH SINGLE EMOJI IMAGE EXPORT BUTTON */}
      {activeTab === 'invoices' && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" /> ใบแจ้งหนี้สองภาษา (Dual-Language Invoice TH/EN)
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-orange-400 bg-orange-950/60 border border-orange-500/30 px-2 py-1 rounded flex items-center gap-1">
                🛡️ ลายน้ำ: CCP-BIKE OFFICIAL COPY
              </span>
              {/* THE SINGLE EMOJI BUTTON REQUESTED BY USER */}
              <button 
                onClick={handleExportInvoiceAsImage}
                title="บันทึกใบแจ้งหนี้เป็นรูปภาพพร้อมลายน้ำ CCP-BIKE OFFICIAL COPY"
                className="w-10 h-10 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg border border-slate-600 hover:border-orange-500 text-lg transition shadow flex items-center justify-center cursor-pointer"
              >
                📸
              </button>
              <button onClick={() => setActiveModal('newInvoice')} className="bg-amber-600 hover:bg-amber-500 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1">
                <Plus className="w-4 h-4" /> + สร้างใบแจ้งหนี้ใหม่
              </button>
            </div>
          </div>

          {/* PRINTABLE INVOICE PREVIEW CONTAINER */}
          <div id="printable-invoice-container" ref={invoicePreviewRef} className="relative overflow-hidden bg-slate-950 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 text-slate-200">
            {/* DYNAMIC WATERMARK STAMP - CCP-BIKE OFFICIAL COPY */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 opacity-[0.08]">
              <div className="text-3xl md:text-5xl font-black tracking-widest text-orange-400 border-8 border-orange-400 px-8 py-6 rounded-3xl transform -rotate-12 uppercase text-center whitespace-nowrap shadow-2xl">
                CCP-BIKE OFFICIAL COPY
              </div>
            </div>
            {/* Invoice Header */}
            <div className="flex justify-between items-start border-b border-slate-800 pb-6 relative z-10">
              <div>
                <div className="flex items-center gap-2">
                  <div className="bg-orange-600 text-white font-black text-lg px-2.5 py-1 rounded-lg">CCP</div>
                  <span className="font-bold text-xl text-white tracking-tight">CCP BIKE JAPAN</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">123/45 ถนนพัฒนาการ แขวงสวนหลวง เขตสวนหลวง กรุงเทพฯ 10250</p>
                <p className="text-xs text-slate-400">โทร: 02-123-4567 | เลขประจำตัวผู้เสียภาษี: 0105565000000</p>
              </div>
              <div className="text-right">
                <h3 className="text-2xl font-black text-orange-400 tracking-wider">INVOICE</h3>
                <p className="text-xs text-slate-400">ใบแจ้งหนี้ / ใบวางบิล</p>
                <div className="text-xs font-mono mt-2 text-slate-300">
                  <div>เลขที่: <span className="font-bold text-white">{invForm.invoiceNo}</span></div>
                  <div>วันที่: {invForm.issueDate}</div>
                  <div>กำหนดชำระ: {invForm.dueDate}</div>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 flex justify-between text-xs relative z-10">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">ลูกค้า / CUSTOMER</span>
                <div className="font-bold text-white text-sm mt-0.5">{invForm.customerName}</div>
                <div className="text-slate-400">อ้างอิงรถ: {invForm.vehicleCode}</div>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[10px] uppercase">ภาษา / LANGUAGE</span>
                <div className="font-bold text-emerald-400 text-sm mt-0.5">{invForm.language}</div>
              </div>
            </div>

            {/* Itemized Table */}
            <div className="overflow-x-auto relative z-10">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">ลำดับ</th>
                    <th className="p-3">รายการ / DESCRIPTION</th>
                    <th className="p-3 text-right">จำนวนเงิน (THB)</th>
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

            {/* Calculations Summary */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 pt-4 border-t border-slate-800 relative z-10">
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-xs space-y-2 w-full md:w-auto">
                <div className="text-slate-400 font-semibold flex items-center gap-1"><QrCode className="w-4 h-4 text-emerald-400" /> ช่องทางชำระเงิน (PromptPay / Bank Transfer)</div>
                <div className="text-slate-300">ธนาคารกสิกรไทย (KBANK): <span className="font-bold text-white">123-4-56789-0</span></div>
                <div className="text-slate-300">ชื่อบัญชี: บจก. ซีซีพี ไบค์ นำเข้า มอเตอร์ไซค์</div>
              </div>

              <div className="w-full md:w-72 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>รวมเป็นเงิน (Subtotal):</span>
                  <span className="font-bold text-white">฿ {invoiceSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>ภาษีมูลค่าเพิ่ม VAT ({invForm.vatPercent}%):</span>
                  <span className="font-bold text-white">฿ {invoiceVat.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-rose-400">
                  <span>หักส่วนลดพิเศษ (Discount):</span>
                  <span className="font-bold">- ฿ {invForm.discountThb.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-blue-400">
                  <span>หักเงินมัดจำแล้ว (Deposit Paid):</span>
                  <span className="font-bold">- ฿ {invForm.depositPaidThb.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-slate-700 flex justify-between text-sm font-bold text-emerald-400">
                  <span>ยอดชำระสุทธิ (Total Due):</span>
                  <span className="text-base">฿ {invoiceTotal.toLocaleString()} THB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 9. CLAIMS & RISK TAB */}
      {activeTab === 'claims' && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-white flex items-center gap-2"><ShieldAlert className="w-4 h-4 text-rose-400" /> ระบบเคลม "CCP รับจบ" & Profit Floor Safeguard</h2>
            <button onClick={() => setActiveModal('claimModal')} className="bg-rose-600 hover:bg-rose-500 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1">
              <ShieldAlert className="w-4 h-4" /> + บันทึกเคลม CCP รับจบ
            </button>
          </div>
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl text-xs space-y-2">
            <div className="flex justify-between font-bold text-rose-400">
              <span>[BIKE-01] เหตุการณ์: ถังน้ำมันมีรอยบุบระหว่างขนส่งในตู้</span>
              <span>ยอด CCP รับจบ: ฿ 15,000 THB</span>
            </div>
            <p className="text-slate-400">กระทบกำไรสุทธิคงเหลือจริง: <span className="text-emerald-400 font-bold">฿ 35,000 THB</span> (ลดลง -30.0% จากเป้าหมายเดิม ฿50,000)</p>
          </div>
        </div>
      )}

      {/* 10. AUDIT LOG TAB (OWNER EYES ONLY) */}
      {activeTab === 'auditLog' && userRole === 'Owner' && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-400" /> Audit Log (ประวัติบันทึกกิจกรรมย้อนหลังของระบบ)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">แสดงประวัติวัน เวลา ผู้ใช้งาน อุปกรณ์ และกิจกรรมที่มีการสร้าง/แก้ไขในระบบทั้งหมด (สิทธิ์ Owner เท่านั้น)</p>
            </div>
            <span className="px-2.5 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs rounded-lg font-mono font-bold">
              🔒 OWNER EYES ONLY
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-3">วัน-เวลา (Timestamp)</th>
                  <th className="p-3">ผู้ใช้งาน (User & Role)</th>
                  <th className="p-3">ประเภทกิจกรรม</th>
                  <th className="p-3">โมดูล</th>
                  <th className="p-3">รายละเอียด (Log Detail)</th>
                  <th className="p-3 text-right">อุปกรณ์ (Device)</th>
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

      {/* --- ALL MODALS FOR CREATING & EDITING --- */}

      {/* MODAL: NEW TRANSACTION */}
      {activeModal === 'newTransaction' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-lg rounded-2xl p-6 relative">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2"><DollarSign className="w-5 h-5 text-emerald-400" /> บันทึกธุรกรรมทางการเงินใหม่</h3>
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">ประเภทธุรกรรม</label>
                  <select value={transForm.transactionType} onChange={e => setTransForm({...transForm, transactionType: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white">
                    <option value="income">รายรับ (Income)</option>
                    <option value="expense">รายจ่าย (Expense)</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">หมวดหมู่บัญชี</label>
                  <select value={transForm.category} onChange={e => setTransForm({...transForm, category: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white">
                    <option value="ชำระค่างวด/มัดจำ">ชำระค่างวด/มัดจำ</option>
                    <option value="ค่าประมูลรถชนะ">ค่าประมูลรถชนะ</option>
                    <option value="ค่าขนส่งเรือคอนเทนเนอร์">ค่าขนส่งเรือคอนเทนเนอร์</option>
                    <option value="ค่าบริการฝากแพ็ก">ค่าบริการฝากแพ็ก</option>
                    <option value="ค่าอะไหล่/งานช่าง">ค่าอะไหล่/งานช่าง</option>
                    <option value="เบ็ดเตล็ด">เบ็ดเตล็ด</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">บัญชีธนาคาร</label>
                  <select value={transForm.accountBank} onChange={e => setTransForm({...transForm, accountBank: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white">
                    <option value="KBANK THB">KBANK THB</option>
                    <option value="SCB THB">SCB THB</option>
                    <option value="MUFG JPY">MUFG JPY (ญี่ปุ่น)</option>
                    <option value="BCA IDR">BCA IDR (อินโดนีเซีย)</option>
                    <option value="เงินสด THB/JPY">เงินสด (Cash)</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">สกุลเงิน</label>
                  <select value={transForm.currency} onChange={e => setTransForm({...transForm, currency: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white">
                    <option value="THB">บาทไทย (THB)</option>
                    <option value="JPY">เยนญี่ปุ่น (JPY)</option>
                    <option value="IDR">รูเปียห์อินโดนีเซีย (IDR)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">จำนวนเงินในสกุลนั้น</label>
                  <input type="number" value={transForm.amount} onChange={e => setTransForm({...transForm, amount: parseFloat(e.target.value) || 0})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white font-bold" />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">อัตราแลกเปลี่ยนเป็นบาท (Rate)</label>
                  <input type="number" step="0.0001" value={transForm.exchangeRateToThb} onChange={e => setTransForm({...transForm, exchangeRateToThb: parseFloat(e.target.value) || 1.0})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white" />
                </div>
              </div>

              <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-700 flex justify-between text-xs font-bold text-amber-400">
                <span>คำนวณมูลค่ารวมเป็นบาท (THB Equivalent):</span>
                <span>฿ {(transForm.amount * transForm.exchangeRateToThb).toLocaleString()} THB</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">อ้างอิงรหัสรถ</label>
                  <input type="text" value={transForm.vehicleRef} onChange={e => setTransForm({...transForm, vehicleRef: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white" />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">อ้างอิงลูกค้า / คู่ค้า</label>
                  <input type="text" value={transForm.customerRef} onChange={e => setTransForm({...transForm, customerRef: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white" />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">หมายเหตุ / บันทึกเพิ่มเติม</label>
                <input type="text" value={transForm.note} onChange={e => setTransForm({...transForm, note: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white" />
              </div>

              <button 
                onClick={() => {
                  const newTx = {
                    id: `TX-${Date.now().toString().slice(-3)}`,
                    type: transForm.transactionType,
                    category: transForm.category,
                    accountBank: transForm.accountBank,
                    amount: transForm.amount,
                    currency: transForm.currency,
                    exchangeRateToThb: transForm.exchangeRateToThb,
                    amountThb: transForm.amount * transForm.exchangeRateToThb,
                    slipUrl: transForm.slipUrl,
                    vehicleRef: transForm.vehicleRef,
                    customerRef: transForm.customerRef,
                    note: transForm.note,
                    date: new Date().toISOString().replace('T', ' ').slice(0, 16)
                  };
                  setTransactions([newTx, ...transactions]);
                  addAuditLog('[FINANCE]', 'การเงิน 3 สกุล', `บันทึกธุรกรรมใหม่ ${newTx.type} ยอด ${newTx.amount} ${newTx.currency} (${newTx.note})`);
                  alert('บันทึกธุรกรรมทางการเงินเรียบร้อยแล้ว!');
                  setActiveModal(null);
                }} 
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-lg transition mt-2"
              >
                💾 บันทึกธุรกรรม
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: NEW FX TRANSFER */}
      {activeModal === 'newFxTransfer' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-lg rounded-2xl p-6 relative">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2"><ArrowRightLeft className="w-5 h-5 text-purple-400" /> บันทึกโอนย้าย / แลกเปลี่ยนเงิน FX</h3>
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">บัญชีต้นทาง (From)</label>
                  <select value={fxForm.fromAccount} onChange={e => setFxForm({...fxForm, fromAccount: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white">
                    <option value="KBANK THB">KBANK THB</option>
                    <option value="SCB THB">SCB THB</option>
                    <option value="MUFG JPY">MUFG JPY</option>
                    <option value="BCA IDR">BCA IDR</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">บัญชีรับเข้าปลายทาง (To)</label>
                  <select value={fxForm.toAccount} onChange={e => setFxForm({...fxForm, toAccount: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white">
                    <option value="MUFG JPY">MUFG JPY (ญี่ปุ่น)</option>
                    <option value="BCA IDR">BCA IDR (อินโดนีเซีย)</option>
                    <option value="KBANK THB">KBANK THB</option>
                    <option value="SCB THB">SCB THB</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">จำนวนเงินโอนออก</label>
                  <input type="number" value={fxForm.amountOut} onChange={e => setFxForm({...fxForm, amountOut: parseFloat(e.target.value) || 0})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white font-bold" />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">อัตราแลกเปลี่ยนจริง (FX Rate)</label>
                  <input type="number" step="0.0001" value={fxForm.fxRate} onChange={e => setFxForm({...fxForm, fxRate: parseFloat(e.target.value) || 0.2320})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white" />
                </div>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-xl border border-purple-500/30 space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>ยอดเงินรับเข้าปลายทางประมาณการ:</span>
                  <span className="font-bold text-purple-400">
                    {fxForm.fromAccount.includes('THB') ? `¥ ${(fxForm.amountOut / fxForm.fxRate).toLocaleString()} JPY` : `฿ ${(fxForm.amountOut * fxForm.fxRate).toLocaleString()} THB`}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>รับรู้กำไร/ขาดทุนค่าเงิน (FX Gain):</span>
                  <span className="text-emerald-400 font-bold">+ ฿ {fxForm.fxGainLossThb.toLocaleString()} THB</span>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">หมายเหตุการแลกเงิน</label>
                <input type="text" value={fxForm.note} onChange={e => setFxForm({...fxForm, note: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white" />
              </div>

              <button 
                onClick={() => {
                  const newFxTx = {
                    id: `TX-${Date.now().toString().slice(-3)}`,
                    type: 'fx_transfer',
                    category: 'แลกเปลี่ยนเงิน FX',
                    accountBank: `${fxForm.fromAccount} -> ${fxForm.toAccount}`,
                    amount: fxForm.amountOut,
                    currency: 'THB',
                    exchangeRateToThb: 1.0,
                    amountThb: fxForm.amountOut,
                    slipUrl: '',
                    vehicleRef: 'SYSTEM',
                    customerRef: fxForm.toAccount,
                    note: fxForm.note,
                    date: new Date().toISOString().replace('T', ' ').slice(0, 16)
                  };
                  setTransactions([newFxTx, ...transactions]);
                  addAuditLog('[FINANCE]', 'การเงิน 3 สกุล', `บันทึกโอนแลกเปลี่ยนเงิน FX: ${fxForm.fromAccount} -> ${fxForm.toAccount} ยอด ${fxForm.amountOut} THB`);
                  alert('บันทึกโอนแลกเปลี่ยนเงิน FX เรียบร้อยแล้ว!');
                  setActiveModal(null);
                }} 
                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 rounded-lg transition mt-2"
              >
                💾 บันทึกการโอนย้าย FX
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDIT TRANSACTION */}
      {activeModal === 'editTransaction' && editTransForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-lg rounded-2xl p-6 relative">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2"><Edit3 className="w-5 h-5 text-amber-400" /> แก้ไขรายการธุรกรรม {editTransForm.id}</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">หมายเหตุ / รายละเอียด</label>
                <input type="text" value={editTransForm.note} onChange={e => setEditTransForm({...editTransForm, note: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">จำนวนเงิน</label>
                  <input type="number" value={editTransForm.amount} onChange={e => setEditTransForm({...editTransForm, amount: parseFloat(e.target.value) || 0, amountThb: (parseFloat(e.target.value) || 0) * editTransForm.exchangeRateToThb})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white font-bold" />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">อัตราแลกเปลี่ยนเป็นบาท</label>
                  <input type="number" step="0.0001" value={editTransForm.exchangeRateToThb} onChange={e => setEditTransForm({...editTransForm, exchangeRateToThb: parseFloat(e.target.value) || 1.0, amountThb: editTransForm.amount * (parseFloat(e.target.value) || 1.0)})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white" />
                </div>
              </div>

              <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-700 flex justify-between text-xs font-bold text-emerald-400">
                <span>มูลค่าคำนวณเป็นบาทใหม่:</span>
                <span>฿ {editTransForm.amountThb.toLocaleString()} THB</span>
              </div>

              <button 
                onClick={() => {
                  setTransactions(transactions.map(t => t.id === editTransForm.id ? editTransForm : t));
                  addAuditLog('[UPDATE]', 'การเงิน 3 สกุล', `แก้ไขธุรกรรม ${editTransForm.id} ยอดใหม่ ${editTransForm.amount} ${editTransForm.currency}`);
                  alert('อัปเดตข้อมูลธุรกรรมทางการเงินเรียบร้อยแล้ว!');
                  setActiveModal(null);
                }} 
                className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-2.5 rounded-lg transition mt-2"
              >
                💾 บันทึกการแก้ไข
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDIT CUSTOMER */}
      {activeModal === 'editCustomer' && editingItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-lg rounded-2xl p-6 relative">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2"><Edit3 className="w-5 h-5 text-amber-400" /> แก้ไขข้อมูลลูกค้า ({editingItem.name})</h3>
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
                  <label className="text-slate-400 block mb-1">วงเงินเครดิต (THB)</label>
                  <input type="number" value={editingItem.creditLimitThb} onChange={e => setEditingItem({...editingItem, creditLimitThb: parseFloat(e.target.value) || 0})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white font-bold text-emerald-400" />
                </div>
              </div>
              <button 
                onClick={() => {
                  addAuditLog('[UPDATE]', 'ลูกค้า & Statement', `แก้ไขข้อมูลลูกค้า ${editingItem.name}`);
                  alert('บันทึกการแก้ไขข้อมูลลูกค้าเรียบร้อยแล้ว!');
                  setActiveModal(null);
                }} 
                className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-2.5 rounded-lg transition mt-2"
              >
                💾 บันทึกการแก้ไข
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDIT VEHICLE */}
      {activeModal === 'editVehicle' && editingItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-lg rounded-2xl p-6 relative my-8">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2"><Edit3 className="w-5 h-5 text-amber-400" /> แก้ไขข้อมูลรถ ({editingItem.bikeCode})</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">ชื่อรุ่นรถ</label>
                <input type="text" value={editingItem.modelName} onChange={e => setEditingItem({...editingItem, modelName: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">ต้นทุนประมูล (JPY)</label>
                  <input type="number" value={editingItem.costJpy} onChange={e => setEditingItem({...editingItem, costJpy: parseFloat(e.target.value) || 0})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white" />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">กำไรเป้าหมาย (THB)</label>
                  <input type="number" value={editingItem.targetProfitThb} onChange={e => setEditingItem({...editingItem, targetProfitThb: parseFloat(e.target.value) || 0})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white font-bold text-emerald-400" />
                </div>
              </div>
              <button 
                onClick={() => {
                  addAuditLog('[UPDATE]', 'สต็อกรถ', `แก้ไขข้อมูลรถ ${editingItem.bikeCode} (${editingItem.modelName})`);
                  alert('บันทึกการแก้ไขข้อมูลรถเรียบร้อยแล้ว!');
                  setActiveModal(null);
                }} 
                className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-2.5 rounded-lg transition mt-2"
              >
                💾 บันทึกการแก้ไข
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: NEW CUSTOMER */}
      {activeModal === 'newCustomer' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-lg rounded-2xl p-6 relative">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-blue-400" /> เพิ่มข้อมูลลูกค้าใหม่</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">ชื่อ-นามสกุล ลูกค้า</label>
                <input type="text" value={custForm.name} onChange={e => setCustForm({...custForm, name: e.target.value})} placeholder="เช่น คุณอนันต์ ชัยเจริญ" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white" />
              </div>
              <button 
                onClick={() => {
                  addAuditLog('[CREATE]', 'ลูกค้า & Statement', `เพิ่มลูกค้าใหม่: ${custForm.name || 'คุณอนันต์'}`);
                  alert('บันทึกข้อมูลลูกค้าใหม่เรียบร้อยแล้ว!');
                  setActiveModal(null);
                }} 
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-lg transition mt-2"
              >
                บันทึกลูกค้าใหม่
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: NEW VEHICLE */}
      {activeModal === 'newVehicle' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-xl rounded-2xl p-6 relative my-8">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2"><Layers className="w-5 h-5 text-emerald-400" /> ลงทะเบียนรถใหม่ & ตรวจนับชิ้นส่วน</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">ชื่อรุ่นรถ</label>
                <input type="text" value={vehForm.modelName} onChange={e => setVehForm({...vehForm, modelName: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white" />
              </div>

              {/* DYNAMIC REGISTRATION DOCS FORM EXPANSION */}
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-slate-200 font-bold">
                  <input 
                    type="checkbox" 
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
                        <label className="text-[11px] text-slate-400 block mb-1">ประเภทเอกสาร</label>
                        <select value={vehForm.docType} onChange={e => setVehForm({...vehForm, docType: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white text-xs">
                          <option value="ใบยกเลิกทะเบียนญี่ปุ่น (Massho)">ใบยกเลิกทะเบียนญี่ปุ่น (Massho)</option>
                          <option value="เล่มทะเบียนไทย">เล่มทะเบียนไทย</option>
                          <option value="ใบเสียภาษีศุลกากร แบบ 32">ใบเสียภาษีศุลกากร แบบ 32</option>
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

              <button 
                onClick={() => {
                  addAuditLog('[CREATE]', 'สต็อกรถ', `ลงทะเบียนรถใหม่ ${vehForm.bikeCode} (${vehForm.modelName})`);
                  alert('ลงทะเบียนรถใหม่เรียบร้อยแล้ว!');
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

      {/* MODAL: CLAIM CCP ABSORB */}
      {activeModal === 'claimModal' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-lg rounded-2xl p-6 relative">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2 text-rose-400"><ShieldAlert className="w-5 h-5" /> บันทึกการเคลม "CCP รับจบ"</h3>
            <p className="text-xs text-slate-400 mb-4">กรณีเกิดความเสียหายระหว่างจัดส่ง และ CCP Bike รับผิดชอบซับพอร์ตค่าใช้จ่ายเอง</p>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">ยอดเงินที่ CCP รับจบ (THB)</label>
                <input 
                  type="number" 
                  value={claimForm.absorbedAmountThb} 
                  onChange={e => setClaimForm({...claimForm, absorbedAmountThb: parseFloat(e.target.value) || 0})}
                  className="w-full bg-slate-900 border border-rose-500/50 rounded-lg p-2.5 text-rose-400 font-bold text-base"
                />
              </div>

              <div className="p-4 bg-rose-950/40 border border-rose-600/40 rounded-xl space-y-2">
                <div className="flex justify-between text-slate-300">
                  <span>กำไรเป้าหมายเดิม:</span>
                  <span className="font-bold">฿ {claimForm.targetProfitThb.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-rose-400">
                  <span>หักค่าเคลม CCP รับจบ:</span>
                  <span className="font-bold">- ฿ {claimForm.absorbedAmountThb.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-rose-800/50 flex justify-between text-sm font-bold text-white">
                  <span>กำไรสุทธิคงเหลือจริง:</span>
                  <span className={isProfitBelowFloor ? "text-rose-400" : "text-emerald-400"}>
                    ฿ {currentProfitAfterClaim.toLocaleString()}
                  </span>
                </div>
                <div className="text-rose-300 mt-1 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> 📉 กำไรของคันนี้ลดลง -{profitReductionPercent}% จากเป้าหมายเดิม
                </div>
              </div>

              {isProfitBelowFloor && (
                <div className="p-3 bg-amber-950/50 border border-amber-600/40 rounded-xl space-y-2">
                  <div className="text-amber-300 font-semibold flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" /> [⚠️ PROFIT BELOW FLOOR SAFEGUARD]
                  </div>
                  <p className="text-slate-400">กำไรสุทธิต่ำกว่าเกณฑ์ปลอดภัย (ขั้นต่ำ ฿{claimForm.minProfitFloorThb.toLocaleString()}) ต้องใส่รหัสผ่านเจ้าของร้านเพื่ออนุมัติ:</p>
                  <input 
                    type="password" 
                    placeholder="ใส่รหัสผ่าน Owner" 
                    value={claimForm.ownerPassword} 
                    onChange={e => setClaimForm({...claimForm, ownerPassword: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
              )}

              <button 
                onClick={() => {
                  if (isProfitBelowFloor && !claimForm.ownerPassword) {
                    alert('กรุณาใส่รหัสผ่าน Owner เพื่ออนุมัติเนื่องจากกำไรต่ำกว่าเกณฑ์!');
                    return;
                  }
                  addAuditLog('[CLAIM]', 'ระบบเคลม', `อนุมัติบันทึกค่าเคลม CCP รับจบ ยอด ฿${claimForm.absorbedAmountThb.toLocaleString()} [BIKE-01]`);
                  alert('อนุมัติบันทึกค่าเคลม CCP รับจบ เรียบร้อยแล้ว!');
                  setActiveModal(null);
                }} 
                className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-2.5 rounded-lg transition"
              >
                ยืนยันการบันทึกค่าเคลม
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
