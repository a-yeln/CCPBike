'use client';

import React, { useState } from 'react';
import { 
  Activity, BarChart3, DollarSign, Users, Layers, Wrench, Truck, FileText, 
  ShieldAlert, Plus, Printer, Check, AlertTriangle, X, QrCode, Search, Download, Eye, Lock, 
  ArrowRightLeft, CreditCard, RefreshCw, Filter, Settings, Building, Sliders, Globe, Trash2, Edit
} from 'lucide-react';

export default function CCPBikeMasterERP() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'customers' | 'vehicles' | 'bids' | 'workshop' | 'logistics' | 'finance' | 'invoices' | 'claims' | 'auditLog' | 'settings'>('dashboard');
  const [userRole, setUserRole] = useState<'Owner' | 'Admin' | 'Mechanic'>('Owner');
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // --- SETTINGS STATE (DYNAMIC CONFIGURATION) ---
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'CCP BIKE',
    taxId: '',
    address: '123/45 ถนนพัฒนาการ แขวงสวนหลวง เขตสวนหลวง กรุงเทพมหานคร 10250',
    phone: '081-234-5678',
    email: 'contact@ccpbike.com',
    invoicePrefix: 'CCP-2026-',
    invoiceFooterText: '“ถ้าอยากได้คุณภาพอย่าถามถึงราคา แต่ถ้าได้ราคาถูกอย่าถามถึงคุณภาพ” / "If you want quality, don\'t ask about the price. But if you get a cheap price, don\'t ask about the quality."',
    defaultVatRate: 7,
  });

  const [currencies, setCurrencies] = useState([
    { code: 'THB', symbol: '฿', name: 'บาทไทย', rateToThb: 1.0, isDefault: true },
    { code: 'JPY', symbol: '¥', name: 'เยนญี่ปุ่น', rateToThb: 0.235, isDefault: false },
    { code: 'IDR', symbol: 'Rp', name: 'รูเปียห์อินโดนีเซีย', rateToThb: 0.0022, isDefault: false },
    { code: 'MYR', symbol: 'RM', name: 'ริงกิตมาเลเซีย', rateToThb: 7.80, isDefault: false },
    { code: 'USD', symbol: '$', name: 'ดอลลาร์สหรัฐ', rateToThb: 36.50, isDefault: false },
  ]);

  const [bankAccounts, setBankAccounts] = useState([
    { id: 'BANK-01', bankName: 'กสิกรไทย (KBANK)', accNo: '123-2-88990-1', accName: 'บจก. ซีซีพี ไบค์', type: 'รับเงินโอน (THB)', currency: 'THB' },
    { id: 'BANK-02', bankName: 'ไทยพาณิชย์ (SCB)', accNo: '455-1-00234-9', accName: 'บจก. ซีซีพี ไบค์', type: 'รับเงินโอน (THB)', currency: 'THB' },
    { id: 'BANK-03', bankName: 'MUFG Bank (Japan)', accNo: '998-2001-332', accName: 'CCP BIKE CO., LTD.', type: 'โอนออก/ชำระประมูล (JPY)', currency: 'JPY' },
    { id: 'BANK-04', bankName: 'Bank Central Asia (IDR)', accNo: '8820-1123-99', accName: 'CCP BIKE INDO', type: 'รับเงินโอน (IDR)', currency: 'IDR' },
  ]);

  // --- DYNAMIC WORKSHOP TASKS STATE (ANY NUMBER OF STAGES ACCORDING TO ACTUAL JOB) ---
  const [workshopTasks, setWorkshopTasks] = useState([
    { id: 'WS-001', bikeCode: 'BIKE-2026-001', model: 'Honda CB400 Four', stageName: 'ตรวจเช็กรถและลงบันทึกตำหนิ', status: 'Passed', technician: 'ช่างสมชาย', date: '2026-10-18', cost: 0, notes: 'ตัวถังและเครื่องยนต์ตรงตามใบลานประมูล' },
    { id: 'WS-002', bikeCode: 'BIKE-2026-001', model: 'Honda CB400 Four', stageName: 'ถอดประกอบตกแต่งและเปลี่ยนถ่ายน้ำมันเครื่อง', status: 'In Progress', technician: 'ช่างสมชาย', date: '2026-10-19', cost: 1200, notes: 'กำลังเปลี่ยนถ่ายน้ำมันเครื่องสเปกนำเข้า' },
    { id: 'WS-003', bikeCode: 'BIKE-2026-001', model: 'Honda CB400 Four', stageName: 'เบิกอะไหล่สั่งพิเศษ (โซ่-สเตอแต่ง)', status: 'Pending Parts', technician: 'ช่างวิเชียร', date: '2026-10-19', cost: 3500, notes: 'รออะไหล่ส่งถึงอู่' },
    { id: 'WS-004', bikeCode: 'BIKE-2026-001', model: 'Honda CB400 Four', stageName: 'ทดสอบการขับขี่ (Test Drive)', status: 'Waiting', technician: 'ช่างสมชาย', date: '-', cost: 0, notes: '-' },
    { id: 'WS-005', bikeCode: 'BIKE-2026-001', model: 'Honda CB400 Four', stageName: 'บริการแพ็คกิ้งเพื่อเตรียมจัดส่ง', status: 'Waiting', technician: 'ทีมงานแพ็คกิ้ง', date: '-', cost: 1500, notes: 'ห่อบับเบิลกันกระแทก แยกสแกน QR Code 3 ชิ้น' }
  ]);

  // --- PACKING SERVICE STATE ---
  const [packingRecords, setPackingRecords] = useState([
    { id: 'PACK-01', bikeCode: 'BIKE-2026-001', model: 'Honda CB400 Four', packingType: 'ห่อกันกระแทกพิเศษ + ยึดสายรัด Ratchet Strap', piecesCount: 3, qrCodes: ['QR-FRAME-01', 'QR-ENGINE-01', 'QR-PARTS-01'], status: 'Completed', packer: 'ทีมงานแพ็คกิ้ง' }
  ]);

  // --- CUSTOMER & STATEMENT STATE ---
  const [customers, setCustomers] = useState([
    { id: 'CUST-001', name: 'คุณอนันต์ ชัยเจริญ', companyName: 'บจก. อนันต์ มอเตอร์', taxId: '0105562001234', phone: '081-999-8888', country: 'ไทย', lineId: 'anun_bike', totalSpent: 450000, balanceDue: 113840, referenceFxBalance: 115000, status: 'Active' },
    { id: 'CUST-002', name: 'Mr. Kenji Sato', companyName: 'Sato Auto Tokyo', taxId: '', phone: '+81-90-1234-5678', country: 'ญี่ปุ่น', lineId: 'kenji_jp', totalSpent: 1200000, balanceDue: 0, referenceFxBalance: 0, status: 'Active' },
    { id: 'CUST-003', name: 'Mr. Budi Santoso', companyName: 'PT Nusantara Motor', taxId: '81.234.567.8-012.000', phone: '+62-812-3456-7890', country: 'อินโดนีเซีย', lineId: 'budi_indo', totalSpent: 850000, balanceDue: 240000, referenceFxBalance: 245000, status: 'Active' }
  ]);

  // --- VEHICLE INVENTORY STATE ---
  const [vehicles, setVehicles] = useState([
    { id: 'BIKE-2026-001', type: 'สั่งตามลูกค้า', customerName: 'คุณอนันต์ ชัยเจริญ', brand: 'Honda', model: 'CB400 Four', year: '1998', vin: 'NC36-1002341', engineNo: 'NC23E-15021', auctionPriceJpy: 450000, fxRate: 0.235, thbCost: 105750, sellingPriceThb: 145000, status: 'อยู่ระหว่างงานช่าง', stockDays: 12, confirmedDone: false }
  ]);

  // --- INVOICE STATE ---
  const [invoices, setInvoices] = useState([
    { id: 'INV-202610-008', customerName: 'คุณอนันต์ ชัยเจริญ', companyName: 'บจก. อนันต์ มอเตอร์', taxId: '0105562001234', date: '2026-10-18', dueDate: '2026-10-25', currency: 'THB', bikeModel: 'Honda CB400 Four (VIN: NC36-1002341)', vehiclePrice: 105750, laborFee: 3500, shippingFee: 4500, extraFee: 0, discount: 0, vatPercent: 7, totalAmount: 121712.50, paidAmount: 10000, balanceDue: 111712.50, status: 'Issued', shippingPaid: true }
  ]);

  // Modals Input States
  const [newWorkshopTask, setNewWorkshopTask] = useState({ bikeCode: 'BIKE-2026-001', stageName: '', technician: '', notes: '', cost: '' });
  const [newCurrency, setNewCurrency] = useState({ code: '', symbol: '', name: '', rateToThb: '' });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-12">
      {/* HEADER BAR WITH OFFICIAL LOGO */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2 rounded-xl shadow-lg shadow-orange-500/20">
              <span className="font-extrabold text-xl text-slate-950 tracking-wider">CCP</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg text-amber-400 tracking-wide">CCP BIKE</h1>
                <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full font-mono">ERP v10.0 Master</span>
              </div>
              <p className="text-xs text-slate-400">ระบบบริหารจัดการร้านและคลังอะไหล่นำเข้า</p>
            </div>
          </div>

          {/* Quick Role Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 px-2 font-medium">สิทธิ์ใช้งาน:</span>
            <button 
              onClick={() => setUserRole('Owner')} 
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${userRole === 'Owner' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
            >
              เจ้าของร้าน (Owner)
            </button>
            <button 
              onClick={() => setUserRole('Admin')} 
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${userRole === 'Admin' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
            >
              แอดมิน (Admin)
            </button>
            <button 
              onClick={() => setUserRole('Mechanic')} 
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${userRole === 'Mechanic' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
            >
              ช่างประจำอู่ (Mechanic)
            </button>
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 sticky top-[61px] z-30">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 overflow-x-auto no-scrollbar py-2">
          {[
            { id: 'dashboard', label: 'แดชบอร์ด', icon: BarChart3 },
            { id: 'customers', label: 'ลูกค้า & Statement', icon: Users },
            { id: 'vehicles', label: 'สต็อกรถ', icon: Layers },
            { id: 'bids', label: 'ประมูลญี่ปุ่น', icon: Activity },
            { id: 'workshop', label: 'งานช่าง & บริการแพ็คกิ้ง', icon: Wrench },
            { id: 'logistics', label: 'ขนส่ง Multi-Leg', icon: Truck },
            { id: 'finance', label: 'การเงิน & บัญชี', icon: DollarSign },
            { id: 'invoices', label: 'Invoice', icon: FileText },
            { id: 'claims', label: 'ระบบเคลม', icon: ShieldAlert },
            { id: 'settings', label: 'ตั้งค่าระบบ (Settings)', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  isActive 
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* MAIN CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 py-6">

        {/* ==================== TAB 1: WORKSHOP & PACKING SERVICE ==================== */}
        {activeTab === 'workshop' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-lg">
              <div>
                <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <Wrench className="text-amber-400" size={20} />
                  <span>ระบบงานช่าง & บริการแพ็คกิ้ง (Workshop & Packing Service)</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">จัดการขั้นตอนงานช่างยืดหยุ่นได้ไม่จำกัดตามหน้างานจริง และบันทึกบริการแพ็คกิ้งเตรียมจัดส่ง</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setActiveModal('addWorkshopTask')}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/10 transition"
                >
                  <Plus size={16} />
                  <span>เพิ่มขั้นตอนงานช่าง</span>
                </button>
              </div>
            </div>

            {/* Dynamic Workshop Steps Table */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <Activity size={16} />
                  <span>รายการขั้นตอนงานช่างตามหน้างานจริง (Dynamic Workshop Tasks)</span>
                </h3>
                <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg">ปรับเพิ่ม/ลดกี่ขั้นตอนก็ได้ตามจริง</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                    <tr>
                      <th className="p-3">รหัสงาน / รหัสรถ</th>
                      <th className="p-3">รุ่นรถ</th>
                      <th className="p-3">ขั้นตอนงานช่าง (Stage)</th>
                      <th className="p-3">ผู้รับผิดชอบ</th>
                      <th className="p-3">สถานะงาน</th>
                      <th className="p-3">ค่าใช้จ่าย (บาท)</th>
                      <th className="p-3">หมายเหตุ</th>
                      <th className="p-3 text-right">จัดการ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {workshopTasks.map((task) => (
                      <tr key={task.id} className="hover:bg-slate-800/30 transition">
                        <td className="p-3 font-mono text-slate-200 font-bold">{task.id} <br/><span className="text-[10px] text-amber-400/80">{task.bikeCode}</span></td>
                        <td className="p-3 font-medium text-slate-100">{task.model}</td>
                        <td className="p-3 text-slate-200 font-semibold">{task.stageName}</td>
                        <td className="p-3 text-slate-300">{task.technician}</td>
                        <td className="p-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            task.status === 'Passed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                            task.status === 'In Progress' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                            task.status === 'Pending Parts' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' :
                            'bg-slate-800 text-slate-400'
                          }`}>
                            {task.status}
                          </span>
                        </td>
                        <td className="p-3 font-mono font-bold text-emerald-400">{task.cost > 0 ? `฿${task.cost.toLocaleString()}` : '-'}</td>
                        <td className="p-3 text-slate-400 text-[11px]">{task.notes}</td>
                        <td className="p-3 text-right">
                          <button className="text-amber-400 hover:text-amber-300 p-1"><Edit size={14} /></button>
                          <button className="text-rose-400 hover:text-rose-300 p-1 ml-1"><Trash2 size={14} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* PACKING SERVICE SECTION */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                    <Truck size={18} />
                    <span>บริการแพ็คกิ้งเพื่อจัดส่ง (Packing Service)</span>
                  </h3>
                  <p className="text-xs text-slate-400">ห่อบับเบิล ยึดสายรัด และลงทะเบียนแยกสแกน QR Code เพื่อความปลอดภัยในการขนส่ง</p>
                </div>
                <button 
                  onClick={() => setActiveModal('addPacking')}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 shadow-md"
                >
                  <Plus size={14} />
                  <span>บันทึกงานแพ็คกิ้ง</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {packingRecords.map((pack) => (
                  <div key={pack.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-amber-400 font-bold">{pack.bikeCode}</span>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-md font-bold">{pack.status}</span>
                    </div>
                    <div className="text-xs font-bold text-slate-200">{pack.model}</div>
                    <div className="text-xs text-slate-400">รูปแบบการแพ็ค: <span className="text-slate-200">{pack.packingType}</span></div>
                    <div className="text-xs text-slate-400">จำนวนชิ้นส่วนแยก: <span className="text-amber-400 font-bold">{pack.piecesCount} ชิ้น</span></div>
                    <div className="flex items-center gap-1.5 pt-1">
                      <QrCode size={14} className="text-slate-400" />
                      <div className="flex gap-1">
                        {pack.qrCodes.map((qr, idx) => (
                          <span key={idx} className="text-[10px] font-mono bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded text-slate-300">{qr}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 2: INVOICE BUILDER ==================== */}
        {activeTab === 'invoices' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-lg">
              <div>
                <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <FileText className="text-amber-400" size={20} />
                  <span>ระบบสร้างและออกใบแจ้งหนี้ (Invoice Builder)</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">ออกบิลเรียกเก็บเงินลูกค้าพร้อมแสดงโลโก้ร้านและข้อความประกาศเด่นชัดท้ายบิล</p>
              </div>
            </div>

            {/* PREVIEW INVOICE CARD */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 max-w-3xl mx-auto shadow-2xl space-y-6 text-slate-200">
              {/* Invoice Header */}
              <div className="flex justify-between items-start border-b border-slate-800 pb-6">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-slate-950 font-black text-xl shadow-md">
                      CCP
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-amber-400">{storeSettings.storeName}</h3>
                      <p className="text-xs text-slate-400">{storeSettings.address}</p>
                      <p className="text-xs text-slate-400">โทร: {storeSettings.phone} | อีเมล: {storeSettings.email}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <h2 className="text-2xl font-black text-slate-100 tracking-wider">INVOICE</h2>
                  <p className="text-xs font-mono text-amber-400 mt-1 font-bold">เลขที่: {invoices[0].id}</p>
                  <p className="text-xs text-slate-400">วันที่ออก: {invoices[0].date}</p>
              
