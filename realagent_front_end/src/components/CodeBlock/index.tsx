import { Code } from "@mantine/core";
import React from "react";
import { cx } from "../../helper";
import styles from "./index.module.css";

interface CodeBlockProps {
  value: string;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ value, className }) => {
  return (
    <Code block className={cx(styles.codeBlock, className)}>
      {value}
    </Code>
  );
};

export default CodeBlock;
