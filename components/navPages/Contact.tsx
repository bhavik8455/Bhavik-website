"use client";
import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { jetbrainsMono } from "@/app/font";
import { toast } from "sonner";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error(data.error || "Failed to send message. Please try again!");
      }
    } catch (error) {
      console.error("Contact Form Error:", error);
      toast.error("Failed to send message. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="contact" className={`${jetbrainsMono.className} w-full max-w-4xl px-6 py-16 md:py-24 text-foreground`}>
      <div className="mx-auto text-center">
        <h2 className={` text-4xl md:text-6xl font-bold mb-6`}>
          <Mail className="inline-block mr-2" /> Contact Me
        </h2>
        <p className="text-muted-foreground mb-10">Let's work together or just say hi 👋</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className=" mx-auto flex flex-col gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          value={form.name}
          onChange={handleChange}
          className="rounded-lg p-3 bg-background border border-border focus:border-[#e8390d] focus:ring-[#e8390d] outline-none transition-colors duration-300"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          value={form.email}
          onChange={handleChange}
          className="rounded-lg p-3 bg-background border border-border focus:border-[#e8390d] focus:ring-[#e8390d] outline-none transition-colors duration-300"
        />

        <textarea
          name="message"
          rows={5}
          placeholder="Your Message"
          required
          value={form.message}
          onChange={handleChange}
          className="rounded-lg p-3 bg-background border border-border focus:border-[#e8390d] focus:ring-[#e8390d] outline-none transition-colors duration-300"
        />


        <button
          type="submit"
          disabled={loading}
          className="mt-4 self-end flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background hover:opacity-80 transition-all"
        >
          {loading ? "Sending..." : "Send Message"} <Send size={16} />
        </button>
      </form>
    </div>
  );
}
