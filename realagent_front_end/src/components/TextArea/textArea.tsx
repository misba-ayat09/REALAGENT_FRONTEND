import { Textarea } from "@mantine/core";
import "./textArea.module.css";
interface TextAreaProps {
  placeholder?: string;
  // label?: string;
  // name: string;
  // value: string;
  required?: boolean;
//   onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function TextArea({
  placeholder,
  // label,
  // name,
  // value,
//   onChange,
  required = true
}: TextAreaProps): JSX.Element {
  return (
    <>
      <Textarea
        placeholder={placeholder}
        required={required}
        // value={value}
        // name={name}
        // onChange={onChange}
        className='textArea-mobile textArea-desktop'
        styles={{
          input: {
            backgroundColor: "#F1F3F5",
            width: "635px",
            padding: "11px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            height: "151px",
            borderRadius: "8px",
            fontFamily: "Roboto ,var(--mantine-font-family)",
            border:'none'
          },
          label: { color: "black", fontFamily: "Roboto ,var(--mantine-font-family)" }
        }}
      />
    </>
  );
}
