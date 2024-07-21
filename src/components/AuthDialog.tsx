import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LogOffConfirmation from "./LogOffConfirmation";
import AuthForm from "./AuthForm";

function AuthDialog({ type }: { type: "LOGIN" | "REGISTER" | "LOGOUT" }) {
  const [open, setIsOpen] = useState(false);
  const handleOpenDialog = (val: boolean) => {
    setIsOpen(val);
  };

  const onAction = () => {
    handleOpenDialog(false);
  };

  const headText =
    type === "LOGIN" ? "Login" : type === "LOGOUT" ? "Log Out" : "Sign Up";
  return (
    <Dialog open={open} onOpenChange={handleOpenDialog}>
      <DialogTrigger>
        <p className="text-xl cursor-pointer hover:font-bold transition active:scale-95">
          {headText}
        </p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{headText}</DialogTitle>
          <DialogDescription className="py-3">
            {type === "LOGOUT" ? (
              <LogOffConfirmation onAction={onAction} />
            ) : (
              <AuthForm type={type} onAction={onAction} />
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default AuthDialog;
