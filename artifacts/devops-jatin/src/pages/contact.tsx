import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Send, CheckCircle, AlertCircle, ArrowUpRight, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "info">("idle");
  const [responseMsg, setResponseMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      setStatus("error");
      setResponseMsg("All fields are required. Please check your inputs.");
      return;
    }

    setStatus("loading");
    setResponseMsg("");

    try {
      const response = await fetch("https://formsubmit.co/ajax/jatin.sharma.tech93@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          _subject: `DevOps Platform Contact: ${subject}`,
          message
        })
      });

      const result = await response.json();
      const isSuccess = result.success === "true" || result.success === true;
      const isActivation = result.message && (
        result.message.includes("Activation") || 
        result.message.includes("activate") || 
        result.message.includes("Activate")
      );

      if (response.ok && isSuccess) {
        setStatus("success");
        setResponseMsg("Thank you! Your message has been sent successfully.");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else if (isActivation) {
        setStatus("info");
        setResponseMsg("Activation Required: FormSubmit has sent an activation link to jatin.sharma.tech93@gmail.com. Please check your inbox (including spam) and click the link to activate the form.");
      } else {
        setStatus("error");
        setResponseMsg(result.message || "Failed to submit form. Please try again.");
      }
    } catch (err) {
      console.error("FormSubmit Error:", err);
      setStatus("error");
      setResponseMsg("Unable to send message due to a connection issue.");
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-20 font-sans">
      <div className="text-center mb-12">
        <Badge variant="outline" className="font-mono text-xs text-primary border-primary/30 uppercase mb-3">
          Get In Touch
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold font-mono mb-4">Contact <span className="text-primary">Us</span></h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Have questions or want to collaborate? Reach out to me directly or drop a message below.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Info Column */}
        <div className="contact-left-col space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-2xl border border-border bg-card shadow-sm glow-card flex flex-col gap-6"
          >
            <div>
              <h3 className="text-xl font-bold mb-3 font-mono text-foreground flex items-center gap-2">
                Contact Methods
              </h3>
              <p className="text-sm text-muted-foreground">
                Feel free to message me directly. I usually respond within 24 hours.
              </p>
            </div>

            <div className="space-y-6">
              {/* Email Section */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono mb-1">Email Me</p>
                  <a href="mailto:jatin.sharma.tech93@gmail.com" className="text-sm md:text-base font-medium text-foreground hover:text-primary transition-colors break-all block">
                    jatin.sharma.tech93@gmail.com
                  </a>
                </div>
              </div>

              {/* WhatsApp Section */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-green-500/10 text-green-400 shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono mb-1">WhatsApp Chat</p>
                  <a href="https://wa.me/919350198230" target="_blank" rel="noopener noreferrer" className="text-sm md:text-base font-medium text-foreground hover:text-green-400 transition-colors block">
                    +91 9350198230
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border/60 flex flex-col gap-3">
              <a
                href="mailto:jatin.sharma.tech93@gmail.com"
                className="w-full inline-flex items-center justify-between p-3.5 rounded-xl border border-border bg-background hover:bg-muted text-sm font-mono transition-all group"
              >
                <span>Launch Email Client</span>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href="https://wa.me/919350198230"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-between p-3.5 rounded-xl bg-green-500 hover:bg-green-500/90 text-white text-sm font-mono transition-all group"
              >
                <span>Chat on WhatsApp</span>
                <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Form Column */}
        <div className="contact-right-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 md:p-8 rounded-2xl border border-border bg-card shadow-sm glow-card"
          >
            <h3 className="text-xl font-bold mb-6 font-mono text-foreground">Send A Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground block">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    disabled={status === "loading"}
                    className="w-full p-3 rounded-lg border border-border bg-background/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    disabled={status === "loading"}
                    className="w-full p-3 rounded-lg border border-border bg-background/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground block">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Inquiry about mentorship/labs"
                  disabled={status === "loading"}
                  className="w-full p-3 rounded-lg border border-border bg-background/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all text-sm"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground block">
                  Message Details
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here..."
                  disabled={status === "loading"}
                  className="w-full p-3 rounded-lg border border-border bg-background/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all text-sm resize-none"
                />
              </div>

              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-start gap-2.5"
                  >
                    <CheckCircle className="w-5 h-5 shrink-0 mt-0.5 text-green-400" />
                    <span>{responseMsg}</span>
                  </motion.div>
                )}

                {status === "info" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm flex items-start gap-2.5 animate-pulse-slow"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-400" />
                    <span>{responseMsg}</span>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-start gap-2.5"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>{responseMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full inline-flex items-center justify-center gap-2 p-3.5 rounded-xl bg-primary hover:bg-primary/95 text-primary-foreground font-mono text-sm font-semibold transition-all disabled:opacity-50"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
