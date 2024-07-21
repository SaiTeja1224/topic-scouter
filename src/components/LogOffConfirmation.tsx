import { queryClient } from "@/lib/query";
import { logout } from "@/lib/services";
import useStore from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";

function LogOffConfirmation({ onAction }: { onAction: () => void }) {
  const logOff = useStore((state) => state.logout);
  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await logout();
    },
    onSuccess() {
      logOff();
      queryClient.invalidateQueries({ queryKey: ["topics"] });
      queryClient.invalidateQueries({ queryKey: ["topic"] });
    },
  });

  const handleLogout = () => {
    onAction();
    logoutMutation.mutate();
  };
  return (
    <>
      <p className="text-xl text-center">Are you sure you want to log off ?</p>
      <div className="space-x-3 text-center mt-5">
        <Button onClick={handleLogout}>Confirm</Button>
        <Button variant={"destructive"} onClick={() => onAction()}>
          Cancel
        </Button>
      </div>
    </>
  );
}

export default LogOffConfirmation;
