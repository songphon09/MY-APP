// app/page.tsx หรือ pages/index.tsx
'use client';

import Image from "next/image";
import { useState } from "react";

// -------------------------------------------------------------------------
// 1. DATA STRUCTURE (โครงสร้างข้อมูลเนื้อหา 7 บท - ปรับสีให้เข้ากับธีมม่วง)
// -------------------------------------------------------------------------

interface Lesson {
  id: string;
  title: string;
  icon: string;
  color: string;
  content: string[];
}

const lessonData: Lesson[] = [
  { 
    id: '1', 
    title: 'บทที่ 1: การติดตั้งและการกำหนดค่าพื้นฐานเครือข่าย', 
    icon: '💻', 
    color: 'bg-purple-100/50 dark:bg-purple-900/40 hover:bg-purple-200/70 dark:hover:bg-purple-800/60',
    content: [
      "ภาพรวมของการบริหารเครือข่ายและความสำคัญ",
      "การติดตั้งและตั้งค่าอุปกรณ์หลัก เช่น Switch, Router",
      "การบริหารจัดการอุปกรณ์ผ่าน Console, Telnet, SSH"
    ]
  },
  { 
    id: '2', 
    title: 'บทที่ 2: การจัดสรรและการจัดการหมายเลข IP', 
    icon: '🔢', 
    color: 'bg-indigo-100/50 dark:bg-indigo-900/40 hover:bg-indigo-200/70 dark:hover:bg-indigo-800/60',
    content: [
      "การกำหนด Static IP และการประยุกต์ใช้",
      "หลักการทำงานและการตั้งค่า DHCP Server/Client",
      "การออกแบบ Subnetting และ Supernetting"
    ]
  },
  { 
    id: '3', 
    title: 'บทที่ 3: การค้นหาเส้นทางและการเราต์', 
    icon: '🗺️', 
    color: 'bg-fuchsia-100/50 dark:bg-fuchsia-900/40 hover:bg-fuchsia-200/70 dark:hover:bg-fuchsia-800/60',
    content: [
      "แนวคิด Routing และ Routing Table",
      "การกำหนด Static Routing",
      "การใช้งาน Dynamic Routing Protocols (RIP, OSPF, EIGRP)"
    ]
  },
  { 
    id: '4', 
    title: 'บทที่ 4: ระบบเครือข่ายไร้สาย', 
    icon: '📡', 
    color: 'bg-violet-100/50 dark:bg-violet-900/40 hover:bg-violet-200/70 dark:hover:bg-violet-800/60',
    content: [
      "มาตรฐาน 802.11 และอุปกรณ์ Access Point",
      "การตั้งค่า SSID และการจัดการช่องสัญญาณ",
      "มาตรฐานความปลอดภัยไร้สาย (WPA2/WPA3)"
    ]
  },
  { 
    id: '5', 
    title: 'บทที่ 5: ระบบความปลอดภัยเครือข่าย', 
    icon: '🛡️', 
    color: 'bg-pink-100/50 dark:bg-pink-900/40 hover:bg-pink-200/70 dark:hover:bg-pink-800/60',
    content: [
      "ภัยคุกคามในระดับเครือข่ายและการป้องกัน",
      "หลักการทำงานและประเภทของ Firewall",
      "การกำหนดค่า Access Control List (ACL)"
    ]
  },
  { 
    id: '6', 
    title: 'บทที่ 6: การออกแบบ VPN', 
    icon: '🔑', 
    color: 'bg-rose-100/50 dark:bg-rose-900/40 hover:bg-rose-200/70 dark:hover:bg-rose-800/60',
    content: [
      "ประเภท VPN (Site-to-Site, Remote Access)",
      "การทำความเข้าใจโปรโตคอล (IPsec, SSL/TLS)",
      "การติดตั้งและตั้งค่า VPN เพื่อการเข้าถึงที่ปลอดภัย"
    ]
  },
  { 
    id: '7', 
    title: 'บทที่ 7: การประยุกต์ใช้เครือข่ายในองค์กร', 
    icon: '🏢', 
    color: 'bg-sky-100/50 dark:bg-sky-900/40 hover:bg-sky-200/70 dark:hover:bg-sky-800/60',
    content: [
      "การออกแบบโครงสร้างเครือข่ายสำหรับองค์กร",
      "การประยุกต์ใช้ระบบเซิร์ฟเวอร์และ Cloud Networking",
      "เครื่องมือสำหรับการ Monitoring และ Troubleshooting"
    ]
  },
];

// -------------------------------------------------------------------------
// 2. CHILD COMPONENT: LessonCard (สำหรับการกด)
// -------------------------------------------------------------------------

interface LessonCardProps {
  lesson: Lesson;
  onLessonClick: (lessonId: string) => void;
}

const LessonCard = ({ lesson, onLessonClick }: LessonCardProps) => (
  <div 
    onClick={() => onLessonClick(lesson.id)} 
    className={`cursor-pointer p-6 border border-purple-200/50 dark:border-purple-800/50 rounded-2xl shadow-xl transition-all duration-300 transform 
                hover:scale-[1.03] active:scale-[1.01] active:shadow-none active:translate-y-0.5 
                ${lesson.color} dark:bg-zinc-800/80`}
  >
    <div className="text-3xl mb-3">{lesson.icon}</div>
    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
      {lesson.title}
    </h3>
    <ul className="mt-3 ml-4 list-disc text-zinc-700 dark:text-zinc-300 text-sm leading-6 space-y-1">
      {lesson.content.slice(0, 3).map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
    <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 mt-4">
      คลิกเพื่อดูรายละเอียด →
    </p>
  </div>
);

// -------------------------------------------------------------------------
// 3. CHILD COMPONENT: LessonDetail (แสดงเนื้อหา)
// -------------------------------------------------------------------------

interface LessonDetailProps {
  lesson: Lesson;
  onBack: () => void;
}

const LessonDetail = ({ lesson, onBack }: LessonDetailProps) => (
  <div className="animate-fade-in">
    <button 
      onClick={onBack} 
      className="flex items-center mb-8 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full 
                 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 
                 active:shadow-none active:translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75"
    >
      <span className="mr-2 text-xl">←</span> 
      <span className="text-lg font-semibold">กลับสู่หน้าหลัก</span>
    </button>
    
    <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 flex items-center mb-2 border-b-2 pb-4 border-purple-300 dark:border-purple-700">
      <span className="mr-3 text-5xl">{lesson.icon}</span> {lesson.title}
    </h1>
    <p className="text-xl font-medium text-purple-700 dark:text-purple-300 mb-8">
      {lesson.title.substring(lesson.title.indexOf(':') + 2)}
    </p>

    <div className="space-y-6 text-zinc-700 dark:text-zinc-300 text-lg">
      {lesson.content.map((item, index) => (
        <div key={index} className="p-5 bg-purple-50/60 dark:bg-zinc-800/70 rounded-xl shadow-sm border border-purple-200 dark:border-zinc-700">
          <p className="font-bold text-purple-800 dark:text-purple-200 mb-2 text-xl">
            <span className="mr-2 text-purple-600 dark:text-purple-400">❖</span> หัวข้อหลักที่ {index + 1}
          </p>
          <p>{item}</p>
        </div>
      ))}
      
      <div className="p-6 bg-purple-100 dark:bg-purple-900/50 border-l-4 border-purple-500 rounded-lg shadow-md">
        <h3 className="font-bold text-purple-700 dark:text-purple-300 text-xl flex items-center mb-2">
          <span className="mr-3 text-2xl">💡</span> สิ่งที่ต้องฝึกปฏิบัติ
        </h3>
        <p className="mt-2 text-purple-800 dark:text-purple-200 text-base">
          เน้นการปฏิบัติจริง เช่น การกำหนดค่า IP บน CLI, การตั้งค่า Firewall rules, หรือการจำลองการทำงานของ Routing Protocol เพื่อเสริมสร้างความเข้าใจและทักษะ.
        </p>
      </div>
    </div>
  </div>
);

// -------------------------------------------------------------------------
// 4. CHILD COMPONENT: GradeCalculator (ตัดเกรด)
// -------------------------------------------------------------------------

function GradeCalculator() {
  const [score, setScore] = useState<string>("");
  const [maxScore, setMaxScore] = useState<string>("100");
  const [grade, setGrade] = useState<string | null>(null);
  const [percent, setPercent] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleCalculate = () => {
    const s = parseFloat(score);
    const m = parseFloat(maxScore);

    if (isNaN(s) || isNaN(m) || m <= 0) {
      setGrade(null);
      setPercent(null);
      setMessage("กรุณากรอกคะแนนและคะแนนเต็มให้ถูกต้อง");
      return;
    }

    const p = (s / m) * 100;
    let g = "F";

    if (p >= 80) g = "A";
    else if (p >= 75) g = "B+";
    else if (p >= 70) g = "B";
    else if (p >= 65) g = "C+";
    else if (p >= 60) g = "C";
    else if (p >= 55) g = "D+";
    else if (p >= 50) g = "D";
    else g = "F";

    setPercent(parseFloat(p.toFixed(2)));
    setGrade(g);
    setMessage("");
  };

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-zinc-800 dark:to-zinc-900 border border-purple-200/60 dark:border-purple-800/80 shadow-xl">
      <h3 className="text-xl font-bold text-purple-900 dark:text-purple-100 flex items-center mb-4">
        <span className="mr-2 text-2xl">📊</span> เครื่องมือตัดเกรด (Grade Calculator)
      </h3>

      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
            คะแนนที่ได้ (Score)
          </label>
          <input
            type="number"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className="rounded-xl px-4 py-2 bg-white dark:bg-zinc-800 border border-purple-200/70 dark:border-purple-700/80 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="เช่น 78"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
            คะแนนเต็ม (Max Score)
          </label>
          <input
            type="number"
            value={maxScore}
            onChange={(e) => setMaxScore(e.target.value)}
            className="rounded-xl px-4 py-2 bg-white dark:bg-zinc-800 border border-purple-200/70 dark:border-purple-700/80 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="เช่น 100"
          />
        </div>

        <button
          onClick={handleCalculate}
          className="w-full mt-2 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-none transition-all duration-200"
        >
          คำนวณเกรด
        </button>

        {message && (
          <p className="mt-2 text-sm text-red-500 dark:text-red-400">
            {message}
          </p>
        )}

        {grade && percent !== null && (
          <div className="mt-4 p-4 rounded-2xl bg-purple-100/70 dark:bg-purple-900/50 border border-purple-300/70 dark:border-purple-700/80">
            <p className="text-sm text-zinc-700 dark:text-zinc-200">
              เปอร์เซ็นต์: <span className="font-bold">{percent}%</span>
            </p>
            <p className="mt-1 text-lg font-extrabold text-purple-800 dark:text-purple-200">
              เกรดที่ได้: <span className="text-2xl">{grade}</span>
            </p>
            <p className="mt-1 text-xs text-purple-700/80 dark:text-purple-300/80">
              เกณฑ์ตัวอย่าง: A ≥ 80, B+ ≥ 75, B ≥ 70, C+ ≥ 65, C ≥ 60, D+ ≥ 55, D ≥ 50, F &lt; 50
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// -------------------------------------------------------------------------
// 5. CHILD COMPONENT: BasicMathTool (บวก ลบ คูณ หาร ยกกำลัง 2)
// -------------------------------------------------------------------------

function BasicMathTool() {
  const [a, setA] = useState<string>("");
  const [b, setB] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const parseInputs = (): { x: number; y: number; valid: boolean } => {
    const x = parseFloat(a);
    const y = parseFloat(b);
    if (isNaN(x) || isNaN(y)) {
      setResult("กรุณากรอกตัวเลขให้ถูกต้องทั้งสองช่อง");
      return { x: 0, y: 0, valid: false };
    }
    return { x, y, valid: true };
  };

  const handleAdd = () => {
    const { x, y, valid } = parseInputs();
    if (!valid) return;
    setResult(`${x} + ${y} = ${x + y}`);
  };

  const handleSub = () => {
    const { x, y, valid } = parseInputs();
    if (!valid) return;
    setResult(`${x} - ${y} = ${x - y}`);
  };

  const handleMul = () => {
    const { x, y, valid } = parseInputs();
    if (!valid) return;
    setResult(`${x} × ${y} = ${x * y}`);
  };

  const handleDiv = () => {
    const { x, y, valid } = parseInputs();
    if (!valid) return;
    if (y === 0) {
      setResult("หารด้วย 0 ไม่ได้");
      return;
    }
    const value = x / y;
    setResult(`${x} ÷ ${y} = ${parseFloat(value.toFixed(4))}`);
  };

  const handleSquare = () => {
    const x = parseFloat(a);
    if (isNaN(x)) {
      setResult("กรุณากรอกตัวเลขในช่องแรกเพื่อยกกำลัง 2");
      return;
    }
    setResult(`${x}² = ${x * x}`);
  };

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-fuchsia-50 to-sky-50 dark:from-zinc-800 dark:to-zinc-900 border border-fuchsia-200/60 dark:border-fuchsia-800/80 shadow-xl">
      <h3 className="text-xl font-bold text-fuchsia-900 dark:text-fuchsia-100 flex items-center mb-4">
        <span className="mr-2 text-2xl">🧮</span> ฝึกคิดเลขพื้นฐาน
      </h3>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
              ตัวเลขที่ 1 (A)
            </label>
            <input
              type="number"
              value={a}
              onChange={(e) => setA(e.target.value)}
              className="rounded-xl px-4 py-2 bg-white dark:bg-zinc-800 border border-fuchsia-200/70 dark:border-fuchsia-700/80 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              placeholder="เช่น 5"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
              ตัวเลขที่ 2 (B)
            </label>
            <input
              type="number"
              value={b}
              onChange={(e) => setB(e.target.value)}
              className="rounded-xl px-4 py-2 bg-white dark:bg-zinc-800 border border-fuchsia-200/70 dark:border-fuchsia-700/80 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              placeholder="เช่น 3"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
          <button
            onClick={handleAdd}
            className="py-2 rounded-full bg-fuchsia-600/90 hover:bg-fuchsia-500 text-white text-sm font-semibold shadow-md hover:shadow-lg active:shadow-none active:translate-y-0.5 transition-all"
          >
            A + B
          </button>
          <button
            onClick={handleSub}
            className="py-2 rounded-full bg-purple-600/90 hover:bg-purple-500 text-white text-sm font-semibold shadow-md hover:shadow-lg active:shadow-none active:translate-y-0.5 transition-all"
          >
            A - B
          </button>
          <button
            onClick={handleMul}
            className="py-2 rounded-full bg-indigo-600/90 hover:bg-indigo-500 text-white text-sm font-semibold shadow-md hover:shadow-lg active:shadow-none active:translate-y-0.5 transition-all"
          >
            A × B
          </button>
          <button
            onClick={handleDiv}
            className="py-2 rounded-full bg-sky-600/90 hover:bg-sky-500 text-white text-sm font-semibold shadow-md hover:shadow-lg active:shadow-none active:translate-y-0.5 transition-all"
          >
            A ÷ B
          </button>
        </div>

        <button
          onClick={handleSquare}
          className="w-full mt-3 py-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg active:shadow-none active:translate-y-0.5 transition-all"
        >
          ยกกำลัง 2 ของ A (A²)
        </button>

        {result && (
          <div className="mt-4 p-4 rounded-2xl bg-fuchsia-100/70 dark:bg-fuchsia-900/50 border border-fuchsia-300/70 dark:border-fuchsia-700/80">
            <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-100">
              ผลลัพธ์:
            </p>
            <p className="mt-1 text-lg font-bold text-fuchsia-900 dark:text-fuchsia-100">
              {result}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// -------------------------------------------------------------------------
// 6. MAIN COMPONENT (หน้าหลักที่จัดการ State)
// -------------------------------------------------------------------------

export default function Home() {
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const selectedLesson = lessonData.find(l => l.id === selectedLessonId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-black dark:to-zinc-950 flex justify-center py-16 px-6">
      <main className="w-full max-w-5xl bg-white dark:bg-zinc-900 rounded-3xl p-10 shadow-2xl border border-purple-200/70 dark:border-purple-900/50">
        
        {/* Header (แสดงเฉพาะหน้าหลัก) */}
        {!selectedLessonId && (
          <div className="flex flex-col items-center text-center pb-8 border-b-2 border-purple-300 dark:border-purple-700 mb-8">
            <Image
              src="/next.svg"
              alt="Next.js"
              width={120}
              height={50}
              className="dark:invert mb-4"
            />
            <h1 className="text-4xl font-extrabold mt-6 text-purple-900 dark:text-purple-100 drop-shadow-lg">
              BSCCT604 – การบริหารเครือข่ายคอมพิวเตอร์
            </h1>
            <p className="text-purple-700 dark:text-purple-300 mt-2 text-xl font-medium">
              Computer Network Administration
            </p>
          </div>
        )}

        {/* ถ้าเลือกบทแล้ว แสดงรายละเอียด */}
        {selectedLesson ? (
          <LessonDetail 
            lesson={selectedLesson} 
            onBack={() => setSelectedLessonId(null)} 
          />
        ) : (
          <>
            {/* ข้อมูลรายวิชา */}
            <section className="mt-2 p-6 bg-purple-50/60 dark:bg-zinc-800/70 rounded-2xl border border-purple-200 dark:border-purple-800 shadow-md">
              <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-100 flex items-center">
                <span className="mr-3 text-3xl">📘</span> ข้อมูลรายวิชา
              </h2>
              <div className="mt-4 text-zinc-700 dark:text-zinc-300 leading-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-lg">
                  <p><strong>หน่วยกิต:</strong> 3(2-2-5)</p>
                  <p><strong>รหัสรายวิชาเดิม:</strong> ไม่มี</p>
                </div>
                <div className="text-lg">
                  <p><strong>วิชาบังคับก่อน:</strong> BSCCT603 การสื่อสารข้อมูลและระบบเครือข่ายคอมพิวเตอร์</p>
                </div>
                
                {/* คำอธิบายรายวิชาเต็ม (ภาษาไทย) */}
                <p className="mt-4 col-span-full text-base italic text-purple-700 dark:text-purple-300 leading-relaxed">
                  ศึกษาและฝึกปฏิบัติเกี่ยวกับการติดตั้งและกำหนดค่าทางเครือข่ายคอมพิวเตอร์ในรูปแบบต่าง ๆ 
                  การค้นหาเส้นทาง การจัดสรรหมายเลขไอพีแบบคงที่และแบบพลวัต ระบบเครือข่ายคอมพิวเตอร์ไร้สาย 
                  ระบบความปลอดภัยในเครือข่ายคอมพิวเตอร์ การออกแบบช่องทางการสื่อสารชนิดส่วนบุคคล (VPN) 
                  และการประยุกต์ใช้ระบบเครือข่ายคอมพิวเตอร์กับองค์กรแบบต่าง ๆ
                </p>
                {/* คำอธิบายรายวิชาเต็ม (ภาษาอังกฤษ) */}
                <p className="mt-2 col-span-full text-sm text-purple-400 dark:text-purple-600 leading-relaxed">
                  *Study and practice in installation and setup of computer network with various applications, routing, assignment of static and dynamic IP addresses, wireless network system, computer network security, virtual private network design, and application of computer network in various types of organization.
                </p>
              </div>
            </section>

            {/* Lessons Grid */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-6 flex items-center">
                <span className="mr-3 text-3xl">🚀</span> หน่วยการเรียนรู้ทั้งหมด 7 บท
              </h2>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                {lessonData.map((lesson) => (
                  <LessonCard 
                    key={lesson.id} 
                    lesson={lesson} 
                    onLessonClick={setSelectedLessonId} 
                  />
                ))}
              </div>
            </section>

            {/* Tools Section: ตัดเกรด + คิดเลขพื้นฐาน */}
            <section className="mt-16">
              <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-6 flex items-center">
                <span className="mr-3 text-3xl">🧰</span> เครื่องมือช่วยเรียน (Tools)
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <GradeCalculator />
                <BasicMathTool />
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
