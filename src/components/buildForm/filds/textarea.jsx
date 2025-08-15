import { Box, Text, Textarea } from "@chakra-ui/react";
import { useConfirmation } from "../../../hooks/useConfirmation";

export const TextareaField = ({ inputStyle, w, ...props }) => {
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      props?.setValue(props?.accessorKey, props.initialValue);
    }
  };

  const { requestConfirmation } = useConfirmation();

  const onBlur = async (ev) => {
    if (props?.confirmAction) {
      props.confirmationRefFn.current = async () => {
        const { action } = await requestConfirmation({
          title: props.confirmAction?.title,
          description: props?.confirmAction?.description,
        });

        if (action === "canceled") {
          props?.setValue(props?.accessorKey, props.initialValue);
        }

        return action;
      };
    }

    props.field.onBlur(ev);
  };

  return (
    <Box>
      <Text fontSize="sm" color="gray.700">
        {props.label}
      </Text>
      <Textarea
        {...props.field}
        onBlur={onBlur}
        disabled={props?.disabled}
        size="sm"
        fontSize="sm"
        variant="flushed"
        onKeyDown={handleKeyDown}
      />
      <Text mt="0.5" fontSize="xs" color="red.400">
        {props.error}
      </Text>
    </Box>
  );
};
