"use client";

import { useForm } from "react-hook-form";
import { createLetterAction } from "@/actions/letters";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "../ui/field";

type Inputs = {
  targetName: string;
  targetCity: string;
  content: string;
  isAnonymous: boolean;
};

export default function NewLetterForm() {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      isAnonymous: false,
    },
  });

  const isAnonymousValue = watch("isAnonymous");

  const onSubmit = async (data: Inputs) => {
    setServerError(null);

    const formData = new FormData();
    formData.append("targetName", data.targetName);
    formData.append("targetCity", data.targetCity);
    formData.append("content", data.content);
    formData.append("isAnonymous", String(data.isAnonymous));

    const result = await createLetterAction(formData);

    if (result?.fieldErrors) {
      Object.entries(result.fieldErrors).forEach(([field, messages]) => {
        setError(field as keyof Inputs, {
          type: "server",
          message: messages[0],
        });
      });
    } else if (result?.error) {
      setServerError(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto py-10">
      <FieldGroup>
        <FieldSet>
          <FieldLegend className="font-playwrite-ie text-2xl font-bold">
            Write a New Letter
          </FieldLegend>
          <FieldDescription>
            Release your regrets into the registry. Someone might be looking for
            this.
          </FieldDescription>

          <FieldGroup className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field>
                <FieldLabel htmlFor="targetName">
                  Recipient Name / Alias
                </FieldLabel>
                <Input
                  id="targetName"
                  placeholder="e.g. Felipe"
                  {...register("targetName")}
                  className={errors.targetName ? "border-red-500" : ""}
                />
                {errors.targetName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.targetName.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="targetCity">City / Location</FieldLabel>
                <Input
                  id="targetCity"
                  placeholder="e.g. Buenos Aires"
                  {...register("targetCity")}
                  className={errors.targetCity ? "border-red-500" : ""}
                />
                {errors.targetCity && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.targetCity.message}
                  </p>
                )}
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="content">Your Message</FieldLabel>
              <Textarea
                id="content"
                placeholder="What did you leave unsaid? Describe the regret, the place, and the moment..."
                className={`min-h-50 resize-none ${errors.content ? "border-red-500" : ""}`}
                {...register("content")}
              />
              <FieldDescription>
                Minimum 10 characters. Be as specific as possible to help the
                recipient find it.
              </FieldDescription>
              {errors.content && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.content.message}
                </p>
              )}
            </Field>

            <FieldSeparator />

            <Field orientation="horizontal" className="items-center gap-3">
              <Checkbox
                id="isAnonymous"
                checked={isAnonymousValue}
                onCheckedChange={(checked) =>
                  setValue("isAnonymous", !!checked)
                }
              />
              <div className="grid gap-1.5 leading-none">
                <FieldLabel
                  htmlFor="isAnonymous"
                  className="font-medium cursor-pointer"
                >
                  Post as Anonymous
                </FieldLabel>
                <p className="text-xs text-muted-foreground">
                  Your profile name won&apos;t be visible on this letter.
                </p>
              </div>
            </Field>
          </FieldGroup>
        </FieldSet>

        {serverError && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {serverError}
          </div>
        )}

        <div className="flex items-center gap-4 mt-6">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto"
          >
            {isSubmitting ? "Publishing..." : "Release Letter"}
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={() => window.history.back()}
          >
            Discard
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
