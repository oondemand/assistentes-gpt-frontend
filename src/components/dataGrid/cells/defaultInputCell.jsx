import { useEffect, useState } from "react";
import { Input } from "@chakra-ui/react";

export const DefaultInputCell = (props) => {
  const initialValue = props.getValue();
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <Input
      truncate
      variant="subtle"
      display="flex"
      fontSize="sm"
      size="xs"
      bg="transparent"
      focusRingColor="brand.500"
      pointerEvents="none"
      defaultValue={value}
      {...props}
    />
  );
};
