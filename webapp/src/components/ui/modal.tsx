import {
  ButtonHTMLAttributes,
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
} from "react";

import { Button, Card } from "@/components/ui";

interface Props {
  children: ReactNode;
}

interface ModalProps extends Props {
  open?: boolean; // whether the model is initially open or not.
}

interface ModalContextType {
  close: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

function Modal({ children, open = false }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) ref.current?.showModal();
    else ref.current?.close();
  }, [open]);

  const close = () => ref.current?.close();

  const handleClickOutside = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialogDimensions = ref.current?.getBoundingClientRect();
    if (dialogDimensions) {
      const clickedOutside =
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom;

      if (clickedOutside) close();
    }
  };

  return (
    <dialog
      ref={ref}
      onClick={handleClickOutside}
      className="bg-transparent text-zinc-900 dark:text-zinc-200 min-w-96 max-w-[8000px] min-h-32 top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop:bg-zinc-900/60"
    >
      <ModalContext.Provider value={{ close }}>
        <Card>{children}</Card>
      </ModalContext.Provider>
    </dialog>
  );
}

function ModalClose() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("ModalClose must be used within a Modal");

  return (
    <button
      onClick={context.close}
      className="px-1 hover:bg-zinc-800 rounded cursor-pointer"
      aria-label="Close"
    >
      ✕
    </button>
  );
}

function ModalCloseButton({
  children,
  ...props
}: Props & ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = useContext(ModalContext);
  if (!context) throw new Error("ModalCloseButton must be used within a Modal");

  return (
    <Button onClick={context.close} aria-label="Close" {...props}>
      {children}
    </Button>
  );
}

function ModalHeader({ children }: Props) {
  const context = useContext(ModalContext);
  if (!context) throw new Error("ModalHeader must be used within a Modal");

  return (
    <Card.Header className="flex justify-between items-center">
      <div>{children}</div>
      <ModalClose />
    </Card.Header>
  );
}

function ModalBody({ children }: Props) {
  return <Card.Body>{children}</Card.Body>;
}

function ModalFooter({ children }: Props) {
  return <Card.Footer>{children}</Card.Footer>;
}

Modal.Close = ModalClose;
Modal.CloseButton = ModalCloseButton;
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
