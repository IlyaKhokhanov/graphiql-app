import { toast } from 'react-hot-toast';

export const showToast = ({ message, thisError }: { message: string; thisError: boolean }) => {
  if (!thisError) {
    toast.success(message);
  } else {
    toast.error(message);
  }
};
