"use client";

import { useEffect, useState } from "react";
import { ImagePlus, PlusCircle, Save, X } from "lucide-react";

export default function BlogForm({ editingBlog, onSuccess, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: "",
  });

  const [dragActive, setDragActive] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (editingBlog) {
      setForm({
        title: editingBlog.title || "",
        excerpt: editingBlog.excerpt || "",
        content: editingBlog.content || "",
        image: editingBlog.image || "",
      });
    }
  }, [editingBlog]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleImageFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Lütfen sadece görsel dosyası seçin.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    handleImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.excerpt || !form.content) {
      setMessage("Başlık, kısa açıklama ve içerik zorunludur.");
      return;
    }

    const url = editingBlog ? `/api/blogs/${editingBlog._id}` : "/api/blogs";
    const method = editingBlog ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      setMessage("İşlem sırasında hata oluştu.");
      return;
    }

    setForm({
      title: "",
      excerpt: "",
      content: "",
      image: "",
    });

    setMessage(editingBlog ? "Makale güncellendi." : "Makale eklendi.");

    onSuccess();
  };

  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-[#ebe4d6]">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-serif font-bold text-[#1f332b]">
            {editingBlog ? "Makaleyi Düzenle" : "Yeni Makale Ekle"}
          </h2>

          <p className="text-[#5f6f66] mt-2">
            Blog içeriğini buradan oluşturabilir veya güncelleyebilirsiniz.
          </p>
        </div>

        {editingBlog && (
          <button
            onClick={onCancel}
            className="bg-[#f7f5ef] p-3 rounded-full text-[#1f332b]"
          >
            <X size={22} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Makale başlığı"
          className="w-full px-4 py-4 rounded-2xl border border-[#d8d1bf] outline-none focus:border-[#1f5f4b] bg-[#f7f5ef]"
        />

        <textarea
          name="excerpt"
          value={form.excerpt}
          onChange={handleChange}
          placeholder="Kısa açıklama"
          rows="3"
          className="w-full px-4 py-4 rounded-2xl border border-[#d8d1bf] outline-none focus:border-[#1f5f4b] bg-[#f7f5ef] resize-none"
        />

        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Makale içeriği"
          rows="8"
          className="w-full px-4 py-4 rounded-2xl border border-[#d8d1bf] outline-none focus:border-[#1f5f4b] bg-[#f7f5ef] resize-none"
        />

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-[2rem] p-8 text-center transition ${
            dragActive
              ? "border-[#1f5f4b] bg-[#e3efe8]"
              : "border-[#d8d1bf] bg-[#f7f5ef]"
          }`}
        >
          <ImagePlus size={42} className="mx-auto text-[#1f5f4b] mb-4" />

          <p className="font-semibold text-[#1f332b]">
            Görseli buraya sürükleyip bırakın
          </p>

          <p className="text-sm text-[#5f6f66] mt-2">
            Ya da bilgisayardan seçin
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageFile(e.target.files?.[0])}
            className="mt-5"
          />

          {form.image && (
            <img
              src={form.image}
              alt="Önizleme"
              className="mt-6 w-full h-60 object-cover rounded-2xl"
            />
          )}
        </div>

        {message && (
          <p className="bg-[#e3efe8] text-[#1f5f4b] px-4 py-3 rounded-xl text-sm">
            {message}
          </p>
        )}

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 bg-[#1f5f4b] text-white px-7 py-4 rounded-full font-bold hover:bg-[#174637] transition"
        >
          {editingBlog ? <Save size={20} /> : <PlusCircle size={20} />}
          {editingBlog ? "Makaleyi Güncelle" : "Makaleyi Ekle"}
        </button>
      </form>
    </div>
  );
}