import { createContext, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CircleCheck, CircleX } from "lucide-react";

export const ConfirmationContext = createContext(null);

export function ConfirmationProvider({ children }) {
  const [dialog, setDialog] = useState(null);

  const confirm = ({
    title = "Confirmation",
    description = "",
    confirmText = "Confirm",
    cancelText = "Cancel",
  }) => {
    return new Promise((resolve) => {
      setDialog({
        title,
        description,
        confirmText,
        cancelText,
        resolve,
      });
    });
  };

  const close = (result) => {
    dialog?.resolve(result);
    setDialog(null);
  };

  return (
    <ConfirmationContext.Provider value={{ confirm }}>
      {children}

      <AlertDialog
        open={dialog !== null}
        onOpenChange={(open) => {
          if (!open) close(false);
        }}
      >
        <AlertDialogContent className="bg-gray-100">
          <AlertDialogHeader>
            <AlertDialogTitle>{dialog?.title}</AlertDialogTitle>

            <AlertDialogDescription>
              {dialog?.description}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => close(false)}
              className="juicyButton bg-red-400 border-none shadow-xl"
            >
              <CircleX />
              {dialog?.cancelText}
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={() => close(true)}
              className="juicyButton bg-green-400 shadow-xl"
            >
              <CircleCheck />
              {dialog?.confirmText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ConfirmationContext.Provider>
  );
}
