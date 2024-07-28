import useStore from "@/store/store";
import AuthDialog from "./AuthDialog";
import { AvatarIcon } from "@radix-ui/react-icons";

function Navigation() {
  const user = useStore((state) => state.user);
  return (
    <nav className="flex justify-end pt-3 items-center gap-x-10 w-[70%] mx-auto text-white text-xl">
      <p className="absolute left-[50%] translate-x-[-50%] top-6">
        <img src="/topic-scouter/logo.svg" width={200} height={200} />
      </p>
      {user ? (
        <>
          <AuthDialog type="LOGOUT" />
          <p className="text-2xl font-bold flex items-center gap-2">
            <AvatarIcon width={30} height={30} />
            {user.username}
          </p>
        </>
      ) : (
        <>
          <AuthDialog type="LOGIN" />
          <AuthDialog type="REGISTER" />
        </>
      )}
    </nav>
  );
}

export default Navigation;
