"use client";

import { useState } from "react";
import { sanitizeLink } from "@/app/lib/utils";

import Button from "@/app/components/ui/button";
import TextInput from "@/app/components/ui/text-input";

export default function CreateLinkForm() {

  const [link, setLink] = useState("");
  const [error, setError] = useState("");

  function handleLinkChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLink(sanitizeLink(e.target.value));
    setError("");
  }

  return (
    <>
      <form  className="w-full flex items-center gap-2">
        <span>projectinbio.com/</span>
        <TextInput value={link} onChange={handleLinkChange}  />
        <Button className="w-[126px]">Criar</Button>
      </form>
      <div>
        <span className="text-accent-pink">{error}</span>
      </div>
    </>
  );
}