import { toaster } from "@/components/atoms/Toaster";

export const handleFrontendError = (e: unknown, title: string = "Erro ao realizar operação") => {
    const errorMessage = e instanceof Error ? e.message : "Erro desconhecido";
    const axiosError = e as { response?: { data?: { message?: string, errorDetail?: string } } };
    
    toaster.create({
      type: "error",
      title: title,
      description: axiosError.response?.data?.message ?? axiosError.response?.data?.errorDetail ?? errorMessage,
    });
};
