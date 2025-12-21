"use client";

import { Mail } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const EmailContact = () => {
  const [clicked, setClicked] = React.useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("abhimanyug987@gmail.com");
    setClicked(true);
    toast.success("Email copied to clipboard!");
  };

  return (
    <>
      <div
        className="group relative space-y-2 border border-zinc-400 px-8 py-8 rounded-xs hover:border-teal-500 hover:cursor-pointer hover:overflow-hidden"
        onClick={copyEmail}
      >
        <div className="group-hover:opacity-60">
          <Mail className="inline-block mr-2 mb-1 text-zinc-400 group-hover:text-teal-500" />
          <p className="text-xl font-semibold tracking-tight mt-2 group-hover:text-teal-500">
            Email
          </p>
          <p className="text-sm text-zinc-500 font-medium mt-2">
            Get in touch directly
          </p>
        </div>
        <div className="group-hover:opacity-100 opacity-0 transition-all duration-300">
          <p className="translate-y-4 text-sm font-medium text-zinc-900 group-hover:text-teal-500 transition-all duration-300 group-hover:translate-y-0">
            {clicked ? "Email Copied!" : "Copy Email"}
          </p>
        </div>
      </div>
    </>
  );
};

export default EmailContact;
