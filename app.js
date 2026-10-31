'use strict';
/* ============================================================
   BanglaTools — app logic
   - Pure calculation functions in `Calc` (no DOM) so they can be
     unit-tested with node.
   - Bilingual UI (bn/en) via the I18N dictionary + data-i18n attrs.
   - Lightweight CSS-friendly animations: view transitions,
     reveal-on-scroll, animated counters, FAQ accordion.
   ============================================================ */

/* ---------------- language state ---------------- */
let LANG = 'bn'; // default Bengali

const I18N = {
bn: {
  'meta.title': 'BanglaTools — বাংলায় ফ্রি অনলাইন টুলস | যাকাত, জমি, বিদ্যুৎ বিল, GPA ক্যালকুলেটর',
  'meta.desc': 'সম্পূর্ণ বাংলায় ১৫টি ফ্রি অনলাইন টুল — যাকাত ক্যালকুলেটর, জমি পরিমাপ, বিদ্যুৎ বিল হিসাব, GPA ক্যালকুলেটর, নামাজের সময়সূচী, EMI, BMI, মুদ্রা কনভার্টারসহ আরও অনেক কিছু। কোনো সাইন-আপ ছাড়াই ব্যবহার করুন।',
  'back': '← সব টুল',
  'tag': 'সব হিসাব, এক ঠিকানায়',
  'ad': 'বিজ্ঞাপন',
  'hero.title': 'বাংলায় <span class="gold">১৫টি</span> ফ্রি টুল',
  'hero.sub': 'হিসাব-নিকাশ এখন মাতৃভাষায় — কোনো সাইন-আপ বা টাকা ছাড়াই।',
  'hero.p1': '✓ ১০০% ফ্রি',
  'hero.p2': '✓ সাইন-আপ লাগে না',
  'hero.p3': '✓ মোবাইল ফ্রেন্ডলি',
  'tools.zakat': 'যাকাত ক্যালকুলেটর',
  'tools.land': 'জমি পরিমাপ ক্যালকুলেটর',
  'tools.electricity': 'বিদ্যুৎ বিল ক্যালকুলেটর',
  'tools.gpa': 'GPA / CGPA ক্যালকুলেটর',
  'tools.age': 'বয়স ক্যালকুলেটর',
  'tools.gold': 'স্বর্ণের দাম ক্যালকুলেটর',
  'tools.freelancerTax': 'ফ্রিল্যান্সার ট্যাক্স',
  'tools.prayer': 'নামাজের সময়সূচী',
  'tools.emi': 'EMI / লোন ক্যালকুলেটর',
  'tools.currency': 'মুদ্রা কনভার্টার',
  'tools.bmi': 'BMI ক্যালকুলেটর',
  'tools.date': 'তারিখ কনভার্টার',
  'tools.mess': 'মেস খরচ ভাগাভাগি',
  'tools.qurbani': 'কুরবানির দাম অনুমান',
  'tools.incomeTax': 'ইনকাম ট্যাক্স হিসাব',
  'faq.title': 'সচরাচর জিজ্ঞাসা',
  'faq.q1': 'BanglaTools কি সম্পূর্ণ ফ্রি?',
  'faq.a1': 'হ্যাঁ, সব ১৫টি টুল সম্পূর্ণ ফ্রি — কোনো সাইন-আপ, সাবস্ক্রিপশন বা লুকানো চার্জ নেই। ভবিষ্যতে সাইট চালু রাখতে বিজ্ঞাপন দেখানো হতে পারে।',
  'faq.q2': 'আমার তথ্য কি সার্ভারে পাঠানো হয়?',
  'faq.a2': 'না। নামাজের সময়সূচী ও মুদ্রার লাইভ রেট ছাড়া সব হিসাব আপনার ফোন/ব্রাউজারেই হয় — কোনো তথ্য আমাদের সার্ভারে যায় না বা সংরক্ষণ করা হয় না।',
  'faq.q3': 'হিসাব কতটা নির্ভুল?',
  'faq.a3': 'সব ফর্মুলা যাচাই করা, তবে বিদ্যুৎ বিলের স্ল্যাব, ট্যাক্স স্ল্যাব ও বাজারদর বদলাতে পারে — এগুলো টুলের ভেতরেই পরিবর্তনযোগ্য রাখা হয়েছে। আর্থিক বা আইনি সিদ্ধান্তের আগে অফিসিয়াল উৎস মিলিয়ে নিন।',
  'faq.q4': 'নামাজের সময় ও মুদ্রার রেট কোথা থেকে আসে?',
  'faq.a4': 'নামাজের সময় Aladhan API থেকে এবং মুদ্রার রেট open.er-api.com থেকে লাইভ আনা হয় (দুটোই ফ্রি, কী লাগে না)। ইন্টারনেট না থাকলে মুদ্রা কনভার্টারে ম্যানুয়াল রেট দেওয়ার অপশন আছে।',
  'faq.q5': 'ইন্টারনেট ছাড়া কি ব্যবহার করা যাবে?',
  'faq.a5': 'পেজ একবার লোড হলে নামাজের সময়সূচী ও লাইভ মুদ্রার রেট ছাড়া বাকি ১৩টি টুল অফলাইনেও কাজ করে।',
  /* zakat */
  'zakat.h1': 'যাকাত ক্যালকুলেটর',
  'zakat.desc': 'আপনার সম্পদের উপর কত যাকাত ফরজ, সহজে হিসাব করুন।',
  'zakat.cash': 'নগদ টাকা (৳)',
  'zakat.gold': 'স্বর্ণ (ভরি)',
  'zakat.silver': 'রূপা (ভরি)',
  'zakat.business': 'ব্যবসায়িক পণ্যের মূল্য (৳)',
  'zakat.receivable': 'পাওনা টাকা (৳)',
  'zakat.debt': 'ঋণ / দেনা (৳)',
  'zakat.market': 'বাজারদর (পরিবর্তনযোগ্য)',
  'zakat.goldPrice': 'স্বর্ণের দাম প্রতি ভরি (৳)',
  'zakat.silverPrice': 'রূপার দাম প্রতি ভরি (৳)',
  'zakat.nisabHint': 'নিসাব = ৭.৫ ভরি স্বর্ণ বা ৫২.৫ ভরি রূপার সমমূল্যের মধ্যে যেটি কম।',
  'zakat.btn': 'যাকাত হিসাব করুন',
  /* land */
  'land.h1': 'জমি পরিমাপ ক্যালকুলেটর',
  'land.desc': 'শতাংশ, কাঠা, বিঘা, একরসহ সব এককে জমির হিসাব।',
  'land.amount': 'পরিমাণ',
  'land.unit': 'একক',
  'land.note': '⚠️ বিঘা ও কাঠার মাপ অঞ্চলভেদে ভিন্ন হয় (যেমন ঢাকায় ১ বিঘা ≈ ৩৩ শতাংশ, রাজশাহীতে ≈ ২০ শতাংশ)। এখানে প্রচলিত মান (১ বিঘা = ২০ কাঠা = ৩৩ শতাংশ) ব্যবহার করা হয়েছে।',
  'land.btn': 'রূপান্তর করুন',
  'units.shotangsho': 'শতাংশ',
  'units.katha': 'কাঠা',
  'units.bigha': 'বিঘা',
  'units.acre': 'একর',
  'units.sqft': 'বর্গফুট',
  'units.sqm': 'বর্গমিটার',
  'units.gonda': 'গন্ডা',
  'units.chotak': 'ছটাক',
  /* electricity */
  'elec.h1': 'বিদ্যুৎ বিল ক্যালকুলেটর',
  'elec.desc': 'আবাসিক (LT-A) স্ল্যাব অনুযায়ী মাসিক বিদ্যুৎ বিলের আনুমানিক হিসাব।',
  'elec.provider': 'বিতরণ সংস্থা',
  'elec.units': 'মোট ব্যবহৃত ইউনিট (kWh)',
  'elec.load': 'অনুমোদিত লোড (kW)',
  'elec.loadHint': 'লোড আপনার বিলের কাগজে লেখা থাকে।',
  'elec.rates': 'স্ল্যাব রেট (পরিবর্তনযোগ্য) — ৳/ইউনিট',
  'elec.lifeline': 'লাইফলাইন (মোট ≤ ৫০ ইউনিট হলে সব ইউনিটে)',
  'elec.s75': '১–৭৫ ইউনিট',
  'elec.s200': '৭৬–২০০ ইউনিট',
  'elec.s300': '২০১–৩০০ ইউনিট',
  'elec.s400': '৩০১–৪০০ ইউনিট',
  'elec.s600': '৪০১–৬০০ ইউনিট',
  'elec.sAbove': '৬০০+ ইউনিট',
  'elec.demand': 'ডিমান্ড চার্জ (৳/kW)',
  'elec.vat': 'ভ্যাট (%)',
  'elec.rateHint': 'ডিফল্ট রেট: BERC জুন ২০২৬ আবাসিক (LT-A) ট্যারিফ।',
  'elec.note': '⚠️ এটি <strong>আনুমানিক</strong> হিসাব — প্রকৃত বিলের সাথে মিলিয়ে নিন। মিটার ভাড়া ও অন্যান্য চার্জ এতে অন্তর্ভুক্ত নয়।',
  'elec.btn': 'বিল হিসাব করুন',
  /* gpa */
  'gpa.h1': 'GPA / CGPA ক্যালকুলেটর',
  'gpa.desc': 'SSC / HSC পরীক্ষার GPA হিসাব — অফিসিয়াল গ্রেডিং পদ্ধতিতে।',
  'gpa.subjects': 'বিষয়সমূহ ও নম্বর',
  'gpa.add': '+ বিষয় যোগ করুন',
  'gpa.fourth': '৪র্থ (ঐচ্ছিক) বিষয়',
  'gpa.fourthHint': '৪র্থ বিষয়ে গ্রেড পয়েন্ট ২.০০-এর বেশি হলে অতিরিক্ত অংশ যোগ হয়।',
  'gpa.btn': 'GPA হিসাব করুন',
  'gpa.subPh': 'বিষয়ের নাম',
  'gpa.marksPh': 'নম্বর',
  'gpa.none': 'কোনোটিই নয়',
  'gpa.def1': 'বাংলা', 'gpa.def2': 'English', 'gpa.def3': 'গণিত',
  'gpa.def4': 'পদার্থবিজ্ঞান', 'gpa.def5': 'রসায়ন', 'gpa.def6': 'জীববিজ্ঞান', 'gpa.def7': 'আইসিটি',
  /* age */
  'age.h1': 'বয়স ক্যালকুলেটর',
  'age.desc': 'জন্মতারিখ থেকে সঠিক বয়স — বছর, মাস, দিন ও মোট দিনে।',
  'age.dob': 'জন্মতারিখ',
  'age.btn': 'বয়স হিসাব করুন',
  /* gold */
  'gold.h1': 'স্বর্ণের দাম ক্যালকুলেটর',
  'gold.desc': 'ভরি থেকে আনা, রতি ও গ্রামে স্বর্ণের দাম।',
  'gold.price': 'প্রতি ভরি স্বর্ণের দাম (৳)',
  'gold.hint': '১ ভরি = ১৬ আনা, ১ আনা = ৬ রতি, ১ ভরি = ১১.৬৬৪ গ্রাম।',
  'gold.btn': 'দাম হিসাব করুন',
  /* freelancer tax */
  'ftax.h1': 'ফ্রিল্যান্সার ট্যাক্স ক্যালকুলেটর',
  'ftax.desc': 'বাৎসরিক আয়ের উপর আনুমানিক আয়কর হিসাব।',
  'ftax.income': 'বাৎসরিক করযোগ্য আয় (৳)',
  'ftax.category': 'করদাতার ধরন',
  'ftax.slabs': 'স্ল্যাব (পরিবর্তনযোগ্য) — FY ২০২৫-২৬',
  'ftax.free': 'করমুক্ত সীমা (৳)',
  'ftax.s1': 'পরবর্তী ৩,০০,০০০-এ হার (%)',
  'ftax.s2': 'পরবর্তী ৪,০০,০০০-এ হার (%)',
  'ftax.s3': 'পরবর্তী ৫,০০,০০০-এ হার (%)',
  'ftax.s4': 'পরবর্তী ২০,০০,০০০-এ হার (%)',
  'ftax.s5': 'অবশিষ্ট আয়ে হার (%)',
  'ftax.note': '⚠️ আনুমানিক হিসাব। ফ্রিল্যান্সারদের জন্য বিশেষ কর সুবিধা থাকতে পারে — কর উপদেষ্টার পরামর্শ নিন।',
  'ftax.btn': 'ট্যাক্স হিসাব করুন',
  'taxcat.general': 'সাধারণ ব্যক্তি (করমুক্ত ৩,৭৫,০০০)',
  'taxcat.women': 'নারী / ৬৫+ প্রবীণ (করমুক্ত ৪,২৫,০০০)',
  'taxcat.disabled': 'তৃতীয় লিঙ্গ / প্রতিবন্ধী (করমুক্ত ৫,০০,০০০)',
  'taxcat.fighter': 'মুক্তিযোদ্ধা (করমুক্ত ৫,২৫,০০০)',
  /* prayer */
  'prayer.h1': 'নামাজের সময়সূচী',
  'prayer.desc': 'আজকের পাঁচ ওয়াক্ত নামাজের সময় — জেলা অনুযায়ী।',
  'prayer.district': 'জেলা',
  'prayer.note': '⚠️ সময় আনুমানিক — স্থানীয় মসজিদের সময়সূচীর সাথে মিলিয়ে নিন।',
  'prayer.btn': 'সময়সূচী দেখুন',
  'district.dhaka': 'ঢাকা', 'district.chittagong': 'চট্টগ্রাম', 'district.sylhet': 'সিলেট',
  'district.rajshahi': 'রাজশাহী', 'district.khulna': 'খুলনা', 'district.barisal': 'বরিশাল',
  'district.rangpur': 'রংপুর', 'district.mymensingh': 'ময়মনসিংহ',
  'district.comilla': 'কুমিল্লা', 'district.cox': 'কক্সবাজার',
  /* emi */
  'emi.h1': 'EMI / লোন ক্যালকুলেটর',
  'emi.desc': 'মাসিক কিস্তি ও মোট সুদের হিসাব।',
  'emi.principal': 'ঋণের পরিমাণ (৳)',
  'emi.rate': 'বাৎসরিক সুদের হার (%)',
  'emi.months': 'মেয়াদ (মাস)',
  'emi.btn': 'EMI হিসাব করুন',
  /* currency */
  'cur.h1': 'মুদ্রা কনভার্টার',
  'cur.desc': 'লাইভ এক্সচেঞ্জ রেটে মুদ্রা রূপান্তর।',
  'cur.amount': 'পরিমাণ',
  'cur.from': 'থেকে',
  'cur.to': 'এতে',
  'cur.manual': 'ম্যানুয়াল রেট (ঐচ্ছিক — ১',
  'cur.manual2': '= কত',
  'cur.manualPh': 'খালি রাখলে লাইভ রেট',
  'cur.hint': 'ইন্টারনেট না থাকলে ম্যানুয়াল রেট দিন।',
  'cur.btn': 'রূপান্তর করুন',
  /* bmi */
  'bmi.h1': 'BMI ক্যালকুলেটর',
  'bmi.desc': 'উচ্চতা ও ওজন থেকে বডি মাস ইনডেক্স।',
  'bmi.height': 'উচ্চতা (সেন্টিমিটার)',
  'bmi.weight': 'ওজন (কেজি)',
  'bmi.note': '⚠️ BMI একটি সাধারণ নির্দেশক মাত্র — চিকিৎসা পরামর্শের বিকল্প নয়।',
  'bmi.btn': 'BMI হিসাব করুন',
  /* date */
  'date.h1': 'তারিখ কনভার্টার',
  'date.desc': 'ইংরেজি তারিখ ↔ বাংলা (বঙ্গাব্দ) তারিখ।',
  'date.g2b': 'ইংরেজি → বাংলা',
  'date.gregDate': 'ইংরেজি তারিখ',
  'date.btn1': 'বাংলা তারিখ দেখুন',
  'date.b2g': 'বাংলা → ইংরেজি',
  'date.day': 'দিন',
  'date.month': 'মাস',
  'date.bnYear': 'বছর (বঙ্গাব্দ)',
  'date.btn2': 'ইংরেজি তারিখ দেখুন',
  'date.note': '⚠️ বঙ্গাব্দ রূপান্তর আনুমানিক (পহেলা বৈশাখ = ১৪ এপ্রিল ধরে)।',
  /* mess */
  'mess.h1': 'মেস খরচ ভাগাভাগি',
  'mess.desc': 'মোট খরচ সদস্যদের মধ্যে সমান ভাগ + ব্যক্তিগত অতিরিক্ত খরচ।',
  'mess.total': 'মোট খরচ (৳)',
  'mess.members': 'সদস্যগণ',
  'mess.add': '+ সদস্য যোগ করুন',
  'mess.hint': 'অতিরিক্ত = শুধু ওই সদস্যের ব্যক্তিগত খরচ (যেমন নিজের ওষুধ)।',
  'mess.btn': 'ভাগ করুন',
  'mess.namePh': 'নাম',
  'mess.extraPh': 'অতিরিক্ত (৳)',
  'mess.m1': 'সদস্য ১', 'mess.m2': 'সদস্য ২', 'mess.m3': 'সদস্য ৩',
  /* qurbani */
  'qurb.h1': 'কুরবানির পশুর দাম অনুমান',
  'qurb.desc': 'জীবিত ওজন ও প্রতি কেজি দর থেকে আনুমানিক দাম।',
  'qurb.weight': 'পশুর ওজন (কেজি)',
  'qurb.pricekg': 'প্রতি কেজি দর (৳)',
  'qurb.hint': 'হাটের চলতি দর অনুযায়ী প্রতি কেজি দর বসান।',
  'qurb.note': '⚠️ আনুমানিক মূল্য (±১০%) — জাত, স্বাস্থ্য ও হাটের চাহিদায় দাম ভিন্ন হয়।',
  'qurb.btn': 'দাম অনুমান করুন',
  /* income tax */
  'itax.h1': 'ইনকাম ট্যাক্স হিসাব',
  'itax.desc': 'চাকরিজীবী / e-TIN ধারীদের বাৎসরিক আয়কর হিসাব।',
  'itax.income': 'বাৎসরিক করযোগ্য আয় (৳)',
  'itax.category': 'করদাতার ধরন',
  'itax.slabs': 'স্ল্যাব (পরিবর্তনযোগ্য) — FY ২০২৫-২৬',
  'itax.free': 'করমুক্ত সীমা (৳)',
  'itax.s1': 'পরবর্তী ৩,০০,০০০-এ হার (%)',
  'itax.s2': 'পরবর্তী ৪,০০,০০০-এ হার (%)',
  'itax.s3': 'পরবর্তী ৫,০০,০০০-এ হার (%)',
  'itax.s4': 'পরবর্তী ২০,০০,০০০-এ হার (%)',
  'itax.s5': 'অবশিষ্ট আয়ে হার (%)',
  'itax.note': '⚠️ আনুমানিক হিসাব। বিনিয়োগ রিবেট, ন্যূনতম কর (পুরাতন করদাতা ৫,০০০ / নতুন ১,০০০) প্রযোজ্য হতে পারে — রিটার্নের আগে কর উপদেষ্টার পরামর্শ নিন।',
  'itax.btn': 'ট্যাক্স হিসাব করুন',
  'footer.tag': '— সব হিসাব, এক ঠিকানায়।',
  'footer.disclaimer': 'সব হিসাব আনুমানিক ও শিক্ষামূলক উদ্দেশ্যে। আর্থিক, আইনি বা ধর্মীয় সিদ্ধান্তের আগে বিশেষজ্ঞের পরামর্শ নিন। আপনার তথ্য আপনার ডিভাইসেই থাকে — সার্ভারে পাঠানো হয় না।',
  /* dynamic result strings */
  'r.zakatTotal': 'মোট যাকাতযোগ্য সম্পদ',
  'r.nisab': 'নিসাব সীমা',
  'r.zakatDue': 'আপনার যাকাত (২.৫%)',
  'r.zakatNotDue': 'আপনার সম্পদ নিসাব সীমার নিচে — যাকাত ফরজ নয়।',
  'r.unit': 'একক', 'r.value': 'মান',
  'r.slab': 'স্ল্যাব', 'r.units': 'ইউনিট', 'r.rate': 'রেট (৳)', 'r.amount': 'টাকা (৳)',
  'r.energy': 'বিদ্যুৎ খরচ', 'r.demand': 'ডিমান্ড চার্জ', 'r.vat': 'ভ্যাট', 'r.total': 'সর্বমোট বিল',
  'r.subject': 'বিষয়', 'r.marks': 'নম্বর', 'r.grade': 'গ্রেড পয়েন্ট',
  'r.yourGpa': 'আপনার GPA',
  'r.fail': 'একটি আবশ্যিক বিষয়ে ফেল থাকায় সামগ্রিক ফলাফল ফেল।',
  'r.years': 'বছর', 'r.months': 'মাস', 'r.days': 'দিন', 'r.totalDays': 'মোট দিন',
  'r.yourAge': 'আপনার বয়স',
  'r.perBhori': 'প্রতি ভরি', 'r.perAna': 'প্রতি আনা', 'r.perRati': 'প্রতি রতি', 'r.perGram': 'প্রতি গ্রাম',
  'r.taxTotal': 'মোট আয়কর',
  'r.taxFree': 'করমুক্ত আয়',
  'r.monthlyEmi': 'মাসিক কিস্তি (EMI)',
  'r.totalPay': 'মোট পরিশোধ',
  'r.totalInterest': 'মোট সুদ',
  'r.converted': 'রূপান্তরিত মান',
  'r.rateUsed': 'ব্যবহৃত রেট',
  'r.liveRate': 'লাইভ রেট', 'r.manualRate': 'ম্যানুয়াল রেট',
  'r.category': 'ক্যাটাগরি',
  'r.yourBmi': 'আপনার BMI',
  'r.banglaDate': 'বাংলা তারিখ',
  'r.engDate': 'ইংরেজি তারিখ',
  'r.name': 'নাম', 'r.share': 'দিতে হবে', 'r.extra': 'ব্যক্তিগত অতিরিক্ত',
  'r.estPrice': 'আনুমানিক দাম',
  'r.priceRange': 'সম্ভাব্য রেঞ্জ (±১০%)',
  'r.time': 'সময়',
  'r.enterValid': 'সঠিক মান দিন।',
  'r.offline': 'ইন্টারনেট সংযোগ পাওয়া যায়নি। পরে আবার চেষ্টা করুন।',
  'r.loading': 'লোড হচ্ছে…',
  'r.catUnder': 'কম ওজন', 'r.catNormal': 'স্বাভাবিক ওজন',
  'r.catOver': 'অতিরিক্ত ওজন', 'r.catObese': 'স্থূলতা'
},
en: {
  'meta.title': 'BanglaTools — Free Online Tools in Bengali & English | Zakat, Land, Electricity Bill, GPA Calculators',
  'meta.desc': '15 free online tools in Bengali and English — Zakat calculator, land measurement, electricity bill, GPA calculator, prayer times, EMI, BMI, currency converter and more. No sign-up needed.',
  'back': '← All tools',
  'tag': 'Every calculation, one home',
  'ad': 'Advertisement',
  'hero.title': '<span class="gold">15</span> Free Tools in Bengali',
  'hero.sub': 'Everyday calculations in your own language — no sign-up, no cost.',
  'hero.p1': '✓ 100% free',
  'hero.p2': '✓ No sign-up',
  'hero.p3': '✓ Mobile friendly',
  'tools.zakat': 'Zakat Calculator',
  'tools.land': 'Land Measurement',
  'tools.electricity': 'Electricity Bill Calculator',
  'tools.gpa': 'GPA / CGPA Calculator',
  'tools.age': 'Age Calculator',
  'tools.gold': 'Gold Price Calculator',
  'tools.freelancerTax': 'Freelancer Tax',
  'tools.prayer': 'Prayer Times',
  'tools.emi': 'EMI / Loan Calculator',
  'tools.currency': 'Currency Converter',
  'tools.bmi': 'BMI Calculator',
  'tools.date': 'Date Converter',
  'tools.mess': 'Mess Cost Splitter',
  'tools.qurbani': 'Qurbani Price Estimator',
  'tools.incomeTax': 'Income Tax Calculator',
  'faq.title': 'Frequently asked questions',
  'faq.q1': 'Is BanglaTools completely free?',
  'faq.a1': 'Yes — all 15 tools are completely free, with no sign-up, subscription or hidden charges. Ads may be shown in future to keep the site running.',
  'faq.q2': 'Is my data sent to a server?',
  'faq.a2': 'No. Except for prayer times and live currency rates, every calculation happens on your own phone/browser — nothing is sent to or stored on our servers.',
  'faq.q3': 'How accurate are the calculations?',
  'faq.a3': 'All formulas are verified, but electricity slabs, tax slabs and market prices can change — they are editable inside each tool. Cross-check with official sources before financial or legal decisions.',
  'faq.q4': 'Where do prayer times and currency rates come from?',
  'faq.a4': 'Prayer times come live from the Aladhan API and currency rates from open.er-api.com (both free, no key needed). The currency converter has a manual-rate option when offline.',
  'faq.q5': 'Can I use it without internet?',
  'faq.a5': 'Once the page has loaded, all tools except prayer times and live currency rates work offline.',
  'zakat.h1': 'Zakat Calculator',
  'zakat.desc': 'Easily calculate how much Zakat is due on your assets.',
  'zakat.cash': 'Cash in hand (৳)',
  'zakat.gold': 'Gold (bhori)',
  'zakat.silver': 'Silver (bhori)',
  'zakat.business': 'Business goods value (৳)',
  'zakat.receivable': 'Money owed to you (৳)',
  'zakat.debt': 'Debts / loans owed (৳)',
  'zakat.market': 'Market prices (editable)',
  'zakat.goldPrice': 'Gold price per bhori (৳)',
  'zakat.silverPrice': 'Silver price per bhori (৳)',
  'zakat.nisabHint': 'Nisab = the lower of 7.5 bhori of gold or 52.5 bhori of silver in value.',
  'zakat.btn': 'Calculate Zakat',
  'land.h1': 'Land Measurement Calculator',
  'land.desc': 'Convert land area across shotangsho, katha, bigha, acre and more.',
  'land.amount': 'Amount',
  'land.unit': 'Unit',
  'land.note': '⚠️ Bigha and katha sizes vary by region (e.g. ≈33 shotangsho per bigha in Dhaka, ≈20 in Rajshahi). Standard values (1 bigha = 20 katha = 33 shotangsho) are used here.',
  'land.btn': 'Convert',
  'units.shotangsho': 'Shotangsho',
  'units.katha': 'Katha',
  'units.bigha': 'Bigha',
  'units.acre': 'Acre',
  'units.sqft': 'Sq. feet',
  'units.sqm': 'Sq. meter',
  'units.gonda': 'Gonda',
  'units.chotak': 'Chotak',
  'elec.h1': 'Electricity Bill Calculator',
  'elec.desc': 'Estimated monthly bill on residential (LT-A) slabs.',
  'elec.provider': 'Distribution utility',
  'elec.units': 'Total units used (kWh)',
  'elec.load': 'Sanctioned load (kW)',
  'elec.loadHint': 'Load is printed on your bill paper.',
  'elec.rates': 'Slab rates (editable) — ৳/unit',
  'elec.lifeline': 'Lifeline (applies to all units if total ≤ 50)',
  'elec.s75': '1–75 units',
  'elec.s200': '76–200 units',
  'elec.s300': '201–300 units',
  'elec.s400': '301–400 units',
  'elec.s600': '401–600 units',
  'elec.sAbove': '601+ units',
  'elec.demand': 'Demand charge (৳/kW)',
  'elec.vat': 'VAT (%)',
  'elec.rateHint': 'Default rates: BERC June 2026 residential (LT-A) tariff.',
  'elec.note': '⚠️ This is an <strong>estimate</strong> — cross-check with your actual bill. Meter rent and other charges are not included.',
  'elec.btn': 'Calculate bill',
  'gpa.h1': 'GPA / CGPA Calculator',
  'gpa.desc': 'SSC / HSC GPA using the official grading system.',
  'gpa.subjects': 'Subjects & marks',
  'gpa.add': '+ Add subject',
  'gpa.fourth': '4th (optional) subject',
  'gpa.fourthHint': 'Grade points above 2.00 in the 4th subject are added as bonus.',
  'gpa.btn': 'Calculate GPA',
  'gpa.subPh': 'Subject name',
  'gpa.marksPh': 'Marks',
  'gpa.none': 'None',
  'gpa.def1': 'Bangla', 'gpa.def2': 'English', 'gpa.def3': 'Mathematics',
  'gpa.def4': 'Physics', 'gpa.def5': 'Chemistry', 'gpa.def6': 'Biology', 'gpa.def7': 'ICT',
  'age.h1': 'Age Calculator',
  'age.desc': 'Exact age from date of birth — years, months, days & total days.',
  'age.dob': 'Date of birth',
  'age.btn': 'Calculate age',
  'gold.h1': 'Gold Price Calculator',
  'gold.desc': 'Gold price per ana, rati and gram from per-bhori price.',
  'gold.price': 'Gold price per bhori (৳)',
  'gold.hint': '1 bhori = 16 ana, 1 ana = 6 rati, 1 bhori = 11.664 grams.',
  'gold.btn': 'Calculate price',
  'ftax.h1': 'Freelancer Tax Calculator',
  'ftax.desc': 'Estimated income tax on annual earnings.',
  'ftax.income': 'Annual taxable income (৳)',
  'ftax.category': 'Taxpayer type',
  'ftax.slabs': 'Slabs (editable) — FY 2025-26',
  'ftax.free': 'Tax-free limit (৳)',
  'ftax.s1': 'Rate on next ৳300,000 (%)',
  'ftax.s2': 'Rate on next ৳400,000 (%)',
  'ftax.s3': 'Rate on next ৳500,000 (%)',
  'ftax.s4': 'Rate on next ৳2,000,000 (%)',
  'ftax.s5': 'Rate on remaining income (%)',
  'ftax.note': '⚠️ Approximate. Special tax benefits may apply to freelancers — consult a tax advisor.',
  'ftax.btn': 'Calculate tax',
  'taxcat.general': 'General individual (tax-free ৳375,000)',
  'taxcat.women': 'Women / 65+ senior (tax-free ৳425,000)',
  'taxcat.disabled': 'Third gender / disabled (tax-free ৳500,000)',
  'taxcat.fighter': 'Freedom fighter (tax-free ৳525,000)',
  'prayer.h1': 'Prayer Times',
  'prayer.desc': "Today's five daily prayer times by district.",
  'prayer.district': 'District',
  'prayer.note': '⚠️ Times are approximate — confirm with your local mosque.',
  'prayer.btn': 'Show times',
  'district.dhaka': 'Dhaka', 'district.chittagong': 'Chattogram', 'district.sylhet': 'Sylhet',
  'district.rajshahi': 'Rajshahi', 'district.khulna': 'Khulna', 'district.barisal': 'Barishal',
  'district.rangpur': 'Rangpur', 'district.mymensingh': 'Mymensingh',
  'district.comilla': 'Cumilla', 'district.cox': "Cox's Bazar",
  'emi.h1': 'EMI / Loan Calculator',
  'emi.desc': 'Monthly installment and total interest.',
  'emi.principal': 'Loan amount (৳)',
  'emi.rate': 'Annual interest rate (%)',
  'emi.months': 'Term (months)',
  'emi.btn': 'Calculate EMI',
  'cur.h1': 'Currency Converter',
  'cur.desc': 'Convert currencies at live exchange rates.',
  'cur.amount': 'Amount',
  'cur.from': 'From',
  'cur.to': 'To',
  'cur.manual': 'Manual rate (optional — 1',
  'cur.manual2': '= how much',
  'cur.manualPh': 'Leave empty for live rate',
  'cur.hint': 'Enter a manual rate when offline.',
  'cur.btn': 'Convert',
  'bmi.h1': 'BMI Calculator',
  'bmi.desc': 'Body Mass Index from height and weight.',
  'bmi.height': 'Height (cm)',
  'bmi.weight': 'Weight (kg)',
  'bmi.note': '⚠️ BMI is a general indicator only — not a substitute for medical advice.',
  'bmi.btn': 'Calculate BMI',
  'date.h1': 'Date Converter',
  'date.desc': 'Gregorian date ↔ Bengali (Bangabda) date.',
  'date.g2b': 'English → Bengali',
  'date.gregDate': 'Gregorian date',
  'date.btn1': 'Show Bengali date',
  'date.b2g': 'Bengali → English',
  'date.day': 'Day',
  'date.month': 'Month',
  'date.bnYear': 'Year (Bangabda)',
  'date.btn2': 'Show English date',
  'date.note': '⚠️ Bangabda conversion is approximate (Pohela Boishakh = 14 April).',
  'mess.h1': 'Mess Cost Splitter',
  'mess.desc': 'Split total cost equally + personal extras per member.',
  'mess.total': 'Total cost (৳)',
  'mess.members': 'Members',
  'mess.add': '+ Add member',
  'mess.hint': 'Extra = only that member\u2019s personal cost (e.g. own medicine).',
  'mess.btn': 'Split',
  'mess.namePh': 'Name',
  'mess.extraPh': 'Extra (৳)',
  'mess.m1': 'Member 1', 'mess.m2': 'Member 2', 'mess.m3': 'Member 3',
  'qurb.h1': 'Qurbani Price Estimator',
  'qurb.desc': 'Estimated price from live weight and per-kg rate.',
  'qurb.weight': 'Animal weight (kg)',
  'qurb.pricekg': 'Price per kg (৳)',
  'qurb.hint': 'Use the current haat (market) rate per kg.',
  'qurb.note': '⚠️ Estimated price (±10%) — breed, health and market demand change the price.',
  'qurb.btn': 'Estimate price',
  'itax.h1': 'Income Tax Calculator',
  'itax.desc': 'Annual income tax for salaried / e-TIN holders.',
  'itax.income': 'Annual taxable income (৳)',
  'itax.category': 'Taxpayer type',
  'itax.slabs': 'Slabs (editable) — FY 2025-26',
  'itax.free': 'Tax-free limit (৳)',
  'itax.s1': 'Rate on next ৳300,000 (%)',
  'itax.s2': 'Rate on next ৳400,000 (%)',
  'itax.s3': 'Rate on next ৳500,000 (%)',
  'itax.s4': 'Rate on next ৳2,000,000 (%)',
  'itax.s5': 'Rate on remaining income (%)',
  'itax.note': '⚠️ Approximate. Investment rebates and minimum tax (existing ৳5,000 / new ৳1,000) may apply — consult a tax advisor before filing.',
  'itax.btn': 'Calculate tax',
  'footer.tag': '— Every calculation, one home.',
  'footer.disclaimer': 'All calculations are approximate and for educational purposes. Consult a professional before financial, legal or religious decisions. Your data stays on your device — it is never sent to a server.',
  'r.zakatTotal': 'Total zakatable assets',
  'r.nisab': 'Nisab threshold',
  'r.zakatDue': 'Your Zakat (2.5%)',
  'r.zakatNotDue': 'Your assets are below the nisab threshold — no Zakat is due.',
  'r.unit': 'Unit', 'r.value': 'Value',
  'r.slab': 'Slab', 'r.units': 'Units', 'r.rate': 'Rate (৳)', 'r.amount': 'Amount (৳)',
  'r.energy': 'Energy charge', 'r.demand': 'Demand charge', 'r.vat': 'VAT', 'r.total': 'Total bill',
  'r.subject': 'Subject', 'r.marks': 'Marks', 'r.grade': 'Grade point',
  'r.yourGpa': 'Your GPA',
  'r.fail': 'A compulsory subject was failed, so the overall result is Fail.',
  'r.years': 'years', 'r.months': 'months', 'r.days': 'days', 'r.totalDays': 'Total days',
  'r.yourAge': 'Your age',
  'r.perBhori': 'Per bhori', 'r.perAna': 'Per ana', 'r.perRati': 'Per rati', 'r.perGram': 'Per gram',
  'r.taxTotal': 'Total income tax',
  'r.taxFree': 'Tax-free income',
  'r.monthlyEmi': 'Monthly EMI',
  'r.totalPay': 'Total payment',
  'r.totalInterest': 'Total interest',
  'r.converted': 'Converted value',
  'r.rateUsed': 'Rate used',
  'r.liveRate': 'live rate', 'r.manualRate': 'manual rate',
  'r.category': 'Category',
  'r.yourBmi': 'Your BMI',
  'r.banglaDate': 'Bengali date',
  'r.engDate': 'English date',
  'r.name': 'Name', 'r.share': 'Pays', 'r.extra': 'Personal extra',
  'r.estPrice': 'Estimated price',
  'r.priceRange': 'Likely range (±10%)',
  'r.time': 'Time',
  'r.enterValid': 'Please enter a valid value.',
  'r.offline': 'No internet connection. Please try again later.',
  'r.loading': 'Loading…',
  'r.catUnder': 'Underweight', 'r.catNormal': 'Normal weight',
  'r.catOver': 'Overweight', 'r.catObese': 'Obese'
}
};

function t(key) {
  const d = I18N[LANG] || I18N.bn;
  if (d[key] !== undefined) return d[key];
  if (I18N.bn[key] !== undefined) return I18N.bn[key];
  return key;
}

/* Locale-aware number formatting: Bengali digits in bn mode, Western in en mode */
function fmt(n, dec) {
  if (n === null || n === undefined || !isFinite(n)) return '—';
  const d = (dec === undefined) ? 0 : dec;
  const loc = (LANG === 'bn') ? 'bn-BD' : 'en-US';
  return Number(n).toLocaleString(loc, { minimumFractionDigits: d, maximumFractionDigits: d });
}
/* Year formatting: digit conversion without thousands grouping (১৪৩৩, not ১,৪৩৩) */
function fmtYear(y) {
  const s = String(Math.round(y));
  if (LANG === 'bn') return s.replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[d]);
  return s;
}

/* ---------------- pure calculation functions (no DOM) ---------------- */
const Calc = {
  zakat(o) {
    const goldVal = o.goldBhori * o.goldPrice;
    const silverVal = o.silverBhori * o.silverPrice;
    const total = o.cash + goldVal + silverVal + o.business + o.receivable - o.debt;
    const nisab = Math.min(7.5 * o.goldPrice, 52.5 * o.silverPrice);
    const due = total > 0 && total >= nisab;
    return { total, nisab, due, zakat: due ? total * 0.025 : 0 };
  },

  land(value, fromUnit) {
    const SQFT = { shotangsho: 435.6, katha: 720, bigha: 14400, acre: 43560,
                   sqft: 1, sqm: 10.7639, gonda: 864, chotak: 45 };
    const sqft = value * SQFT[fromUnit];
    const out = {};
    for (const u in SQFT) out[u] = sqft / SQFT[u];
    return out;
  },

  electricity(units, cfg) {
    // cfg: { lifelineRate, lifelineMax, slabs:[{upto, rate}], demandPerKw, loadKw, vatRate }
    const breakdown = [];
    let energy = 0;
    if (units > 0 && units <= cfg.lifelineMax) {
      energy = units * cfg.lifelineRate;
      breakdown.push({ label: '1–' + cfg.lifelineMax, units, rate: cfg.lifelineRate, amount: energy });
    } else if (units > 0) {
      let prev = 0;
      for (const s of cfg.slabs) {
        if (units <= prev) break;
        const u = Math.min(units, s.upto) - prev;
        const amt = u * s.rate;
        const hi = (s.upto === Infinity) ? '∞' : s.upto;
        breakdown.push({ label: (prev + 1) + '–' + hi, units: u, rate: s.rate, amount: amt });
        energy += amt;
        prev = s.upto;
      }
    }
    const demand = cfg.demandPerKw * cfg.loadKw;
    const vat = energy * cfg.vatRate;
    return { breakdown, energy, demand, vat, total: energy + demand + vat };
  },

  gradePoint(m) {
    return m >= 80 ? 5 : m >= 70 ? 4 : m >= 60 ? 3.5 : m >= 50 ? 3
         : m >= 40 ? 2 : m >= 33 ? 1 : 0;
  },

  gpa(subjects, fourthIndex) {
    // subjects: [{name, marks}]
    const rows = subjects.map(s => ({ name: s.name, marks: s.marks,
      gp: Calc.gradePoint(s.marks), fail: s.marks < 33 }));
    const comp = rows.filter((_, i) => i !== fourthIndex);
    if (comp.length === 0) return { fail: false, gpa: 0, rows };
    if (comp.some(r => r.fail)) return { fail: true, gpa: 0, rows };
    let bonus = 0;
    if (fourthIndex >= 0 && rows[fourthIndex]) bonus = Math.max(0, rows[fourthIndex].gp - 2);
    const sum = comp.reduce((a, r) => a + r.gp, 0);
    return { fail: false, gpa: (sum + bonus) / comp.length, rows };
  },

  age(dobStr, todayStr) {
    const dob = new Date(dobStr + 'T00:00:00');
    const today = todayStr ? new Date(todayStr + 'T00:00:00') : new Date();
    if (isNaN(dob) || dob > today) return null;
    let y = today.getFullYear() - dob.getFullYear();
    let m = today.getMonth() - dob.getMonth();
    let d = today.getDate() - dob.getDate();
    if (d < 0) { m--; d += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); }
    if (m < 0) { y--; m += 12; }
    const totalDays = Math.floor((today - dob) / 86400000);
    return { years: y, months: m, days: d, totalDays };
  },

  gold(pricePerBhori) {
    return { bhori: pricePerBhori, ana: pricePerBhori / 16,
             rati: pricePerBhori / 96, gram: pricePerBhori / 11.664 };
  },

  incomeTax(income, cfg) {
    // cfg: { free, slabs:[{width, rate}] } rate as fraction
    let rem = Math.max(0, income - cfg.free);
    const breakdown = [];
    let tax = 0;
    for (const s of cfg.slabs) {
      if (rem <= 0) break;
      const amt = Math.min(rem, s.width);
      const tt = amt * s.rate;
      breakdown.push({ amount: amt, rate: s.rate, tax: tt });
      tax += tt;
      rem -= amt;
    }
    return { tax, breakdown };
  },

  emi(principal, annualRate, months) {
    const r = annualRate / 12 / 100;
    let pay;
    if (r === 0) pay = principal / months;
    else { const f = Math.pow(1 + r, months); pay = principal * r * f / (f - 1); }
    const total = pay * months;
    return { emi: pay, total, interest: total - principal };
  },

  bmi(heightCm, weightKg) {
    const m = heightCm / 100;
    const v = weightKg / (m * m);
    const cat = v < 18.5 ? 'r.catUnder' : v < 25 ? 'r.catNormal'
              : v < 30 ? 'r.catOver' : 'r.catObese';
    return { bmi: v, catKey: cat };
  },

  mess(total, members) {
    // members: [{name, extra}]
    const extraSum = members.reduce((a, x) => a + (x.extra || 0), 0);
    const base = members.length ? Math.max(0, total - extraSum) / members.length : 0;
    return members.map(x => ({ name: x.name, extra: x.extra || 0, share: base + (x.extra || 0) }));
  },

  qurbani(weightKg, pricePerKg) {
    const est = weightKg * pricePerKg;
    return { est, low: est * 0.9, high: est * 1.1 };
  }
};

/* Bengali months for the date converter (approx: Pohela Boishakh = Apr 14) */
const BN_MONTHS = [
  { bn: 'বৈশাখ', en: 'Boishakh', days: 31 },
  { bn: 'জ্যৈষ্ঠ', en: 'Joishtho', days: 31 },
  { bn: 'আষাঢ়', en: 'Asharh', days: 31 },
  { bn: 'শ্রাবণ', en: 'Shrabon', days: 31 },
  { bn: 'ভাদ্র', en: 'Bhadro', days: 31 },
  { bn: 'আশ্বিন', en: 'Ashwin', days: 30 },
  { bn: 'কার্তিক', en: 'Kartik', days: 30 },
  { bn: 'অগ্রহায়ণ', en: 'Ogrohayon', days: 30 },
  { bn: 'পৌষ', en: 'Poush', days: 30 },
  { bn: 'মাঘ', en: 'Magh', days: 30 },
  { bn: 'ফাল্গুন', en: 'Falgun', days: 30 },
  { bn: 'চৈত্র', en: 'Choitro', days: 30 }
];

function bnMonthName(i) { return LANG === 'bn' ? BN_MONTHS[i].bn : BN_MONTHS[i].en; }

function toBanglaDate(y, m, d) {
  const after = (m > 4) || (m === 4 && d >= 14);
  const by = after ? y - 593 : y - 594;
  const ref = after ? new Date(y, 3, 14) : new Date(y - 1, 3, 14);
  const cur = new Date(y, m - 1, d);
  let diff = Math.round((cur - ref) / 86400000);
  if (diff < 0) diff = 0;
  let mi = 0;
  while (mi < 11 && diff >= BN_MONTHS[mi].days) { diff -= BN_MONTHS[mi].days; mi++; }
  return { year: by, month: mi, day: diff + 1 };
}

function toGregorianDate(day, mi, by) {
  const gy = by + 593;
  let offset = 0;
  for (let i = 0; i < mi; i++) offset += BN_MONTHS[i].days;
  offset += day - 1;
  return new Date(gy, 3, 14 + offset);
}

/* Node test export (browser ignores this block) */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Calc, toBanglaDate, toGregorianDate, BN_MONTHS,
    setLangForTest: (l) => { LANG = l; }, fmtForTest: (n, d) => fmt(n, d) };
}

/* ============================================================
   PART 2 — browser UI wiring (skipped under node)
   ============================================================ */
if (typeof window !== 'undefined' && typeof document !== 'undefined') {

/* ---------- tiny DOM helpers ---------- */
function $(id) { return document.getElementById(id); }
function num(id) { const v = parseFloat($(id).value); return isNaN(v) ? 0 : v; }
function esc(s) {
  return String(s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/* ---------- language switching ---------- */
function setLang(l, opts) {
  LANG = (l === 'en') ? 'en' : 'bn';
  try { localStorage.setItem('bt-lang', LANG); } catch (e) {}
  document.documentElement.lang = LANG;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = t(el.getAttribute('data-i18n-html'));
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-i18n-ph'));
  });
  setSeo();
  $('langBn').classList.toggle('active', LANG === 'bn');
  $('langEn').classList.toggle('active', LANG === 'en');
  document.querySelectorAll('.dlang-btn').forEach(b =>
    b.classList.toggle('active', b.getAttribute('data-dlang') === LANG));
  if (currentView === 'home') splitHeroWords();
  renderDynamicInputs();
  if (currentView === 'blog' && typeof renderBlogIndex === 'function') renderBlogIndex();
  if (currentView === 'blog-article' && typeof renderBlogArticle === 'function') renderBlogArticle(currentBlogSlug);
  if (!opts || !opts.keepResults) {
    document.querySelectorAll('.result').forEach(r => {
      r.classList.remove('visible'); r.innerHTML = '';
    });
  }
}

/* ---------- router (hash-based, one view at a time) ---------- */
const VIEWS = ['home','zakat','land','electricity','gpa','age','gold','freelancer-tax',
  'prayer','emi','currency','bmi','date','mess','qurbani','income-tax',
  'blog','privacy','about','contact'];

let currentView = 'home';
let currentBlogSlug = null;

/* Per-view SEO: unique title + meta description for every tool/page.
   seo.<key>.title / seo.<key>.desc live in the i18n dict; blog articles
   supply their own via blogSeo() in blog.js. Falls back to the site default. */
function seoKeyFor(view, kind) {
  const map = { home: 'home', 'freelancer-tax': 'ftax', 'income-tax': 'itax',
    electricity: 'elec', currency: 'cur', qurbani: 'qurb' };
  const k = map[view] || view;
  return 'seo.' + k + '.' + kind;
}
function setSeo() {
  const kt = seoKeyFor(currentView, 'title');
  const kd = seoKeyFor(currentView, 'desc');
  let title = t(kt);
  let desc = t(kd);
  if (currentView === 'blog-article' && typeof blogSeo === 'function') {
    const s = blogSeo(currentBlogSlug);
    if (s) { title = s.title; desc = s.desc; }
  }
  if (!title || title === kt) title = t('meta.title');
  if (!desc || desc === kd) desc = t('meta.desc');
  document.title = title;
  const md = document.querySelector('meta[name="description"]');
  if (md) md.setAttribute('content', desc);
}

function router() {
  const h = (location.hash || '#/').replace('#/', '') || 'home';
  let name = 'home';
  currentBlogSlug = null;
  if (h.indexOf('blog/') === 0 && typeof BLOG !== 'undefined' && BLOG[h.slice(5)]) {
    name = 'blog-article';
    currentBlogSlug = h.slice(5);
  } else if (VIEWS.includes(h)) {
    name = h;
  }
  showView(name);
}
function showView(name) {
  currentView = name;
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const el = $('view-' + name);
  if (el) {
    // restart the enter animation even when re-selecting the same view
    void el.offsetWidth;
    el.classList.add('active');
  }
  if (name === 'blog' && typeof renderBlogIndex === 'function') renderBlogIndex();
  if (name === 'blog-article' && typeof renderBlogArticle === 'function') renderBlogArticle(currentBlogSlug);
  setSeo();
  $('backBtn').classList.toggle('visible', name !== 'home');
  window.scrollTo(0, 0);
  requestAnimationFrame(initReveal);
}
/* Unified nav handler for hashchange + popstate.
   - If there's a hash fragment, normal SPA hash routing wins.
   - Else if the address bar holds a real post URL (after instant navigation),
     show its SPA article (covers back/forward across pushState entries). */
function handleNav() {
  // If there's any hash (including '#/' for home), use hash routing.
  // Only check for a real post URL when there's NO hash at all.
  var h = location.hash || '';
  if (h && h.length > 1) { router(); return; }
  var slug = (typeof postSlugForUrl === 'function') ? postSlugForUrl(location.href) : null;
  if (slug && typeof BLOG !== 'undefined' && BLOG[slug]) {
    if (currentBlogSlug !== slug || currentView !== 'blog-article') {
      currentBlogSlug = slug;
      showView('blog-article');
    }
  } else {
    router();
  }
}
function goHome() {
  activeCat = null;
  const s = $('toolSearch');
  if (s) s.value = '';
  applyToolFilter();
  location.hash = '#/';
}

/* ---------- reveal on scroll (IntersectionObserver) ---------- */
let revealObs = null;
function initReveal() {
  const els = document.querySelectorAll('.tool-card, .cat-card, .hero-search, .card, .tool-head, .faq, .ad-slot, .blog-card, .blog-article, .page-card');
  els.forEach(el => { if (!el.classList.contains('in')) el.classList.add('reveal'); });
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('in'));
    return;
  }
  if (revealObs) revealObs.disconnect();
  revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); revealObs.unobserve(e.target); }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' });
  els.forEach(el => { if (!el.classList.contains('in')) revealObs.observe(el); });
}

/* ---------- FAQ accordion (smooth max-height) ---------- */
function toggleAcc(btn) {
  const item = btn.closest('.acc-item');
  const body = item.querySelector('.acc-body');
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.acc-item.open').forEach(o => {
    o.classList.remove('open');
    o.querySelector('.acc-body').style.maxHeight = '0px';
  });
  if (!wasOpen) {
    item.classList.add('open');
    body.style.maxHeight = body.scrollHeight + 'px';
  }
}

/* ---------- animated result counters ---------- */
function animateCounts(root) {
  const reduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.querySelectorAll('[data-count]').forEach(el => {
    const target = parseFloat(el.getAttribute('data-count'));
    const dec = parseInt(el.getAttribute('data-dec') || '0', 10);
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const done = () => { el.textContent = prefix + fmt(target, dec) + suffix; };
    if (reduce || !isFinite(target)) { done(); return; }
    const dur = 800, start = performance.now();
    (function frame(now) {
      const p = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + fmt(target * e, dec) + suffix;
      if (p < 1) requestAnimationFrame(frame); else done();
    })(start);
  });
}

function showResult(id, html) {
  const el = $(id);
  el.innerHTML = html;
  el.classList.remove('visible');
  void el.offsetWidth; // restart pop animation
  el.classList.add('visible');
  animateCounts(el);
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function countBig(value, dec, prefix) {
  return '<div class="big" data-count="' + value + '" data-dec="' + (dec || 0) +
    '" data-prefix="' + (prefix || '') + '">' + (prefix || '') + fmt(0, dec || 0) + '</div>';
}

/* ---------- dynamic inputs (re-rendered on language switch) ---------- */
let gpaSubjects = [
  { key: 'gpa.def1' }, { key: 'gpa.def2' }, { key: 'gpa.def3' },
  { key: 'gpa.def4' }, { key: 'gpa.def5' }, { key: 'gpa.def6' }, { key: 'gpa.def7' }
].map(o => ({ key: o.key, custom: undefined, marks: '' }));

let messMembers = [
  { key: 'mess.m1' }, { key: 'mess.m2' }, { key: 'mess.m3' }
].map(o => ({ key: o.key, custom: undefined, extra: '' }));

const CURRENCIES = [
  ['BDT', 'Bangladeshi Taka'], ['USD', 'US Dollar'], ['EUR', 'Euro'],
  ['GBP', 'British Pound'], ['SAR', 'Saudi Riyal'], ['AED', 'UAE Dirham'],
  ['INR', 'Indian Rupee'], ['MYR', 'Malaysian Ringgit'], ['SGD', 'Singapore Dollar'],
  ['CAD', 'Canadian Dollar'], ['AUD', 'Australian Dollar'], ['JPY', 'Japanese Yen'],
  ['CNY', 'Chinese Yuan'], ['QAR', 'Qatari Riyal'], ['KWD', 'Kuwaiti Dinar']
];

function subjName(s) { return s.custom !== undefined ? s.custom : t(s.key); }
function memberName(m) { return m.custom !== undefined ? m.custom : t(m.key); }

function renderGpaSubjects() {
  const box = $('g-subjects');
  box.innerHTML = '';
  gpaSubjects.forEach((s, i) => {
    const row = document.createElement('div');
    row.className = 'subject-row';
    row.innerHTML =
      '<input type="text" data-i="name" data-i18n-ph="gpa.subPh" placeholder="' + esc(t('gpa.subPh')) + '" value="' + esc(subjName(s)) + '">' +
      '<input type="number" data-i="marks" min="0" max="100" step="any" data-i18n-ph="gpa.marksPh" placeholder="' + esc(t('gpa.marksPh')) + '" value="' + esc(s.marks) + '">' +
      '<button class="rm" aria-label="×">×</button>';
    row.querySelector('[data-i="name"]').addEventListener('input', e => { s.custom = e.target.value; });
    row.querySelector('[data-i="marks"]').addEventListener('input', e => { s.marks = e.target.value; });
    row.querySelector('.rm').addEventListener('click', () => {
      gpaSubjects.splice(i, 1);
      renderGpaSubjects(); renderFourthSelect();
    });
    box.appendChild(row);
  });
}
function renderFourthSelect() {
  const sel = $('g-fourth');
  const prev = sel.value;
  sel.innerHTML = '<option value="-1">' + esc(t('gpa.none')) + '</option>' +
    gpaSubjects.map((s, i) => '<option value="' + i + '">' + esc(subjName(s)) + '</option>').join('');
  sel.value = prev;
  if (sel.selectedIndex < 0) sel.value = '-1';
}
function addSubject() {
  gpaSubjects.push({ key: undefined, custom: '', marks: '' });
  renderGpaSubjects(); renderFourthSelect();
}

function renderMessMembers() {
  const box = $('m-members');
  box.innerHTML = '';
  messMembers.forEach((m, i) => {
    const row = document.createElement('div');
    row.className = 'subject-row';
    row.innerHTML =
      '<input type="text" data-i18n-ph="mess.namePh" placeholder="' + esc(t('mess.namePh')) + '" value="' + esc(memberName(m)) + '">' +
      '<input type="number" data-i18n-ph="mess.extraPh" placeholder="' + esc(t('mess.extraPh')) + '" min="0" value="' + esc(m.extra) + '">' +
      '<button class="rm" aria-label="×">×</button>';
    const inputs = row.querySelectorAll('input');
    inputs[0].addEventListener('input', e => { m.custom = e.target.value; });
    inputs[1].addEventListener('input', e => { m.extra = e.target.value; });
    row.querySelector('.rm').addEventListener('click', () => {
      messMembers.splice(i, 1);
      renderMessMembers();
    });
    box.appendChild(row);
  });
}
function addMember() {
  messMembers.push({ key: undefined, custom: '', extra: '' });
  renderMessMembers();
}

function renderCurrencySelects() {
  const keepFrom = $('c-from').value || 'USD';
  const keepTo = $('c-to').value || 'BDT';
  const opts = CURRENCIES.map(c =>
    '<option value="' + c[0] + '">' + c[0] + ' — ' + c[1] + '</option>').join('');
  $('c-from').innerHTML = opts;
  $('c-to').innerHTML = opts;
  $('c-from').value = keepFrom;
  $('c-to').value = keepTo;
  const upd = () => {
    $('c-from-lbl').textContent = $('c-from').value;
    $('c-to-lbl').textContent = $('c-to').value;
  };
  $('c-from').onchange = upd; $('c-to').onchange = upd;
  upd();
}

function renderBnMonths() {
  const sel = $('d-bn-month');
  const prev = sel.selectedIndex >= 0 ? sel.selectedIndex : 6;
  sel.innerHTML = BN_MONTHS.map((m, i) =>
    '<option value="' + i + '">' + (LANG === 'bn' ? m.bn : m.en) + '</option>').join('');
  sel.selectedIndex = prev;
}

function renderDynamicInputs() {
  renderGpaSubjects();
  renderFourthSelect();
  renderMessMembers();
  renderCurrencySelects();
  renderBnMonths();
}

/* ================= tool handlers ================= */

/* 1 — Zakat */
function calcZakat() {
  const r = Calc.zakat({
    cash: num('z-cash'), goldBhori: num('z-gold'), silverBhori: num('z-silver'),
    business: num('z-business'), receivable: num('z-receivable'), debt: num('z-debt'),
    goldPrice: num('z-gold-price'), silverPrice: num('z-silver-price')
  });
  let html = '<div class="row-label">' + esc(t('r.zakatTotal')) + '</div>' +
    countBig(r.total, 0, '৳ ') +
    '<div class="row-label">' + esc(t('r.nisab')) + ': ৳ ' + fmt(r.nisab) + '</div>';
  html += r.due
    ? '<div class="row-label" style="margin-top:10px">' + esc(t('r.zakatDue')) + '</div>' +
      countBig(r.zakat, 0, '৳ ')
    : '<p class="ok">' + esc(t('r.zakatNotDue')) + '</p>';
  showResult('z-result', html);
}

/* 2 — Land */
function calcLand() {
  const v = num('l-value');
  if (!(v > 0)) { showResult('l-result', '<p class="error">' + esc(t('r.enterValid')) + '</p>'); return; }
  const out = Calc.land(v, $('l-from').value);
  const order = ['shotangsho','katha','bigha','acre','sqft','sqm','gonda','chotak'];
  let html = '<table><tr><th>' + esc(t('r.unit')) + '</th><th class="num">' +
    esc(t('r.value')) + '</th></tr>';
  order.forEach(u => {
    html += '<tr><td>' + esc(t('units.' + u)) + '</td><td class="num">' + fmt(out[u], 2) + '</td></tr>';
  });
  showResult('l-result', html + '</table>');
}

/* 3 — Electricity */
function elecCfg() {
  return {
    lifelineRate: num('e-r-lifeline'), lifelineMax: 50,
    slabs: [
      { upto: 75, rate: num('e-r-75') },
      { upto: 200, rate: num('e-r-200') },
      { upto: 300, rate: num('e-r-300') },
      { upto: 400, rate: num('e-r-400') },
      { upto: 600, rate: num('e-r-600') },
      { upto: Infinity, rate: num('e-r-above') }
    ],
    demandPerKw: num('e-demand'), loadKw: num('e-load'),
    vatRate: num('e-vat') / 100
  };
}
function calcElectricity() {
  const units = num('e-units');
  if (!(units > 0)) { showResult('e-result', '<p class="error">' + esc(t('r.enterValid')) + '</p>'); return; }
  const r = Calc.electricity(units, elecCfg());
  let html = '<table><tr><th>' + esc(t('r.slab')) + '</th><th class="num">' + esc(t('r.units')) +
    '</th><th class="num">' + esc(t('r.rate')) + '</th><th class="num">' + esc(t('r.amount')) + '</th></tr>';
  r.breakdown.forEach(b => {
    html += '<tr><td>' + esc(b.label) + '</td><td class="num">' + fmt(b.units) + '</td><td class="num">' +
      fmt(b.rate, 2) + '</td><td class="num">' + fmt(b.amount, 2) + '</td></tr>';
  });
  html += '</table>' +
    '<table>' +
    '<tr><td>' + esc(t('r.energy')) + '</td><td class="num">৳ ' + fmt(r.energy, 2) + '</td></tr>' +
    '<tr><td>' + esc(t('r.demand')) + '</td><td class="num">৳ ' + fmt(r.demand, 2) + '</td></tr>' +
    '<tr><td>' + esc(t('r.vat')) + '</td><td class="num">৳ ' + fmt(r.vat, 2) + '</td></tr>' +
    '</table>' +
    '<div class="row-label" style="margin-top:8px">' + esc(t('r.total')) + '</div>' +
    countBig(r.total, 2, '৳ ');
  showResult('e-result', html);
}

/* 4 — GPA */
function calcGpa() {
  const subjects = gpaSubjects
    .map(s => ({ name: subjName(s).trim() || t('gpa.subPh'), marks: parseFloat(s.marks) }))
    .filter(s => !isNaN(s.marks));
  if (!subjects.length) { showResult('g-result', '<p class="error">' + esc(t('r.enterValid')) + '</p>'); return; }
  const fi = parseInt($('g-fourth').value, 10);
  const r = Calc.gpa(subjects, fi);
  let html = '<table><tr><th>' + esc(t('r.subject')) + '</th><th class="num">' + esc(t('r.marks')) +
    '</th><th class="num">' + esc(t('r.grade')) + '</th></tr>';
  r.rows.forEach(row => {
    html += '<tr><td>' + esc(row.name) + '</td><td class="num">' + fmt(row.marks) + '</td><td class="num">' +
      fmt(row.gp, 2) + (row.fail ? ' (F)' : '') + '</td></tr>';
  });
  html += '</table>';
  html += r.fail
    ? '<p class="warn">' + esc(t('r.fail')) + '</p>'
    : '<div class="row-label" style="margin-top:8px">' + esc(t('r.yourGpa')) + '</div>' +
      countBig(Math.min(5, r.gpa), 2, '');
  showResult('g-result', html);
}

/* 5 — Age */
function calcAge() {
  const v = $('a-dob').value;
  if (!v) { showResult('a-result', '<p class="error">' + esc(t('r.enterValid')) + '</p>'); return; }
  const r = Calc.age(v);
  if (!r) { showResult('a-result', '<p class="error">' + esc(t('r.enterValid')) + '</p>'); return; }
  showResult('a-result',
    '<div class="row-label">' + esc(t('r.yourAge')) + '</div>' +
    '<div class="big">' + fmt(r.years) + ' ' + esc(t('r.years')) + ' ' +
    fmt(r.months) + ' ' + esc(t('r.months')) + ' ' +
    fmt(r.days) + ' ' + esc(t('r.days')) + '</div>' +
    '<div class="row-label">' + esc(t('r.totalDays')) + ': ' + fmt(r.totalDays) + '</div>');
}

/* 6 — Gold */
function calcGold() {
  const p = num('gld-price');
  if (!(p > 0)) { showResult('gld-result', '<p class="error">' + esc(t('r.enterValid')) + '</p>'); return; }
  const r = Calc.gold(p);
  showResult('gld-result', '<table>' +
    '<tr><td>' + esc(t('r.perBhori')) + '</td><td class="num">৳ ' + fmt(r.bhori) + '</td></tr>' +
    '<tr><td>' + esc(t('r.perAna')) + '</td><td class="num">৳ ' + fmt(r.ana, 2) + '</td></tr>' +
    '<tr><td>' + esc(t('r.perRati')) + '</td><td class="num">৳ ' + fmt(r.rati, 2) + '</td></tr>' +
    '<tr><td>' + esc(t('r.perGram')) + '</td><td class="num">৳ ' + fmt(r.gram, 2) + '</td></tr>' +
    '</table>');
}

/* 7 & 15 — Tax (shared slab logic) */
function taxCfg(p) {
  return {
    free: num(p + '-free'),
    slabs: [
      { width: 300000, rate: num(p + '-s1r') / 100 },
      { width: 400000, rate: num(p + '-s2r') / 100 },
      { width: 500000, rate: num(p + '-s3r') / 100 },
      { width: 2000000, rate: num(p + '-s4r') / 100 },
      { width: Infinity, rate: num(p + '-s5r') / 100 }
    ]
  };
}
function renderTax(p, incomeId, resultId) {
  const income = num(incomeId);
  if (!(income > 0)) { showResult(resultId, '<p class="error">' + esc(t('r.enterValid')) + '</p>'); return; }
  const cfg = taxCfg(p);
  const r = Calc.incomeTax(income, cfg);
  let html = '<div class="row-label">' + esc(t('r.taxFree')) + ': ৳ ' + fmt(Math.min(income, cfg.free)) + '</div>';
  if (r.breakdown.length) {
    html += '<table><tr><th>' + esc(t('r.slab')) + '</th><th class="num">' + esc(t('r.rate')) +
      '</th><th class="num">' + esc(t('r.amount')) + '</th></tr>';
    r.breakdown.forEach(b => {
      html += '<tr><td>৳ ' + fmt(b.amount) + '</td><td class="num">' + fmt(b.rate * 100, 1) + '%</td><td class="num">৳ ' +
        fmt(b.tax, 2) + '</td></tr>';
    });
    html += '</table>';
  }
  html += '<div class="row-label" style="margin-top:8px">' + esc(t('r.taxTotal')) + '</div>' +
    countBig(r.tax, 2, '৳ ');
  showResult(resultId, html);
}
function calcFreelancerTax() { renderTax('f', 'f-income', 'f-result'); }
function calcIncomeTax() { renderTax('t', 't-income', 't-result'); }

/* 8 — Prayer times (Aladhan API, graceful offline fallback) */
async function loadPrayer() {
  const city = $('p-district').value;
  const districtName = $('p-district').selectedOptions[0].textContent;
  showResult('p-result', '<p>' + esc(t('r.loading')) + '</p>');
  try {
    const url = 'https://api.aladhan.com/v1/timingsByCity?city=' +
      encodeURIComponent(city) + '&country=Bangladesh&method=1';
    const res = await fetch(url);
    if (!res.ok) throw new Error('bad response');
    const data = await res.json();
    const tm = data.data.timings;
    const names = [
      ['Fajr', LANG === 'bn' ? 'ফজর' : 'Fajr'],
      ['Sunrise', LANG === 'bn' ? 'সূর্যোদয়' : 'Sunrise'],
      ['Dhuhr', LANG === 'bn' ? 'যোহর' : 'Dhuhr'],
      ['Asr', LANG === 'bn' ? 'আসর' : 'Asr'],
      ['Maghrib', LANG === 'bn' ? 'মাগরিব' : 'Maghrib'],
      ['Isha', LANG === 'bn' ? 'এশা' : 'Isha']
    ];
    let html = '<div class="row-label">' + esc(districtName) + '</div><table>' +
      '<tr><th>' + esc(t('r.name')) + '</th><th class="num">' + esc(t('r.time')) + '</th></tr>';
    names.forEach(n => {
      html += '<tr><td>' + esc(n[1]) + '</td><td class="num">' + esc((tm[n[0]] || '').slice(0, 5)) + '</td></tr>';
    });
    showResult('p-result', html + '</table>');
  } catch (e) {
    showResult('p-result', '<p class="error">' + esc(t('r.offline')) + '</p>');
  }
}

/* 9 — EMI */
function calcEmi() {
  const P = num('emi-principal'), rate = num('emi-rate'), n = num('emi-months');
  if (!(P > 0) || !(n > 0)) { showResult('emi-result', '<p class="error">' + esc(t('r.enterValid')) + '</p>'); return; }
  const r = Calc.emi(P, rate, Math.round(n));
  showResult('emi-result',
    '<div class="row-label">' + esc(t('r.monthlyEmi')) + '</div>' +
    countBig(r.emi, 2, '৳ ') +
    '<table>' +
    '<tr><td>' + esc(t('r.totalPay')) + '</td><td class="num">৳ ' + fmt(r.total, 2) + '</td></tr>' +
    '<tr><td>' + esc(t('r.totalInterest')) + '</td><td class="num">৳ ' + fmt(r.interest, 2) + '</td></tr>' +
    '</table>');
}

/* 10 — Currency (live API with manual fallback) */
async function calcCurrency() {
  const amount = num('c-amount');
  const from = $('c-from').value, to = $('c-to').value;
  const manual = parseFloat($('c-manual').value);
  if (!(amount > 0)) { showResult('c-result', '<p class="error">' + esc(t('r.enterValid')) + '</p>'); return; }
  const render = (converted, rateLabel) => {
    showResult('c-result',
      '<div class="row-label">' + esc(t('r.converted')) + '</div>' +
      countBig(converted, 2, '') +
      '<div class="row-label">' + esc(t('r.rateUsed')) + ': ' + esc(rateLabel) + '</div>');
  };
  if (!isNaN(manual) && manual > 0) {
    render(amount * manual, t('r.manualRate') + ' (1 ' + from + ' = ' + manual + ' ' + to + ')');
    return;
  }
  showResult('c-result', '<p>' + esc(t('r.loading')) + '</p>');
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/BDT');
    if (!res.ok) throw new Error('bad response');
    const data = await res.json();
    const rates = data.rates;
    if (!rates[from] || !rates[to]) throw new Error('missing currency');
    const rate = rates[to] / rates[from];
    render(amount * rate, t('r.liveRate') + ' (1 ' + from + ' = ' + fmt(rate, 4) + ' ' + to + ')');
  } catch (e) {
    showResult('c-result', '<p class="error">' + esc(t('r.offline')) + '</p>');
  }
}

/* 11 — BMI */
function calcBmi() {
  const h = num('bmi-height'), w = num('bmi-weight');
  if (!(h > 0) || !(w > 0)) { showResult('bmi-result', '<p class="error">' + esc(t('r.enterValid')) + '</p>'); return; }
  const r = Calc.bmi(h, w);
  showResult('bmi-result',
    '<div class="row-label">' + esc(t('r.yourBmi')) + '</div>' +
    countBig(r.bmi, 1, '') +
    '<div class="row-label">' + esc(t('r.category')) + ': <strong>' + esc(t(r.catKey)) + '</strong></div>');
}

/* 12 — Date converter */
function calcToBangla() {
  const v = $('d-greg').value;
  if (!v) { showResult('d-result1', '<p class="error">' + esc(t('r.enterValid')) + '</p>'); return; }
  const p = v.split('-').map(Number);
  const r = toBanglaDate(p[0], p[1], p[2]);
  showResult('d-result1',
    '<div class="row-label">' + esc(t('r.banglaDate')) + '</div>' +
    '<div class="big">' + fmt(r.day) + ' ' + esc(bnMonthName(r.month)) + ' ' + fmtYear(r.year) + '</div>');
}
function calcToGregorian() {
  const d = parseInt($('d-bn-day').value, 10);
  const mi = parseInt($('d-bn-month').value, 10);
  const by = parseInt($('d-bn-year').value, 10);
  if (!(d >= 1 && d <= 32) || isNaN(mi) || !(by > 0)) {
    showResult('d-result2', '<p class="error">' + esc(t('r.enterValid')) + '</p>'); return;
  }
  const g = toGregorianDate(Math.min(d, 32), mi, by);
  const s = g.getFullYear() + '-' + String(g.getMonth() + 1).padStart(2, '0') +
    '-' + String(g.getDate()).padStart(2, '0');
  showResult('d-result2',
    '<div class="row-label">' + esc(t('r.engDate')) + '</div>' +
    '<div class="big">' + esc(s) + '</div>');
}

/* 13 — Mess splitter */
function calcMess() {
  const total = num('m-total');
  const members = messMembers
    .map(m => ({ name: memberName(m).trim() || t('mess.namePh'), extra: parseFloat(m.extra) || 0 }))
    .filter(m => m.name);
  if (!(total > 0) || !members.length) {
    showResult('m-result', '<p class="error">' + esc(t('r.enterValid')) + '</p>'); return;
  }
  const r = Calc.mess(total, members);
  let html = '<table><tr><th>' + esc(t('r.name')) + '</th><th class="num">' + esc(t('r.extra')) +
    '</th><th class="num">' + esc(t('r.share')) + '</th></tr>';
  r.forEach(x => {
    html += '<tr><td>' + esc(x.name) + '</td><td class="num">৳ ' + fmt(x.extra) + '</td><td class="num"><strong>৳ ' +
      fmt(x.share, 2) + '</strong></td></tr>';
  });
  showResult('m-result', html + '</table>');
}

/* 14 — Qurbani */
function calcQurbani() {
  const w = num('q-weight'), p = num('q-pricekg');
  if (!(w > 0) || !(p > 0)) { showResult('q-result', '<p class="error">' + esc(t('r.enterValid')) + '</p>'); return; }
  const r = Calc.qurbani(w, p);
  showResult('q-result',
    '<div class="row-label">' + esc(t('r.estPrice')) + '</div>' +
    countBig(r.est, 0, '৳ ') +
    '<div class="row-label">' + esc(t('r.priceRange')) + ': ৳ ' + fmt(r.low) + ' – ৳ ' + fmt(r.high) + '</div>');
}


/* ---------- premium editorial: hero word-reveal ---------- */
function splitHeroWords() {
  const h = $('heroTitle');
  if (!h) return;
  const text = h.textContent.trim().replace(/\s+/g, ' ');
  if (!text) return;
  h.setAttribute('aria-label', text);
  h.innerHTML = text.split(' ').map((w, i) =>
    '<span class="hw" style="--d:' + (i * 0.13).toFixed(2) + 's" aria-hidden="true">' + esc(w) + '</span>'
  ).join(' ');
}

/* ---------- premium editorial: search + category filter ---------- */
let activeCat = null;
function applyToolFilter() {
  const input = $('toolSearch');
  const q = (input && input.value || '').trim().toLowerCase();
  let visible = 0;
  document.querySelectorAll('.tool-card').forEach(card => {
    const name = card.textContent.toLowerCase();
    const okQ = !q || name.indexOf(q) !== -1;
    const okC = !activeCat || card.getAttribute('data-cat') === activeCat;
    const show = okQ && okC;
    card.style.display = show ? '' : 'none';
    if (show) visible++;
  });
  const nr = $('noResult');
  if (nr) nr.hidden = visible !== 0;
  document.querySelectorAll('[data-cat-card]').forEach(b => {
    const on = b.getAttribute('data-cat-card') === activeCat;
    b.classList.toggle('active', on);
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
}
function setCategory(cat) {
  activeCat = (activeCat === cat) ? null : cat; // tap again to clear
  if (currentView !== 'home') { location.hash = '#/'; }
  applyToolFilter();
  const grid = $('catGrid');
  if (grid && activeCat) grid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ---------- premium editorial: drawer nav ---------- */
function toggleDrawer(force) {
  const d = $('drawer'), o = $('drawerOverlay'), b = $('hamburger');
  if (!d || !o) return;
  const open = (force === undefined) ? !d.classList.contains('open') : !!force;
  d.classList.toggle('open', open);
  o.classList.toggle('open', open);
  if (b) b.setAttribute('aria-expanded', open ? 'true' : 'false');
  document.body.style.overflow = open ? 'hidden' : '';
}


/* ---------- drawer category accordion ---------- */
const DRAWER_TOOLS = {
  money: [['zakat','🕌','tools.zakat'],['electricity','💡','tools.electricity'],['gold','🪙','tools.gold'],['freelancer-tax','💼','tools.freelancerTax'],['emi','🏦','tools.emi'],['currency','💱','tools.currency'],['mess','🍛','tools.mess'],['qurbani','🐄','tools.qurbani'],['income-tax','🧾','tools.incomeTax']],
  edu: [['gpa','🎓','tools.gpa'],['age','🎂','tools.age'],['bmi','⚖️','tools.bmi']],
  deen: [['land','🌾','tools.land'],['prayer','🕋','tools.prayer'],['date','📅','tools.date']]
};
function buildDrawerTools() {
  Object.keys(DRAWER_TOOLS).forEach(cat => {
    const box = document.getElementById('drawerTools-' + cat);
    if (!box) return;
    box.innerHTML = DRAWER_TOOLS[cat].map(t =>
      '<a href="#/' + t[0] + '" onclick="toggleDrawer(false)"><span class="drawer-tool-ico">' + t[1] + '</span><span data-i18n="' + t[2] + '"></span></a>'
    ).join('');
  });
}
function toggleDrawerCat(cat, ev) {
  if (ev) { ev.preventDefault(); ev.stopPropagation(); }
  const wrap = document.querySelector('[data-drawer-cat="' + cat + '"]');
  if (!wrap) return;
  const open = wrap.classList.toggle('open');
  const btn = wrap.querySelector('.drawer-cat-arrow');
  if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}

/* ---------- init ---------- */
/* ---------- Real post pages: bilingual professional articles ----------
   On Blogger item URLs, the post section is visible (via the theme's
   conditional CSS). Swap the plain published HTML for the professional
   article markup (same as the SPA view: lede, steps, tips, CTA button,
   FAQ accordion) and offer a BN/EN toggle. Respects the saved language. */
/* ---------- Instant article navigation ----------
   Blog cards and guide links point to real post URLs (good for SEO, sharing,
   right-click). But a full page load on every click feels slow next to the
   old instant SPA. So: intercept same-site clicks on post URLs and open the
   SPA article view instantly, then swap the address bar to the real post URL
   (no reload). Back button and refresh behave naturally. */
function initInstantArticles() {
  if (typeof postSlugForUrl !== 'function' || typeof BLOG === 'undefined') return;
  document.addEventListener('click', function (e) {
    var t = e.target;
    var a = (t && t.closest) ? t.closest('a') : null;
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#') return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var slug = postSlugForUrl(href);
    if (!slug || !BLOG[slug]) return;
    e.preventDefault();
    currentBlogSlug = slug;
    showView('blog-article');
    try { history.pushState({ slug: slug }, '', href.split('#')[0]); } catch (err) {}
  });
  window.addEventListener('popstate', handleNav);
}

function initPostPage() {
  // Only for TRUE direct post URL loads (no hash fragment). If there's a hash
  // (e.g. .../blog-post.html#/), the hash router owns the view — otherwise a
  // refresh after pressing "back to home" would wrongly jump back to the article.
  var h = location.hash || '';
  if (h && h.length > 1) return;
  if (typeof postSlugForUrl !== 'function' || typeof BLOG === 'undefined') return;
  var slug = null;
  try { slug = postSlugForUrl(location.href); } catch (e) { return; }
  if (!slug || !BLOG[slug]) return;
  currentBlogSlug = slug;
  if (typeof showView === 'function') showView('blog-article');
}

document.addEventListener('DOMContentLoaded', () => {
  let saved = 'bn';
  try { saved = localStorage.getItem('bt-lang') || 'bn'; } catch (e) {}
  buildDrawerTools();
  // setLang re-renders dynamic inputs; pass keepResults (nothing rendered yet)
  setLang(saved, { keepResults: true });
  if ($('d-greg')) {
    const d = new Date();
    $('d-greg').value = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') +
      '-' + String(d.getDate()).padStart(2, '0');
  }
  window.addEventListener('hashchange', handleNav);
  router();
  // point static in-page guide links (#/blog/...) at the real published posts
  if (typeof POST_URLS !== 'undefined') {
    document.querySelectorAll('a[href^="#/blog/"]').forEach(function (a) {
      const slug = a.getAttribute('href').slice(7);
      if (POST_URLS[slug]) a.setAttribute('href', POST_URLS[slug]);
    });
  }
  initReveal();
  initPostPage();
  initInstantArticles();
  splitHeroWords();

  /* premium editorial wiring: hero search, drawer, category links */
  const ts = $('toolSearch');
  if (ts) ts.addEventListener('input', applyToolFilter);
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-cat-link]');
    if (a) setCategory(a.getAttribute('data-cat-link'));
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') toggleDrawer(false);
  });
  window.toggleDrawer = toggleDrawer;
  window.toggleDrawerCat = toggleDrawerCat;
  window.setCategory = setCategory;

  /* Expose inline-onclick handlers to global scope (this block is
     strict-mode, so declarations would otherwise stay block-local) */
  window.goHome = goHome;
  window.setLang = setLang;
  window.toggleAcc = toggleAcc;
  window.calcZakat = calcZakat;
  window.calcLand = calcLand;
  window.calcElectricity = calcElectricity;
  window.addSubject = addSubject;
  window.calcGpa = calcGpa;
  window.calcAge = calcAge;
  window.calcGold = calcGold;
  window.calcFreelancerTax = calcFreelancerTax;
  window.calcIncomeTax = calcIncomeTax;
  window.loadPrayer = loadPrayer;
  window.calcEmi = calcEmi;
  window.calcCurrency = calcCurrency;
  window.calcBmi = calcBmi;
  window.calcToBangla = calcToBangla;
  window.calcToGregorian = calcToGregorian;
  window.addMember = addMember;
  window.calcMess = calcMess;
  window.calcQurbani = calcQurbani;
});

} // end browser-only block

/* ---- Per-tool guide content + SEO + trust/blog strings (appended) ---- */
Object.assign(I18N.bn, {
'howto.title': 'কীভাবে ব্যবহার করবেন',

'zakat.intro': 'রমজান এলেই মাথায় একটাই প্রশ্ন ঘোরে — আমার উপর কত টাকা যাকাত ফরজ হলো? কাগজ-কলম নিয়ে বসে হিসাব মেলানো ঝামেলার। এই ক্যালকুলেটরে আপনার নগদ টাকা, স্বর্ণ-রূপা আর ব্যবসার মালের হিসাব দিলেই মুহূর্তে সঠিক যাকাত বেরিয়ে আসবে — নিসাবসহ।',
'zakat.step1': 'আপনার নগদ টাকা, স্বর্ণ (ভরি), রূপা (ভরি), ব্যবসায়িক পণ্য আর পাওনা-দেনার পরিমাণ লিখুন।',
'zakat.step2': 'বাজারদর ঠিক আছে কিনা দেখে নিন — চাইলে বদলে নিতে পারেন।',
'zakat.step3': '"যাকাত হিসাব করুন" চাপুন — নিসাব পার হলে ২.৫% যাকাত দেখাবে।',
'zakat.fq1': 'নিসাব কী?',
'zakat.fa1': 'নিসাব হলো সেই সর্বনিম্ন সম্পদের পরিমাণ যার উপর যাকাত ফরজ হয় — ৭.৫ ভরি স্বর্ণ বা ৫২.৫ ভরি রূপার সমমূল্য, যেটি কম সেটি ধরা হয়।',
'zakat.fq2': 'স্বর্ণের দাম কোথা থেকে নেব?',
'zakat.fa2': 'বাংলাদেশ জুয়েলার্স সমিতি (বাজুস) প্রতিদিন দাম ঘোষণা করে — সেই দিনের দাম এখানে বসিয়ে নিন, ফলাফল আরও নির্ভুল হবে।',
'zakat.fq3': 'ঋণ থাকলে কি বাদ যাবে?',
'zakat.fa3': 'হ্যাঁ — মোট সম্পদ থেকে আপনার ঋণ বা দেনা বাদ দিয়েই যাকাতযোগ্য সম্পদ ধরা হয়। ঋণের ঘরে সঠিক পরিমাণ লিখুন।',

'land.intro': 'জমি কিনতে গিয়ে শতাংশ-কাঠা-বিঘার হিসাব মেলাতে হিমশিম খেয়েছেন? দালালের কথায় নয়, নিজেই হিসাব মিলিয়ে নিন — এক একক থেকে সব এককে মুহূর্তে রূপান্তর।',
'land.step1': 'জমির পরিমাণ লিখুন।',
'land.step2': 'সেটি কোন এককে আছে, বেছে নিন।',
'land.step3': '"রূপান্তর করুন" চাপুন — সব এককের মান একসাথে পাবেন।',
'land.fq1': '১ বিঘা কি সব জায়গায় সমান?',
'land.fa1': 'না — এটাই সবচেয়ে বড় বিভ্রান্তি। ঢাকায় ১ বিঘা ≈ ৩৩ শতাংশ, রাজশাহীতে ≈ ২০ শতাংশ। দলিলে সবসময় শতাংশে মিলিয়ে নিন।',
'land.fq2': 'শতাংশ আর ডেসিমাল কি এক?',
'land.fa2': 'হ্যাঁ, একই — ১ শতাংশ = ১ ডেসিমাল = ৪৩৫.৬ বর্গফুট।',
'land.fq3': 'গন্ডা-ছটাক কোথায় ব্যবহার হয়?',
'land.fa3': 'চট্টগ্রামসহ কিছু অঞ্চলে গন্ডা (৮৬৪ বর্গফুট) ও ছটাক (৪৫ বর্গফুট) প্রচলিত — ১৬ ছটাক = ১ কাঠা।',

'elec.intro': 'মাস শেষে বিদ্যুৎ বিল দেখে চমকে ওঠেন? কত ইউনিটে কত টাকা — স্ল্যাবের হিসাবটা জানা থাকলে বিল আসার আগেই অনুমান করা যায়। আপনার মিটার রিডিং বসিয়েই দেখুন।',
'elec.step1': 'আপনার বিতরণ সংস্থা বেছে নিন।',
'elec.step2': 'মাসে কত ইউনিট খরচ হয়েছে লিখুন (আগের ও পরের রিডিংয়ের পার্থক্য)।',
'elec.step3': '"বিল হিসাব করুন" চাপুন — স্ল্যাবভিত্তিক ভাঙনসহ মোট বিল দেখাবে।',
'elec.fq1': '৫০ ইউনিটের নিচে ব্যবহার করলে বিল কম কেন?',
'elec.fa1': '৫০ ইউনিট পর্যন্ত "লাইফলাইন" রেট (৳৪.৬৩) প্রযোজ্য — নিম্ন আয়ের পরিবারের জন্য ভর্তুকি। ৫১ ইউনিট হলেই পুরো হিসাব স্ল্যাব রেটে চলে যায়।',
'elec.fq2': 'ডিমান্ড চার্জ কী?',
'elec.fa2': 'আপনার অনুমোদিত লোড (kW) অনুযায়ী মাসিক ফিক্সড চার্জ — ৳৪২/kW। বিলের কাগজে আপনার লোড লেখা থাকে।',
'elec.fq3': 'স্ল্যাব রেট বদলালে কী করব?',
'elec.fa3': 'BERC মাঝে মাঝে রেট বদলায় — টুলের ভেতরে সব রেট পরিবর্তনযোগ্য, নতুন রেট বসিয়ে নিলেই হবে।',

'gpa.intro': 'রেজাল্টের আগে নিজেই GPA বের করে নিন — কোন বিষয়ে কত পেলে টার্গেট GPA হবে, সেটাও বোঝা যাবে। SSC-HSC-এর অফিসিয়াল গ্রেডিং পদ্ধতিতেই হিসাব হয়।',
'gpa.step1': 'প্রতিটি বিষয়ের নাম ও নম্বর লিখুন (চাইলে বিষয় যোগ বা বাদ দিন)।',
'gpa.step2': '৪র্থ (ঐচ্ছিক) বিষয়টি বেছে নিন।',
'gpa.step3': '"GPA হিসাব করুন" চাপুন।',
'gpa.fq1': '৪র্থ বিষয়ের নম্বর কীভাবে ধরা হয়?',
'gpa.fa1': '৪র্থ বিষয়ে গ্রেড পয়েন্ট ২.০০-এর বেশি হলে শুধু অতিরিক্ত অংশ যোগ হয় — কম পেলে GPA কমে না।',
'gpa.fq2': 'এক বিষয়ে ফেল করলে কী হবে?',
'gpa.fa2': 'যেকোনো আবশ্যিক বিষয়ে ৩৩-এর নিচে পেলে (F) সামগ্রিক ফলাফল ফেল — বাকি সব বিষয়ে A+ পেলেও।',
'gpa.fq3': '৮০ নম্বর পেলে গ্রেড পয়েন্ট কত?',
'gpa.fa3': '৮০ বা তার বেশি = A+ = ৫.০০। ৭০–৭৯ = A (৪.০০), ৬০–৬৯ = A- (৩.৫০)।',

'age.intro': 'চাকরির ফরম, পাসপোর্ট বা ভর্তির কাজে নিখুঁত বয়স লাগে — বছর-মাস-দিনে ভেঙে হিসাব করা কষ্টকর। জন্মতারিখ দিলেই সঠিক বয়স বেরিয়ে আসবে।',
'age.step1': 'জন্মতারিখ বেছে নিন।',
'age.step2': '"বয়স হিসাব করুন" চাপুন — বছর, মাস, দিন ও মোট দিন দেখাবে।',
'age.fq1': 'মোট দিনের হিসাব কেন দরকার?',
'age.fa1': 'অনেক ফরমে (যেমন সরকারি চাকরি) বয়স দিনে হিসাব চাওয়া হয় — সেটাও এই টুলে পাবেন।',
'age.fq2': 'ভবিষ্যতের তারিখ দিলে কী হবে?',
'age.fa2': 'জন্মতারিখ আজকের তারিখের পরে হতে পারে না — এমন হলে টুলটি সতর্ক করবে।',
'age.fq3': '২৯ ফেব্রুয়ারিতে জন্ম হলে?',
'age.fa3': 'অধিবর্ষ (লিপ ইয়ার) ঠিকমতো ধরা হয় — ক্যালেন্ডারের নিয়মেই বয়স হিসাব হবে।',

'gold.intro': 'বিয়ের বাজার বা বিনিয়োগ — স্বর্ণ কিনতে গেলে ভরি-আনা-রতির হিসাব গুলিয়ে যায়। প্রতি ভরির দাম বসান, বাকি সব এককের দাম মুহূর্তে পেয়ে যান।',
'gold.step1': 'প্রতি ভরি স্বর্ণের বর্তমান দাম লিখুন।',
'gold.step2': '"দাম হিসাব করুন" চাপুন — আনা, রতি ও গ্রামের দাম দেখাবে।',
'gold.fq1': '১ ভরিতে কত আনা?',
'gold.fa1': '১ ভরি = ১৬ আনা, ১ আনা = ৬ রতি। আর ১ ভরি = ১১.৬৬৪ গ্রাম।',
'gold.fq2': 'ক্যারেট অনুযায়ী দাম কি আলাদা?',
'gold.fa2': 'হ্যাঁ — ২২, ২১, ১৮ ক্যারেটের দাম ভিন্ন হয়। বাজুসের ঘোষিত সংশ্লিষ্ট ক্যারেটের দাম বসিয়ে হিসাব করুন।',
'gold.fq3': 'মজুরি কি ধরা আছে?',
'gold.fa3': 'না — এখানে শুধু স্বর্ণের দাম; গয়নার মজুরি ও ভ্যাট দোকানভেদে আলাদা যোগ হবে।',

'ftax.intro': 'অনলাইনে আয় করছেন কিন্তু ট্যাক্সের হিসাব বুঝতে পারছেন না? ফ্রিল্যান্সারদের জন্য বাৎসরিক আয়ের উপর আনুমানিক কর হিসাব করে নিন — রিটার্ন দেওয়ার আগে ধারণা পেয়ে যাবেন।',
'ftax.step1': 'বাৎসরিক করযোগ্য আয় লিখুন।',
'ftax.step2': 'করদাতার ধরন বেছে নিন।',
'ftax.step3': '"ট্যাক্স হিসাব করুন" চাপুন — স্ল্যাবভিত্তিক কর দেখাবে।',
'ftax.fq1': 'ফ্রিল্যান্সারদের করমুক্ত সীমা কি আলাদা?',
'ftax.fa1': 'সাধারণ স্ল্যাবই প্রযোজ্য, তবে ITES বা ফ্রিল্যান্সিং আয়ে বিশেষ কর অব্যাহতি থাকতে পারে — NBR-এর সর্বশেষ প্রজ্ঞাপন দেখুন।',
'ftax.fq2': 'ডলারে আয় করলে কীভাবে হিসাব হবে?',
'ftax.fa2': 'বাংলাদেশ ব্যাংকের সংশ্লিষ্ট অর্থবছরের গড় বিনিময় হারে টাকায় রূপান্তর করে মোট আয় ধরুন।',
'ftax.fq3': 'এই হিসাবই কি চূড়ান্ত?',
'ftax.fa3': 'না — এটি আনুমানিক। রিবেট, উৎসে কর কর্তন ইত্যাদি মিলিয়ে চূড়ান্ত কর নির্ধারণ কর উপদেষ্টা দিয়ে করান।',

'prayer.intro': 'নতুন জেলায় গেছেন, মসজিদের সময় জানা নেই? জেলা বেছে নিলেই আজকের পাঁচ ওয়াক্ত নামাজের সময় পেয়ে যাবেন।',
'prayer.step1': 'আপনার জেলা বেছে নিন।',
'prayer.step2': '"সময়সূচী দেখুন" চাপুন — পাঁচ ওয়াক্তের সময় দেখাবে।',
'prayer.fq1': 'সময় কি ১০০% সঠিক?',
'prayer.fa1': 'জ্যোতির্বৈজ্ঞানিক হিসাবে আনুমানিক — স্থানীয় মসজিদের সাথে ৫-১০ মিনিট পার্থক্য হতে পারে, মসজিদের সময়ই চূড়ান্ত ধরুন।',
'prayer.fq2': 'ইন্টারনেট ছাড়া চলবে?',
'prayer.fa2': 'না — সময় লাইভ API থেকে আসে, তাই ইন্টারনেট সংযোগ লাগবে।',
'prayer.fq3': 'কোন পদ্ধতির হিসাব?',
'prayer.fa3': 'স্ট্যান্ডার্ড জ্যোতির্বৈজ্ঞানিক পদ্ধতি — হানাফি আসরের সময়ে কিছুটা পার্থক্য থাকতে পারে।',

'emi.intro': 'লোন নেওয়ার আগে জেনে নিন — প্রতি মাসে কত কিস্তি দিতে হবে, আর মোট কত সুদ গুনতে হবে। চোখ বুজে সই করার আগে হিসাবটা মিলিয়ে নিন।',
'emi.step1': 'ঋণের পরিমাণ, বাৎসরিক সুদের হার ও মেয়াদ (মাসে) লিখুন।',
'emi.step2': '"EMI হিসাব করুন" চাপুন — মাসিক কিস্তি ও মোট সুদ দেখাবে।',
'emi.fq1': 'EMI কীভাবে হিসাব হয়?',
'emi.fa1': 'রিডিউসিং ব্যালান্স পদ্ধতিতে — প্রতি মাসে বকেয়া আসলের উপর সুদ ধরা হয়।',
'emi.fq2': 'মেয়াদ বাড়ালে কিস্তি কমে?',
'emi.fa2': 'হ্যাঁ, মাসিক কিস্তি কমে — কিন্তু মোট সুদ অনেক বেড়ে যায়। দুটোই দেখে সিদ্ধান্ত নিন।',
'emi.fq3': 'ফ্ল্যাট রেট আর রিডিউসিং রেট কি এক?',
'emi.fa3': 'না — ফ্ল্যাট রেটে পুরো আসলের উপর সুদ ধরা হয়, ফলে প্রকৃত খরচ বেশি। ব্যাংক সাধারণত রিডিউসিং পদ্ধতি ব্যবহার করে।',

'cur.intro': 'প্রবাস থেকে টাকা পাঠাবেন, নাকি অনলাইনে ডলারে কিনবেন? লাইভ রেটে মুহূর্তে রূপান্তর করে নিন — দোকানির রেটের সাথে তুলনা করতেও কাজে লাগবে।',
'cur.step1': 'পরিমাণ ও মুদ্রা বেছে নিন।',
'cur.step2': 'ইন্টারনেট থাকলে লাইভ রেটেই হবে; না থাকলে ম্যানুয়াল রেট বসান।',
'cur.step3': '"রূপান্তর করুন" চাপুন।',
'cur.fq1': 'রেট কি ব্যাংকের রেটের সমান?',
'cur.fa1': 'আন্তর্জাতিক মিড-মার্কেট রেট দেখানো হয় — ব্যাংক বা মানি এক্সচেঞ্জ সাধারণত ১-৩ টাকা কম-বেশি দেয়।',
'cur.fq2': 'অফলাইনে কি চলবে?',
'cur.fa2': 'হ্যাঁ — ম্যানুয়াল রেটের ঘরে রেট বসিয়ে দিলেই অফলাইনে হিসাব হবে।',
'cur.fq3': 'কোন মুদ্রাগুলো আছে?',
'cur.fa3': 'BDT, USD, EUR, GBP, SAR, AED, INRসহ প্রবাসীদের প্রয়োজনীয় ১৫টি মুদ্রা।',

'bmi.intro': 'ওজন ঠিক আছে তো, নাকি সতর্ক হওয়ার সময়? উচ্চতা-ওজন দিলেই BMI বেরিয়ে আসবে — স্বাস্থ্যের প্রাথমিক ধারণা পেতে।',
'bmi.step1': 'উচ্চতা (সেন্টিমিটার) ও ওজন (কেজি) লিখুন।',
'bmi.step2': '"BMI হিসাব করুন" চাপুন — ক্যাটাগরিসহ ফলাফল দেখাবে।',
'bmi.fq1': 'BMI ২৫ মানে কি মোটা?',
'bmi.fa1': '২৫–২৯.৯ মানে অতিরিক্ত ওজন, ৩০+ মানে স্থূলতা। ১৮.৫–২৪.৯ স্বাভাবিক ধরা হয়।',
'bmi.fq2': 'খেলোয়াড়দের জন্য কি প্রযোজ্য?',
'bmi.fa2': 'পেশি বেশি থাকলে BMI বেশি দেখাতে পারে — সেক্ষেত্রে চিকিৎসকের পরামর্শই নির্ভরযোগ্য।',
'bmi.fq3': 'BMI কি রোগ নির্ণয় করে?',
'bmi.fa3': 'না — এটি শুধু স্ক্রিনিং টুল। কোনো সিদ্ধান্তের আগে চিকিৎসকের পরামর্শ নিন।',

'date.intro': 'দলিল-দস্তাবেজে বাংলা তারিখ লিখতে হয়, আবার অফিসে ইংরেজি — দুটোর মধ্যে যাতায়াত এখন এক ক্লিকেই।',
'date.step1': 'ইংরেজি তারিখ বেছে "বাংলা তারিখ দেখুন" চাপুন, অথবা',
'date.step2': 'বাংলা দিন-মাস-বছর বসিয়ে "ইংরেজি তারিখ দেখুন" চাপুন।',
'date.fq1': 'হিসাব কি নিখুঁত?',
'date.fa1': 'পহেলা বৈশাখ = ১৪ এপ্রিল ধরে আনুমানিক — সরকারি কাজে বাংলা একাডেমির পঞ্জিকা মিলিয়ে নিন।',
'date.fq2': 'বঙ্গাব্দ কীভাবে বের হয়?',
'date.fa2': 'বৈশাখ থেকে পৌষের মধ্যে হলে ইংরেজি সাল − ৫৯৩, মাঘ থেকে চৈত্রে হলে − ৫৯৪।',
'date.fq3': 'বাংলা মাসের দিনসংখ্যা?',
'date.fa3': 'বৈশাখ–ভাদ্র ৩১ দিন, আশ্বিন–চৈত্র ৩০ দিন (সরকারি সংস্কার অনুযায়ী)।',

'mess.intro': 'মাস শেষে মেসের হিসাব নিয়ে ঝগড়া? মোট খরচ আর যার যার ব্যক্তিগত খরচ বসিয়ে দিন — প্রত্যেকে কত দেবে, নির্ভুলভাবে বেরিয়ে আসবে।',
'mess.step1': 'মোট খরচ লিখুন।',
'mess.step2': 'সদস্যদের নাম ও ব্যক্তিগত অতিরিক্ত খরচ (যদি থাকে) বসান।',
'mess.step3': '"ভাগ করুন" চাপুন — প্রত্যেকের অংশ দেখাবে।',
'mess.fq1': 'ব্যক্তিগত খরচ কীভাবে ধরা হয়?',
'mess.fa1': 'মোট থেকে সব ব্যক্তিগত খরচ বাদ দিয়ে বাকিটা সমান ভাগ হয়, তারপর প্রত্যেকের নিজের অতিরিক্তটা যোগ হয়।',
'mess.fq2': 'কেউ মাঝমাসে এলে?',
'mess.fa2': 'তার থাকার দিন অনুপাতে মোট খরচের অংশ বের করে "মোট খরচ" ঘরে বসিয়ে হিসাব করুন।',
'mess.fq3': 'সদস্য যোগ বা বাদ করা যায়?',
'mess.fa3': 'হ্যাঁ — "+ সদস্য যোগ করুন" দিয়ে বাড়ান, × চাপলে বাদ যাবে।',

'qurb.intro': 'হাটে যাওয়ার আগে ধারণা নিয়ে যান — পশুর ওজন আর প্রতি কেজি দর বসালেই আনুমানিক দাম বেরিয়ে আসবে, দরদামে ঠকবেন না।',
'qurb.step1': 'পশুর আনুমানিক ওজন (কেজি) লিখুন।',
'qurb.step2': 'হাটের চলতি প্রতি কেজি দর বসান।',
'qurb.step3': '"দাম অনুমান করুন" চাপুন।',
'qurb.fq1': 'প্রতি কেজি দর কত ধরা উচিত?',
'qurb.fa1': 'ঈদের ১-২ সপ্তাহ আগে হাট ঘুরে বা পরিচিত ব্যাপারীর কাছ থেকে চলতি দর জেনে নিন — এলাকাভেদে ভিন্ন হয়।',
'qurb.fq2': '±১০% রেঞ্জ কেন?',
'qurb.fa2': 'জাত, স্বাস্থ্য, বয়স ও চাহিদার উপর দাম ওঠানামা করে — রেঞ্জটা বাস্তবসম্মত ধারণা দেয়।',
'qurb.fq3': 'ওজন কীভাবে মাপব?',
'qurb.fa3': 'বুকের বেড় ও দৈর্ঘ্যের ফিতার মাপ থেকে ওজনের ফর্মুলা আছে, অথবা অভিজ্ঞ ব্যাপারীর অনুমান নিন।',

'itax.intro': 'বেতন থেকে কত ট্যাক্স কাটবে, আগে থেকেই জেনে রাখুন — রিটার্ন জমার সময় অপ্রস্তুত হবেন না। FY ২০২৫-২৬-এর স্ল্যাব অনুযায়ী হিসাব।',
'itax.step1': 'বাৎসরিক করযোগ্য আয় লিখুন।',
'itax.step2': 'করদাতার ধরন বেছে নিন।',
'itax.step3': '"ট্যাক্স হিসাব করুন" চাপুন।',
'itax.fq1': 'করমুক্ত সীমা কত?',
'itax.fa1': 'সাধারণ ব্যক্তির ৳৩,৭৫,০০০; নারী ও প্রবীণদের ৳৪,২৫,০০০। এর নিচে আয় হলে কর শূন্য (ন্যূনতম কর প্রযোজ্য হতে পারে)।',
'itax.fq2': 'বিনিয়োগ রিবেট কী?',
'itax.fa2': 'অনুমোদিত খাতে (সঞ্চয়পত্র, DPS ইত্যাদি) বিনিয়োগে কর রিবেট মেলে — এই হিসাবে ধরা নেই, তাই প্রকৃত কর কমতে পারে।',
'itax.fq3': 'রিটার্ন কখন জমা দিতে হয়?',
'itax.fa3': 'সাধারণত ৩০ নভেম্বরের মধ্যে (ব্যক্তি করদাতা) — NBR-এর ঘোষণা অনুযায়ী তারিখ বদলাতে পারে।',

/* ---- per-view SEO titles/descriptions ---- */
'seo.home.title': 'BanglaTools — বাংলায় ফ্রি অনলাইন টুলস | যাকাত, জমি, বিদ্যুৎ বিল, GPA ক্যালকুলেটর',
'seo.home.desc': 'সম্পূর্ণ বাংলায় ১৫টি ফ্রি অনলাইন টুল — যাকাত ক্যালকুলেটর, জমি পরিমাপ, বিদ্যুৎ বিল হিসাব, GPA ক্যালকুলেটর, নামাজের সময়সূচী, EMI, BMI, মুদ্রা কনভার্টারসহ আরও অনেক কিছু। কোনো সাইন-আপ ছাড়াই ব্যবহার করুন।',
'seo.zakat.title': 'যাকাত ক্যালকুলেটর — অনলাইনে যাকাতের হিসাব | BanglaTools',
'seo.zakat.desc': 'নগদ টাকা, স্বর্ণ, রূপা ও ব্যবসায়িক পণ্যের উপর যাকাত হিসাব করুন — নিসাবসহ। ফ্রি বাংলা যাকাত ক্যালকুলেটর, কোনো সাইন-আপ ছাড়াই।',
'seo.land.title': 'জমি পরিমাপ ক্যালকুলেটর — শতাংশ, কাঠা, বিঘা, একর রূপান্তর | BanglaTools',
'seo.land.desc': 'শতাংশ, কাঠা, বিঘা, একর, বর্গফুট, গন্ডা, ছটাক — যেকোনো একক থেকে সব এককে জমির মাপ রূপান্তর করুন। ফ্রি বাংলা টুল।',
'seo.elec.title': 'বিদ্যুৎ বিল ক্যালকুলেটর — স্ল্যাব অনুযায়ী বিলের হিসাব | BanglaTools',
'seo.elec.desc': 'BERC স্ল্যাব রেটে মাসিক বিদ্যুৎ বিলের আনুমানিক হিসাব — ডিমান্ড চার্জ ও ভ্যাটসহ। DESCO, DPDC, NESCOসহ সব সংস্থার জন্য।',
'seo.gpa.title': 'GPA ক্যালকুলেটর — SSC/HSC GPA হিসাব ৪র্থ বিষয়সহ | BanglaTools',
'seo.gpa.desc': 'SSC ও HSC পরীক্ষার GPA বের করুন অফিসিয়াল গ্রেডিং পদ্ধতিতে — ৪র্থ বিষয়ের বোনাসসহ। ফ্রি বাংলা GPA ক্যালকুলেটর।',
'seo.age.title': 'বয়স ক্যালকুলেটর — জন্মতারিখ থেকে সঠিক বয়স | BanglaTools',
'seo.age.desc': 'জন্মতারিখ দিলেই বছর, মাস, দিন ও মোট দিনে নিখুঁত বয়স — চাকরির ফরম, পাসপোর্ট ও ভর্তির জন্য। ফ্রি বাংলা টুল।',
'seo.gold.title': 'স্বর্ণের দাম ক্যালকুলেটর — ভরি, আনা, রতি, গ্রামের দাম | BanglaTools',
'seo.gold.desc': 'প্রতি ভরির দাম থেকে আনা, রতি ও গ্রামে স্বর্ণের দাম বের করুন। বিয়ের বাজার বা বিনিয়োগের আগে হিসাব মিলিয়ে নিন।',
'seo.ftax.title': 'ফ্রিল্যান্সার ট্যাক্স ক্যালকুলেটর — বাৎসরিক আয়কর হিসাব | BanglaTools',
'seo.ftax.desc': 'ফ্রিল্যান্সারদের বাৎসরিক আয়ের উপর আনুমানিক আয়কর হিসাব করুন FY ২০২৫-২৬ স্ল্যাব অনুযায়ী। ফ্রি বাংলা ট্যাক্স টুল।',
'seo.prayer.title': 'নামাজের সময়সূচী — জেলা অনুযায়ী আজকের সময় | BanglaTools',
'seo.prayer.desc': 'ঢাকাসহ সব জেলার আজকের পাঁচ ওয়াক্ত নামাজের সময় দেখুন। ফ্রি বাংলা নামাজের সময়সূচী।',
'seo.emi.title': 'EMI ক্যালকুলেটর — লোনের মাসিক কিস্তি ও সুদের হিসাব | BanglaTools',
'seo.emi.desc': 'ঋণের পরিমাণ, সুদের হার ও মেয়াদ দিলেই মাসিক EMI ও মোট সুদ বের করুন। লোন নেওয়ার আগে হিসাব মিলিয়ে নিন।',
'seo.cur.title': 'মুদ্রা কনভার্টার — লাইভ এক্সচেঞ্জ রেটে BDT রূপান্তর | BanglaTools',
'seo.cur.desc': 'লাইভ রেটে টাকা, ডলার, ইউরো, রিয়ালসহ ১৫টি মুদ্রা রূপান্তর করুন। অফলাইনে ম্যানুয়াল রেটের সুবিধাসহ।',
'seo.bmi.title': 'BMI ক্যালকুলেটর — উচ্চতা-ওজন থেকে স্বাস্থ্য সূচক | BanglaTools',
'seo.bmi.desc': 'উচ্চতা ও ওজন দিলেই BMI ও স্বাস্থ্য ক্যাটাগরি জানুন বাংলায়। ফ্রি BMI ক্যালকুলেটর।',
'seo.date.title': 'তারিখ কনভার্টার — ইংরেজি ↔ বাংলা (বঙ্গাব্দ) তারিখ | BanglaTools',
'seo.date.desc': 'ইংরেজি তারিখ থেকে বাংলা তারিখ, আবার বাংলা থেকে ইংরেজি — এক ক্লিকেই রূপান্তর। ফ্রি বাংলা টুল।',
'seo.mess.title': 'মেস খরচ ভাগাভাগি ক্যালকুলেটর — সদস্যদের মধ্যে হিসাব | BanglaTools',
'seo.mess.desc': 'মেসের মোট খরচ সদস্যদের মধ্যে সমান ভাগ করুন — ব্যক্তিগত অতিরিক্ত খরচসহ। মাস শেষের হিসাব এখন ঝামেলাহীন।',
'seo.qurb.title': 'কুরবানির পশুর দাম অনুমান — ওজন থেকে দামের হিসাব | BanglaTools',
'seo.qurb.desc': 'পশুর ওজন ও প্রতি কেজি দর থেকে কুরবানির পশুর আনুমানিক দাম বের করুন। হাটে যাওয়ার আগে ধারণা নিন।',
'seo.itax.title': 'ইনকাম ট্যাক্স হিসাব — চাকরিজীবীদের বাৎসরিক কর | BanglaTools',
'seo.itax.desc': 'বেতনভুক্তদের বাৎসরিক আয়কর হিসাব করুন FY ২০২৫-২৬ স্ল্যাব অনুযায়ী — করমুক্ত সীমা ও রিবেট নোটসহ।',

/* ---- trust pages ---- */
'nav.blog': 'ব্লগ',
'footer.about': 'আমাদের সম্পর্কে',
'footer.blog': 'ব্লগ',
'footer.privacy': 'প্রাইভেসি পলিসি',
'footer.contact': 'যোগাযোগ',

'privacy.h1': 'প্রাইভেসি পলিসি',
'privacy.updated': 'সর্বশেষ হালনাগাদ: অক্টোবর ২০২৬',
'privacy.p1': 'আপনার গোপনীয়তা আমাদের কাছে গুরুত্বপূর্ণ। BanglaTools এমনভাবে তৈরি করা হয়েছে যাতে আপনার ব্যক্তিগত তথ্য আমাদের কাছে না পৌঁছায় — হিসাবের সব কাজ হয় আপনার নিজের ডিভাইসে।',
'privacy.h2a': 'আমরা যা সংগ্রহ করি না',
'privacy.li1': 'কোনো অ্যাকাউন্ট বা সাইন-আপ নেই — তাই নাম, ইমেইল বা ফোন নম্বর চাওয়া হয় না।',
'privacy.li2': 'আপনার হিসাবের তথ্য (টাকার পরিমাণ, জমির মাপ, পরীক্ষার নম্বর) শুধু আপনার ব্রাউজারে প্রসেস হয় — আমাদের কোনো সার্ভারে পাঠানো বা সংরক্ষণ করা হয় না।',
'privacy.h2b': 'তৃতীয় পক্ষের সেবা',
'privacy.p2': 'দুটি টুলে ফ্রি তৃতীয় পক্ষের API ব্যবহার করা হয় — নামাজের সময়সূচীর জন্য Aladhan API এবং মুদ্রার লাইভ রেটের জন্য open.er-api.com। এগুলো ব্যবহারের সময় আপনার জেলা/শহরের নামসহ সাধারণ রিকোয়েস্ট সেই সেবা প্রদানকারীর কাছে যায়; তাদের নিজস্ব প্রাইভেসি পলিসি সেখানে প্রযোজ্য হবে।',
'privacy.h2c': 'কুকি ও লোকাল স্টোরেজ',
'privacy.p3': 'আপনার ভাষা পছন্দ (বাংলা/English) মনে রাখতে ব্রাউজারের localStorage ব্যবহার করা হয়। আমরা নিজেরা কোনো ট্র্যাকিং কুকি বসাই না।',
'privacy.h2d': 'বিজ্ঞাপন',
'privacy.p4': 'সাইট চালু রাখতে ভবিষ্যতে Google AdSense-এর বিজ্ঞাপন দেখানো হতে পারে। Google বিজ্ঞাপন দেখানোর জন্য নিজস্ব কুকি ব্যবহার করতে পারে — বিস্তারিত জানতে Google-এর বিজ্ঞাপন ও গোপনীয়তা নীতি দেখুন।',
'privacy.h2e': 'যোগাযোগ',
'privacy.p5': 'এই নীতি নিয়ে কোনো প্রশ্ন থাকলে আমাদের যোগাযোগ পেজ থেকে লিখুন — আমরা উত্তর দেওয়ার চেষ্টা করব।',

'about.h1': 'আমাদের সম্পর্কে',
'about.p1': 'BanglaTools শুরু হয়েছিল একটা সহজ ভাবনা থেকে — দৈনন্দিন হিসাব-নিকাশের জন্য বাংলাদেশের সাধারণ মানুষের মাতৃভাষায় সহজ টুল থাকা উচিত। যাকাতের হিসাব, জমির মাপ, বিদ্যুৎ বিল, পরীক্ষার GPA — এই সবকিছু এখন বাংলায়, এক জায়গায়, সম্পূর্ণ ফ্রি।',
'about.p2': 'আমাদের লক্ষ্য একটাই: ভাষার বাধা দূর করে প্রতিটি বাংলাদেশির হাতে নির্ভুল হিসাবের টুল পৌঁছে দেওয়া। কোনো সাইন-আপ নেই, কোনো লুকানো চার্জ নেই — শুধু কাজের টুল।',
'about.p3': 'সাইটটি নিয়মিত হালনাগাদ করা হয় — স্ল্যাব রেট, করের নিয়ম বা বাজারদর বদলালে টুলগুলোতেও সেই পরিবর্তন আনা হয়। কোনো ভুল চোখে পড়লে বা নতুন টুলের পরামর্শ থাকলে যোগাযোগ পেজে জানাবেন — আপনার মতামতই আমাদের এগিয়ে নেয়।',

'contact.h1': 'যোগাযোগ',
'contact.intro': 'কোনো প্রশ্ন, পরামর্শ বা ভুল ধরিয়ে দিতে চান? নিচের ফর্মটি পূরণ করুন — পাঠান চাপলে আপনার ইমেইল অ্যাপ খুলে যাবে, সেখান থেকেই মেইল চলে যাবে। কোনো তথ্য আমাদের সার্ভারে জমা হয় না।',
'contact.name': 'আপনার নাম',
'contact.email': 'আপনার ইমেইল',
'contact.subject': 'বিষয়',
'contact.message': 'বার্তা',
'contact.send': 'পাঠান',
'contact.note': 'ফর্মটি mailto পদ্ধতিতে কাজ করে — কোনো ব্যাকএন্ড সার্ভার নেই।',

/* ---- blog chrome ---- */
'blog.h1': 'ব্লগ — ব্যবহারিক গাইড',
'blog.sub': 'প্রতিটি টুলের পেছনের সহজ নিয়ম, কার্যকর টিপস আর সচরাচর প্রশ্নের উত্তর — সহজ বাংলায়।',
'blog.readMore': 'পুরো লেখা পড়ুন →',
'blog.back': '← সব লেখা',
'blog.useTool': 'টুলটি ব্যবহার করুন',
'blog.tips': 'কার্যকর টিপস',
'blog.steps': 'ধাপে ধাপে',
'blog.faqHead': 'সচরাচর জিজ্ঞাসা',
'blog.toolCta': 'এখনই হিসাব করে দেখুন',
'related.label': '📖 বিস্তারিত গাইড:',
'blogt.zakat': 'যাকাতের হিসাব কীভাবে করবেন — সহজ নিয়ম',
'blogt.land': 'শতাংশ-কাঠা-বিঘা: জমি মাপার সহজ হিসাব',
'blogt.electricity': 'বিদ্যুৎ বিলের স্ল্যাব বুঝুন, বিলের চমক কমান',
'blogt.gpa': 'GPA হিসাবের নিয়ম: ৪র্থ বিষয়ের বোনাসসহ',
'blogt.age': 'সঠিক বয়স বের করার নিয়ম (ফরমের জন্য)',
'blogt.gold': 'ভরি-আনা-রতির হিসাব: স্বর্ণ কেনার আগে জানুন',
'blogt.freelancer-tax': 'ফ্রিল্যান্সারদের ট্যাক্স গাইড: প্রথম রিটার্নের আগে',
'blogt.prayer': 'সঠিক নামাজের সময় জানার উপায়',
'blogt.emi': 'লোন নেওয়ার আগে EMI হিসাব কেন জরুরি',
'blogt.currency': 'টাকা পাঠানোর আগে এক্সচেঞ্জ রেট যাচাই করুন',
'blogt.bmi': 'BMI কী বলে আপনার স্বাস্থ্য সম্পর্কে',
'blogt.date': 'বাংলা-ইংরেজি তারিখ রূপান্তরের সহজ নিয়ম',
'blogt.mess': 'মেসের হিসাব ঝামেলাহীন রাখার উপায়',
'blogt.qurbani': 'কুরবানির পশু কেনার আগে দামের ধারণা',
'blogt.income-tax': 'বেতনভুক্তদের আয়কর: স্ল্যাব সহজ ভাষায়'
});

Object.assign(I18N.en, {
'howto.title': 'How to use',

'zakat.intro': 'When Ramadan comes around, one question keeps nagging — how much Zakat do I actually owe? Doing it on paper is a hassle. Enter your cash, gold, silver and business goods here, and this calculator works it out in seconds — nisab included.',
'zakat.step1': 'Enter your cash, gold (bhori), silver (bhori), business goods and receivables/debts.',
'zakat.step2': 'Check the market prices — you can change them if needed.',
'zakat.step3': 'Press "Calculate Zakat" — if you cross the nisab, it shows 2.5% Zakat.',
'zakat.fq1': 'What is nisab?',
'zakat.fa1': 'Nisab is the minimum wealth threshold that makes Zakat obligatory — the value of 7.5 bhori of gold or 52.5 bhori of silver, whichever is lower.',
'zakat.fq2': 'Where do I get the gold price?',
'zakat.fa2': 'The Bangladesh Jewellers Association (BAJUS) announces prices daily — enter that day\u2019s price here for a more accurate result.',
'zakat.fq3': 'Are debts deducted?',
'zakat.fa3': 'Yes — your loans and debts are subtracted from total assets to get zakatable wealth. Enter the correct amount in the debt field.',

'land.intro': 'Confused by shotangsho, katha and bigha while buying land? Don\u2019t take the broker\u2019s word for it — convert any unit into all the rest yourself, in seconds.',
'land.step1': 'Enter the land amount.',
'land.step2': 'Choose which unit it is in.',
'land.step3': 'Press "Convert" — you\u2019ll get the value in every unit at once.',
'land.fq1': 'Is 1 bigha the same everywhere?',
'land.fa1': 'No — that\u2019s the biggest confusion. In Dhaka 1 bigha \u2248 33 shotangsho; in Rajshahi \u2248 20. Always verify deeds in shotangsho.',
'land.fq2': 'Are shotangsho and decimal the same?',
'land.fa2': 'Yes, identical — 1 shotangsho = 1 decimal = 435.6 sq ft.',
'land.fq3': 'Where are gonda and chotak used?',
'land.fa3': 'In Chattogram and some regions — 1 gonda = 864 sq ft, 1 chotak = 45 sq ft; 16 chotak = 1 katha.',

'elec.intro': 'Shocked by your electricity bill at month\u2019s end? Once you know how the slabs work, you can estimate the bill before it arrives. Just enter your meter reading.',
'elec.step1': 'Choose your distribution company.',
'elec.step2': 'Enter units used this month (difference between readings).',
'elec.step3': 'Press "Calculate Bill" — see the slab-wise breakdown and total.',
'elec.fq1': 'Why is the bill lower under 50 units?',
'elec.fa1': 'Up to 50 units the subsidised "lifeline" rate (\u09f34.63) applies. At 51 units the whole bill moves to slab rates.',
'elec.fq2': 'What is the demand charge?',
'elec.fa2': 'A fixed monthly charge based on your sanctioned load — \u09f342/kW. Your load is printed on the bill.',
'elec.fq3': 'What if slab rates change?',
'elec.fa3': 'BERC revises rates from time to time — every rate in this tool is editable, so just enter the new ones.',

'gpa.intro': 'Work out your GPA before results day — and see what you need in each subject to hit your target. Uses the official SSC/HSC grading system.',
'gpa.step1': 'Enter each subject name and marks (add or remove subjects as needed).',
'gpa.step2': 'Choose your 4th (optional) subject.',
'gpa.step3': 'Press "Calculate GPA".',
'gpa.fq1': 'How is the 4th subject counted?',
'gpa.fa1': 'Only the part of its grade point above 2.00 is added — a low score never reduces your GPA.',
'gpa.fq2': 'What if I fail one subject?',
'gpa.fa2': 'Failing any compulsory subject (below 33, grade F) means overall failure — even with A+ everywhere else.',
'gpa.fq3': 'What grade point is 80 marks?',
'gpa.fa3': '80 or above = A+ = 5.00. 70\u201379 = A (4.00), 60\u201369 = A\u2212 (3.50).',

'age.intro': 'Job forms, passports and admissions need your exact age — breaking it into years, months and days by hand is tedious. Enter your birth date and get it instantly.',
'age.step1': 'Pick your date of birth.',
'age.step2': 'Press "Calculate Age" — see years, months, days and total days.',
'age.fq1': 'Why show total days?',
'age.fa1': 'Many forms (e.g. government jobs) ask for age in days — you\u2019ll find that here too.',
'age.fq2': 'What if I enter a future date?',
'age.fa2': 'Your birth date can\u2019t be after today — the tool will warn you.',
'age.fq3': 'Born on 29 February?',
'age.fa3': 'Leap years are handled correctly — age follows calendar rules.',

'gold.intro': 'Wedding shopping or investment — bhori, ana and rati get confusing fast. Enter the per-bhori price and get every other unit instantly.',
'gold.step1': 'Enter today\u2019s per-bhori gold price.',
'gold.step2': 'Press "Calculate Price" — see ana, rati and gram prices.',
'gold.fq1': 'How many ana in a bhori?',
'gold.fa1': '1 bhori = 16 ana, 1 ana = 6 rati. And 1 bhori = 11.664 grams.',
'gold.fq2': 'Does price differ by karat?',
'gold.fa2': 'Yes — 22, 21 and 18 karat have different prices. Use BAJUS\u2019s announced price for the karat you\u2019re buying.',
'gold.fq3': 'Is making charge included?',
'gold.fa3': 'No — this is the gold price only; making charges and VAT vary by shop.',

'ftax.intro': 'Earning online but confused about taxes? Get an estimate of your annual income tax as a freelancer — so there are no surprises at return time.',
'ftax.step1': 'Enter your annual taxable income.',
'ftax.step2': 'Choose your taxpayer category.',
'ftax.step3': 'Press "Calculate Tax" — see the slab-wise tax.',
'ftax.fq1': 'Is the tax-free limit different for freelancers?',
'ftax.fa1': 'The general slabs apply, but special exemptions may exist for ITES/freelancing income — check NBR\u2019s latest circular.',
'ftax.fq2': 'How do I count dollar income?',
'ftax.fa2': 'Convert to taka using Bangladesh Bank\u2019s average rate for the income year, then take the total.',
'ftax.fq3': 'Is this the final tax?',
'ftax.fa3': 'No — it\u2019s an estimate. Get a tax adviser to finalise it with rebates and source-tax deductions.',

'prayer.intro': 'In a new district and don\u2019t know the mosque timings? Pick your district and get today\u2019s five prayer times.',
'prayer.step1': 'Choose your district.',
'prayer.step2': 'Press "Show Schedule" — see all five prayer times.',
'prayer.fq1': 'Are the times 100% accurate?',
'prayer.fa1': 'They\u2019re astronomical estimates — they can differ 5\u201310 minutes from your local mosque, whose timing is final.',
'prayer.fq2': 'Does it work offline?',
'prayer.fa2': 'No — times come from a live API, so you need an internet connection.',
'prayer.fq3': 'Which calculation method?',
'prayer.fa3': 'The standard astronomical method — Hanafi Asr times may differ slightly.',

'emi.intro': 'Before signing for a loan, know exactly what you\u2019ll pay each month — and how much interest in total. Do the math before you sign.',
'emi.step1': 'Enter the loan amount, annual interest rate and tenure (months).',
'emi.step2': 'Press "Calculate EMI" — see the monthly instalment and total interest.',
'emi.fq1': 'How is EMI calculated?',
'emi.fa1': 'On a reducing-balance basis — each month\u2019s interest is charged on the outstanding principal.',
'emi.fq2': 'Does a longer tenure lower the EMI?',
'emi.fa2': 'Yes, the monthly EMI drops — but total interest rises a lot. Look at both before deciding.',
'emi.fq3': 'Flat rate vs reducing rate?',
'emi.fa3': 'No — flat rate charges interest on the full principal, so it costs more in reality. Banks usually use the reducing method.',

'cur.intro': 'Sending money home or buying in dollars online? Convert at live rates in seconds — handy for comparing with the shop\u2019s rate too.',
'cur.step1': 'Enter the amount and choose currencies.',
'cur.step2': 'With internet you get the live rate; otherwise enter a manual rate.',
'cur.step3': 'Press "Convert".',
'cur.fq1': 'Is this the same as the bank rate?',
'cur.fa1': 'It shows the international mid-market rate — banks and exchanges usually differ by \u09f31\u20133.',
'cur.fq2': 'Does it work offline?',
'cur.fa2': 'Yes — enter a rate in the manual-rate field and it calculates offline.',
'cur.fq3': 'Which currencies are included?',
'cur.fa3': 'BDT, USD, EUR, GBP, SAR, AED, INR and 15 currencies expats need most.',

'bmi.intro': 'Is your weight on track, or time to pay attention? Enter height and weight for an instant BMI — a first check on your health.',
'bmi.step1': 'Enter height (cm) and weight (kg).',
'bmi.step2': 'Press "Calculate BMI" — see the result with its category.',
'bmi.fq1': 'Does BMI 25 mean overweight?',
'bmi.fa1': '25\u201329.9 is overweight, 30+ is obese. 18.5\u201324.9 is considered normal.',
'bmi.fq2': 'Does it apply to athletes?',
'bmi.fa2': 'Extra muscle can inflate BMI — for athletes a doctor\u2019s advice is more reliable.',
'bmi.fq3': 'Does BMI diagnose illness?',
'bmi.fa3': 'No — it\u2019s only a screening tool. See a doctor before any decision.',

'date.intro': 'Documents need Bengali dates, offices need English — switch between the two in one click.',
'date.step1': 'Pick an English date and press "Show Bengali Date", or',
'date.step2': 'Enter a Bengali day-month-year and press "Show English Date".',
'date.fq1': 'Is the conversion exact?',
'date.fa1': 'It\u2019s approximate, taking Pohela Boishakh as 14 April — verify with the Bangla Academy calendar for official work.',
'date.fq2': 'How is the Bengali year found?',
'date.fa2': 'English year \u2212 593 for Boishakh\u2013Poush, \u2212 594 for Magh\u2013Chaitra.',
'date.fq3': 'How many days in Bengali months?',
'date.fa3': 'Boishakh\u2013Bhadra have 31 days, Ashwin\u2013Chaitra 30 (per the official reform).',

'mess.intro': 'Month-end mess bill arguments? Enter the total plus everyone\u2019s personal extras — see exactly who pays what, no disputes.',
'mess.step1': 'Enter the total cost.',
'mess.step2': 'Add members\u2019 names and personal extras (if any).',
'mess.step3': 'Press "Split" — see each person\u2019s share.',
'mess.fq1': 'How are personal extras handled?',
'mess.fa1': 'All personal extras are removed from the total, the rest is split equally, then each person\u2019s own extra is added back.',
'mess.fq2': 'Someone joined mid-month?',
'mess.fa2': 'Work out their pro-rata share of the total by days stayed, and enter that as the total.',
'mess.fq3': 'Can I add or remove members?',
'mess.fa3': 'Yes — use "+ Add member" to add, \u00d7 to remove.',

'qurb.intro': 'Get an idea before heading to the haat — enter the animal\u2019s weight and per-kg rate for an estimated price, so you don\u2019t overpay.',
'qurb.step1': 'Enter the animal\u2019s estimated weight (kg).',
'qurb.step2': 'Enter the current per-kg rate at the haat.',
'qurb.step3': 'Press "Estimate Price".',
'qurb.fq1': 'What per-kg rate should I use?',
'qurb.fa1': 'Visit the haat 1\u20132 weeks before Eid or ask a known trader — rates vary by area.',
'qurb.fq2': 'Why a \u00b110% range?',
'qurb.fa2': 'Breed, health, age and demand move prices — the range gives a realistic picture.',
'qurb.fq3': 'How do I measure weight?',
'qurb.fa3': 'There are tape-measure formulas using chest girth and length, or take an experienced trader\u2019s estimate.',

'itax.intro': 'Know your salary tax in advance — no surprises at return time. Calculated on FY 2025\u201326 slabs.',
'itax.step1': 'Enter your annual taxable income.',
'itax.step2': 'Choose your taxpayer category.',
'itax.step3': 'Press "Calculate Tax".',
'itax.fq1': 'What is the tax-free limit?',
'itax.fa1': '\u09f33,75,000 for general individuals; \u09f34,25,000 for women and seniors. Below that, tax is zero (minimum tax may apply).',
'itax.fq2': 'What is the investment rebate?',
'itax.fa2': 'Investing in approved avenues (savings certificates, DPS etc.) earns a tax rebate — not counted here, so actual tax may be lower.',
'itax.fq3': 'When is the return due?',
'itax.fa3': 'Usually by 30 November (individual taxpayers) — dates may change per NBR announcements.',

/* ---- per-view SEO titles/descriptions ---- */
'seo.home.title': 'BanglaTools — Free Online Tools in Bengali | Zakat, Land, Electricity Bill, GPA Calculators',
'seo.home.desc': '15 free online tools in Bengali — Zakat calculator, land measurement, electricity bill estimator, GPA calculator, prayer times, EMI, BMI, currency converter and more. No sign-up needed.',
'seo.zakat.title': 'Zakat Calculator — Calculate Zakat Online | BanglaTools',
'seo.zakat.desc': 'Calculate Zakat on cash, gold, silver and business goods — with nisab. Free Bengali Zakat calculator, no sign-up.',
'seo.land.title': 'Land Measurement Calculator — Convert Shotangsho, Katha, Bigha, Acre | BanglaTools',
'seo.land.desc': 'Convert land area between shotangsho, katha, bigha, acre, sq ft, gonda and chotak. Free Bengali tool.',
'seo.elec.title': 'Electricity Bill Calculator — Estimate by Slab | BanglaTools',
'seo.elec.desc': 'Estimate your monthly electricity bill on BERC slab rates — with demand charge and VAT. For DESCO, DPDC, NESCO and all distributors.',
'seo.gpa.title': 'GPA Calculator — SSC/HSC GPA with 4th Subject | BanglaTools',
'seo.gpa.desc': 'Calculate SSC and HSC GPA with the official grading system — including the 4th subject bonus. Free Bengali GPA calculator.',
'seo.age.title': 'Age Calculator — Exact Age from Date of Birth | BanglaTools',
'seo.age.desc': 'Get exact age in years, months, days and total days from your birth date — for job forms, passports and admissions. Free Bengali tool.',
'seo.gold.title': 'Gold Price Calculator — Per Bhori, Ana, Rati, Gram | BanglaTools',
'seo.gold.desc': 'Get gold prices per ana, rati and gram from the per-bhori price. Check before wedding shopping or investing.',
'seo.ftax.title': 'Freelancer Tax Calculator — Annual Income Tax Estimate | BanglaTools',
'seo.ftax.desc': 'Estimate annual income tax for freelancers on FY 2025\u201326 slabs. Free Bengali tax tool.',
'seo.prayer.title': 'Prayer Times — Today\u2019s Schedule by District | BanglaTools',
'seo.prayer.desc': 'See today\u2019s five daily prayer times for Dhaka and all districts. Free Bengali prayer timetable.',
'seo.emi.title': 'EMI Calculator — Monthly Instalment & Interest | BanglaTools',
'seo.emi.desc': 'Enter loan amount, interest rate and tenure to get monthly EMI and total interest. Do the math before you borrow.',
'seo.cur.title': 'Currency Converter — Live Rates to/from BDT | BanglaTools',
'seo.cur.desc': 'Convert 15 currencies at live rates — USD, EUR, GBP, SAR, AED, INR and more. Manual-rate mode works offline.',
'seo.bmi.title': 'BMI Calculator — Health Index from Height & Weight | BanglaTools',
'seo.bmi.desc': 'Enter height and weight to get your BMI and health category in Bengali. Free BMI calculator.',
'seo.date.title': 'Date Converter — English \u2194 Bengali (Bangabda) Dates | BanglaTools',
'seo.date.desc': 'Convert English dates to Bengali dates and back in one click. Free Bengali tool.',
'seo.mess.title': 'Mess Cost Splitter — Share Expenses Among Members | BanglaTools',
'seo.mess.desc': 'Split mess costs equally among members — with personal extras. Hassle-free month-end accounts.',
'seo.qurb.title': 'Qurbani Price Estimator — From Live Weight | BanglaTools',
'seo.qurb.desc': 'Estimate a qurbani animal\u2019s price from its weight and the per-kg rate. Get an idea before visiting the haat.',
'seo.itax.title': 'Income Tax Calculator — Annual Tax for Salaried Earners | BanglaTools',
'seo.itax.desc': 'Calculate annual income tax on FY 2025\u201326 slabs — with tax-free limits and rebate notes.',

/* ---- trust pages ---- */
'nav.blog': 'Blog',
'footer.about': 'About Us',
'footer.blog': 'Blog',
'footer.privacy': 'Privacy Policy',
'footer.contact': 'Contact',

'privacy.h1': 'Privacy Policy',
'privacy.updated': 'Last updated: October 2026',
'privacy.p1': 'Your privacy matters to us. BanglaTools is built so your personal information never reaches us — every calculation happens on your own device.',
'privacy.h2a': 'What we do NOT collect',
'privacy.li1': 'No accounts or sign-ups — so we never ask for your name, email or phone number.',
'privacy.li2': 'Your calculation data (money, land sizes, exam marks) is processed only in your browser — never sent to or stored on our servers.',
'privacy.h2b': 'Third-party services',
'privacy.p2': 'Two tools use free third-party APIs — Aladhan API for prayer times and open.er-api.com for live currency rates. When you use them, ordinary request data including your chosen city/district goes to that provider; their own privacy policy applies there.',
'privacy.h2c': 'Cookies & local storage',
'privacy.p3': 'We use your browser\u2019s localStorage only to remember your language choice (Bengali/English). We set no tracking cookies ourselves.',
'privacy.h2d': 'Advertising',
'privacy.p4': 'To keep the site running we may show Google AdSense ads in future. Google may use its own cookies to serve ads — see Google\u2019s advertising and privacy policies for details.',
'privacy.h2e': 'Contact',
'privacy.p5': 'Questions about this policy? Write to us from the Contact page — we\u2019ll do our best to answer.',

'about.h1': 'About Us',
'about.p1': 'BanglaTools began with a simple thought — ordinary people in Bangladesh deserve everyday calculation tools in their mother tongue. Zakat math, land measurement, electricity bills, exam GPA — all of it now in Bengali, in one place, completely free.',
'about.p2': 'Our mission is one line: remove the language barrier and put accurate calculation tools in every Bangladeshi\u2019s hands. No sign-ups, no hidden charges — just tools that work.',
'about.p3': 'The site is updated regularly — when slab rates, tax rules or market prices change, the tools change with them. Spotted a mistake or want a new tool? Tell us on the Contact page — your feedback moves us forward.',

'contact.h1': 'Contact',
'contact.intro': 'A question, a suggestion, or spotted a mistake? Fill in the form below — pressing Send opens your email app, and the mail goes from there. Nothing is stored on our servers.',
'contact.name': 'Your name',
'contact.email': 'Your email',
'contact.subject': 'Subject',
'contact.message': 'Message',
'contact.send': 'Send',
'contact.note': 'This form works via mailto — there is no backend server.',

/* ---- blog chrome ---- */
'blog.h1': 'Blog — Practical Guides',
'blog.sub': 'The simple rules behind each tool, practical tips and answers to common questions — in easy Bengali.',
'blog.readMore': 'Read the full article \u2192',
'blog.back': '\u2190 All articles',
'blog.useTool': 'Use the tool',
'blog.tips': 'Practical tips',
'blog.steps': 'Step by step',
'blog.faqHead': 'Common questions',
'blog.toolCta': 'Try the calculation now',
'related.label': '\ud83d\udcd6 In-depth guide:',
'blogt.zakat': 'How to Calculate Zakat — A Simple Guide',
'blogt.land': 'Shotangsho, Katha, Bigha: Land Measurement Made Simple',
'blogt.electricity': 'Understand Electricity Slabs and Tame Your Bill',
'blogt.gpa': 'How GPA Works: Including the 4th Subject Bonus',
'blogt.age': 'Calculating Exact Age for Official Forms',
'blogt.gold': 'Bhori, Ana, Rati: Know Before You Buy Gold',
'blogt.freelancer-tax': 'A Freelancer\u2019s Tax Guide: Before Your First Return',
'blogt.prayer': 'How to Find Accurate Prayer Times',
'blogt.emi': 'Why Calculate EMI Before Taking a Loan',
'blogt.currency': 'Check Exchange Rates Before Sending Money',
'blogt.bmi': 'What Your BMI Says About Your Health',
'blogt.date': 'Converting Between Bengali and English Dates',
'blogt.mess': 'Keeping Mess Accounts Hassle-Free',
'blogt.qurbani': 'Pricing a Qurbani Animal Before You Buy',
'blogt.income-tax': 'Income Tax for Salaried Earners, Explained Simply'
});

/* ---------- contact form (mailto, no backend) ---------- */
function sendContact(ev) {
  if (ev) ev.preventDefault();
  const email = (typeof window !== 'undefined' && window.CONTACT_EMAIL) || 'hasan464078@gmail.com';
  const name = document.getElementById('c-name').value.trim();
  const from = document.getElementById('c-email').value.trim();
  const subject = document.getElementById('c-subject').value.trim();
  const msg = document.getElementById('c-message').value.trim();
  const body = 'Name: ' + name + '\nEmail: ' + from + '\n\n' + msg;
  location.href = 'mailto:' + email +
    '?subject=' + encodeURIComponent(subject) +
    '&body=' + encodeURIComponent(body);
  return false;
}
if (typeof window !== 'undefined') window.sendContact = sendContact;

Object.assign(I18N.bn, {
'seo.blog.title': 'ব্লগ — ব্যবহারিক গাইড | BanglaTools',
'seo.blog.desc': 'প্রতিটি টুলের পেছনের সহজ নিয়ম, কার্যকর টিপস আর সচরাচর প্রশ্নের উত্তর — সহজ বাংলায় ১৫টি গাইড।',
'seo.privacy.title': 'প্রাইভেসি পলিসি | BanglaTools',
'seo.privacy.desc': 'BanglaTools আপনার কোন তথ্য সংগ্রহ করে না, কীভাবে ভাষা পছন্দ মনে রাখে এবং তৃতীয় পক্ষের API সম্পর্কে জানুন।',
'seo.about.title': 'আমাদের সম্পর্কে | BanglaTools',
'seo.about.desc': 'BanglaTools কী, কাদের জন্য এবং আমাদের লক্ষ্য — বাংলায় ফ্রি অনলাইন টুলসের গল্প।',
'seo.contact.title': 'যোগাযোগ | BanglaTools',
'seo.contact.desc': 'প্রশ্ন, পরামর্শ বা ভুল ধরিয়ে দিতে চান? BanglaTools টিমের সাথে যোগাযোগ করুন।'
});
Object.assign(I18N.en, {
'seo.blog.title': 'Blog — Practical Guides | BanglaTools',
'seo.blog.desc': 'The simple rules behind each tool, practical tips and answers to common questions — 15 guides in easy Bengali.',
'seo.privacy.title': 'Privacy Policy | BanglaTools',
'seo.privacy.desc': 'What data BanglaTools does not collect, how your language choice is remembered, and third-party API use.',
'seo.about.title': 'About Us | BanglaTools',
'seo.about.desc': 'What BanglaTools is, who it is for, and our mission — the story of free online tools in Bengali.',
'seo.contact.title': 'Contact | BanglaTools',
'seo.contact.desc': 'Questions, suggestions or spotted a mistake? Get in touch with the BanglaTools team.'
});

Object.assign(I18N.bn, {
'about.tagline': 'সব হিসাব, এক ঠিকানায় — এটাই আমাদের প্রতিশ্রুতি।'
});
Object.assign(I18N.en, {
'about.tagline': 'Every calculation, one home — that\u2019s our promise.'
});

/* ---------- premium editorial: i18n additions ---------- */
Object.assign(I18N.bn, {
'hero.headline': 'সব হিসাব, এক ঠিকানায়',
'hero.searchPh': 'টুল খুঁজুন… (যেমন: যাকাত, জমি, GPA)',
'hero.noResult': 'দুঃখিত, এই নামে কোনো টুল পাওয়া যায়নি।',
'cat.money': 'টাকার হিসাব',
'cat.moneyDesc': 'যাকাত, বিল, ট্যাক্সসহ ৯টি টুল',
'cat.edu': 'পড়াশোনা ও স্বাস্থ্য',
'cat.eduDesc': 'GPA, বয়স, BMI — ৩টি টুল',
'cat.deen': 'জমি, তারিখ ও ইবাদত',
'cat.deenDesc': 'জমি, তারিখ, নামাজ — ৩টি টুল',
'cat.all': 'সব টুল',
'drawer.cats': 'ক্যাটাগরি',
'drawer.pages': 'পেজসমূহ',
'drawer.home': 'হোম',
'drawer.about': 'আমাদের সম্পর্কে',
'drawer.privacy': 'প্রাইভেসি পলিসি',
'drawer.contact': 'যোগাযোগ',
'drawer.lang': 'ভাষা / Language'
});
Object.assign(I18N.en, {
'hero.headline': 'Every calculation, one home',
'hero.searchPh': 'Search tools… (e.g. zakat, land, GPA)',
'hero.noResult': 'Sorry, no tool found by that name.',
'cat.money': 'Money & Finance',
'cat.moneyDesc': '9 tools incl. zakat, bills, tax',
'cat.edu': 'Study & Health',
'cat.eduDesc': 'GPA, age, BMI — 3 tools',
'cat.deen': 'Land, Dates & Worship',
'cat.deenDesc': 'Land, dates, prayer — 3 tools',
'cat.all': 'All tools',
'drawer.cats': 'Categories',
'drawer.pages': 'Pages',
'drawer.home': 'Home',
'drawer.about': 'About Us',
'drawer.privacy': 'Privacy Policy',
'drawer.contact': 'Contact',
'drawer.lang': 'Language / ভাষা'
});
