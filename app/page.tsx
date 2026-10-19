'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, BarChart3, DollarSign, Users, Layers, Wrench, Truck, FileText, 
  ShieldAlert, Plus, Printer, Check, AlertTriangle, X, Search, Eye, 
  Sliders, Calendar, ChevronRight, Save, Phone, Globe, Camera, QrCode, Lock, 
  RefreshCw, Filter, CreditCard, ArrowRightLeft, Download, Trash2, Upload, 
  Image as ImageIcon, CheckSquare, Settings as SettingsIcon, Package, HelpCircle
} from 'lucide-react';

export default function CCPBikeMasterERPv12() {
  // Navigation & Role
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userRole, setUserRole] = useState('Owner');
  const [showCalc, setShowCalc] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  // Logo Base64
  const defaultLogo = "data:image/jpeg;base64,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";

  // 1. Settings State
  const [shopSettings, setShopSettings] = useState({
    shopName: 'CCP Bike',
    tagline: 'Start Your Engine, Start Your Legend',
    address: '168/9 ถนนบางนา-ตราด กม.12 ต.บางพลีใหญ่ อ.บางพลี จ.สมุทรปราการ 10540',
    phone: '081-924-5588 / 089-998-7766',
    email: 'contact@ccpbike.com',
    invoicePrefix: 'CCP-2026-',
    invoiceNotice: 'กรณีซื้อในนามบริษัท กรุณาแจ้งเลขประจำตัวผู้เสียภาษี | สินค้าซื้อแล้วไม่รับเปลี่ยนหรือคืน ยกเว้นกรณีเงื่อนไขการรับประกันตามข้อตกลง',
    logoUrl: defaultLogo,
    currencies: [
      { code: 'THB', symbol: '฿', rate: 1.0, isDefault: true },
      { code: 'JPY', symbol: '¥', rate: 0.2350, isDefault: false },
      { code: 'IDR', symbol: 'Rp', rate: 0.0022, isDefault: false },
      { code: 'MYR', symbol: 'RM', rate: 7.85, isDefault: false }
    ],
    bankAccounts: [
      { id: 'BANK-1', name: 'KBANK - กสิกรไทย (THB)', accNo: '012-3-45678-9', type: 'รับเงินโอน (THB)' },
      { id: 'BANK-2', name: 'SCB - ไทยพาณิชย์ (THB)', accNo: '987-6-54321-0', type: 'โอนออกค่าใช้จ่าย (THB)' },
      { id: 'BANK-3', name: 'MUFG Bank Tokyo (JPY)', accNo: '7781-9021-00', type: 'ประมูลญี่ปุ่น (JPY)' },
      { id: 'BANK-4', name: 'Bank Central Asia JKT (IDR)', accNo: '8820-1120-99', type: 'รับเงินอินโดฯ (IDR)' }
    ]
  });

  // 2. Customers Data State
  const [customers, setCustomers] = useState([
    { 
      id: 'CUST-101', 
      name: 'คุณอนันต์ ชัยเจริญ (เชียงใหม่)', 
      company: 'อนันต์ มอเตอร์สปอร์ต จำกัด', 
      taxId: '0105564098211', 
      phone: '081-889-0112', 
      lineId: 'anan_bike', 
      facebook: 'Anan Motors Chiangmai', 
      whatsapp: '+66818890112', 
      country: 'ไทย', 
      address: '88/12 ถ.นิมมานเหกมินท์ ต.สุเทพ อ.เมือง จ.เชียงใหม่ 50200',
      totalSales: 478000,
      paidAmount: 350000,
      balanceDue: 128000,
      refFxRate: 0.2350,
      actualReceivedThb: 350000,
      customerRefThb: 352500,
      fxDiff: -2500,
      fxAbsorbedBy: 'ร้านรับ'
    },
    { 
      id: 'CUST-102', 
      name: 'Budi Santoso (Jakarta)', 
      company: 'PT Santoso BigBike Indonesia', 
      taxId: '91.223.401.8-012.000', 
      phone: '+62-812-3456-7890', 
      lineId: 'budi_jkt', 
      facebook: 'Budi Santoso Motors', 
      whatsapp: '+6281234567890', 
      country: 'อินโดนีเซีย', 
      address: 'Jl. Sudirman No. 45, Jakarta Selatan, Indonesia 12190',
      totalSales: 890000,
      paidAmount: 600000,
      balanceDue: 290000,
      refFxRate: 0.0022,
      actualReceivedThb: 600000,
      customerRefThb: 605000,
      fxDiff: -5000,
      fxAbsorbedBy: 'ลูกค้ารับ'
    }
  ]);

  // 3. Auction Requests & Items
  const [auctionRequests, setAuctionRequests] = useState([
    {
      id: 'REQ-201',
      customerId: 'CUST-101',
      customerName: 'คุณอนันต์ ชัยเจริญ',
      reqDate: '2026-10-15',
      brand: 'Honda',
      model: 'CB400SF Hyper VTEC Revo',
      preferredColors: ['แดง-ขาว', 'ดำ'],
      minYear: 2018,
      minGrade: '4.5',
      maxBudgetJpy: 850000,
      maxBudgetThb: 200000,
      status: 'รอวันประมูล',
      notes: 'ขอสภาพเครื่องแห้ง เดิมๆ ท่อเดิม'
    }
  ]);

  const [auctionItems, setAuctionItems] = useState([
    {
      id: 'AUC-8801',
      requestId: 'REQ-201',
      auctionHouse: 'BDS Kanto (Tokyo)',
      lotNo: '8812',
      auctionDateJst: '2026-10-22 13:30 (JST)',
      auctionDateIct: '2026-10-22 11:30 (ICT)',
      brand: 'Honda',
      model: 'CB400SF Hyper VTEC Revo',
      year: 2019,
      mileage: '12,400 km',
      grade: '4.5 (A)',
      myMaxBidJpy: 780000,
      result: 'รอผลประมูล',
      hammerPriceJpy: 0,
      imageUrl: defaultLogo
    }
  ]);

  // 4. Vehicles & Stock State
  const [vehicles, setVehicles] = useState([
    {
      id: 'BIKE-01',
      type: 'สั่งตามลูกค้า',
      customerId: 'CUST-101',
      customerName: 'คุณอนันต์ ชัยเจริญ',
      bikeCode: 'BIKE-2026-01',
      auctionHouse: 'BDS Kanto',
      lotNo: '8812',
      brand: 'Honda',
      model: 'CB400SF Hyper VTEC Revo',
      year: 2019,
      color: 'แดง-ขาว',
      mileage: '12,400 km',
      chassisNo: 'NC42-1904821',
      engineNo: 'NC42E-2104821',
      auctionPriceJpy: 720000,
      fxRate: 0.2350,
      auctionPriceThb: 169200,
      laborCostThb: 8500,
      shippingCostThb: 15000,
      partsCostThb: 12000,
      claimCostThb: 0,
      otherCostThb: 2500,
      totalCostThb: 207200,
      sellingPriceThb: 239000,
      targetPriceThb: 245000,
      status: 'แพ็กรอส่ง',
      isCompleted: false,
      profitType: 'กำไรประมาณการ',
      estimatedProfitThb: 31800,
      netProfitThb: 0,
      stockDays: 14,
      checklist: ['กุญแจชิป 2 ดอก', 'คู่มือ Service Manual', 'กระจกเดิม 1 คู่', 'ท่อแต่ง Moriwaki'],
      mainImage: defaultLogo,
      partsImages: [defaultLogo],
      expenses: [
        { id: 'EXP-1', title: 'ค่าแรงประกอบเช็กสภาพ', amount: 8500, date: '2026-10-16', note: 'ช่างสมชาย' },
        { id: 'EXP-2', title: 'ค่าเปลี่ยนโซ่สเตอร์และยาง', amount: 12000, date: '2026-10-17', note: 'อะไหล่แท้เบิกศูนย์' },
        { id: 'EXP-3', title: 'ค่าตู้คอนเทนเนอร์หารเฉลี่ย', amount: 15000, date: '2026-10-18', note: 'Lanna Moto Logistics' }
      ]
    },
    {
      id: 'BIKE-02',
      type: 'รถสต็อก',
      customerId: '',
      customerName: '-',
      bikeCode: 'STK-2026-02',
      auctionHouse: 'USS Yokohama',
      lotNo: '3104',
      brand: 'Yamaha',
      model: 'SR400 Final Edition',
      year: 2021,
      color: 'น้ำเงิน Sunburst',
      mileage: '3,200 km',
      chassisNo: 'RH16J-002910',
      engineNo: 'H342E-002910',
      auctionPriceJpy: 950000,
      fxRate: 0.2350,
      auctionPriceThb: 223250,
      laborCostThb: 5000,
      shippingCostThb: 15000,
      partsCostThb: 4500,
      claimCostThb: 0,
      otherCostThb: 1000,
      totalCostThb: 248750,
      sellingPriceThb: 295000,
      targetPriceThb: 299000,
      status: 'อยู่ในสต็อก',
      isCompleted: false,
      profitType: 'กำไรประมาณการ',
      estimatedProfitThb: 46250,
      netProfitThb: 0,
      stockDays: 28,
      checklist: ['กุญแจดำ 2 กุญแจแดง 1', 'บุ๊กเซอร์วิสครบ'],
      mainImage: defaultLogo,
      partsImages: [],
      expenses: [
        { id: 'EXP-4', title: 'ค่าเปลี่ยนถ่ายน้ำมันเครื่องและหัวเทียน', amount: 4500, date: '2026-10-10', note: 'น้ำมันสังเคราะห์ 100%' }
      ]
    }
  ]);

  // 5. Dynamic Workshop Tasks
  const [workshopTasks, setWorkshopTasks] = useState([
    {
      id: 'TASK-101',
      vehicleId: 'BIKE-01',
      bikeCode: 'BIKE-2026-01',
      model: 'Honda CB400SF',
      stageName: 'เช็กสภาพรับรถแรกเข้า',
      technician: 'ช่างสมชาย',
      status: 'เสร็จสิ้น',
      updatedAt: '2026-10-16 10:30',
      notes: 'ตรวจวัดกำลังอัดทรงตัวปกติ ไร้คราบน้ำมันซึม ระบบไฟรอบคันผ่าน 100%',
      images: [defaultLogo]
    },
    {
      id: 'TASK-102',
      vehicleId: 'BIKE-01',
      bikeCode: 'BIKE-2026-01',
      model: 'Honda CB400SF',
      stageName: 'ประกอบท่อแต่ง & เบิกโซ่สเตอร์ใหม่',
      technician: 'ช่างสมชาย',
      status: 'เสร็จสิ้น',
      updatedAt: '2026-10-17 15:45',
      notes: 'ติดตั้งท่อ Moriwaki Titanium และเปลี่ยนชุดโซ่ DID 520 Gold V-Ring',
      images: [defaultLogo]
    },
    {
      id: 'TASK-103',
      vehicleId: 'BIKE-01',
      bikeCode: 'BIKE-2026-01',
      model: 'Honda CB400SF',
      stageName: 'บริการแพ็คกิ้งเพื่อจัดส่ง (Packing Service)',
      technician: 'ทีมแพ็คโกดังพัฒนาการ',
      status: 'กำลังดำเนินการ',
      updatedAt: '2026-10-18 11:20',
      notes: 'ห่อฟิล์มบับเบิลหนา 3 ชั้น ถอดกระจกยึด Ratchet Strap 4 จุด แยกรหัส QR 3 ชิ้น',
      images: [defaultLogo]
    }
  ]);

  // Daily Mechanic Log Book
  const [dailyLogs, setDailyLogs] = useState([
    {
      id: 'DLOG-501',
      date: '2026-10-18',
      mechanicName: 'ช่างสมชาย',
      vehicleCode: 'BIKE-2026-01',
      actionTitle: 'ประกอบและทดสอบระบบไฟ',
      detail: 'ติดตั้งชุดแฟริ่งเดิม และทดสอบรันอินเครื่องยนต์ 15 นาที อุณหภูมิปกติ 88°C',
      image: defaultLogo
    }
  ]);

  // Packing Details & QR Parts
  const [packingLogs, setPackingLogs] = useState([
    {
      id: 'PACK-01',
      vehicleId: 'BIKE-01',
      bikeCode: 'BIKE-2026-01',
      packingType: 'ห่อบับเบิลหนาพิเศษ + ยึดแท่นพาเลท + สายรัด Ratchet',
      piecesCount: 3,
      piecesDetail: [
        { itemNo: 1, name: 'ตัวรถหลัก + เครื่องยนต์', qrCode: 'CCP-QR-B01-P1', status: 'แพ็คเรียบร้อย' },
        { itemNo: 2, name: 'ชุดท่อแต่ง Moriwaki + ท่อเดิม', qrCode: 'CCP-QR-B01-P2', status: 'แพ็คเรียบร้อย' },
        { itemNo: 3, name: 'กล่องอะไหล่เสริม + กระจก', qrCode: 'CCP-QR-B01-P3', status: 'แพ็คเรียบร้อย' }
      ],
      packDate: '2026-10-18',
      packerName: 'ช่างวิชัย & ทีมงาน',
      photo: defaultLogo
    }
  ]);

  // 6. Logistics & Shipments State
  const [shipments, setShipments] = useState([
    {
      id: 'SHIP-301',
      routeTitle: 'โยโกฮาม่า ➔ โกดังพัฒนาการ (ตู้คอนเทนเนอร์ทะเล)',
      carrierName: 'Lanna Moto Logistics',
      mode: 'ทางเรือ (Sea Freight)',
      containerNo: 'TCLU-904812-0',
      trackingNo: 'LNM-202610-88A',
      pickupDate: '2026-10-05',
      etaDate: '2026-10-19',
      actualArrivalDate: '2026-10-18',
      totalFreightCostThb: 60000,
      assignedBikesCount: 4,
      costPerBikeThb: 15000,
      status: 'ถึงปลายทางแล้ว',
      exportDocsPhoto: defaultLogo
    }
  ]);

  // 7. Finance Transactions State
  const [transactions, setTransactions] = useState([
    {
      id: 'TX-1001',
      date: '2026-10-18 14:10',
      type: 'income',
      category: 'ค่างวดรถสั่งซื้อ',
      customerName: 'คุณอนันต์ ชัยเจริญ',
      vehicleCode: 'BIKE-2026-01',
      amountThb: 116500,
      amountOrig: 116500,
      currency: 'THB',
      bankAccount: 'KBANK - กสิกรไทย (THB)',
      slipPhoto: defaultLogo,
      note: 'โอนงวดที่ 2 ค่ารถสั่งประมูล'
    },
    {
      id: 'TX-1002',
      date: '2026-10-17 09:30',
      type: 'expense',
      category: 'ค่าอะไหล่เบิกซ่อม',
      customerName: '-',
      vehicleCode: 'BIKE-2026-01',
      amountThb: 12000,
      amountOrig: 12000,
      currency: 'THB',
      bankAccount: 'SCB - ไทยพาณิชย์ (THB)',
      slipPhoto: defaultLogo,
      note: 'จ่ายร้านศูนย์บริการอะไหล่แท้'
    }
  ]);

  // 8. Invoices State
  const [invoices, setInvoices] = useState([
    {
      id: 'INV-202610-001',
      invoiceNo: 'CCP-2026-0001',
      date: '2026-10-18',
      dueDate: '2026-10-25',
      customerId: 'CUST-101',
      customerName: 'คุณอนันต์ ชัยเจริญ (เชียงใหม่)',
      company: 'อนันต์ มอเตอร์สปอร์ต จำกัด',
      taxId: '0105564098211',
      address: '88/12 ถ.นิมมานเหกมินท์ ต.สุเทพ อ.เมือง จ.เชียงใหม่ 50200',
      vehicleCode: 'BIKE-2026-01',
      vehicleDetail: 'Honda CB400SF Hyper VTEC Revo (2019) NC42-1904821',
      vehicleCost: 215500,
      laborFee: 8500,
      shippingFee: 15000,
      shippingPaidAdvance: true,
      subtotal: 239000,
      discount: 0,
      useVat: false,
      vatAmount: 0,
      grandTotal: 239000,
      depositPaid: 111000,
      balanceDue: 128000,
      currency: 'THB',
      status: 'รอชำระงวดสุดท้าย'
    }
  ]);

  // 9. Post-Delivery Claims
  const [claims, setClaims] = useState([
    {
      id: 'CLM-801',
      vehicleCode: 'BIKE-2026-01',
      customerName: 'คุณอนันต์ ชัยเจริญ',
      issueDetail: 'รอยขีดข่วนเล็กน้อยบริเวณครอบถังน้ำมันด้านขวาจากการขนส่งสไลด์',
      supportAmountThb: 3500,
      status: 'อนุมัติจ่ายชดเชยเรียบร้อย',
      photo: defaultLogo,
      resolvedDate: '2026-10-18'
    }
  ]);

  // 10. Audit Activity Log
  const [auditLogs, setAuditLogs] = useState([
    { id: 'LOG-901', timestamp: '2026-10-18 16:05', user: 'คุณอนันต์ (Owner)', action: '[SYSTEM] อัปเดตโครงสร้างระบบ v12 Master Edition', detail: 'เพิ่มฟอร์มเปล่า 100% พร้อมปุ่มอัปโหลดรูปภาพและเชื่อมโยงข้ามโมดูล' },
    { id: 'LOG-902', timestamp: '2026-10-18 15:20', user: 'แอดมินหมิว (Admin)', action: '[INVOICE] ออกใบแจ้งหนี้ CCP-2026-0001', detail: 'ออกบิลให้คุณอนันต์ ชัยเจริญ ยอดรวม ฿239,000' }
  ]);

  // 11. Asking Price Calculator 🧮 State
  const [calcState, setCalcState] = useState({
    costThb: 207200,
    targetProfitThb: 30000,
    negotiationBufferPct: 5,
    selectedCurrency: 'THB',
    fxJpy: 0.2350,
    fxIdr: 0.0022,
    askingPriceThb: 249060,
    floorPriceThb: 237200,
    history: []
  });

  // --- FORM STATES FOR BLANK ENTRY ---
  const [newCust, setNewCust] = useState({ name: '', company: '', taxId: '', phone: '', lineId: '', facebook: '', whatsapp: '', country: 'ไทย', address: '' });
  const [newVehicle, setNewVehicle] = useState({ brand: '', model: '', year: 2024, color: '', chassisNo: '', engineNo: '', type: 'รถสต็อก', auctionPriceJpy: 0, targetPriceThb: 0, mainImage: '', partsImages: [] });
  const [newStage, setNewStage] = useState({ vehicleId: '', stageName: '', technician: '', notes: '', image: '' });
  const [newDailyLog, setNewDailyLog] = useState({ mechanicName: '', vehicleCode: '', actionTitle: '', detail: '', image: '' });
  const [newPacking, setNewPacking] = useState({ vehicleId: '', packingType: '', piecesCount: 1, photo: '', packerName: '' });
  const [newTx, setNewTx] = useState({ type: 'income', category: 'ค่างวดรถสั่งซื้อ', customerName: '', vehicleCode: '', amount: 0, currency: 'THB', bankAccount: '', slipPhoto: '', note: '' });
  const [newClaim, setNewClaim] = useState({ vehicleCode: '', customerName: '', issueDetail: '', supportAmountThb: 0, photo: '' });

  // --- IMAGE UPLOAD HELPER ---
  const handleFileUpload = (e, setPhotoCallback) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoCallback(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // --- SAMPLE DATA LOADERS FOR EASY TESTING ---
  const loadSampleCustomer = () => {
    setNewCust({
      name: 'คุณสมเกียรติ มอเตอร์ไบค์ (พัทยา)',
      company: 'สมเกียรติ บิ๊กไบค์ พัทยา จำกัด',
      taxId: '0205565012991',
      phone: '089-112-4455',
      lineId: 'somkiat_pty',
      facebook: 'Somkiat BigBike Pattaya',
      whatsapp: '+66891124455',
      country: 'ไทย',
      address: '44/9 หมู่ 5 ต.นาเกลือ อ.บางละมุง จ.ชลบุรี 20150'
    });
  };

  const loadSampleVehicle = () => {
    setNewVehicle({
      brand: 'Kawasaki',
      model: 'Z900RS SE Yellow Ball',
      year: 2022,
      color: 'เหลือง-ดำ',
      chassisNo: 'ZR900C-054912',
      engineNo: 'ZR900BE-054912',
      type: 'รถสต็อก',
      auctionPriceJpy: 1150000,
      targetPriceThb: 385000,
      mainImage: defaultLogo,
      partsImages: [defaultLogo]
    });
  };

  // --- ACTIONS & CALCULATIONS ---
  const handleAddCustomerSubmit = (e) => {
    e.preventDefault();
    if (!newCust.name) return;
    const added = {
      id: `CUST-${Date.now()}`,
      ...newCust,
      totalSales: 0,
      paidAmount: 0,
      balanceDue: 0,
      refFxRate: 0.2350,
      actualReceivedThb: 0,
      customerRefThb: 0,
      fxDiff: 0,
      fxAbsorbedBy: 'ร้านรับ'
    };
    setCustomers([...customers, added]);
    setNewCust({ name: '', company: '', taxId: '', phone: '', lineId: '', facebook: '', whatsapp: '', country: 'ไทย', address: '' });
    setActiveModal(null);
  };

  const handleAddVehicleSubmit = (e) => {
    e.preventDefault();
    if (!newVehicle.model) return;
    const costThb = Math.round(newVehicle.auctionPriceJpy * 0.2350) + 15000;
    const added = {
      id: `BIKE-${Date.now()}`,
      type: newVehicle.type,
      customerId: '',
      customerName: '-',
      bikeCode: `STK-${Date.now().toString().slice(-4)}`,
      auctionHouse: 'BDS Kansai',
      lotNo: '9912',
      brand: newVehicle.brand,
      model: newVehicle.model,
      year: newVehicle.year,
      color: newVehicle.color,
      mileage: '5,100 km',
      chassisNo: newVehicle.chassisNo,
      engineNo: newVehicle.engineNo,
      auctionPriceJpy: newVehicle.auctionPriceJpy,
      fxRate: 0.2350,
      auctionPriceThb: Math.round(newVehicle.auctionPriceJpy * 0.2350),
      laborCostThb: 5000,
      shippingCostThb: 10000,
      partsCostThb: 0,
      claimCostThb: 0,
      otherCostThb: 0,
      totalCostThb: costThb,
      sellingPriceThb: newVehicle.targetPriceThb,
      targetPriceThb: newVehicle.targetPriceThb,
      status: 'อยู่ในสต็อก',
      isCompleted: false,
      profitType: 'กำไรประมาณการ',
      estimatedProfitThb: newVehicle.targetPriceThb - costThb,
      netProfitThb: 0,
      stockDays: 1,
      checklist: ['กุญแจ 2 ดอก'],
      mainImage: newVehicle.mainImage || defaultLogo,
      partsImages: newVehicle.partsImages || [],
      expenses: []
    };
    setVehicles([...vehicles, added]);
    setNewVehicle({ brand: '', model: '', year: 2024, color: '', chassisNo: '', engineNo: '', type: 'รถสต็อก', auctionPriceJpy: 0, targetPriceThb: 0, mainImage: '', partsImages: [] });
    setActiveModal(null);
  };

  const handleConfirmCompleted = (vehicleId) => {
    setVehicles(vehicles.map(v => {
      if (v.id === vehicleId) {
        return {
          ...v,
          isCompleted: true,
          status: 'เสร็จสิ้น',
          profitType: 'กำไรสุทธิ',
          netProfitThb: v.estimatedProfitThb
        };
      }
      return v;
    }));
    setAuditLogs([{ id: `LOG-${Date.now()}`, timestamp: new Date().toLocaleString(), user: `${userRole}`, action: `[OWNER CONFIRM] ยืนยันเสร็จสิ้นรถ ${vehicleId}`, detail: 'เปลี่ยนสถานะจากกำไรประมาณการเป็นกำไรสุทธิเรียบร้อย' }, ...auditLogs]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-amber-500 selection:text-slate-950">
      
      {/* TOP HEADER */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between sticky top-0 z-40 shadow-xl">
        <div className="flex items-center gap-3">
          <img src={shopSettings.logoUrl} alt="CCP Bike Logo" className="w-10 h-10 rounded border border-amber-500/50 object-cover shadow font-bold text-[8px] text-amber-500" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-white text-lg tracking-wide">{shopSettings.shopName}</h1>
              <span className="bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full">v12 Master ERP</span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-wider">{shopSettings.tagline}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Role Switcher */}
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-1 text-xs">
            <span className="text-slate-400 px-2 text-[11px] font-medium hidden sm:inline">สิทธิ์ใช้งาน:</span>
            <select 
              value={userRole} 
              onChange={(e) => setUserRole(e.target.value)} 
              className="bg-slate-800 text-amber-400 font-bold px-2.5 py-1 rounded border border-slate-700 focus:outline-none focus:border-amber-500"
            >
              <option value="Owner">👑 เจ้าของ (Owner)</option>
              <option value="Admin">💼 แอดมิน (Admin)</option>
              <option value="Mechanic">🔧 ช่าง (Mechanic)</option>
            </select>
          </div>

          {/* Calculator Floating Button */}
          {userRole !== 'Mechanic' && (
            <button 
              onClick={() => setShowCalc(!showCalc)} 
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow-lg transition"
            >
              <span className="text-sm">🧮</span>
              <span className="hidden md:inline">คิดราคาเสนอขาย</span>
            </button>
          )}
        </div>
      </header>

      {/* ASKING PRICE CALCULATOR COLLAPSIBLE PANEL */}
      {showCalc && userRole !== 'Mechanic' && (
        <div className="bg-slate-900 border-b-2 border-amber-500/60 p-4 px-6 text-xs transition-all shadow-2xl animate-fadeIn">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧮</span>
              <div>
                <h3 className="font-bold text-amber-400 text-sm">เครื่องคิดราคาเสนอขาย (Asking Price & Floor Price Calculator)</h3>
                <p className="text-slate-400 text-[11px]">คำนวณราคาเปิดขาย + เผื่อต่อรอง % และราคาต่ำสุดที่เซฟกำไรเป้าหมาย (เฉพาะสิทธิ์ Owner/Admin)</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full md:w-auto">
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-slate-400 text-[10px] block">ต้นทุนรวม (บาท)</span>
                <input 
                  type="number" 
                  value={calcState.costThb} 
                  onChange={(e) => setCalcState({ ...calcState, costThb: Number(e.target.value) })} 
                  className="bg-transparent font-bold text-white w-full focus:outline-none"
                />
              </div>

              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-slate-400 text-[10px] block">กำไรเป้าหมาย (บาท)</span>
                <input 
                  type="number" 
                  value={calcState.targetProfitThb} 
                  onChange={(e) => setCalcState({ ...calcState, targetProfitThb: Number(e.target.value) })} 
                  className="bg-transparent font-bold text-emerald-400 w-full focus:outline-none"
                />
              </div>

              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-slate-400 text-[10px] block">เผื่อต่อรอง %</span>
                <input 
                  type="number" 
                  value={calcState.negotiationBufferPct} 
                  onChange={(e) => setCalcState({ ...calcState, negotiationBufferPct: Number(e.target.value) })} 
                  className="bg-transparent font-bold text-amber-400 w-full focus:outline-none"
                />
              </div>

              <div className="bg-emerald-950/80 border border-emerald-500/40 p-2 rounded">
                <span className="text-emerald-300 text-[10px] font-bold block">ราคาเปิดขายแนะนำ</span>
                <span className="font-black text-amber-400 text-sm">
                  ฿{Math.round((calcState.costThb + calcState.targetProfitThb) * (1 + calcState.negotiationBufferPct / 100)).toLocaleString()}
                </span>
              </div>
            </div>

            <button onClick={() => setShowCalc(false)} className="text-slate-400 hover:text-white p-1">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* MAIN BODY LAYOUT */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-56 md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-2 space-y-1 select-none overflow-y-auto">
          <div className="space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              เมนูหลักระบบ ERP
            </div>

            <button 
              onClick={() => setActiveTab('dashboard')} 
              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition ${
                activeTab === 'dashboard' ? 'bg-amber-500 text-slate-950 font-bold shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BarChart3 className="w-4 h-4" />
                <span>แดชบอร์ด (Dashboard)</span>
              </div>
            </button>

            <button 
              onClick={() => setActiveTab('customers')} 
              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition ${
                activeTab === 'customers' ? 'bg-amber-500 text-slate-950 font-bold shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4" />
                <span>ลูกค้า & Statement</span>
              </div>
            </button>

            <button 
              onClick={() => setActiveTab('bids')} 
              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition ${
                activeTab === 'bids' ? 'bg-amber-500 text-slate-950 font-bold shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4" />
                <span>คำขอ & ประมูลญี่ปุ่น</span>
              </div>
            </button>

            <button 
              onClick={() => setActiveTab('vehicles')} 
              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition ${
                activeTab === 'vehicles' ? 'bg-amber-500 text-slate-950 font-bold shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4" />
                <span>รายการรถ & สต็อก</span>
              </div>
            </button>

            <button 
              onClick={() => setActiveTab('workshop')} 
              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition ${
                activeTab === 'workshop' ? 'bg-amber-500 text-slate-950 font-bold shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Wrench className="w-4 h-4" />
                <span>งานช่าง & แพ็คส่ง</span>
              </div>
            </button>

            <button 
              onClick={() => setActiveTab('logistics')} 
              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition ${
                activeTab === 'logistics' ? 'bg-amber-500 text-slate-950 font-bold shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4" />
                <span>ขนส่ง Multi-Leg</span>
              </div>
            </button>

            {userRole !== 'Mechanic' && (
              <>
                <button 
                  onClick={() => setActiveTab('finance')} 
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition ${
                    activeTab === 'finance' ? 'bg-amber-500 text-slate-950 font-bold shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <DollarSign className="w-4 h-4" />
                    <span>การเงิน & บัญชี</span>
                  </div>
                </button>

                <button 
                  onClick={() => setActiveTab('invoices')} 
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition ${
                    activeTab === 'invoices' ? 'bg-amber-500 text-slate-950 font-bold shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4" />
                    <span>Invoice / ใบแจ้งหนี้</span>
                  </div>
                </button>

                <button 
                  onClick={() => setActiveTab('claims')} 
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition ${
                    activeTab === 'claims' ? 'bg-amber-500 text-slate-950 font-bold shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldAlert className="w-4 h-4" />
                    <span>ระบบเคลมหลังส่งมอบ</span>
                  </div>
                </button>

                <button 
                  onClick={() => setActiveTab('settings')} 
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition ${
                    activeTab === 'settings' ? 'bg-amber-500 text-slate-950 font-bold shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <SettingsIcon className="w-4 h-4" />
                    <span>⚙️ ตั้งค่าระบบ</span>
                  </div>
                </button>
              </>
            )}
          </div>

          {/* User Profile Footer */}
          <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs mt-4">
            <div className="text-slate-400 text-[10px]">เข้าสู่ระบบในชื่อ:</div>
            <div className="font-bold text-amber-400">{userRole === 'Owner' ? 'คุณอนันต์ (Owner)' : userRole === 'Admin' ? 'แอดมินหมิว' : 'ช่างสมชาย'}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">CCP Bike Warehouse BKK</div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto space-y-6">

          {/* 1. DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-white">แดชบอร์ดภาพรวมธุรกิจ (Business Executive Dashboard)</h2>
                  <p className="text-xs text-slate-400 mt-1">สรุปยอดรวมรายรับ, รายจ่าย, สต็อกรถ และกำไรสุทธิการนำเข้ารถประมูลญี่ปุ่น</p>
                </div>
                <div className="text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-300">
                  อัปเดตล่าสุด: {new Date().toLocaleDateString('th-TH')}
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg">
                  <span className="text-slate-400 text-xs font-medium">รายรับรวม (Total Revenue)</span>
                  <div className="text-2xl font-black text-emerald-400 mt-1">฿478,000</div>
                  <span className="text-[10px] text-emerald-500 font-bold">↑ +12.5% จากเดือนที่แล้ว</span>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg">
                  <span className="text-slate-400 text-xs font-medium">รายจ่ายรวม (Total Expenses)</span>
                  <div className="text-2xl font-black text-rose-400 mt-1">฿356,000</div>
                  <span className="text-[10px] text-slate-500">ต้นทุนประมูล + ค่าตู้ + อะไหล่</span>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg">
                  <span className="text-slate-400 text-xs font-medium">กำไรประมาณการ (Pending)</span>
                  <div className="text-2xl font-black text-amber-400 mt-1">฿78,050</div>
                  <span className="text-[10px] text-amber-500 font-bold">รอยืนยันเสร็จสิ้นจาก Owner</span>
                </div>

                <div className="bg-gradient-to-br from-emerald-950 to-slate-900 border border-emerald-500/40 rounded-xl p-4 shadow-lg">
                  <span className="text-emerald-400 text-xs font-bold">กำไรสุทธิ (Net Realized Profit)</span>
                  <div className="text-2xl font-black text-emerald-300 mt-1">฿43,950</div>
                  <span className="text-[10px] text-emerald-400 font-bold">ยืนยันเสร็จสิ้นเรียบร้อยแล้ว</span>
                </div>
              </div>

              {/* Action Required Alert Box */}
              <div className="bg-slate-900 border-l-4 border-amber-500 rounded-r-xl p-4 shadow-md space-y-2">
                <h3 className="font-bold text-amber-400 text-sm flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>รายการที่ต้องติดตามเร่งด่วน (Action Required)</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                    <span className="text-amber-400 font-bold block">1. วันประมูลใกล้ถึง</span>
                    <span>BDS Kanto Lot #8812 (Honda CB400SF) ประมูล 22 ต.ค. เวลา 11:30 น.</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                    <span className="text-rose-400 font-bold block">2. รถค้างยืนยันเสร็จสิ้น</span>
                    <span>BIKE-2026-01 ส่งถึงลูกค้าแล้ว รอ Owner กดปุ่มยืนยัน</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                    <span className="text-emerald-400 font-bold block">3. ยอดค้างชำระลูกค้า</span>
                    <span>คุณอนันต์ ชัยเจริญ ค้างงวดสุดท้าย ฿128,000 (กำหนด 25 ต.ค.)</span>
                  </div>
                </div>
              </div>

              {/* Stock Overview Table */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                <h3 className="font-bold text-white text-sm">ตารางสต็อกรถปัจจุบัน & ระยะเวลาอยู่ในสต็อก (Aging Inventory)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase text-[10px]">
                      <tr>
                        <th className="p-2.5">รหัสรถ</th>
                        <th className="p-2.5">ยี่ห้อ / รุ่น</th>
                        <th className="p-2.5">สถานะงาน</th>
                        <th className="p-2.5">จำนวนวันในสต็อก</th>
                        <th className="p-2.5 text-right">ต้นทุนรวม</th>
                        <th className="p-2.5 text-right">ราคาตั้งขาย</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {vehicles.map((v) => (
                        <tr key={v.id} className="hover:bg-slate-800/50">
                          <td className="p-2.5 font-bold text-amber-400">{v.bikeCode}</td>
                          <td className="p-2.5 font-semibold text-white">{v.brand} {v.model} ({v.year})</td>
                          <td className="p-2.5">
                            <span className="bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded text-[10px] font-bold">
                              {v.status}
                            </span>
                          </td>
                          <td className="p-2.5 font-bold text-slate-300">{v.stockDays} วัน</td>
                          <td className="p-2.5 text-right font-bold text-rose-400">฿{v.totalCostThb.toLocaleString()}</td>
                          <td className="p-2.5 text-right font-bold text-emerald-400">฿{v.sellingPriceThb.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 2. CUSTOMERS TAB */}
          {activeTab === 'customers' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-white">ลูกค้า & Statement เดินบัญชี (Customers & Running Balance)</h2>
                  <p className="text-xs text-slate-400 mt-1">จัดการประวัติลูกค้า ยอดค้างชำระ และการปรับส่วนต่างอัตราแลกเปลี่ยน FX</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={loadSampleCustomer} 
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-3 py-1.5 rounded-lg text-xs border border-slate-700 flex items-center gap-1"
                  >
                    <span>✨ โหลดตัวอย่าง</span>
                  </button>
                  <button 
                    onClick={() => setActiveModal('addCustomer')} 
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3.5 py-1.5 rounded-lg text-xs flex items-center gap-1 shadow"
                  >
                    <Plus className="w-4 h-4" />
                    <span>ลงทะเบียนลูกค้าใหม่</span>
                  </button>
                </div>
              </div>

              {/* Customer Cards List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {customers.map((c) => (
                  <div key={c.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 shadow-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="bg-amber-500/20 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/30">
                          {c.country}
                        </span>
                        <h3 className="font-bold text-white text-base mt-1">{c.name}</h3>
                        <p className="text-xs text-slate-400">{c.company} (Tax ID: {c.taxId || '-'})</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block">ยอดค้างชำระ</span>
                        <span className="text-base font-black text-rose-400">฿{c.balanceDue.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs space-y-1 text-slate-300">
                      <div><strong>โทร:</strong> {c.phone} | <strong>LINE:</strong> {c.lineId || '-'} | <strong>WhatsApp:</strong> {c.whatsapp || '-'}</div>
                      <div><strong>ที่อยู่จัดส่ง:</strong> {c.address}</div>
                    </div>

                    {/* Dual-Rate Ledger Box */}
                    <div className="bg-slate-950 p-3 rounded-lg border border-amber-500/30 text-xs space-y-2">
                      <div className="flex items-center justify-between font-bold text-amber-400 text-[11px]">
                        <span>Statement สองเรทเปรียบเทียบ (Dual-Rate FX)</span>
                        <span className="text-[10px] text-slate-400">ส่วนต่างเรท: ฿{Math.abs(c.fxDiff).toLocaleString()} ({c.fxAbsorbedBy})</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="bg-slate-900 p-2 rounded">
                          <span className="text-slate-400 block text-[10px]">ยอดเข้าบัญชีจริง</span>
                          <span className="font-bold text-emerald-400">฿{c.actualReceivedThb.toLocaleString()}</span>
                        </div>
                        <div className="bg-slate-900 p-2 rounded">
                          <span className="text-slate-400 block text-[10px]">ยอดตามเรทลูกค้าอ้างอิง</span>
                          <span className="font-bold text-amber-400">฿{c.customerRefThb.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. BIDS & AUCTIONS TAB */}
          {activeTab === 'bids' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-white">คำขอ & ประมูลญี่ปุ่น (Bidding & Auction House)</h2>
                  <p className="text-xs text-slate-400 mt-1">จับคู่ความต้องการลูกค้ากับลานประมูลญี่ปุ่น พร้อมระบบเวลาคู่ (JST/ICT)</p>
                </div>
              </div>

              {/* Auction Item List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {auctionItems.map((item) => (
                  <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 shadow-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="bg-amber-500/20 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded">
                          {item.auctionHouse} (Lot #{item.lotNo})
                        </span>
                        <h3 className="font-bold text-white text-base mt-1">{item.brand} {item.model} ({item.year})</h3>
                        <p className="text-xs text-slate-400">ไมล์: {item.mileage} | เกรดประมูล: {item.grade}</p>
                      </div>
                      <img src={item.imageUrl} alt="Auction" className="w-14 h-14 rounded object-cover border border-slate-700" />
                    </div>

                    {/* Dual Time Badge */}
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-slate-400 text-[10px] block">เวลาญี่ปุ่น (JST)</span>
                        <span className="font-bold text-amber-400">{item.auctionDateJst}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400 text-[10px] block">เวลาไทย (ICT - ช้ากว่า 2 ชม.)</span>
                        <span className="font-bold text-emerald-400">{item.auctionDateIct}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <div>
                        <span className="text-slate-400 block text-[10px]">ราคาใส่สูงสุด (My Max Bid)</span>
                        <span className="font-black text-amber-400 text-sm">¥{item.myMaxBidJpy.toLocaleString()} JPY</span>
                      </div>
                      <span className="bg-blue-500/20 text-blue-400 font-bold px-3 py-1 rounded-full text-xs">
                        {item.result}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. VEHICLES & STOCK TAB */}
          {activeTab === 'vehicles' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-white">รายการรถ & สต็อก (Vehicles & Inventory Stock)</h2>
                  <p className="text-xs text-slate-400 mt-1">คลังข้อมูลรถนำเข้า ตารางต้นทุนต่อคัน และอัปโหลดรูปภาพถ่ายจริง</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={loadSampleVehicle} className="bg-slate-800 text-slate-300 font-bold px-3 py-1.5 rounded-lg text-xs border border-slate-700">
                    ✨ โหลดตัวอย่าง
                  </button>
                  <button onClick={() => setActiveModal('addVehicle')} className="bg-amber-500 text-slate-950 font-bold px-3.5 py-1.5 rounded-lg text-xs flex items-center gap-1 shadow">
                    <Plus className="w-4 h-4" />
                    <span>เพิ่มรถเข้าสต็อก</span>
                  </button>
                </div>
              </div>

              {/* Vehicle Inventory List */}
              <div className="space-y-4">
                {vehicles.map((v) => (
                  <div key={v.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4 shadow-xl">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img src={v.mainImage} alt={v.model} className="w-20 h-20 rounded-lg object-cover border border-amber-500/40" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="bg-amber-500/20 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/30">
                              {v.bikeCode}
                            </span>
                            <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded">
                              {v.type}
                            </span>
                            <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded">
                              อยู่ในสต็อก {v.stockDays} วัน
                            </span>
                          </div>
                          <h3 className="font-extrabold text-white text-lg mt-1">{v.brand} {v.model} ({v.year})</h3>
                          <p className="text-xs text-slate-400">เลขตัวถัง: <span className="font-mono text-amber-300">{v.chassisNo}</span> | เลขเครื่อง: <span className="font-mono">{v.engineNo}</span></p>
                          <p className="text-xs text-slate-400">ลูกค้า: <span className="text-white font-bold">{v.customerName}</span></p>
                        </div>
                      </div>

                      <div className="text-right space-y-1">
                        <span className="text-slate-400 text-xs block">ราคาตั้งขาย</span>
                        <div className="text-2xl font-black text-emerald-400">฿{v.sellingPriceThb.toLocaleString()}</div>
                        <div className="text-xs text-slate-400">ต้นทุนรวม: <span className="text-rose-400 font-bold">฿{v.totalCostThb.toLocaleString()}</span></div>
                        
                        {userRole === 'Owner' && !v.isCompleted && (
                          <button 
                            onClick={() => handleConfirmCompleted(v.id)} 
                            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black px-3 py-1.5 rounded-lg text-xs mt-2 shadow flex items-center gap-1 ml-auto"
                          >
                            <Check className="w-4 h-4" />
                            <span>ยืนยันเสร็จสิ้น (Owner Lock)</span>
                          </button>
                        )}

                        {v.isCompleted && (
                          <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/50 font-bold px-3 py-1 rounded-lg text-xs inline-block mt-2">
                            ✓ กำไรสุทธิบันทึกแล้ว
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Expenses Table Per Bike */}
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs space-y-2">
                      <h4 className="font-bold text-slate-300 text-xs flex items-center justify-between">
                        <span>รายการค่าใช้จ่ายต่อคัน (Expenses Breakdown)</span>
                        <span className="text-slate-500 text-[10px]">อัตโนมัติจากเบิกอะไหล่ & ขนส่ง</span>
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                        <div className="bg-slate-900 p-2 rounded">
                          <span className="text-slate-400 block text-[10px]">ราคาประมูล (JPY)</span>
                          <span className="font-bold text-white">¥{v.auctionPriceJpy.toLocaleString()} (฿{v.auctionPriceThb.toLocaleString()})</span>
                        </div>
                        <div className="bg-slate-900 p-2 rounded">
                          <span className="text-slate-400 block text-[10px]">ค่าแรงประกอบเช็กสภาพ</span>
                          <span className="font-bold text-amber-400">฿{v.laborCostThb.toLocaleString()}</span>
                        </div>
                        <div className="bg-slate-900 p-2 rounded">
                          <span className="text-slate-400 block text-[10px]">ค่าขนส่งตู้หารเฉลี่ย</span>
                          <span className="font-bold text-amber-400">฿{v.shippingCostThb.toLocaleString()}</span>
                        </div>
                        <div className="bg-slate-900 p-2 rounded">
                          <span className="text-slate-400 block text-[10px]">ค่าอะไหล่เบิกเพิ่ม</span>
                          <span className="font-bold text-amber-400">฿{v.partsCostThb.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. WORKSHOP & PACKING TAB */}
          {activeTab === 'workshop' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-white">งานช่าง & บริการแพ็คกิ้ง (Workshop & Packing Workflow)</h2>
                  <p className="text-xs text-slate-400 mt-1">บันทึกขั้นตอนการซ่อมประกอบตามหน้างานจริง สมุดบันทึกช่าง และบริการแพ็คกิ้ง QR Code</p>
                </div>
              </div>

              {/* Dynamic Tasks List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {workshopTasks.map((t) => (
                  <div key={t.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 shadow-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="bg-amber-500/20 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded">
                          {t.bikeCode}
                        </span>
                        <h3 className="font-bold text-white text-base mt-1">{t.stageName}</h3>
                        <p className="text-xs text-slate-400">ผู้รับผิดชอบ: <span className="text-white font-bold">{t.technician}</span> ({t.updatedAt})</p>
                      </div>
                      <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-full">
                        {t.status}
                      </span>
                    </div>

                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs text-slate-300">
                      {t.notes}
                    </div>

                    {t.images && t.images.length > 0 && (
                      <div className="flex gap-2 overflow-x-auto pt-1">
                        {t.images.map((img, idx) => (
                          <img key={idx} src={img} alt="Task step" className="w-16 h-16 rounded object-cover border border-slate-700" />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Packing Service Section */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-amber-400 text-sm flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    <span>บริการแพ็คกิ้งเพื่อจัดส่ง & สแกน QR Code ชิ้นส่วน (Packing Service & QR Tracking)</span>
                  </h3>
                </div>

                {packingLogs.map((p) => (
                  <div key={p.id} className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-3 text-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-bold text-white text-sm">{p.bikeCode} - {p.packingType}</span>
                        <div className="text-slate-400 text-[11px]">ผู้แพ็ค: {p.packerName} | วันที่: {p.packDate}</div>
                      </div>
                      <span className="bg-amber-500/20 text-amber-400 font-bold px-2.5 py-1 rounded">
                        แยกชิ้นส่วน: {p.piecesCount} ชิ้น
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {p.piecesDetail.map((piece) => (
                        <div key={piece.itemNo} className="bg-slate-900 p-2 rounded border border-slate-800 flex items-center justify-between">
                          <div>
                            <span className="font-bold text-slate-200 block">ชิ้นที่ {piece.itemNo}: {piece.name}</span>
                            <span className="font-mono text-amber-400 text-[10px]">{piece.qrCode}</span>
                          </div>
                          <QrCode className="w-6 h-6 text-slate-500" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. LOGISTICS TAB */}
          {activeTab === 'logistics' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-white">ขนส่ง Multi-Leg (International & Domestic Logistics)</h2>
                  <p className="text-xs text-slate-400 mt-1">ติดตามรอบการขนส่งทางเรือ/บก/อากาศ เลขตู้คอนเทนเนอร์ และเอกสารส่งออก</p>
                </div>
              </div>

              <div className="space-y-4">
                {shipments.map((s) => (
                  <div key={s.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 shadow-lg">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <span className="bg-blue-500/20 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded">
                          {s.mode}
                        </span>
                        <h3 className="font-bold text-white text-base mt-1">{s.routeTitle}</h3>
                        <p className="text-xs text-slate-400">ผู้ให้บริการ: <span className="text-amber-400 font-bold">{s.carrierName}</span></p>
                      </div>
                      <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full">
                        {s.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs">
                      <div>
                        <span className="text-slate-400 text-[10px] block">เลขตู้ / Container No.</span>
                        <span className="font-mono font-bold text-amber-300">{s.containerNo}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">เลข Tracking / Booking</span>
                        <span className="font-mono font-bold text-slate-200">{s.trackingNo}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">ค่าตู้รวมทั้งหมด</span>
                        <span className="font-bold text-rose-400">฿{s.totalFreightCostThb.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">หารเฉลี่ย {s.assignedBikesCount} คัน</span>
                        <span className="font-bold text-emerald-400">฿{s.costPerBikeThb.toLocaleString()} / คัน</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. FINANCE TAB */}
          {activeTab === 'finance' && userRole !== 'Mechanic' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-white">การเงิน & บัญชี (Finance & Multi-Currency Accounts)</h2>
                  <p className="text-xs text-slate-400 mt-1">สมุดบัญชีธนาคาร บันทึกสลิปเงินเข้า-เงินออก และแผนชำระงวด</p>
                </div>
              </div>

              {/* Transactions List */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 shadow-xl">
                <h3 className="font-bold text-white text-sm">ประวัติรายการเดินเงิน (Transaction Journal)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase text-[10px]">
                      <tr>
                        <th className="p-2.5">วัน-เวลา</th>
                        <th className="p-2.5">ประเภท</th>
                        <th className="p-2.5">ลูกค้า / รถ</th>
                        <th className="p-2.5">บัญชีธนาคาร</th>
                        <th className="p-2.5 text-right">จำนวนเงิน (THB)</th>
                        <th className="p-2.5 text-center">สลิปหลักฐาน</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {transactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-slate-800/50">
                          <td className="p-2.5 font-mono text-[11px] text-slate-400">{tx.date}</td>
                          <td className="p-2.5">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              tx.type === 'income' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                            }`}>
                              {tx.type === 'income' ? 'เงินเข้า' : 'เงินออก'} ({tx.category})
                            </span>
                          </td>
                          <td className="p-2.5">
                            <div className="font-bold text-white">{tx.customerName}</div>
                            <div className="text-[10px] text-amber-400">{tx.vehicleCode}</div>
                          </td>
                          <td className="p-2.5 text-slate-300">{tx.bankAccount}</td>
                          <td className={`p-2.5 text-right font-black ${tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {tx.type === 'income' ? '+' : '-'}฿{tx.amountThb.toLocaleString()}
                          </td>
                          <td className="p-2.5 text-center">
                            {tx.slipPhoto && (
                              <img src={tx.slipPhoto} alt="Slip" className="w-8 h-8 rounded object-cover mx-auto border border-slate-700" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 8. INVOICES TAB */}
          {activeTab === 'invoices' && userRole !== 'Mechanic' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-white">Invoice / ใบแจ้งหนี้ (Billing Statements)</h2>
                  <p className="text-xs text-slate-400 mt-1">ออกบิลใบแจ้งหนี้พร้อมโลโก้จริง 3 บรรทัดบังคับต่อคัน และประกาศท้ายบิลเด่นชัด</p>
                </div>
              </div>

              {/* Invoices List */}
              <div className="space-y-4">
                {invoices.map((inv) => (
                  <div key={inv.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-2xl max-w-4xl mx-auto">
                    
                    {/* Invoice Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start border-b border-slate-800 pb-4 gap-4">
                      <div className="flex items-center gap-3">
                        <img src={shopSettings.logoUrl} alt="Logo" className="w-12 h-12 rounded object-cover border border-amber-500" />
                        <div>
                          <h3 className="font-black text-amber-400 text-lg">{shopSettings.shopName}</h3>
                          <p className="text-xs text-slate-400">{shopSettings.address}</p>
                          <p className="text-xs text-slate-400">โทร: {shopSettings.phone}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <h4 className="font-black text-white text-xl">INVOICE / ใบแจ้งหนี้</h4>
                        <div className="text-amber-400 font-mono font-bold text-sm">{inv.invoiceNo}</div>
                        <div className="text-xs text-slate-400">วันที่ออก: {inv.date} | ครบกำหนด: {inv.dueDate}</div>
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs space-y-1">
                      <div className="font-bold text-white text-sm">ลูกค้า: {inv.customerName}</div>
                      <div className="text-slate-400">{inv.company} (Tax ID: {inv.taxId})</div>
                      <div className="text-slate-400">{inv.address}</div>
                    </div>

                    {/* Itemized Table - Mandatory 3 Lines */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-300">
                        <thead className="bg-slate-950 text-slate-400 uppercase text-[10px]">
                          <tr>
                            <th className="p-2">รายการสินค้า / บริการ (รถ: {inv.vehicleCode})</th>
                            <th className="p-2 text-right">จำนวนเงิน (THB)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                          <tr>
                            <td className="p-2 font-semibold text-white">1. ค่าตัวรถ ({inv.vehicleDetail})</td>
                            <td className="p-2 text-right font-bold text-white">฿{inv.vehicleCost.toLocaleString()}</td>
                          </tr>
                          <tr>
                            <td className="p-2 text-slate-300">2. ค่าแรงประกอบเช็กสภาพ (Labor Fee)</td>
                            <td className="p-2 text-right text-slate-200">฿{inv.laborFee.toLocaleString()}</td>
                          </tr>
                          <tr>
                            <td className="p-2 text-slate-300 flex items-center gap-2">
                              <span>3. ค่าจัดส่ง (Shipping Fee)</span>
                              {inv.shippingPaidAdvance && (
                                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/40">
                                  PAID / ชำระแล้ว
                                </span>
                              )}
                            </td>
                            <td className="p-2 text-right text-slate-200">฿{inv.shippingFee.toLocaleString()}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Invoice Grand Totals */}
                    <div className="flex flex-col sm:flex-row justify-between items-end border-t border-slate-800 pt-3 gap-4">
                      {/* Notice Box */}
                      <div className="bg-gradient-to-r from-amber-950/60 to-slate-950 border border-amber-500/50 p-3 rounded-lg text-[11px] text-amber-200/90 max-w-md">
                        <div className="font-bold text-amber-400 mb-0.5">ข้อความประกาศสำคัญประจำบิล:</div>
                        {shopSettings.invoiceNotice}
                      </div>

                      <div className="text-right space-y-1 text-xs">
                        <div className="text-slate-400">ยอดรวมสุทธิ: <span className="font-extrabold text-white text-sm">฿{inv.grandTotal.toLocaleString()}</span></div>
                        <div className="text-slate-400">ชำระแล้ว: <span className="font-bold text-emerald-400">฿{inv.depositPaid.toLocaleString()}</span></div>
                        <div className="text-rose-400 font-black text-base mt-1">ยอดคงเหลือค้างชำระ: ฿{inv.balanceDue.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 9. CLAIMS TAB */}
          {activeTab === 'claims' && userRole !== 'Mechanic' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-white">ระบบซับพอร์ตเคลมสินค้า (Post-Delivery Claims & Support)</h2>
                  <p className="text-xs text-slate-400 mt-1">บันทึกความเสียหายระหว่างจัดส่ง การอนุมัติเงินชดเชยจบเรื่อง และลงเป็นต้นทุนรถ</p>
                </div>
              </div>

              <div className="space-y-4">
                {claims.map((clm) => (
                  <div key={clm.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 shadow-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="bg-rose-500/20 text-rose-400 text-[10px] font-bold px-2 py-0.5 rounded">
                          {clm.vehicleCode} - {clm.customerName}
                        </span>
                        <h3 className="font-bold text-white text-base mt-1">{clm.issueDetail}</h3>
                      </div>
                      <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full">
                        {clm.status}
                      </span>
                    </div>

                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-slate-400">ยอดเงินร้านซับพอร์ตชดเชย:</span>
                      <span className="font-black text-rose-400 text-sm">฿{clm.supportAmountThb.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 10. SETTINGS TAB */}
          {activeTab === 'settings' && userRole !== 'Mechanic' && (
            <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
              <div>
                <h2 className="text-xl font-extrabold text-white">⚙️ ตั้งค่าระบบ (System Profile & Config Settings)</h2>
                <p className="text-xs text-slate-400 mt-1">จัดการข้อมูลร้าน รูปภาพโลโก้ สกุลเงิน บัญชีธนาคาร และข้อความประกาศบิล</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-xl">
                <h3 className="font-bold text-amber-400 text-sm">1. ข้อมูลร้าน & โลโก้แบรนด์ (Store Profile)</h3>
                
                <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
                  <img src={shopSettings.logoUrl} alt="Logo" className="w-16 h-16 rounded-lg object-cover border border-amber-500" />
                  <div>
                    <label className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3 py-1.5 rounded cursor-pointer border border-slate-700 inline-block">
                      <span>📸 เปลี่ยนภาพโลโก้ร้าน</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (b64) => setShopSettings({ ...shopSettings, logoUrl: b64 }))} />
                    </label>
                    <p className="text-[10px] text-slate-500 mt-1">รองรับ JPG/PNG อัปโหลดแล้วอัปเดตบน Header และ Invoice ทันที</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1">ชื่อร้าน / บริษัท</label>
                    <input 
                      type="text" 
                      value={shopSettings.shopName} 
                      onChange={(e) => setShopSettings({ ...shopSettings, shopName: e.target.value })} 
                      className="bg-slate-950 border border-slate-800 text-white rounded p-2 w-full focus:outline-none focus:border-amber-500 font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">เบอร์โทรศัพท์ร้าน</label>
                    <input 
                      type="text" 
                      value={shopSettings.phone} 
                      onChange={(e) => setShopSettings({ ...shopSettings, phone: e.target.value })} 
                      className="bg-slate-950 border border-slate-800 text-white rounded p-2 w-full focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-slate-400 block mb-1">ที่อยู่ร้านประจำบิล</label>
                    <input 
                      type="text" 
                      value={shopSettings.address} 
                      onChange={(e) => setShopSettings({ ...shopSettings, address: e.target.value })} 
                      className="bg-slate-950 border border-slate-800 text-white rounded p-2 w-full focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-slate-400 block mb-1">ข้อความประกาศสำคัญท้ายใบแจ้งหนี้ (Notice Box)</label>
                    <textarea 
                      rows={2} 
                      value={shopSettings.invoiceNotice} 
                      onChange={(e) => setShopSettings({ ...shopSettings, invoiceNotice: e.target.value })} 
                      className="bg-slate-950 border border-slate-800 text-amber-200 rounded p-2 w-full focus:outline-none focus:border-amber-500 text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* MODAL: ADD CUSTOMER FORM */}
      {activeModal === 'addCustomer' && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 max-w-lg w-full space-y-4 shadow-2xl animate-fadeIn">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">ลงทะเบียนลูกค้าใหม่ (Clean Blank Form)</h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleAddCustomerSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">ชื่อ-นามสกุลลูกค้า *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="เช่น คุณสมชาย บิ๊กไบค์" 
                  value={newCust.name} 
                  onChange={(e) => setNewCust({ ...newCust, name: e.target.value })} 
                  className="bg-slate-950 border border-slate-800 text-white rounded p-2 w-full focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">ชื่อบริษัท / นิติบุคคล</label>
                  <input 
                    type="text" 
                    placeholder="ถ้าซื้อในนามบริษัท" 
                    value={newCust.company} 
                    onChange={(e) => setNewCust({ ...newCust, company: e.target.value })} 
                    className="bg-slate-950 border border-slate-800 text-white rounded p-2 w-full focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Tax ID</label>
                  <input 
                    type="text" 
                    placeholder="เลขประจำตัวผู้เสียภาษี" 
                    value={newCust.taxId} 
                    onChange={(e) => setNewCust({ ...newCust, taxId: e.target.value })} 
                    className="bg-slate-950 border border-slate-800 text-white rounded p-2 w-full focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">เบอร์โทรศัพท์</label>
                  <input 
                    type="text" 
                    placeholder="08X-XXX-XXXX" 
                    value={newCust.phone} 
                    onChange={(e) => setNewCust({ ...newCust, phone: e.target.value })} 
                    className="bg-slate-950 border border-slate-800 text-white rounded p-2 w-full focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">ประเทศจัดส่ง</label>
                  <select 
                    value={newCust.country} 
                    onChange={(e) => setNewCust({ ...newCust, country: e.target.value })} 
                    className="bg-slate-950 border border-slate-800 text-amber-400 rounded p-2 w-full focus:outline-none focus:border-amber-500 font-bold"
                  >
                    <option value="ไทย">ไทย</option>
                    <option value="ญี่ปุ่น">ญี่ปุ่น</option>
                    <option value="อินโดนีเซีย">อินโดนีเซีย</option>
                    <option value="มาเลเซีย">มาเลเซีย</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">ที่อยู่จัดส่งเต็ม</label>
                <textarea 
                  rows={2} 
                  placeholder="ระบุที่อยู่จัดส่ง..." 
                  value={newCust.address} 
                  onChange={(e) => setNewCust({ ...newCust, address: e.target.value })} 
                  className="bg-slate-950 border border-slate-800 text-white rounded p-2 w-full focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded font-bold">ยกเลิก</button>
                <button type="submit" className="px-5 py-2 bg-amber-500 text-slate-950 rounded font-bold">บันทึกข้อมูลลูกค้า</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD VEHICLE FORM */}
      {activeModal === 'addVehicle' && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 max-w-lg w-full space-y-4 shadow-2xl animate-fadeIn">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">คีย์รับรถเข้าสต็อกใหม่ (Blank Vehicle Intake Form)</h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleAddVehicleSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">ยี่ห้อรถ *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="เช่น Honda, Yamaha" 
                    value={newVehicle.brand} 
                    onChange={(e) => setNewVehicle({ ...newVehicle, brand: e.target.value })} 
                    className="bg-slate-950 border border-slate-800 text-white rounded p-2 w-full focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">รุ่นรถ *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="เช่น CB400SF, SR400" 
                    value={newVehicle.model} 
                    onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })} 
                    className="bg-slate-950 border border-slate-800 text-white rounded p-2 w-full focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">เลขตัวถัง (VIN / Chassis)</label>
                  <input 
                    type="text" 
                    placeholder="เช่น NC42-1904821" 
                    value={newVehicle.chassisNo} 
                    onChange={(e) => setNewVehicle({ ...newVehicle, chassisNo: e.target.value })} 
                    className="bg-slate-950 border border-slate-800 text-amber-300 font-mono rounded p-2 w-full focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">ราคาประมูล (JPY)</label>
                  <input 
                    type="number" 
                    placeholder="0" 
                    value={newVehicle.auctionPriceJpy} 
                    onChange={(e) => setNewVehicle({ ...newVehicle, auctionPriceJpy: Number(e.target.value) })} 
                    className="bg-slate-950 border border-slate-800 text-emerald-400 font-bold rounded p-2 w-full focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">รูปถ่ายตัวรถจริง (Vehicle Image)</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => handleFileUpload(e, (b64) => setNewVehicle({ ...newVehicle, mainImage: b64 }))} 
                  className="bg-slate-950 border border-slate-800 text-slate-300 rounded p-1.5 w-full text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded font-bold">ยกเลิก</button>
                <button type="submit" className="px-5 py-2 bg-amber-500 text-slate-950 rounded font-bold">บันทึกรถเข้าสต็อก</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
