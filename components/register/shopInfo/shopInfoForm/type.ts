export interface Props {
  label?: string;
  title?: string;
  input?: {
    type: string;
    id: string;
    name: string;
  };
  text?: string;
  item?: {
    id: string;
    name: string;
  } [];
  textarea?: {
    id: string;
    name: string;
  }
}

export interface Item {
  id: string;
  name: string;
}

