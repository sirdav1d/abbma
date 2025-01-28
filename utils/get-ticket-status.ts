import { $Enums } from "@prisma/client";

 export  function getTicketStatus(status: $Enums.Status) {
      if (status === 'COMPLETED') {
        return 'Concluído';
      } else if (status === 'IN_PROGRESS') {
        return 'Em Andamento';
      } else {
        return 'Pendente';
      }
    }
