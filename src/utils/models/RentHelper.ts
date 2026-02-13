import { ERentStatus } from "@prisma/client";

export class RentHelper {
    static getStatusColor (status: ERentStatus) {
        switch (status) {
          case ERentStatus.SCHEDULED:
            return "primary.500";
          case ERentStatus.FINISHED:
            return "green.500";
          case ERentStatus.IN_PROGRESS:
            return "yellow.500";
          default:
            return "red.500";
        }
      };

      static getStatusLabel (status: ERentStatus) {
        switch (status) {
          case ERentStatus.SCHEDULED:
            return "Agendado";
          case ERentStatus.FINISHED:
            return "Finalizado";
          case ERentStatus.IN_PROGRESS:
            return "Em andamento";
          default:
            return "Cancelado";
        }
      };

}