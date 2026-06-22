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

  const items = [
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
    <div className="border-t border-[#1f332b]/10">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="group min-w-0 border-b xl:border-b-0 xl:border-r last:border-r-0 border-[#1f332b]/10 py-7 sm:px-5 xl:px-6"
            >
              <div className="flex items-start justify-between gap-5">
                <span className="font-serif text-3xl text-[#7a8b7f] group-hover:text-[#1f5f4b] transition">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <Icon
                  size={22}
                  className="text-[#1f5f4b] shrink-0 opacity-80"
                />
              </div>

              <h3 className="mt-8 text-4xl font-serif font-bold text-[#1f332b] leading-none">
                {loading ? "..." : item.value}
              </h3>

              <p className="mt-4 text-sm font-semibold text-[#1f332b]">
                {item.title}
              </p>

              <p className="mt-2 text-sm text-[#5f6f66] leading-relaxed break-words">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}