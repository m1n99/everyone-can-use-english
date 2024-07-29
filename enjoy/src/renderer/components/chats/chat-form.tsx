import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  ScrollArea,
  Textarea,
} from "@renderer/components/ui";
import { t } from "i18next";

export const ChatForm = (props: { chat?: ChatType }) => {
  const { chat } = props;

  const chatFormSchema = z.object({
    name: z.string(),
    prompt: z.string(),
    language: z.string(),
    digest: z.string().optional(),
    members: z.array(
      z.object({
        id: z.string(),
        userId: z.string(),
        userType: z.enum(["User", "Agent"]),
      })
    ),
  });

  const form = useForm<z.infer<typeof chatFormSchema>>({
    resolver: zodResolver(chatFormSchema),
    values: chat,
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="">
        <div className="">{chat?.id ? t("editChat") : t("newChat")}</div>
        <div className="space-y-4 px-2 mb-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("name")}</FormLabel>
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("prompt")}</FormLabel>
                <Textarea className="max-h-96" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="members"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("members")}</FormLabel>
                <ScrollArea className="w-full h-48">
                </ScrollArea>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};