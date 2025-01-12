"use client";

import React, { useEffect, useState } from "react";
import cn from "@/src/lib/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyTextField } from "@prismicio/client";
import { LinkField, NumberField } from "@prismicio/types";
import * as Tooltip from "@radix-ui/react-tooltip";
import GoogleMapReact from "google-map-react";
import { MapPin } from "lucide-react";
import { useForm } from "react-hook-form";

import { HomepageDocumentData } from "../../../../prismicio-types";
import GenericFormInput from "../FormInput";
import SectionTitle from "../SectionTitle";
import { ValidationSchema, validationSchema } from "./validationSchema";

const Marker = ({
  label,
  labelLink,
}: {
  lat: NumberField;
  lng: NumberField;
  label: KeyTextField;
  labelLink: LinkField;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(true);
  }, []);
  return (
    <a href={"url" in labelLink ? labelLink.url : ""} target="_blank">
      <div className="relative inline-block">
        <Tooltip.Provider>
          <Tooltip.Root open={isOpen} delayDuration={0}>
            <Tooltip.Trigger asChild>
              <MapPin
                color="#b11212"
                fill="#e94436"
                className="absolute bottom-full"
                height={36}
                width={36}
                strokeWidth={"0.75px"}
              />
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <a href={"url" in labelLink ? labelLink.url : ""} target="_blank">
                <Tooltip.Content
                  className="rounded bg-white p-2 font-hebrew"
                  sideOffset={5}
                >
                  {label}
                  <Tooltip.Arrow className="fill-white" />
                </Tooltip.Content>
              </a>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>
    </a>
  );
};

const Contact: React.FC<
  Pick<
    HomepageDocumentData,
    "map_label_link" | "map_label_text" | "map_lat" | "map_lng"
  > & { source: "homepage" | "blog" }
> = ({ map_label_link, map_label_text, map_lat, map_lng, source }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ValidationSchema>({ resolver: zodResolver(validationSchema) });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const result = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (result.ok) {
        setShowSuccess(true);
        reset();
      } else {
        setShowError(true);
      }
    } catch (e) {
      setShowError(true);
    }
    reset();
  });

  return (
    <section id="contact-section-id">
      <div
        id="contact"
        className={cn(
          "h-full w-full bg-black/90",
          source === "blog" && "py-10"
        )}
      >
        <div className="my-container">
          <SectionTitle className="flex text-white">צור קשר</SectionTitle>
          <div className="mb-4 h-[410px] w-full">
            <div style={{ height: "100%", width: "100%" }}>
              <GoogleMapReact
                defaultCenter={{
                  lat: map_lat as number,
                  lng: map_lng as number,
                }}
                defaultZoom={16}
                options={{}}
                bootstrapURLKeys={{
                  key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
                  language: "he",
                }}
              >
                <Marker
                  lat={map_lat}
                  lng={map_lng}
                  label={map_label_text}
                  labelLink={map_label_link}
                />
              </GoogleMapReact>
            </div>
          </div>
          {showSuccess && (
            <div className="flex-center">
              <div className="my-20 rounded-lg border border-green-500 bg-green-100 p-[1em] text-green-600">
                הטופס נשלח בהצלחה
              </div>
            </div>
          )}

          {showError && (
            <div className="flex-center">
              <div className="my-20 rounded-lg border border-red-600 bg-red-100 p-[1em] font-hebrew text-red-600">
                שגיאה. ניתן ליצור קשר באמצעות המייל: boomtah@gmail.com
              </div>
            </div>
          )}
          {!showError && !showSuccess && (
            <form onSubmit={onSubmit}>
              <div
                className={cn(
                  "flex flex-col gap-4 md:flex-row md:gap-8",
                  source === "blog" && "md:flex-row-reverse"
                )}
              >
                <div className="w-full">
                  <GenericFormInput
                    placeholder="שם"
                    errors={errors}
                    className={cn(
                      source === "blog" &&
                        "font-sans align-right placeholder:font-sans"
                    )}
                    {...register("name")}
                  />
                  <div className="mt-4" style={{ marginBottom: 0 }}>
                    <GenericFormInput
                      {...register("phone", { required: true })}
                      placeholder="טלפון"
                      className={cn(
                        source === "blog" &&
                          "font-sans align-right placeholder:font-sans"
                      )}
                      errors={errors}
                    />
                  </div>
                  <div className="mt-4">
                    <GenericFormInput
                      {...register("email")}
                      placeholder="אימייל (אופציונאלי)"
                      className={cn(
                        source === "blog" &&
                          "font-sans align-right placeholder:font-sans"
                      )}
                      errors={errors}
                    />
                  </div>
                </div>
                <textarea
                  {...register("message")}
                  className={cn(
                    "mb-4 h-[180px] w-full resize-none border border-gray-300 bg-transparent p-3 font-hebrew text-white outline-none align-right placeholder:font-hebrew placeholder:text-gray-500",
                    source === "blog" && "font-sans placeholder:font-sans"
                  )}
                  placeholder="תוכן ההודעה (אופציונאלי)"
                />
              </div>
              <button
                className={cn(
                  "w-full border border-white py-4 font-hebrew text-sm tracking-widest text-primary transition-colors duration-300 hover:bg-white",
                  source === "blog" && "font-sans"
                )}
                type="submit"
              >
                שלח
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
