import { Box } from "@chakra-ui/react";
import { CloseButton } from "../../components/ui/close-button";
import { useEffect, useState } from "react";
import {
  DialogRoot,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../../components/ui/dialog";
import { useCreateAplicativo } from "../../hooks/api/aplicativos/useCreateAplicativo";
import { useUpdateAplicativo } from "../../hooks/api/aplicativos/useUpdateAplicativo";
import { createDynamicFormFields } from "./formFields";
import { BuildForm } from "../../components/buildForm";
import { useVisibleInputForm } from "../../hooks/useVisibleInputForms";
import { VisibilityControlDialog } from "../../components/vibilityControlDialog";
import { parseFieldSchemaToVisibilityControlObj } from "../../utils/form";

export const CadastrarAplicativoDialog = ({ children, defaultValues }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(defaultValues);
  const { inputsVisibility, setInputsVisibility } = useVisibleInputForm({
    key: "APLICATIVOS_FORM",
  });

  const onCreateAplicativo = useCreateAplicativo({
    onSuccess: (data) => setOpen(false),
  });

  const onUpdateAplicativo = useUpdateAplicativo({
    onSuccess: (data) => setOpen(false),
  });

  const onSubmit = (values) => {
    if (data) {
      return onUpdateAplicativo.mutateAsync({
        body: values,
        id: data?._id,
      });
    }

    return onCreateAplicativo.mutateAsync({ body: values });
  };

  const fields = createDynamicFormFields();

  useEffect(() => {
    setData(defaultValues);
  }, [defaultValues]);

  return (
    <Box>
      <DialogRoot
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        placement="center"
      >
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader fontWeight="semibold" fontSize="md" alignItems="center">
            Aplicativo
            <VisibilityControlDialog
              fields={parseFieldSchemaToVisibilityControlObj(fields)}
              setVisibilityState={setInputsVisibility}
              visibilityState={inputsVisibility}
              title="Ocultar campos"
            />
          </DialogHeader>
          <DialogBody>
            <BuildForm
              gap="3"
              data={defaultValues}
              fields={fields}
              gridColumns={1}
              onSubmit={onSubmit}
              visibleState={inputsVisibility}
            />
          </DialogBody>
          <DialogCloseTrigger>
            <CloseButton />
          </DialogCloseTrigger>
        </DialogContent>
      </DialogRoot>
    </Box>
  );
};
