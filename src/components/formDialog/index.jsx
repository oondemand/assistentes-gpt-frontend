import { Flex, Heading, Text } from "@chakra-ui/react";
import { CloseButton } from "../ui/close-button";

import { BuildForm } from "../buildForm/index";
import { VisibilityControlDialog } from "../vibilityControlDialog";

import {
  DialogRoot,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { AssistantButton } from "../ui/ia-button";
import { useVisibleInputForm } from "../../hooks/useVisibleInputForms";
import { UploadAnexos } from "../../pages/assistant/anexos";

export const FormDialog = ({
  open,
  onOpenChange,
  onOpenAssistantDialog,
  label,
  fields,
  data,
  onSubmit,
  stateKey,
  children,
  disabled = false,
}) => {
  const { inputsVisibility, setInputsVisibility } = useVisibleInputForm({
    key: stateKey,
  });

  return (
    <>
      {open && (
        <DialogRoot size="cover" open={open} onOpenChange={onOpenChange}>
          <DialogContent
            overflow="hidden"
            w="1250px"
            h="80%"
            pt="6"
            px="2"
            rounded="lg"
          >
            <DialogHeader mt="-4" p="3" pb="4" px="4">
              <DialogTitle>
                <Flex gap="4" alignItems="center">
                  {onOpenAssistantDialog && (
                    <AssistantButton onClick={onOpenAssistantDialog} />
                  )}
                  <Flex gap="4" alignItems="baseline">
                    {label}
                    {data && (
                      <Text
                        fontSize="xs"
                        fontWeight="normal"
                        fontStyle="italic"
                      >
                        {data._id}
                      </Text>
                    )}
                  </Flex>
                  <VisibilityControlDialog
                    fields={fields.flatMap((field) => {
                      if ("group" in field && Array.isArray(field.group)) {
                        return field.group.map((groupField) => ({
                          accessorKey: groupField.accessorKey,
                          label: groupField.label,
                        }));
                      }

                      return field.accessorKey
                        ? [
                            {
                              accessorKey: field.accessorKey,
                              label: field.label,
                            },
                          ]
                        : [];
                    })}
                    setVisibilityState={setInputsVisibility}
                    visibilityState={inputsVisibility}
                    title="Ocultar campos"
                  />
                </Flex>
              </DialogTitle>
            </DialogHeader>
            <DialogBody overflowY="auto" className="dialog-custom-scrollbar">
              <BuildForm
                disabled={disabled}
                visibleState={inputsVisibility}
                fields={fields}
                gridColumns={4}
                gap={6}
                data={data}
                onSubmit={onSubmit}
              />

              {children}
            </DialogBody>

            <DialogCloseTrigger asChild>
              <CloseButton size="sm" />
            </DialogCloseTrigger>
          </DialogContent>
        </DialogRoot>
      )}
    </>
  );
};
