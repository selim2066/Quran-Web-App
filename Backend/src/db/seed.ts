import db from "./database";

const surahMeta = [
  { id: 1,   name_arabic: "الفاتحة",    name_complex: "Al-Fatihah",       translated_name: "The Opener",              verses_count: 7,   revelation_place: "makkah",  revelation_order: 5,   bismillah_pre: 0 },
  { id: 2,   name_arabic: "البقرة",     name_complex: "Al-Baqarah",       translated_name: "The Cow",                 verses_count: 286, revelation_place: "madinah", revelation_order: 87,  bismillah_pre: 1 },
  { id: 3,   name_arabic: "آل عمران",   name_complex: "Ali 'Imran",       translated_name: "Family of Imran",         verses_count: 200, revelation_place: "madinah", revelation_order: 89,  bismillah_pre: 1 },
  { id: 4,   name_arabic: "النساء",     name_complex: "An-Nisa",          translated_name: "The Women",               verses_count: 176, revelation_place: "madinah", revelation_order: 92,  bismillah_pre: 1 },
  { id: 5,   name_arabic: "المائدة",    name_complex: "Al-Ma'idah",       translated_name: "The Table Spread",        verses_count: 120, revelation_place: "madinah", revelation_order: 112, bismillah_pre: 1 },
  { id: 6,   name_arabic: "الأنعام",    name_complex: "Al-An'am",         translated_name: "The Cattle",              verses_count: 165, revelation_place: "makkah",  revelation_order: 55,  bismillah_pre: 1 },
  { id: 7,   name_arabic: "الأعراف",    name_complex: "Al-A'raf",         translated_name: "The Heights",             verses_count: 206, revelation_place: "makkah",  revelation_order: 39,  bismillah_pre: 1 },
  { id: 8,   name_arabic: "الأنفال",    name_complex: "Al-Anfal",         translated_name: "The Spoils of War",       verses_count: 75,  revelation_place: "madinah", revelation_order: 88,  bismillah_pre: 1 },
  { id: 9,   name_arabic: "التوبة",     name_complex: "At-Tawbah",        translated_name: "The Repentance",          verses_count: 129, revelation_place: "madinah", revelation_order: 113, bismillah_pre: 0 },
  { id: 10,  name_arabic: "يونس",       name_complex: "Yunus",            translated_name: "Jonah",                   verses_count: 109, revelation_place: "makkah",  revelation_order: 51,  bismillah_pre: 1 },
  { id: 11,  name_arabic: "هود",        name_complex: "Hud",              translated_name: "Hud",                     verses_count: 123, revelation_place: "makkah",  revelation_order: 52,  bismillah_pre: 1 },
  { id: 12,  name_arabic: "يوسف",       name_complex: "Yusuf",            translated_name: "Joseph",                  verses_count: 111, revelation_place: "makkah",  revelation_order: 53,  bismillah_pre: 1 },
  { id: 13,  name_arabic: "الرعد",      name_complex: "Ar-Ra'd",          translated_name: "The Thunder",             verses_count: 43,  revelation_place: "madinah", revelation_order: 96,  bismillah_pre: 1 },
  { id: 14,  name_arabic: "إبراهيم",    name_complex: "Ibrahim",          translated_name: "Abraham",                 verses_count: 52,  revelation_place: "makkah",  revelation_order: 72,  bismillah_pre: 1 },
  { id: 15,  name_arabic: "الحجر",      name_complex: "Al-Hijr",          translated_name: "The Rocky Tract",         verses_count: 99,  revelation_place: "makkah",  revelation_order: 54,  bismillah_pre: 1 },
  { id: 16,  name_arabic: "النحل",      name_complex: "An-Nahl",          translated_name: "The Bee",                 verses_count: 128, revelation_place: "makkah",  revelation_order: 70,  bismillah_pre: 1 },
  { id: 17,  name_arabic: "الإسراء",    name_complex: "Al-Isra",          translated_name: "The Night Journey",       verses_count: 111, revelation_place: "makkah",  revelation_order: 50,  bismillah_pre: 1 },
  { id: 18,  name_arabic: "الكهف",      name_complex: "Al-Kahf",          translated_name: "The Cave",                verses_count: 110, revelation_place: "makkah",  revelation_order: 69,  bismillah_pre: 1 },
  { id: 19,  name_arabic: "مريم",       name_complex: "Maryam",           translated_name: "Mary",                    verses_count: 98,  revelation_place: "makkah",  revelation_order: 44,  bismillah_pre: 1 },
  { id: 20,  name_arabic: "طه",         name_complex: "Ta-Ha",            translated_name: "Ta-Ha",                   verses_count: 135, revelation_place: "makkah",  revelation_order: 45,  bismillah_pre: 1 },
  { id: 21,  name_arabic: "الأنبياء",   name_complex: "Al-Anbya",         translated_name: "The Prophets",            verses_count: 112, revelation_place: "makkah",  revelation_order: 73,  bismillah_pre: 1 },
  { id: 22,  name_arabic: "الحج",       name_complex: "Al-Hajj",          translated_name: "The Pilgrimage",          verses_count: 78,  revelation_place: "madinah", revelation_order: 103, bismillah_pre: 1 },
  { id: 23,  name_arabic: "المؤمنون",   name_complex: "Al-Mu'minun",      translated_name: "The Believers",           verses_count: 118, revelation_place: "makkah",  revelation_order: 74,  bismillah_pre: 1 },
  { id: 24,  name_arabic: "النور",      name_complex: "An-Nur",           translated_name: "The Light",               verses_count: 64,  revelation_place: "madinah", revelation_order: 102, bismillah_pre: 1 },
  { id: 25,  name_arabic: "الفرقان",    name_complex: "Al-Furqan",        translated_name: "The Criterion",           verses_count: 77,  revelation_place: "makkah",  revelation_order: 42,  bismillah_pre: 1 },
  { id: 26,  name_arabic: "الشعراء",    name_complex: "Ash-Shu'ara",      translated_name: "The Poets",               verses_count: 227, revelation_place: "makkah",  revelation_order: 47,  bismillah_pre: 1 },
  { id: 27,  name_arabic: "النمل",      name_complex: "An-Naml",          translated_name: "The Ant",                 verses_count: 93,  revelation_place: "makkah",  revelation_order: 48,  bismillah_pre: 1 },
  { id: 28,  name_arabic: "القصص",      name_complex: "Al-Qasas",         translated_name: "The Stories",             verses_count: 88,  revelation_place: "makkah",  revelation_order: 49,  bismillah_pre: 1 },
  { id: 29,  name_arabic: "العنكبوت",   name_complex: "Al-'Ankabut",      translated_name: "The Spider",              verses_count: 69,  revelation_place: "makkah",  revelation_order: 85,  bismillah_pre: 1 },
  { id: 30,  name_arabic: "الروم",      name_complex: "Ar-Rum",           translated_name: "The Romans",              verses_count: 60,  revelation_place: "makkah",  revelation_order: 84,  bismillah_pre: 1 },
  { id: 31,  name_arabic: "لقمان",      name_complex: "Luqman",           translated_name: "Luqman",                  verses_count: 34,  revelation_place: "makkah",  revelation_order: 57,  bismillah_pre: 1 },
  { id: 32,  name_arabic: "السجدة",     name_complex: "As-Sajdah",        translated_name: "The Prostration",         verses_count: 30,  revelation_place: "makkah",  revelation_order: 75,  bismillah_pre: 1 },
  { id: 33,  name_arabic: "الأحزاب",    name_complex: "Al-Ahzab",         translated_name: "The Combined Forces",     verses_count: 73,  revelation_place: "madinah", revelation_order: 90,  bismillah_pre: 1 },
  { id: 34,  name_arabic: "سبأ",        name_complex: "Saba",             translated_name: "Sheba",                   verses_count: 54,  revelation_place: "makkah",  revelation_order: 58,  bismillah_pre: 1 },
  { id: 35,  name_arabic: "فاطر",       name_complex: "Fatir",            translated_name: "Originator",              verses_count: 45,  revelation_place: "makkah",  revelation_order: 43,  bismillah_pre: 1 },
  { id: 36,  name_arabic: "يس",         name_complex: "Ya-Sin",           translated_name: "Ya Sin",                  verses_count: 83,  revelation_place: "makkah",  revelation_order: 41,  bismillah_pre: 1 },
  { id: 37,  name_arabic: "الصافات",    name_complex: "As-Saffat",        translated_name: "Those who set the Ranks", verses_count: 182, revelation_place: "makkah",  revelation_order: 56,  bismillah_pre: 1 },
  { id: 38,  name_arabic: "ص",          name_complex: "Sad",              translated_name: "The Letter Sad",          verses_count: 88,  revelation_place: "makkah",  revelation_order: 38,  bismillah_pre: 1 },
  { id: 39,  name_arabic: "الزمر",      name_complex: "Az-Zumar",         translated_name: "The Troops",              verses_count: 75,  revelation_place: "makkah",  revelation_order: 59,  bismillah_pre: 1 },
  { id: 40,  name_arabic: "غافر",       name_complex: "Ghafir",           translated_name: "The Forgiver",            verses_count: 85,  revelation_place: "makkah",  revelation_order: 60,  bismillah_pre: 1 },
  { id: 41,  name_arabic: "فصلت",       name_complex: "Fussilat",         translated_name: "Explained in Detail",     verses_count: 54,  revelation_place: "makkah",  revelation_order: 61,  bismillah_pre: 1 },
  { id: 42,  name_arabic: "الشورى",     name_complex: "Ash-Shuraa",       translated_name: "The Consultation",        verses_count: 53,  revelation_place: "makkah",  revelation_order: 62,  bismillah_pre: 1 },
  { id: 43,  name_arabic: "الزخرف",     name_complex: "Az-Zukhruf",       translated_name: "The Ornaments of Gold",   verses_count: 89,  revelation_place: "makkah",  revelation_order: 63,  bismillah_pre: 1 },
  { id: 44,  name_arabic: "الدخان",     name_complex: "Ad-Dukhan",        translated_name: "The Smoke",               verses_count: 59,  revelation_place: "makkah",  revelation_order: 64,  bismillah_pre: 1 },
  { id: 45,  name_arabic: "الجاثية",    name_complex: "Al-Jathiyah",      translated_name: "The Crouching",           verses_count: 37,  revelation_place: "makkah",  revelation_order: 65,  bismillah_pre: 1 },
  { id: 46,  name_arabic: "الأحقاف",    name_complex: "Al-Ahqaf",         translated_name: "The Wind-Curved Sandhills", verses_count: 35, revelation_place: "makkah", revelation_order: 66, bismillah_pre: 1 },
  { id: 47,  name_arabic: "محمد",       name_complex: "Muhammad",         translated_name: "Muhammad",                verses_count: 38,  revelation_place: "madinah", revelation_order: 95,  bismillah_pre: 1 },
  { id: 48,  name_arabic: "الفتح",      name_complex: "Al-Fath",          translated_name: "The Victory",             verses_count: 29,  revelation_place: "madinah", revelation_order: 111, bismillah_pre: 1 },
  { id: 49,  name_arabic: "الحجرات",    name_complex: "Al-Hujurat",       translated_name: "The Rooms",               verses_count: 18,  revelation_place: "madinah", revelation_order: 106, bismillah_pre: 1 },
  { id: 50,  name_arabic: "ق",          name_complex: "Qaf",              translated_name: "The Letter Qaf",          verses_count: 45,  revelation_place: "makkah",  revelation_order: 34,  bismillah_pre: 1 },
  { id: 51,  name_arabic: "الذاريات",   name_complex: "Adh-Dhariyat",     translated_name: "The Winnowing Winds",     verses_count: 60,  revelation_place: "makkah",  revelation_order: 67,  bismillah_pre: 1 },
  { id: 52,  name_arabic: "الطور",      name_complex: "At-Tur",           translated_name: "The Mount",               verses_count: 49,  revelation_place: "makkah",  revelation_order: 76,  bismillah_pre: 1 },
  { id: 53,  name_arabic: "النجم",      name_complex: "An-Najm",          translated_name: "The Star",                verses_count: 62,  revelation_place: "makkah",  revelation_order: 23,  bismillah_pre: 1 },
  { id: 54,  name_arabic: "القمر",      name_complex: "Al-Qamar",         translated_name: "The Moon",                verses_count: 55,  revelation_place: "makkah",  revelation_order: 37,  bismillah_pre: 1 },
  { id: 55,  name_arabic: "الرحمن",     name_complex: "Ar-Rahman",        translated_name: "The Beneficent",          verses_count: 78,  revelation_place: "madinah", revelation_order: 97,  bismillah_pre: 1 },
  { id: 56,  name_arabic: "الواقعة",    name_complex: "Al-Waqi'ah",       translated_name: "The Inevitable",          verses_count: 96,  revelation_place: "makkah",  revelation_order: 46,  bismillah_pre: 1 },
  { id: 57,  name_arabic: "الحديد",     name_complex: "Al-Hadid",         translated_name: "The Iron",                verses_count: 29,  revelation_place: "madinah", revelation_order: 94,  bismillah_pre: 1 },
  { id: 58,  name_arabic: "المجادلة",   name_complex: "Al-Mujadila",      translated_name: "The Pleading Woman",      verses_count: 22,  revelation_place: "madinah", revelation_order: 105, bismillah_pre: 1 },
  { id: 59,  name_arabic: "الحشر",      name_complex: "Al-Hashr",         translated_name: "The Exile",               verses_count: 24,  revelation_place: "madinah", revelation_order: 101, bismillah_pre: 1 },
  { id: 60,  name_arabic: "الممتحنة",   name_complex: "Al-Mumtahanah",    translated_name: "She that is to be Examined", verses_count: 13, revelation_place: "madinah", revelation_order: 91, bismillah_pre: 1 },
  { id: 61,  name_arabic: "الصف",       name_complex: "As-Saf",           translated_name: "The Ranks",               verses_count: 14,  revelation_place: "madinah", revelation_order: 109, bismillah_pre: 1 },
  { id: 62,  name_arabic: "الجمعة",     name_complex: "Al-Jumu'ah",       translated_name: "The Congregation",        verses_count: 11,  revelation_place: "madinah", revelation_order: 110, bismillah_pre: 1 },
  { id: 63,  name_arabic: "المنافقون",  name_complex: "Al-Munafiqun",     translated_name: "The Hypocrites",          verses_count: 11,  revelation_place: "madinah", revelation_order: 104, bismillah_pre: 1 },
  { id: 64,  name_arabic: "التغابن",    name_complex: "At-Taghabun",      translated_name: "The Mutual Disillusion",  verses_count: 18,  revelation_place: "madinah", revelation_order: 108, bismillah_pre: 1 },
  { id: 65,  name_arabic: "الطلاق",     name_complex: "At-Talaq",         translated_name: "The Divorce",             verses_count: 12,  revelation_place: "madinah", revelation_order: 99,  bismillah_pre: 1 },
  { id: 66,  name_arabic: "التحريم",    name_complex: "At-Tahrim",        translated_name: "The Prohibition",         verses_count: 12,  revelation_place: "madinah", revelation_order: 107, bismillah_pre: 1 },
  { id: 67,  name_arabic: "الملك",      name_complex: "Al-Mulk",          translated_name: "The Sovereignty",         verses_count: 30,  revelation_place: "makkah",  revelation_order: 77,  bismillah_pre: 1 },
  { id: 68,  name_arabic: "القلم",      name_complex: "Al-Qalam",         translated_name: "The Pen",                 verses_count: 52,  revelation_place: "makkah",  revelation_order: 2,   bismillah_pre: 1 },
  { id: 69,  name_arabic: "الحاقة",     name_complex: "Al-Haqqah",        translated_name: "The Reality",             verses_count: 52,  revelation_place: "makkah",  revelation_order: 78,  bismillah_pre: 1 },
  { id: 70,  name_arabic: "المعارج",    name_complex: "Al-Ma'arij",       translated_name: "The Ascending Stairways", verses_count: 44,  revelation_place: "makkah",  revelation_order: 79,  bismillah_pre: 1 },
  { id: 71,  name_arabic: "نوح",        name_complex: "Nuh",              translated_name: "Noah",                    verses_count: 28,  revelation_place: "makkah",  revelation_order: 71,  bismillah_pre: 1 },
  { id: 72,  name_arabic: "الجن",       name_complex: "Al-Jinn",          translated_name: "The Jinn",                verses_count: 28,  revelation_place: "makkah",  revelation_order: 40,  bismillah_pre: 1 },
  { id: 73,  name_arabic: "المزمل",     name_complex: "Al-Muzzammil",     translated_name: "The Enshrouded One",      verses_count: 20,  revelation_place: "makkah",  revelation_order: 3,   bismillah_pre: 1 },
  { id: 74,  name_arabic: "المدثر",     name_complex: "Al-Muddaththir",   translated_name: "The Cloaked One",         verses_count: 56,  revelation_place: "makkah",  revelation_order: 4,   bismillah_pre: 1 },
  { id: 75,  name_arabic: "القيامة",    name_complex: "Al-Qiyamah",       translated_name: "The Resurrection",        verses_count: 40,  revelation_place: "makkah",  revelation_order: 31,  bismillah_pre: 1 },
  { id: 76,  name_arabic: "الإنسان",    name_complex: "Al-Insan",         translated_name: "The Human",               verses_count: 31,  revelation_place: "madinah", revelation_order: 98,  bismillah_pre: 1 },
  { id: 77,  name_arabic: "المرسلات",   name_complex: "Al-Mursalat",      translated_name: "The Emissaries",          verses_count: 50,  revelation_place: "makkah",  revelation_order: 33,  bismillah_pre: 1 },
  { id: 78,  name_arabic: "النبأ",      name_complex: "An-Naba",          translated_name: "The Tidings",             verses_count: 40,  revelation_place: "makkah",  revelation_order: 80,  bismillah_pre: 1 },
  { id: 79,  name_arabic: "النازعات",   name_complex: "An-Nazi'at",       translated_name: "Those who drag forth",    verses_count: 46,  revelation_place: "makkah",  revelation_order: 81,  bismillah_pre: 1 },
  { id: 80,  name_arabic: "عبس",        name_complex: "Abasa",            translated_name: "He Frowned",              verses_count: 42,  revelation_place: "makkah",  revelation_order: 24,  bismillah_pre: 1 },
  { id: 81,  name_arabic: "التكوير",    name_complex: "At-Takwir",        translated_name: "The Overthrowing",        verses_count: 29,  revelation_place: "makkah",  revelation_order: 7,   bismillah_pre: 1 },
  { id: 82,  name_arabic: "الانفطار",   name_complex: "Al-Infitar",       translated_name: "The Cleaving",            verses_count: 19,  revelation_place: "makkah",  revelation_order: 82,  bismillah_pre: 1 },
  { id: 83,  name_arabic: "المطففين",   name_complex: "Al-Mutaffifin",    translated_name: "The Defrauding",          verses_count: 36,  revelation_place: "makkah",  revelation_order: 86,  bismillah_pre: 1 },
  { id: 84,  name_arabic: "الانشقاق",   name_complex: "Al-Inshiqaq",      translated_name: "The Sundering",           verses_count: 25,  revelation_place: "makkah",  revelation_order: 83,  bismillah_pre: 1 },
  { id: 85,  name_arabic: "البروج",     name_complex: "Al-Buruj",         translated_name: "The Mansions of the Stars", verses_count: 22, revelation_place: "makkah",  revelation_order: 27,  bismillah_pre: 1 },
  { id: 86,  name_arabic: "الطارق",     name_complex: "At-Tariq",         translated_name: "The Morning Star",        verses_count: 17,  revelation_place: "makkah",  revelation_order: 36,  bismillah_pre: 1 },
  { id: 87,  name_arabic: "الأعلى",     name_complex: "Al-A'la",          translated_name: "The Most High",           verses_count: 19,  revelation_place: "makkah",  revelation_order: 8,   bismillah_pre: 1 },
  { id: 88,  name_arabic: "الغاشية",    name_complex: "Al-Ghashiyah",     translated_name: "The Overwhelming",        verses_count: 26,  revelation_place: "makkah",  revelation_order: 68,  bismillah_pre: 1 },
  { id: 89,  name_arabic: "الفجر",      name_complex: "Al-Fajr",          translated_name: "The Dawn",                verses_count: 30,  revelation_place: "makkah",  revelation_order: 10,  bismillah_pre: 1 },
  { id: 90,  name_arabic: "البلد",      name_complex: "Al-Balad",         translated_name: "The City",                verses_count: 20,  revelation_place: "makkah",  revelation_order: 35,  bismillah_pre: 1 },
  { id: 91,  name_arabic: "الشمس",      name_complex: "Ash-Shams",        translated_name: "The Sun",                 verses_count: 15,  revelation_place: "makkah",  revelation_order: 26,  bismillah_pre: 1 },
  { id: 92,  name_arabic: "الليل",      name_complex: "Al-Layl",          translated_name: "The Night",               verses_count: 21,  revelation_place: "makkah",  revelation_order: 9,   bismillah_pre: 1 },
  { id: 93,  name_arabic: "الضحى",      name_complex: "Ad-Duhaa",         translated_name: "The Morning Hours",       verses_count: 11,  revelation_place: "makkah",  revelation_order: 11,  bismillah_pre: 1 },
  { id: 94,  name_arabic: "الشرح",      name_complex: "Ash-Sharh",        translated_name: "The Relief",              verses_count: 8,   revelation_place: "makkah",  revelation_order: 12,  bismillah_pre: 1 },
  { id: 95,  name_arabic: "التين",      name_complex: "At-Tin",           translated_name: "The Fig",                 verses_count: 8,   revelation_place: "makkah",  revelation_order: 28,  bismillah_pre: 1 },
  { id: 96,  name_arabic: "العلق",      name_complex: "Al-'Alaq",         translated_name: "The Clot",                verses_count: 19,  revelation_place: "makkah",  revelation_order: 1,   bismillah_pre: 1 },
  { id: 97,  name_arabic: "القدر",      name_complex: "Al-Qadr",          translated_name: "The Power",               verses_count: 5,   revelation_place: "makkah",  revelation_order: 25,  bismillah_pre: 1 },
  { id: 98,  name_arabic: "البينة",     name_complex: "Al-Bayyinah",      translated_name: "The Clear Proof",         verses_count: 8,   revelation_place: "madinah", revelation_order: 100, bismillah_pre: 1 },
  { id: 99,  name_arabic: "الزلزلة",    name_complex: "Az-Zalzalah",      translated_name: "The Earthquake",          verses_count: 8,   revelation_place: "madinah", revelation_order: 93,  bismillah_pre: 1 },
  { id: 100, name_arabic: "العاديات",   name_complex: "Al-'Adiyat",       translated_name: "The Courser",             verses_count: 11,  revelation_place: "makkah",  revelation_order: 14,  bismillah_pre: 1 },
  { id: 101, name_arabic: "القارعة",    name_complex: "Al-Qari'ah",       translated_name: "The Calamity",            verses_count: 11,  revelation_place: "makkah",  revelation_order: 30,  bismillah_pre: 1 },
  { id: 102, name_arabic: "التكاثر",    name_complex: "At-Takathur",      translated_name: "The Rivalry in World Increase", verses_count: 8, revelation_place: "makkah", revelation_order: 16, bismillah_pre: 1 },
  { id: 103, name_arabic: "العصر",      name_complex: "Al-'Asr",          translated_name: "The Declining Day",       verses_count: 3,   revelation_place: "makkah",  revelation_order: 13,  bismillah_pre: 1 },
  { id: 104, name_arabic: "الهمزة",     name_complex: "Al-Humazah",       translated_name: "The Traducer",            verses_count: 9,   revelation_place: "makkah",  revelation_order: 32,  bismillah_pre: 1 },
  { id: 105, name_arabic: "الفيل",      name_complex: "Al-Fil",           translated_name: "The Elephant",            verses_count: 5,   revelation_place: "makkah",  revelation_order: 19,  bismillah_pre: 1 },
  { id: 106, name_arabic: "قريش",       name_complex: "Quraysh",          translated_name: "Quraysh",                 verses_count: 4,   revelation_place: "makkah",  revelation_order: 29,  bismillah_pre: 1 },
  { id: 107, name_arabic: "الماعون",    name_complex: "Al-Ma'un",         translated_name: "The Small Kindnesses",    verses_count: 7,   revelation_place: "makkah",  revelation_order: 17,  bismillah_pre: 1 },
  { id: 108, name_arabic: "الكوثر",     name_complex: "Al-Kawthar",       translated_name: "The Abundance",           verses_count: 3,   revelation_place: "makkah",  revelation_order: 15,  bismillah_pre: 1 },
  { id: 109, name_arabic: "الكافرون",   name_complex: "Al-Kafirun",       translated_name: "The Disbelievers",        verses_count: 6,   revelation_place: "makkah",  revelation_order: 18,  bismillah_pre: 1 },
  { id: 110, name_arabic: "النصر",      name_complex: "An-Nasr",          translated_name: "The Divine Support",      verses_count: 3,   revelation_place: "madinah", revelation_order: 114, bismillah_pre: 1 },
  { id: 111, name_arabic: "المسد",      name_complex: "Al-Masad",         translated_name: "The Palm Fiber",          verses_count: 5,   revelation_place: "makkah",  revelation_order: 6,   bismillah_pre: 1 },
  { id: 112, name_arabic: "الإخلاص",    name_complex: "Al-Ikhlas",        translated_name: "The Sincerity",           verses_count: 4,   revelation_place: "makkah",  revelation_order: 22,  bismillah_pre: 1 },
  { id: 113, name_arabic: "الفلق",      name_complex: "Al-Falaq",         translated_name: "The Daybreak",            verses_count: 5,   revelation_place: "makkah",  revelation_order: 20,  bismillah_pre: 1 },
  { id: 114, name_arabic: "الناس",      name_complex: "An-Nas",           translated_name: "Mankind",                 verses_count: 6,   revelation_place: "makkah",  revelation_order: 21,  bismillah_pre: 1 },
];

const seedSurahs = () => {
  const insert = db.prepare(`
    INSERT OR IGNORE INTO surahs
    (id, name_arabic, name_complex, translated_name, verses_count, revelation_place, revelation_order, bismillah_pre)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const insertMany = db.transaction(() => {
    for (const s of surahMeta) {
      insert.run(
        s.id, s.name_arabic, s.name_complex, s.translated_name,
        s.verses_count, s.revelation_place, s.revelation_order, s.bismillah_pre
      );
    }
  });
  insertMany();
  console.log("✅ Surahs seeded");
};

const seedAyahs = async () => {
  const insert = db.prepare(`
    INSERT OR IGNORE INTO ayahs
    (surah_id, verse_number, verse_key, text_madani, translation_text, translation_source)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  for (let surahId = 1; surahId <= 114; surahId++) {
    const res = await fetch(
      `https://api.quran.com/api/v3/chapters/${surahId}/verses?recitation=1&translations=21&language=en&per_page=300`
    );
    const data = await res.json() as any;

    const insertMany = db.transaction(() => {
      for (const v of data.verses) {
        const [, verseNum] = v.verse_key.split(":");
        insert.run(
          surahId, parseInt(verseNum), v.verse_key,
          v.text_madani, v.translations?.[0]?.text || "", "Saheeh International"
        );
      }
    });
    insertMany();
    console.log(`✅ Surah ${surahId} seeded`);
    await new Promise(r => setTimeout(r, 300)); // rate limit buffer
  }

  db.exec(`INSERT INTO ayahs_fts(ayahs_fts) VALUES('rebuild')`);
  console.log("✅ FTS index built");
};

(async () => {
  seedSurahs();
  await seedAyahs();
  console.log("🎉 Database ready");
})().catch(console.error);