"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "next/navigation";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { sunburst } from "react-syntax-highlighter/dist/esm/styles/hljs";

function Snippet() {
  const { website } = useParams();
  const JS_codeString = `<script defer data-domain="${website}" src="https://monitoryour.website/tracking-script.js"></script>`;
  const NextJS_codeString = `
<Script
defer
data-domain="${website}"
src="https://monitoryour.website/tracking-script.js"/>
   `;
  return (
    <Tabs defaultValue="Js/React" className="w-full space-y-5">
      <TabsList
        className="w-full bg-black rounded-none space-x-5
                         bg-white/5 items-center justify-center flex"
      >
        <TabsTrigger value="Js/React" className="rounded-none">
          Js/React
        </TabsTrigger>
        <TabsTrigger className="rounded-none" value="Nextjs">
          Nextjs
        </TabsTrigger>
      </TabsList>
      <TabsContent value="Js/React" className="p-4">
        <b className="text-red-500 font-normal italic">inside index.html</b>
        <SyntaxHighlighter wrapLongLines language="javascript" style={sunburst}>
          {JS_codeString}
        </SyntaxHighlighter>
      </TabsContent>
      <TabsContent value="Nextjs" className="p-4">
        <b className="text-red-500 font-normal italic">inside app/layout.js</b>
        <SyntaxHighlighter wrapLongLines language="javascript" style={sunburst}>
          {NextJS_codeString}
        </SyntaxHighlighter>
      </TabsContent>
    </Tabs>
  );
}

export default Snippet;
