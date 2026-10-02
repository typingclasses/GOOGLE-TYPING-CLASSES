import officialBannerImg from '../assets/images/official_gtc_banner_1790423250991.jpg';
import { 
  Course, 
  StudentResult, 
  FAQItem, 
  User, 
  CertificateItem, 
  WFHApplication, 
  EnquiryItem, 
  AnnouncementItem, 
  MediaItem, 
  AdminUser, 
  ActivityLogItem, 
  InstituteSettings,
  TypingTestRecord,
  TypingPassage
} from '../types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'eng-typing',
    title: 'English Typing Masterclass',
    category: 'typing',
    duration: '3 Months',
    fees: '₹1,500 / course',
    description: 'Professional English typing training with touch-typing techniques, speed building (40+ WPM), accuracy drills, and software practice.',
    highlights: ['Qwerty Touch Typing', 'Speed Drills up to 50 WPM', 'Backspace & Accuracy Control', 'Exam Simulation Software'],
    level: 'Beginner to Advanced',
    iconName: 'Keyboard',
    published: true
  },
  {
    id: 'hindi-typing',
    title: 'Hindi Typing (Kruti Dev & Remington Gail)',
    category: 'typing',
    duration: '3 Months',
    fees: '₹1,500 / course',
    description: 'Master Hindi typing using Kruti Dev and Remington Gail keyboard layouts, essential for Bihar government and central competitive exams.',
    highlights: ['Kruti Dev 010 Layout', 'Remington Gail Layout', 'Special Character Shortcuts', 'High-Speed Accuracy Training'],
    level: 'Beginner to Advanced',
    iconName: 'Type',
    published: true
  },
  {
    id: 'ssc-chsl-typing',
    title: 'SSC CHSL & CGL Typing Preparation',
    category: 'competitive',
    duration: '2 Months',
    fees: '₹2,000 / course',
    description: 'Dedicated typing test preparation modeled strictly on SSC CHSL, CGL, and state board typing exam guidelines with live error calculation.',
    highlights: ['Strict SSC Exam Pattern', 'Timed 15-Minute Tests', 'Detailed Error Analysis', 'Backspace Restrictions Practice'],
    level: 'Intermediate / Advanced',
    iconName: 'Target',
    published: true
  },
  {
    id: 'shorthand',
    title: 'Shorthand / Stenography (English & Hindi)',
    category: 'shorthand',
    duration: '6 Months',
    fees: '₹4,000 / course',
    description: 'Pitman shorthand training for stenographer positions in courts, secretariat, railways, and public sector competitive exams.',
    highlights: ['Pitman Shorthand Theory', 'Dictation & Transcription Practice', 'Speed upto 80-100 WPM', 'Legal & General Dictations'],
    level: 'Intermediate',
    iconName: 'FileText',
    published: true
  },
  {
    id: 'dca',
    title: 'DCA (Diploma in Computer Applications)',
    category: 'computer',
    duration: '6 Months',
    fees: '₹4,500 / course',
    description: 'Comprehensive diploma covering Windows, MS Office (Word, Excel, PowerPoint), Internet, Multimedia, and fundamental hardware concepts.',
    highlights: ['MS Office Advanced (Excel Dashboards)', 'Windows OS & File Management', 'Internet & Cyber Security Basics', 'Practical Lab Sessions'],
    level: 'Beginner',
    iconName: 'Laptop',
    published: true
  },
  {
    id: 'adca',
    title: 'ADCA (Advanced Diploma in Computer Applications)',
    category: 'computer',
    duration: '12 Months',
    fees: '₹8,000 / course',
    description: 'Our flagship professional program covering programming, web design, financial accounting, desktop publishing, and database fundamentals.',
    highlights: ['C, C++ & HTML/CSS Basics', 'Tally Prime with GST', 'Photoshop & DTP Tools', 'Advanced Excel & Access'],
    level: 'Comprehensive',
    iconName: 'Cpu',
    published: true
  },
  {
    id: 'tally',
    title: 'Tally Prime with GST & Accounting',
    category: 'computer',
    duration: '3 Months',
    fees: '₹2,500 / course',
    description: 'Practical business accounting course covering ledger creation, GST invoicing, inventory management, taxation, and balance sheet preparation.',
    highlights: ['GST Filing & E-Way Bills', 'Payroll & Inventory Management', 'Bank Reconciliation', 'Real-world Voucher Entries'],
    level: 'Intermediate',
    iconName: 'Calculator',
    published: true
  }
];

export const COURSES_DATA = INITIAL_COURSES;

export const INITIAL_STUDENTS: User[] = [
  {
    id: 'GTC-2026-001',
    name: 'Rahul Kumar',
    email: 'rahul.kumar@example.com',
    mobile: '+91 9876543210',
    course: 'English Typing Masterclass',
    registrationNo: 'REG884920',
    enrolledDate: '10 Jan 2026',
    status: 'Active',
    dob: '12/05/2005',
    address: 'Kankarbagh, Patna',
    batch: 'Morning 8:00 AM'
  },
  {
    id: 'GTC-2026-002',
    name: 'Priya Kumari',
    email: 'priya.kumari@example.com',
    mobile: '+91 9876543211',
    course: 'Hindi Typing (Kruti Dev)',
    registrationNo: 'REG884921',
    enrolledDate: '12 Jan 2026',
    status: 'Active',
    dob: '15/08/2004',
    address: 'Boring Road, Patna',
    batch: 'Day 11:00 AM'
  },
  {
    id: 'GTC-2026-003',
    name: 'Amitabh Sharma',
    email: 'amitabh.sharma@example.com',
    mobile: '+91 9876543212',
    course: 'ADCA (Advanced Diploma)',
    registrationNo: 'REG884922',
    enrolledDate: '15 Jan 2026',
    status: 'Active',
    dob: '01/12/2003',
    address: 'Rajendra Nagar, Patna',
    batch: 'Evening 4:00 PM'
  }
];

export const INITIAL_RESULTS: StudentResult[] = [
  {
    id: 'RES-101',
    studentId: 'GTC-2026-001',
    registrationNo: 'REG884920',
    name: 'Rahul Kumar',
    dob: '12052005',
    course: 'English Typing Masterclass',
    speed: '48 WPM',
    accuracy: '98.5%',
    testDate: '15 Jan 2026',
    status: 'Distinction',
    achievement: 'Cleared SSC CHSL Typing Tier-2 Practice',
    certificateStatus: 'Available',
    published: true
  },
  {
    id: 'RES-102',
    studentId: 'GTC-2026-002',
    registrationNo: 'REG884921',
    name: 'Priya Kumari',
    dob: '15082004',
    course: 'Hindi Typing (Kruti Dev)',
    speed: '42 WPM',
    accuracy: '96.2%',
    testDate: '20 Jan 2026',
    status: 'Passed',
    achievement: 'State Secretariat Stenographer Prep',
    certificateStatus: 'Issued',
    published: true
  },
  {
    id: 'RES-103',
    studentId: 'GTC-2026-003',
    registrationNo: 'REG884922',
    name: 'Amitabh Sharma',
    dob: '01122003',
    course: 'ADCA (Advanced Diploma)',
    speed: 'N/A',
    accuracy: 'N/A',
    testDate: '10 Feb 2026',
    status: 'Completed',
    achievement: 'Top Scorer in Tally & Excel Module',
    certificateStatus: 'Available',
    published: true
  }
];

export const INITIAL_CERTIFICATES: CertificateItem[] = [
  {
    id: 'CERT-001',
    certificateId: 'GTC-CERT-884920',
    studentId: 'GTC-2026-001',
    studentName: 'Rahul Kumar',
    course: 'English Typing Masterclass',
    issueDate: '20 Jan 2026',
    status: 'Valid',
    verificationCode: 'VERIFY-884920'
  },
  {
    id: 'CERT-002',
    certificateId: 'GTC-CERT-884921',
    studentId: 'GTC-2026-002',
    studentName: 'Priya Kumari',
    course: 'Hindi Typing (Kruti Dev)',
    issueDate: '25 Jan 2026',
    status: 'Valid',
    verificationCode: 'VERIFY-884921'
  }
];

export const INITIAL_WFH_APPLICATIONS: WFHApplication[] = [
  {
    id: 'WFH-001',
    name: 'Suman Kumar',
    mobile: '+91 9933221100',
    email: 'suman@example.com',
    city: 'Patna',
    interest: 'Affiliate Marketing & Content Promotion',
    date: '20 Sep 2026',
    status: 'New',
    notes: 'Interested in weekend affiliate webinars'
  }
];

export const INITIAL_ENQUIRIES: EnquiryItem[] = [
  {
    id: 'ENQ-001',
    name: 'Vikash Singh',
    mobile: '+91 9811223344',
    email: 'vikash@example.com',
    courseInterested: 'English Typing',
    message: 'What is the batch timing for morning english typing?',
    date: '24 Sep 2026',
    status: 'New',
    notes: 'Called back but phone busy'
  }
];

export const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ANN-001',
    title: 'New Evening Typing Batches Starting Soon',
    content: 'Special batches for SSC CHSL & Civil Court typing practice starting from 1st October 2026 at our Tripolia Kathak center.',
    date: '24 Sep 2026',
    published: true
  }
];

export const INITIAL_MEDIA: MediaItem[] = [
  {
    id: 'MED-001',
    name: 'Google-Typing-Classes-Official-Banner.jpg',
    type: 'image',
    url: officialBannerImg,
    size: '1.8 MB',
    uploadDate: '26 Sep 2026'
  }
];

export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: 'ADM-001',
    name: 'Chief Administrator',
    email: 'admin@googletypingclasses.com',
    role: 'Super Admin',
    status: 'Active',
    lastLogin: 'Today, 20:10 IST'
  },
  {
    id: 'ADM-002',
    name: 'Exam & Result Manager',
    email: 'results@googletypingclasses.com',
    role: 'Result Manager',
    status: 'Active',
    lastLogin: 'Yesterday, 14:30 IST'
  }
];

export const INITIAL_LOGS: ActivityLogItem[] = [
  {
    id: 'LOG-001',
    adminName: 'Chief Administrator',
    action: 'Admin Login',
    details: 'Logged into Admin Dashboard securely.',
    date: '25 Sep 2026, 20:10',
    ipAddress: '192.168.1.10'
  }
];

export const INITIAL_SETTINGS: InstituteSettings = {
  instituteName: 'GOOGLE TYPING CLASSES',
  tagline: 'Best Computer & Typing Classes in Patna',
  phone: '+91 9471085404',
  whatsapp: '+91 9471085404',
  email: 'maasitaniwas@gmail.com',
  address: 'Tripolia Kathak, Patna, Bihar – 800007',
  mapLocation: 'Tripolia Kathak, Patna, Bihar',
  websiteTitle: 'Google Typing Classes Patna | Best Computer & Typing Institute',
  metaDescription: 'Best Computer & Typing Classes in Patna. Learn English & Hindi Typing, Shorthand, DCA, ADCA, Tally, SSC CHSL Typing Preparation.',
  keywords: 'Typing Classes in Patna, Computer Classes in Patna, DCA Course, ADCA, Tally, Shorthand',
  footerText: '© 2026 Google Typing Classes. All Rights Reserved.',
  logoUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%232563eb'/%3E%3Cstop offset='100%25' stop-color='%23f97316'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100' height='100' rx='28' fill='url(%23grad)'/%3E%3Cpath d='M25 40h50v20H25z' fill='none' stroke='%23ffffff' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ccircle cx='35' cy='50' r='3' fill='%23ffffff'/%3E%3Ccircle cx='50' cy='50' r='3' fill='%23ffffff'/%3E%3Ccircle cx='65' cy='50' r='3' fill='%23ffffff'/%3E%3C/svg%3E",
  facebookUrl: 'https://facebook.com/googletypingclassespatna',
  youtubeUrl: 'https://youtube.com/@googletypingclassespatna',
  instagramUrl: 'https://instagram.com/googletypingclasses',
  telegramUrl: 'https://t.me/googletypingclasses',
  adminEmail: 'admin@googletypingclasses.com',
  adminPassword: 'admin123'
};

export const FAQS_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What courses are available at Google Typing Classes?',
    answer: 'We offer professional training in English & Hindi Typing (Kruti Dev & Remington Gail), Shorthand (Stenography), DCA, ADCA, Tally Prime with GST, Computer Basics, and SSC CHSL Typing Preparation.'
  },
  {
    id: 'faq-2',
    question: 'Do you provide English and Hindi typing training?',
    answer: 'Yes! We have dedicated computer lab sessions for both English touch-typing and Hindi typing (Kruti Dev 010 and Remington Gail layouts) with specialized software.'
  },
  {
    id: 'faq-3',
    question: 'Do you provide certificates upon course completion?',
    answer: 'Yes, students who successfully complete their selected course and fulfill institute attendance and assessment requirements receive a Course Completion Certificate.'
  },
  {
    id: 'faq-4',
    question: 'How can I check my typing test result or course status?',
    answer: 'You can check your result instantly by visiting our Results page and searching with your Student Name, Student ID, or Registration Number.'
  },
  {
    id: 'faq-5',
    question: 'How can students login to the student portal?',
    answer: 'Registered students can click on "Student Login" in the top navigation, enter their mobile number/email and password to access their personal dashboard, track typing tests, and view certificates.'
  },
  {
    id: 'faq-6',
    question: 'Do you provide shorthand classes?',
    answer: 'Yes, we provide expert Pitman Shorthand (Stenography) training in both English and Hindi for competitive exams like Civil Courts, High Court, and SSC.'
  },
  {
    id: 'faq-7',
    question: 'Do you provide competitive exam typing practice?',
    answer: 'Yes, our lab simulates exact exam environments for SSC CHSL, CGL, Railways, and state government typing tests with timer restrictions and error counts.'
  },
  {
    id: 'faq-8',
    question: 'What is the Work From Home affiliate marketing program?',
    answer: 'Our Work From Home section introduces learners to digital affiliate marketing concepts, online referral frameworks, and performance-based marketing strategies.'
  },
  {
    id: 'faq-9',
    question: 'Is affiliate marketing income guaranteed?',
    answer: 'No. Affiliate marketing income is performance-based and is not guaranteed. Earnings depend entirely on individual performance, skills, traffic, conversions, and applicable program terms.'
  }
];

export const INITIAL_TYPING_PASSAGES: TypingPassage[] = [
  {
    id: 'PASS-ENG-01',
    title: 'SSC CHSL & High Court Exam Paragraph',
    language: 'English',
    difficulty: 'SSC CHSL / Court Special',
    category: 'Competitive Examination',
    durationSeconds: 300,
    text: "Typing speed and accuracy are crucial skills for competitive examinations such as SSC CHSL, CGL, and judicial recruitment tests. Regular practice on professional keyboards helps build muscle memory, finger agility, and confidence. Google Typing Classes in Patna provides comprehensive computer and typing training to help students achieve professional certification and career success in government and private sectors.",
    wordCount: 60,
    dateAdded: '2026-09-20',
    isActive: true
  },
  {
    id: 'PASS-ENG-02',
    title: 'Digital Literacy and Modern Workplace Skills',
    language: 'English',
    difficulty: 'Medium',
    category: 'Computer Education',
    durationSeconds: 120,
    text: "Computer education has become an essential part of modern career development. Mastering software applications like DCA, ADCA, Tally Prime, and shorthand stenography opens up numerous job opportunities in government sectors, public enterprises, and private corporations across Bihar and India. Consistent typing practice ensures effortless keyboard navigation and high productivity.",
    wordCount: 49,
    dateAdded: '2026-09-22',
    isActive: true
  },
  {
    id: 'PASS-ENG-03',
    title: 'Touch Typing Fundamentals & Speed Acceleration',
    language: 'English',
    difficulty: 'Easy',
    category: 'Speed Training',
    durationSeconds: 60,
    text: "The home row keys are the foundation of touch typing technique. Always keep your index fingers on the F and J keys. Look at the screen and not at your fingers while typing to maximize your speed and precision.",
    wordCount: 39,
    dateAdded: '2026-09-25',
    isActive: true
  },
  {
    id: 'PASS-HIN-01',
    title: 'उच्च न्यायालय एवं एसएससी हिंदी टाइपिंग विशेष गद्यांश',
    language: 'Hindi',
    hindiFontType: 'Kruti Dev 010',
    difficulty: 'SSC CHSL / Court Special',
    category: 'न्यायालय एवं सरकारी भर्ती',
    durationSeconds: 300,
    text: "भारत एक विशाल और विविधतापूर्ण लोकतांत्रिक देश है। यहाँ ज्ञान और विज्ञान की प्राचीन परंपरा रही है। डिजिटल क्रांति के इस युग में कंप्यूटर साक्षरता और टाइपिंग कौशल प्रत्येक युवा के लिए आवश्यक बन गया है। विभिन्न सरकारी प्रतियोगी परीक्षाओं जैसे एसएससी, रेलवे, उच्च न्यायालय एवं सचिवालय सहायक भर्ती में गति एवं शुद्धता दोनों का अत्यधिक महत्व होता है। नियमित अभ्यास से सफलता सुनिश्चित होती है।",
    wordCount: 66,
    dateAdded: '2026-09-20',
    isActive: true
  },
  {
    id: 'PASS-HIN-02',
    title: 'कंप्यूटर शिक्षा और तकनीकी रोजगार अवसर',
    language: 'Hindi',
    hindiFontType: 'Unicode / Mangal',
    difficulty: 'Medium',
    category: 'कंप्यूटर शिक्षा',
    durationSeconds: 120,
    text: "कंप्यूटर शिक्षा आधुनिक युग में सफलता की सबसे बड़ी कुंजी है। डीसीए, एडीसीए, टैली प्राइम और आशुलिपि जैसे व्यावसायिक पाठ्यक्रमों से युवाओं को उत्कृष्ट रोजगार के अवसर प्राप्त होते हैं। सही तकनीक और निरंतर अभ्यास से टाइपिंग में चालीस से पचास शब्द प्रति मिनट की गति हासिल की जा सकती है।",
    wordCount: 49,
    dateAdded: '2026-09-23',
    isActive: true
  },
  {
    id: 'PASS-HIN-03',
    title: 'गूगल टाइपिंग क्लासेज दैनिक हिंदी अभ्यास',
    language: 'Hindi',
    hindiFontType: 'Remington Gail',
    difficulty: 'Easy',
    category: 'बुनियादी अभ्यास',
    durationSeconds: 60,
    text: "गूगल टाइपिंग क्लासेज पटना में आपका स्वागत है। हिंदी एवं अंग्रेजी टाइपिंग का प्रतिदिन अभ्यास करें। अपनी अंगुलियों को कीबोर्ड पर सही स्थिति में रखें और बिना देखे टाइप करने का प्रयास करें।",
    wordCount: 32,
    dateAdded: '2026-09-26',
    isActive: true
  }
];

