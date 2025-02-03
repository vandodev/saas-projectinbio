"use client";

import Button from "@/app/components/ui/button";
import TextInput from "@/app/components/ui/text-input";
import { useState } from "react";

export default function CreateLinkForm() {

  const [link, setLink] = useState("");
  const [error, setError] = useState("");

  return (
    <>
      <form  className="w-full flex items-center gap-2">
        <span>projectinbio.com/</span>
        <TextInput value={link} />
        <Button className="w-[126px]">Criar</Button>
      </form>
      <div>
        <span className="text-accent-pink">{error}</span>
      </div>
    </>
  );
}