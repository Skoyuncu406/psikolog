import {
  CalendarCheck,
  Clock,
  FileText,
  Mail,
  MailWarning,
} from "lucide-react";

export default function AdminStats({ stats = {}, loading = false }) {
  const safeStats = {
    totalBlogs: stats.totalBlogs ?? 0,
    totalMessages: stats.totalMessages ?? 0,
    unreadMessages: stats.unreadMessages ?? 0,
    pendingAppointments: stats.pendingAppointments ?? 0,
    todayAppointments: stats.todayAppointments ?? 0,
  };

  const cards = [
    {
      title: "Toplam Blog",
      value: safeStats.totalBlogs,
      icon: FileText,
      desc: "Yayındaki makale sayısı",
    },
    {
      title: "Toplam Mesaj",
      value: safeStats.totalMessages,
      icon: Mail,
      desc: "Gelen iletişim mesajları",
    },
    {
      title: "Okunmamış Mesaj",
      value: safeStats.unreadMessages,
      icon: MailWarning,
      desc: "Henüz okunmayan mesajlar",
    },
    {
      title: "Bekleyen Randevu",
      value: safeStats.pendingAppointments,
      icon: Clock,
      desc: "Onay bekleyen talepler",
    },
    {
      title: "Bugünkü Randevu",
      value: safeStats.todayAppointments,
      icon: CalendarCheck,
      desc: "Bugün planlanan randevular",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5 mb-10">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-white rounded-[2rem] p-5 border border-[#ebe4d6] shadow-sm hover:shadow-lg transition min-w-0"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm text-[#7a8b7f]">{card.title}</p>

                <h3 className="mt-2 text-3xl font-serif font-bold text-[#1f332b]">
                  {loading ? "..." : card.value}
                </h3>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-[#e3efe8] flex items-center justify-center shrink-0">
                <Icon className="text-[#1f5f4b]" size={24} />
              </div>
            </div>

            <p className="mt-4 text-sm text-[#5f6f66] break-words">
              {card.desc}
            </p>
          </div>
        );
      })}
    </div>
  );
}