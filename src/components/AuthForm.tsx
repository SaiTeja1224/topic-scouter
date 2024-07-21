import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { queryClient } from "@/lib/query";
import { login, signUp } from "@/lib/services";
import useStore from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

function AuthForm({
  type,
  onAction,
}: {
  type: "LOGIN" | "REGISTER";
  onAction: () => void;
}) {
  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(3, {
      message: "Password must be at least 3 characters.",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const storeLogin = useStore((state) => state.login);
  const loginMutation = useMutation({
    mutationFn: async (variables: z.infer<typeof formSchema>) => {
      return await login(variables);
    },
    onSuccess(data, variables) {
      storeLogin({ username: variables.username, ...data });
      queryClient.invalidateQueries({ queryKey: ["topics"] });
      queryClient.invalidateQueries({ queryKey: ["topic"] });
    },
  });
  const signUpMutation = useMutation({
    mutationFn: async (variables: z.infer<typeof formSchema>) => {
      return await signUp(variables);
    },
    onSuccess(data, variables) {
      storeLogin({ username: variables.username, ...data });
      queryClient.invalidateQueries({ queryKey: ["topics"] });
      queryClient.invalidateQueries({ queryKey: ["topic"] });
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (type === "LOGIN") {
      loginMutation.mutate(values);
    } else if (type === "REGISTER") {
      signUpMutation.mutate(values);
    }
    onAction();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Your Username" {...field} />
              </FormControl>
              {type === "REGISTER" ? (
                <FormDescription>
                  This is your public display name.
                </FormDescription>
              ) : null}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-x-3 text-center">
          <Button type="submit">Submit</Button>
          <Button
            type="button"
            variant={"destructive"}
            onClick={() => onAction()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default AuthForm;
