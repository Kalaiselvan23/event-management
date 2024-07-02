
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryType, EventType, PaymentType, PriceClassType } from "@/lib/types";
import { PaymentSchema } from '@/lib/types';
import { useEffect, useState } from "react";
import { Endpoint, fetchFromApi } from "@/lib/utils";
import toast from "react-hot-toast";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { getServerSession } from "next-auth";
import BuyForm from "@/components/BuyForm";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

type fetchedData = {
  event: { msg: '', data: EventType }
};

export default async function Component({ params }: any) {
  const endpoints: Endpoint<fetchedData>[] = [{ key: "event", url: `events/${params.id}` }];
  const { event } = await fetchFromApi(endpoints);
  const session = await getServerSession(authOptions);
  return (
    <BuyForm user={session?.user} event={event?.data} />
  );
}
