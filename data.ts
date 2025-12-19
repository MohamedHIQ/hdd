import { HDDPart, PartId } from './types';

export const HDD_PARTS: Record<PartId, HDDPart> = {
  base: {
    id: 'base',
    nameAr: 'القاعدة (الهيكل الأساسي)',
    nameEn: 'Base Casting',
    descriptionAr: 'هو الجسم المعدني الذي يحمل جميع أجزاء القرص الصلب ويحميها من الصدمات.',
    descriptionEn: 'The metal body that holds all the hard disk parts and protects them from impact.',
    color: '#1a202c' // Dark metal
  },
  platter: {
    id: 'platter',
    nameAr: 'الأقراص (الأطباق)',
    nameEn: 'Platters',
    descriptionAr: 'هي الأقراص الدائرية التي يتم تخزين البيانات عليها مغناطيسياً. يوجد هنا قرصين لزيادة السعة التخزينية.',
    descriptionEn: 'Circular disks where data is magnetically stored. Two platters are shown here for increased capacity.',
    color: '#e2e8f0' // Shiny Silver
  },
  spindle: {
    id: 'spindle',
    nameAr: 'المحور (المغزل)',
    nameEn: 'Spindle',
    descriptionAr: 'هو المحرك الذي يقوم بتدوير الأقراص (Platters) بسرعة ثابتة (مثلاً 7200 دورة في الدقيقة).',
    descriptionEn: 'The motor that spins the platters at a constant speed (e.g., 7200 RPM).',
    color: '#cbd5e0'
  },
  tape_seal: {
    id: 'tape_seal',
    nameAr: 'شريط الختم (العزل)',
    nameEn: 'Tape Seal',
    descriptionAr: 'شريط لاصق يمنع دخول الغبار والرطوبة إلى داخل القرص، لأن أي ذرة غبار قد تتلف البيانات.',
    descriptionEn: 'Adhesive tape that prevents dust and moisture from entering the drive, as any dust particle can damage data.',
    color: '#ecc94b' // Yellowish tape
  },
  actuator: {
    id: 'actuator',
    nameAr: 'المشغل (المحرك)',
    nameEn: 'Actuator',
    descriptionAr: 'هو المحرك الذي يحرك ذراع القراءة والكتابة للوصول إلى المكان الصحيح على القرص.',
    descriptionEn: 'The motor that moves the read/write arm to reach the correct location on the disk.',
    color: '#718096' // Magnet assembly color
  },
  actuator_axis: {
    id: 'actuator_axis',
    nameAr: 'محور المشغل',
    nameEn: 'Actuator Axis',
    descriptionAr: 'النقطة المركزية التي يدور حولها ذراع المشغل.',
    descriptionEn: 'The central point around which the actuator arm pivots.',
    color: '#4a5568'
  },
  arm: {
    id: 'arm',
    nameAr: 'ذراع المشغل',
    nameEn: 'Actuator Arm',
    descriptionAr: 'الذراع المعدني الذي يحمل رؤوس القراءة والكتابة ويتحرك عبر سطح الأقراص.',
    descriptionEn: 'The metal arm that holds the read/write heads and moves across the platter surface.',
    color: '#a0aec0'
  },
  head: {
    id: 'head',
    nameAr: 'المنزلق (والرأس)',
    nameEn: 'Slider (and Head)',
    descriptionAr: 'الرأس هو المسؤول عن قراءة وكتابة البيانات مغناطيسياً، والمنزلق هو الجزء الذي يساعد الرأس على "التحليق" فوق القرص بمسافة مجهرية.',
    descriptionEn: 'The Head reads/writes data magnetically, while the Slider helps it "fly" over the disk at a microscopic distance.',
    color: '#d69e2e' // Gold/Copper tip
  },
  ribbon: {
    id: 'ribbon',
    nameAr: 'الكيبل الشريطي',
    nameEn: 'Ribbon Cable',
    descriptionAr: 'ينقل الإشارات الكهربائية والبيانات من رؤوس القراءة إلى اللوحة الإلكترونية.',
    descriptionEn: 'Transmits electrical signals and data from the read heads to the Logic Board.',
    color: '#dd6b20' // Orange/Copper ribbon
  },
  connector_scsi: {
    id: 'connector_scsi',
    nameAr: 'موصل واجهة SCSI',
    nameEn: 'SCSI Interface Connector',
    descriptionAr: 'منفذ نقل البيانات (نوع قديم كان يستخدم في الخوادم).',
    descriptionEn: 'Data transfer port (an older standard used in servers).',
    color: '#2d3748' // Black plastic
  },
  connector_power: {
    id: 'connector_power',
    nameAr: 'موصل الطاقة',
    nameEn: 'Power Connector',
    descriptionAr: 'المنفذ الذي يتم من خلاله إمداد القرص بالكهرباء من مزود الطاقة.',
    descriptionEn: 'The port used to supply electricity to the drive from the Power Supply.',
    color: '#edf2f7' // White plastic
  },
  jumper_pins: {
    id: 'jumper_pins',
    nameAr: 'دبابيس الجمبر',
    nameEn: 'Jumper Pins',
    descriptionAr: 'دبابيس معدنية تستخدم لضبط إعدادات القرص (مثل Master/Slave).',
    descriptionEn: 'Metal pins used to configure drive settings (like Master/Slave).',
    color: '#d4af37' // Gold pins
  },
  jumper: {
    id: 'jumper',
    nameAr: 'الجمبر (الواصل)',
    nameEn: 'Jumper',
    descriptionAr: 'قطعة بلاستيكية صغيرة توضع فوق الدبابيس لإتمام الدائرة وتغيير الإعدادات.',
    descriptionEn: 'A small plastic piece placed over pins to complete the circuit and change settings.',
    color: '#38a169' // Green plastic
  },
  cover_mount_holes: {
    id: 'cover_mount_holes',
    nameAr: 'ثقوب تثبيت الغطاء',
    nameEn: 'Cover Mounting Holes',
    descriptionAr: 'فتحات ملولبة في زوايا الهيكل تستخدم لتثبيت الغطاء المعدني العلوي لحماية الأجزاء الداخلية.',
    descriptionEn: 'Threaded holes at the corners of the casting used to secure the top metal cover.',
    color: '#718096'
  },
  case_mount_holes: {
    id: 'case_mount_holes',
    nameAr: 'ثقوب تثبيت العلبة',
    nameEn: 'Case Mounting Holes',
    descriptionAr: 'فتحات جانبية تستخدم لتثبيت القرص الصلب داخل هيكل الكمبيوتر (Case) بإحكام.',
    descriptionEn: 'Side holes used to securely mount the hard drive inside the computer case.',
    color: '#718096'
  }
};