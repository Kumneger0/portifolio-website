import React from "react";
import type { MDXComponents } from "mdx/types.js";
import {
  Heading,
  Paragraph,
  Code,
  LinkComponent,
  Heading2,
  Strong,
} from "@/mdxComponents/components";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

export const components = {
  h1: Heading,
  p: Paragraph,
  code: Code,
  a: LinkComponent,
  h2: Heading2,
  strong: Strong,
} as MDXComponents;

function Blog({ blogContent }: { blogContent: MDXRemoteSerializeResult }) {
  return (
    <div className="max-w-7xl mx-auto">
      <MDXRemote {...blogContent} components={components} />
    </div>
  );
}

export default Blog;
