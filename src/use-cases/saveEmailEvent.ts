import { EmailEventsTable } from 'services/database.service';

export interface ISaveEmailEvent {
  Table: EmailEventsTable;
}

export const saveEmailEvent = ({ Table }: ISaveEmailEvent) => {
  return Table.saveEvent();
};
